import { skills } from "../data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="sec-head">
        <span className="eyebrow">Skills</span>
        <h2 className="title">Technologies I work with</h2>
        <p className="sub">
          From the design system down to the API contract — here's the toolkit I reach for
          most.
        </p>
      </div>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <div
            className="skill reveal"
            key={s.name}
            data-spotlight
            data-tilt
            style={{ ["--i" as string]: i }}
          >
            <span className="ic">
              {s.node ? (
                <svg
                  viewBox="0 0 24 24"
                  width="34"
                  height="34"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18" />
                  <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z" />
                </svg>
              ) : (
                <img
                  className={s.invert ? "inv" : undefined}
                  src={s.icon}
                  alt=""
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </span>
            <span className="nm">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
