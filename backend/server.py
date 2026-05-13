from fastapi import FastAPI, APIRouter, Header, HTTPException, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import csv
import io
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ----------------------------------------------------------------------------
# Status check models (unchanged — kept for backwards compatibility)
# ----------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ----------------------------------------------------------------------------
# Lead capture
# ----------------------------------------------------------------------------
class LeadCreate(BaseModel):
    """Inbound payload from the Contact page or the Footer newsletter form."""
    model_config = ConfigDict(extra="ignore")

    name: Optional[str] = None
    email: EmailStr
    company: Optional[str] = None
    role: Optional[str] = None
    interest: Optional[str] = None
    describes_you: Optional[str] = None
    message: Optional[str] = None
    source: Literal["contact", "newsletter", "other"] = "contact"


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Status routes (unchanged) ---------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Lead routes -----------------------------------------------------------------
@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    """Capture a lead from any public-facing form (Contact / Newsletter)."""
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    # Lowercase + trim email for de-duplication-friendly storage.
    doc['email'] = doc['email'].strip().lower()
    await db.leads.insert_one(doc)
    return lead


def _check_export_token(provided: Optional[str]) -> None:
    """Optional shared-secret guard for the CSV export endpoint.

    If `LEADS_EXPORT_TOKEN` is set in the environment, callers must provide
    the matching value in the `X-Export-Token` header. If the env var is
    unset (development), the endpoint remains open.
    """
    expected = os.environ.get("LEADS_EXPORT_TOKEN")
    if not expected:
        return
    if not provided or provided != expected:
        raise HTTPException(status_code=403, detail="Forbidden")


@api_router.get("/leads/export")
async def export_leads(x_export_token: Optional[str] = Header(default=None)):
    """Return all leads as a UTF-8 CSV (filename includes today's date)."""
    _check_export_token(x_export_token)

    fields = [
        "id", "timestamp", "source", "name", "email",
        "company", "role", "interest", "describes_you", "message",
    ]
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=fields, extrasaction="ignore")
    writer.writeheader()

    cursor = db.leads.find({}, {"_id": 0}).sort("timestamp", -1)
    async for doc in cursor:
        writer.writerow({k: (doc.get(k) or "") for k in fields})

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return Response(
        content=buf.getvalue(),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="leads-{today}.csv"'},
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def _create_indexes():
    # Useful for export ordering and de-dup queries; both indexes are tiny.
    await db.leads.create_index("timestamp")
    await db.leads.create_index("email")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
