export const profile = {
  name: "Kamal Rohilla",
  brand: "Kamal",
  email: "kmlrohilla7065130@gmail.com",
  location: "New Delhi, India",
  cv: "Kamal_Rohilla_CV.pdf",
  photo: "assets/kamal.jpg",
  socials: [
    { label: "Email", href: "mailto:kmlrohilla7065130@gmail.com", external: false },
    { label: "GitHub", href: "https://github.com/kml-rohillaa", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kamal-rohilla-b03aa21ba/", external: true },
    { label: "LeetCode", href: "https://leetcode.com/u/kmlrohilla7065130/", external: true },
  ],
};

export const stats = [
  { value: "4+ yrs", label: "React & TypeScript" },
  { value: "4.4/5", label: "CSAT · 1,000+ bookings" },
  { value: "2 pkgs", label: "published to npm" },
];

const ICON = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;

export type Skill = { name: string; icon?: string; invert?: boolean; node?: boolean };

export const skills: Skill[] = [
  { name: "TypeScript", icon: ICON("typescript/typescript-original") },
  { name: "JavaScript", icon: ICON("javascript/javascript-original") },
  { name: "React", icon: ICON("react/react-original") },
  { name: "Next.js", icon: ICON("nextjs/nextjs-original"), invert: true },
  { name: "Redux", icon: ICON("redux/redux-original") },
  { name: "MUI", icon: ICON("materialui/materialui-original") },
  { name: "Tailwind", icon: ICON("tailwindcss/tailwindcss-original") },
  { name: "Sass", icon: ICON("sass/sass-original") },
  { name: "HTML5", icon: ICON("html5/html5-original") },
  { name: "Node.js", icon: ICON("nodejs/nodejs-original") },
  { name: "Jest", icon: ICON("jest/jest-plain") },
  { name: "Webpack", icon: ICON("webpack/webpack-original") },
  { name: "Vite", icon: ICON("vitejs/vitejs-original") },
  { name: "Git", icon: ICON("git/git-original") },
  { name: "Figma", icon: ICON("figma/figma-original") },
  { name: "Browser APIs", node: true },
];

export const experience = [
  {
    badge: "VI",
    role: "Frontend Web Engineer",
    company: "Virtual Internships",
    companyHref: "https://web.virtualinternships.com/",
    when: "Dec 2023 — Present",
    location: "London, UK (remote)",
    bullets: [
      "Architected the <b>interview scheduling system</b> end-to-end — custom React Big Calendar wrapper, constraint-based booking, and hardened Google Calendar OAuth sync; 4.4/5 across 1,000+ bookings.",
      "Designed and published <b>two shared npm packages</b> with Rollup + semantic versioning, consumed across the customer app and admin console; authored the shared Typography variant system.",
      "Built the <b>internship assessment platform</b> and <b>AI-powered offer creation</b> end-to-end; shipped the cross-app certificate system with role-based issue/revoke gating.",
      "Led the platform-wide <b>EUI / Ant Design → MUI 5 migration</b> — a unified filter system across 10+ pages and an in-house data table replacing a third-party grid.",
    ],
  },
  {
    badge: "H",
    role: "Software Development Engineer I",
    company: "Housing.com",
    companyHref: "https://housing.com/",
    when: "Jun 2022 — Aug 2023",
    location: "Gurugram, India",
    bullets: [
      "Led the complete <b>owner-side dashboard revamp</b>, driving a 20% increase in user interactions through redesigned IA and CTA hierarchy.",
      "Built a <b>Package Pricing Overlay</b> that drove a 30% lift in CTA conversions and reached 100% rollout within one month.",
      "Owned the <b>A/B testing program across 8 features</b> — designed variants, analysed behavioural data, and optimised key user flows.",
    ],
  },
  {
    badge: "DTU",
    role: "B.Tech, Computer Science",
    company: "Delhi Technological University",
    companyHref: "https://www.dtu.ac.in/",
    when: "2018 — 2022",
    location: "Delhi, India · GPA 8.76/10",
    bullets: [],
  },
];

export type Project = {
  name: string;
  tagline: string;
  tags: string[];
  highlights: string[];
  live?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    name: "Flux — Local-First Kanban Board",
    tagline:
      "A Linear/Jira-style board that runs entirely in the browser — no backend, real-time across tabs.",
    tags: ["React 18", "TypeScript", "Zustand", "@dnd-kit", "IndexedDB", "Vite"],
    highlights: [
      "<b>Drag-and-drop</b> board (cards across columns + column reordering) with keyboard support, built on @dnd-kit with a custom collision detector.",
      "<b>Local-first</b> with optimistic updates and full <b>offline mode</b> — IndexedDB persistence and an offline op-queue that flushes on reconnect.",
      "<b>Real-time collaboration</b> across browser tabs via BroadcastChannel — live presence, shared activity history, and notifications.",
      "Command palette, keyboard shortcuts, filters/search, labels, and per-user light/dark theming; shipped to Vercel + GitHub Pages via CI.",
    ],
    live: "https://kamal-rohilla-kanban-board.vercel.app",
    code: "https://github.com/Kamal77-coder/kanban-board",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
