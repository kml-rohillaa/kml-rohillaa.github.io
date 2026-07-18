import { useState, type FormEvent, type ReactElement } from "react";
import { profile } from "../data";

/**
 * Set this to your Formspree form endpoint (https://formspree.io/f/xxxxxxx)
 * to receive submissions by email. Until then the form falls back to opening
 * the visitor's mail client with the message pre-filled.
 */
const CONTACT_ENDPOINT = "https://formspree.io/f/your_form_id";
const usingFormspree = !CONTACT_ENDPOINT.includes("your_form_id");

type Status = "idle" | "submitting" | "success" | "error";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m8 6-6 6 6 6" />
    <path d="m16 6 6 6-6 6" />
  </svg>
);

const iconFor: Record<string, () => ReactElement> = {
  Email: MailIcon,
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: CodeIcon,
};

const displayValue = (label: string, href: string) => {
  if (label === "Email") return profile.email;
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
};

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!usingFormspree) {
      const subject = encodeURIComponent(
        (data.get("subject") as string) || "Hello from your portfolio",
      );
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact">
      <div className="sec-head">
        <span className="eyebrow">Get in touch</span>
        <h2 className="title">Send me a message</h2>
        <p className="sub">
          Have a role, a project, or just want to say hi? Drop me a line — my inbox is always
          open and I reply within a day.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-aside reveal">
          <h3 className="contact-h3">Contact information</h3>
          <p className="contact-lead">
            Feel free to reach out through any of the following. I'm always interested in
            hearing about new projects and opportunities.
          </p>
          <div className="cinfo">
            {profile.socials.map((s) => {
              const Icon = iconFor[s.label] ?? MailIcon;
              return (
                <a
                  className="cinfo-row"
                  data-spotlight
                  key={s.label}
                  href={s.href}
                  {...(s.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="cinfo-ic" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="cinfo-text">
                    <span className="lbl">{s.label}</span>
                    <span className="val">{displayValue(s.label, s.href)}</span>
                  </span>
                </a>
              );
            })}
          </div>
          <div className="avail">
            <span className="pulse" aria-hidden="true" /> {profile.location} · Available for
            new roles &amp; projects
          </div>
        </div>

        <div className="contact-form-card reveal" data-spotlight>
          <h3 className="contact-h3">Send me a message</h3>
          {status === "success" ? (
            <div className="form-success" role="status">
              <span className="fs-check" aria-hidden="true">
                ✓
              </span>
              <b>Message sent successfully!</b>
              <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" placeholder="Your email" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="cf-subject">Subject</label>
                <input id="cf-subject" name="subject" type="text" placeholder="Subject" />
              </div>
              <div className="field">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" placeholder="Your message" required />
              </div>
              {status === "error" && (
                <p className="form-error" role="alert">
                  Something went wrong. Please email me directly at {profile.email}.
                </p>
              )}
              <button
                className="btn primary"
                type="submit"
                data-magnetic
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  "Sending…"
                ) : (
                  <>
                    Send message <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
