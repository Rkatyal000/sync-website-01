import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Building2 } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = [
  "Cross-Media Measurement",
  "Outcomes Measurement",
  "Media Optimisation",
  "Broadcaster Reporting",
  "Case Study / Proof of Concept",
  "Other",
];

const DESCRIBES_YOU = [
  "Advertiser",
  "Agency",
  "Broadcaster / Publisher",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: INTERESTS[0],
    describes_you: DESCRIBES_YOU[0],
    message: "",
  });
  const [busy, setBusy] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks — we'll be in touch shortly.");
      setForm({
        name: "",
        email: "",
        company: "",
        role: "",
        interest: INTERESTS[0],
        describes_you: DESCRIBES_YOU[0],
        message: "",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-fade" data-testid="contact-page">
      <Seo
        title="Contact"
        description="Tell us about your business and media mix. We'll show you what's really happening — in a 30-minute session."
        path="/contact"
        keywords={["contact SYNC", "book a demo", "cross-media measurement demo"]}
      />
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1>Let's talk.</h1>
            <p className="lead">
              Tell us a bit about your business and media mix. We'll show you what's really happening — in a 30-minute session.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="contact-wrap">
          <Reveal>
            <form onSubmit={submit} className="form-grid" data-testid="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Name</label>
                  <input required value={form.name} onChange={onChange("name")} data-testid="contact-input-name" />
                </div>
                <div className="form-field">
                  <label>Work email</label>
                  <input required type="email" value={form.email} onChange={onChange("email")} data-testid="contact-input-email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Company</label>
                  <input value={form.company} onChange={onChange("company")} data-testid="contact-input-company" />
                </div>
                <div className="form-field">
                  <label>Role</label>
                  <input value={form.role} onChange={onChange("role")} data-testid="contact-input-role" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>What best describes you?</label>
                  <select
                    value={form.describes_you}
                    onChange={onChange("describes_you")}
                    data-testid="contact-input-describes-you"
                  >
                    {DESCRIBES_YOU.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>I'm interested in</label>
                  <select value={form.interest} onChange={onChange("interest")} data-testid="contact-input-interest">
                    {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea required value={form.message} onChange={onChange("message")} data-testid="contact-input-message" placeholder="Tell us about your mix and what you'd like to measure." />
              </div>
              <div>
                <button type="submit" className="btn btn-primary" disabled={busy} data-testid="contact-submit">
                  {busy ? "Sending…" : (<>Send message <ArrowRight size={16} /></>)}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <aside className="contact-aside">
              <span className="eyebrow">What happens next</span>
              <h3>A quick, honest conversation.</h3>
              <p>Within one business day, a member of the team will reach out to schedule a working session tailored to your mix.</p>

              <div className="info-row">
                <span><Mail size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /> Email</span>
                <strong>hello@sync.io</strong>
              </div>
              <div className="info-row">
                <span><Building2 size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /> Enterprise</span>
                <strong>Advertisers · Agencies · Broadcasters</strong>
              </div>
              <div className="info-row">
                <span><MapPin size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /> Headquarters</span>
                <strong>Remote-first · Global coverage</strong>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
