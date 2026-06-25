import { profile } from "../data";

const funFacts = [
  "B.Tech in Computer Science from Delhi Technological University (GPA 8.76/10)",
  "Lifelong learner with a soft spot for new tooling and competitive programming",
  "Happiest turning ideas into reality, one sprint at a time",
];

export default function About() {
  return (
    <section id="about">
      <div className="sec-head">
        <span className="eyebrow">About me</span>
        <h2 className="title">A bit about my journey</h2>
      </div>
      <div className="about">
        <div className="about-photo reveal">
          <span className="mono" aria-hidden="true">
            KR
          </span>
          <img
            src={profile.photo}
            alt={profile.name}
            onError={(e) => e.currentTarget.remove()}
          />
        </div>
        <div className="about-body reveal">
          <p>
            Hey there! I'm <span className="hl">{profile.name}</span> — a frontend engineer
            who loves turning messy product ideas into fast, accessible, pixel-honest
            interfaces. My ride in web development started back in 2022, and it's been a
            steady run of building, shipping, and sweating the details ever since.
          </p>
          <p>
            I'm currently a{" "}
            <span className="hl">Frontend Web Engineer at Virtual Internships</span>, where I
            architected the interview scheduling system end-to-end, published two shared npm
            packages used across multiple apps, led a platform-wide EUI/Ant&nbsp;→&nbsp;MUI&nbsp;5
            migration, and shipped AI-assisted product flows. Before that, at Housing.com, I
            revamped owner dashboards and ran an 8-feature A/B testing program that lifted
            conversions.
          </p>
          <p>
            What drives me is the moment a rough spec becomes something people genuinely enjoy
            using — and treating accessibility (WCAG&nbsp;2.1, enforced with jest-axe) as a
            baseline, not an afterthought.
          </p>
          <ul className="funfacts">
            {funFacts.map((f) => (
              <li key={f}>
                <span className="mk">▹</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
