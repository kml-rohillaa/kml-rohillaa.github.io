import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

/**
 * Reveal-on-scroll: adds `.in` once an element enters the viewport. A
 * MutationObserver also picks up `.reveal` elements added after mount (e.g. via
 * HMR or async content) so they can never get stuck invisible.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    if (reduce) {
      const markAll = () =>
        document
          .querySelectorAll<HTMLElement>(".reveal")
          .forEach((el) => el.classList.add("in"));
      markAll();
      const mo = new MutationObserver(markAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    const observe = (el: HTMLElement) => {
      if (!el.classList.contains("in")) io.observe(el);
    };

    document.querySelectorAll<HTMLElement>(".reveal").forEach(observe);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.classList.contains("reveal")) observe(node);
          node.querySelectorAll<HTMLElement>(".reveal").forEach(observe);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** Pointer-following ambient glow. */
export function usePointerGlow() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const glow = document.getElementById("glow");
    if (!glow) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
        raf = 0;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

/** Scroll progress bar width (0–100) + active section id. */
export function useScrollSpy(ids: string[]) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const scrollTop = h.scrollTop;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      // The last section may never reach the detection line, so when scrolled
      // to the bottom, force it active.
      if (max > 0 && scrollTop >= max - 2) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return { progress, active };
}

/**
 * Magnetic hover: elements marked `[data-magnetic]` drift toward the pointer
 * while hovered, then spring back on leave. Skipped for touch / reduced motion.
 */
export function useMagnetic() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")];
    const strength = 0.35;
    const cleanups = els.map((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

/**
 * Cursor spotlight: elements marked `[data-spotlight]` expose `--mx`/`--my`
 * CSS vars tracking the pointer, which a `::after` radial gradient renders.
 */
export function useSpotlight() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-spotlight]",
      );
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

/** True once the page is scrolled past `threshold` px. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * 3D tilt: elements marked `[data-tilt]` rotate toward the pointer and lift,
 * then ease back on leave. Skipped for touch / reduced motion.
 */
export function useTilt() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-tilt]")];
    const max = 9;
    const cleanups = els.map((el) => {
      const onEnter = () => {
        el.style.transition = "transform 0.12s var(--ease)";
      };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(600px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

