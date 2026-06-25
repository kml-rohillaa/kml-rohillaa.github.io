import { navItems, profile } from "../data";

type Props = {
  active: string;
  theme: "light" | "dark";
  onToggle: () => void;
};

export default function Nav({ active, theme, onToggle }: Props) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          {profile.brand}
          <span className="dot">.</span>
        </a>
        <div className="nav-right">
          <nav className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "active" : ""}
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
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
