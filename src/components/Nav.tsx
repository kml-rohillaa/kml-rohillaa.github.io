import { useState } from "react";
import { navItems, profile } from "../data";
import { useScrolled } from "../hooks";

type Props = {
  active: string;
  theme: "light" | "dark";
  onToggle: () => void;
};

export default function Nav({ active, theme, onToggle }: Props) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="nav-inner">
        <a className="brand" href="#top" data-magnetic onClick={close}>
          {profile.brand}
          <span className="dot">.</span>
        </a>
        <div className="nav-right">
          <nav className="nav-links" id="nav-menu">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "active" : ""}
                onClick={close}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="theme-btn"
            type="button"
            onClick={onToggle}
            aria-label="Toggle colour theme"
            data-magnetic
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            <span className="theme-btn-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
