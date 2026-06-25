import { profile } from "../data";

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-box">
        <span className="eyebrow">Get in touch</span>
        <h2>
          What's next? Let's
          <br />
          build something — <a href={`mailto:${profile.email}`}>say hello</a>
        </h2>
        <p>
          Looking for a frontend engineer, have a question, or just want to connect? My inbox
          is always open — I reply within a day.
        </p>
        <div className="socials">
          {profile.socials.map((s) => (
            <a
              className="btn"
              key={s.label}
              href={s.href}
              {...(s.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {s.label}
              {s.external ? " ↗" : ""}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
