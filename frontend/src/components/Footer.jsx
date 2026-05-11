import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setBusy(true);
      await axios.post(`${API}/newsletter`, { email });
      toast.success("You're in. We'll be in touch.");
      setEmail("");
    } catch (err) {
      toast.error("Please enter a valid email.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="footer" data-testid="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="brand-logo footer-brand-logo" src="/sync-logo.png" alt="SYNC" />
          <p>
            SYNC unifies measurement, intelligence and execution across every
            screen — so teams can act on what's really happening.
          </p>
          <form className="newsletter" onSubmit={subscribe} data-testid="newsletter-form">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email for newsletter"
              data-testid="newsletter-input"
            />
            <button type="submit" disabled={busy} data-testid="newsletter-submit">
              {busy ? "…" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/products">Measurement</Link>
            <Link to="/products">Outcomes</Link>
            <Link to="/products">Optimisation</Link>
            <Link to="/products">Diagnostics</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/audience">Audience</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>For</h4>
            <Link to="/products">Advertisers</Link>
            <Link to="/products">Agencies</Link>
            <Link to="/products">Broadcasters</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Book a Demo</Link>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <span>© {new Date().getFullYear()} SYNC. All rights reserved.</span>
        <span>Where Intelligence Meets Execution.</span>
      </div>
    </footer>
  );
}
