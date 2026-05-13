/**
 * Singleton MongoDB connection.
 *
 * Uses the official Node MongoDB driver (the same driver that powers `motor`
 * on the Python side) so document shapes remain interchangeable between the
 * FastAPI and Bun implementations.
 */
import { MongoClient, type Db } from "mongodb";
import { config } from "./config.ts";
import { logger } from "./logger.ts";

let _client: MongoClient | null = null;
let _db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (_db) return _db;
  _client = new MongoClient(config.mongoUrl, {
    // Reasonable production defaults; tune via MongoClientOptions if needed.
    maxPoolSize: 20,
    minPoolSize: 0,
    retryWrites: true,
    serverSelectionTimeoutMS: 5_000,
  });
  await _client.connect();
  _db = _client.db(config.dbName);
  logger.info(`MongoDB connected → db=${config.dbName}`);
  return _db;
}

export async function closeDb(): Promise<void> {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
    logger.info("MongoDB connection closed");
  }
}
