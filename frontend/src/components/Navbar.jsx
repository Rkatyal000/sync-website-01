import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Sun, Moon, Monitor, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Platform" },
  { to: "/audience", label: "Audience" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { mode, cycle } = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("menu-open");
      document.body.classList.add("menu-open");
    } else {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;

  return (
    <nav className="nav" data-testid="site-nav">
      <div className="nav-inner">
        <Link to="/" aria-label="SYNC home" data-testid="nav-brand">
          <img className="brand-logo" src="/sync-logo.png" alt="SYNC" />
        </Link>

        <div className="nav-links">
          {LINKS.slice(1).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={cycle}
            aria-label={`Theme: ${mode}. Click to change.`}
            title={`Theme: ${mode}`}
            data-testid="theme-toggle"
          >
            <Icon size={16} strokeWidth={1.6} />
          </button>
          <Link to="/contact" className="btn btn-primary" data-testid="nav-cta" style={{ minHeight: 38, padding: "8px 18px", fontSize: 14 }}>
            Get Started
          </Link>
          <button
            className="menu-btn"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-btn"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`} data-testid="mobile-menu">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            data-testid={`mobile-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          onClick={() => setOpen(false)}
          className="btn btn-primary"
          data-testid="mobile-cta"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
