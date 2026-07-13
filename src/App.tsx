import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { navItems, profile } from "./data";
import { useTheme, useReveal, usePointerGlow, useScrollSpy } from "./hooks";

const NAV_IDS = navItems.map((n) => n.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const { progress, active } = useScrollSpy(NAV_IDS);
  useReveal();
  usePointerGlow();

  return (
    <>
      <div id="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div id="glow" aria-hidden="true" />

      <Nav active={active} theme={theme} onToggle={toggle} />

      <main className="wrap">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="wrap">
        <span>© 2026 {profile.name}</span>
        <span>
          Made with <span className="heart">❤</span> in India · React + Vite
        </span>
      </footer>
    </>
  );
}
