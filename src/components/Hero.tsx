import { profile } from "../data";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hello">
        <span className="wave" aria-hidden="true">
          👋
        </span>{" "}
        Hi, I'm <b>{profile.brand}</b>
      </div>
      <h1>
        I build interfaces that feel <span className="accent">fast &amp; precise.</span>
      </h1>
      <p className="lede">
        Frontend engineer with 4+ years shipping production React &amp; TypeScript at
        consumer and B2B scale — scheduling systems, AI-assisted workflows, shared npm
        packages, and platform-wide design-system migrations. I obsess over performance,
        accessibility, and the last 10% of polish.
      </p>
      <div className="cta-row">
        <a className="btn primary" href="#contact" data-magnetic>
          Get in touch <span aria-hidden="true">→</span>
        </a>
        <a className="btn" href={profile.cv} download data-magnetic>
          Download CV <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="avail">
        <span className="pulse" aria-hidden="true" /> {profile.location} · Available for new
        roles &amp; projects
      </div>
    </section>
  );
}
