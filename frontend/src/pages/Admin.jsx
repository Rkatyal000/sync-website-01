import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("sm_admin_token") || "");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [subs, setSubs] = useState([]);
  const [busy, setBusy] = useState(false);

  const load = async (tkn) => {
    setBusy(true);
    try {
      const headers = { "x-admin-token": tkn };
      const [c, s] = await Promise.all([
        axios.get(`${API}/contact`, { headers }),
        axios.get(`${API}/newsletter`, { headers }),
      ]);
      setContacts(c.data);
      setSubs(s.data);
      setAuthed(true);
      localStorage.setItem("sm_admin_token", tkn);
    } catch (e) {
      toast.error("Invalid token");
      setAuthed(false);
    } finally {
      setBusy(false);
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    if (!token) return;
    load(token);
  };

  const signOut = () => {
    localStorage.removeItem("sm_admin_token");
    setAuthed(false);
    setToken("");
    setContacts([]);
    setSubs([]);
  };

  if (!authed) {
    return (
      <div className="page-fade" data-testid="admin-page">
        <section className="page-hero">
          <div className="container" style={{ maxWidth: 420 }}>
            <span className="eyebrow">Admin</span>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 48px)" }}>Sign in</h1>
            <p className="lead" style={{ marginTop: 12, fontSize: 16 }}>
              Enter the admin token to view submissions.
            </p>
            <form onSubmit={signIn} className="form-grid" style={{ marginTop: 28 }}>
              <div className="form-field">
                <label>Admin token</label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  data-testid="admin-token-input"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={busy} data-testid="admin-signin">
                {busy ? "…" : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-fade" data-testid="admin-dashboard">
      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">Admin</span>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>Submissions</h1>
            </div>
            <button onClick={signOut} className="btn btn-secondary" data-testid="admin-signout">Sign out</button>
          </div>

          <div className="admin-tabs" style={{ marginTop: 32 }}>
            <button className={tab === "contacts" ? "on" : ""} onClick={() => setTab("contacts")} data-testid="tab-contacts">
              Contacts ({contacts.length})
            </button>
            <button className={tab === "subs" ? "on" : ""} onClick={() => setTab("subs")} data-testid="tab-subscribers">
              Subscribers ({subs.length})
            </button>
          </div>

          {tab === "contacts" && (
            <table className="admin-table" data-testid="contacts-table">
              <thead>
                <tr>
                  <th>When</th><th>Name</th><th>Email</th><th>Company</th><th>Interest</th><th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 && (
                  <tr><td colSpan={6} style={{ color: "var(--fg-muted)" }}>No submissions yet.</td></tr>
                )}
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{new Date(c.created_at).toLocaleString()}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.company || "—"}</td>
                    <td>{c.interest || "—"}</td>
                    <td style={{ maxWidth: 360 }}>{c.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "subs" && (
            <table className="admin-table" data-testid="subs-table">
              <thead><tr><th>When</th><th>Email</th></tr></thead>
              <tbody>
                {subs.length === 0 && (
                  <tr><td colSpan={2} style={{ color: "var(--fg-muted)" }}>No subscribers yet.</td></tr>
                )}
                {subs.map((s) => (
                  <tr key={s.id}>
                    <td>{new Date(s.created_at).toLocaleString()}</td>
                    <td>{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
