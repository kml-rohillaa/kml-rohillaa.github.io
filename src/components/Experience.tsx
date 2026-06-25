import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience">
      <div className="sec-head">
        <span className="eyebrow">Experience</span>
        <h2 className="title">Where I've worked</h2>
      </div>
      <div className="exp-list">
        {experience.map((e) => (
          <div className="exp-card reveal" key={e.company}>
            <div className="exp-badge" aria-hidden="true">
              {e.badge}
            </div>
            <div>
              <div className="exp-top">
                <h3>{e.role}</h3>
                <a
                  className="co"
                  href={e.companyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.company} ↗
                </a>
                <span className="when">{e.when}</span>
              </div>
              <p className="exp-loc">{e.location}</p>
              {e.bullets.length > 0 && (
                <ul>
                  {e.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
