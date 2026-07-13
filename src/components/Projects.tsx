import { projects } from "../data";

export default function Projects() {
  return (
    <section id="projects">
      <div className="sec-head">
        <span className="eyebrow">Projects</span>
        <h2 className="title">Things I've built</h2>
      </div>
      <div className="proj-list">
        {projects.map((p) => (
          <article className="proj-card reveal" key={p.name}>
            <div className="proj-head">
              <h3>{p.name}</h3>
              <div className="proj-links">
                {p.live && (
                  <a
                    className="proj-link"
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live ↗
                  </a>
                )}
                {p.code && (
                  <a
                    className="proj-link"
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code ↗
                  </a>
                )}
              </div>
            </div>
            <p className="proj-desc">{p.tagline}</p>
            <ul>
              {p.highlights.map((h, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </ul>
            <div className="proj-tags">
              {p.tags.map((t) => (
                <span className="proj-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
