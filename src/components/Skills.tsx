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
            style={{ ["--i" as string]: i }}
          >
            <span className="ic">
              <img
                className={s.invert ? "inv" : undefined}
                src={s.icon}
                alt=""
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </span>
            <span className="nm">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
