/**
 * Shared pieces of the landing-page design system, so the inner pages
 * (category, learn) look and move like the home page.
 *
 *  - fonts + accent colour
 *  - <PageShell>      dark root wrapper + all global CSS (spotlight, rich text, ...)
 *  - <SiteNav>        the floating blurred pill navigation
 *  - <SplitTitle>     masked word-by-word headline (pairs with usePageMotion)
 *  - <Magnetic>       cursor-attracted wrapper for primary buttons
 *  - usePageMotion    hero reveal + [data-reveal] / [data-stagger] / [data-count]
 *  - useListMotion    re-staggers rows when a list changes (tab, page, level)
 *  - useModalBehavior Escape to close + body scroll lock
 */

import * as React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Menu, X } from "lucide-react";

export const display = Inter_Tight({ subsets: ["latin"], display: "swap" });
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});
export const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

export const ACCENT = "#D4FF4F";

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

export function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** Escape closes, and the page behind stops scrolling while `isOpen`. */
export function useModalBehavior(isOpen, onClose) {
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);
}

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

/**
 * The landing page's entrance choreography, scoped to `rootRef`:
 *   .hero-word  -> masked slide-up      .hero-fade -> fade + rise
 *   [data-reveal] / [data-stagger] -> scroll-triggered reveals
 *   [data-count] -> number count-up
 * Re-runs when `deps` change (e.g. navigating between topics).
 */
export function usePageMotion(rootRef, deps = []) {
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(rootRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".hero-word", { y: 0, duration: 1.2, stagger: 0.07 })
        .to(
          ".hero-fade",
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.8"
        );

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate: () => {
            el.textContent =
              Math.round(counter.v).toLocaleString("en-US") + suffix;
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Staggers every `[data-row]` inside `listRef` whenever `changeKey` changes.
 * This is the "answer to a click" motion: switching tab / level / page shows
 * what changed.
 */
export function useListMotion(listRef, changeKey) {
  useIsoLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = el.querySelectorAll("[data-row]");
      if (!rows.length) return;
      gsap.from(rows, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
        clearProps: "transform,opacity",
      });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeKey]);
}

export function Magnetic({ children, className = "" }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

/**
 * Headline split into masked words. Each word is `.hero-word`, which
 * usePageMotion slides up. Spaces stay real text nodes so lines wrap
 * normally and textContent is unchanged.
 */
export function SplitTitle({ text, accent = false }) {
  const words = String(text ?? "")
    .split(" ")
    .filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] pr-[0.05em] align-bottom">
            <span
              className={`hero-word inline-block ${
                accent
                  ? `${serif.className} font-normal tracking-[-0.02em] text-[#D4FF4F]`
                  : ""
              }`}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Shell + global CSS
// ---------------------------------------------------------------------------

export const PageShell = React.forwardRef(function PageShell(
  { children, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${display.className} landing relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-neutral-200 antialiased selection:bg-[#D4FF4F] selection:text-neutral-950 ${className}`}
    >
      {children}

      <style jsx global>{`
        html,
        body {
          background: #0a0a0a;
        }
        .landing .hero-word {
          transform: translateY(110%);
        }
        .landing .hero-fade {
          opacity: 0;
          transform: translateY(14px);
        }
        .landing .grid-bg {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(
            ellipse 70% 60% at 50% 40%,
            #000 30%,
            transparent 75%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 70% 60% at 50% 40%,
            #000 30%,
            transparent 75%
          );
        }
        .landing .spotlight::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s;
          background: radial-gradient(
            420px circle at var(--x, 50%) var(--y, 50%),
            rgba(212, 255, 79, 0.08),
            transparent 45%
          );
        }
        .landing .spotlight:hover::before {
          opacity: 1;
        }
        .landing .no-scrollbar {
          scrollbar-width: none;
        }
        .landing .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .landing .thin-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
        .landing .pulse-dot {
          box-shadow: 0 0 0 0 rgba(212, 255, 79, 0.6);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          70% {
            box-shadow: 0 0 0 8px rgba(212, 255, 79, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 255, 79, 0);
          }
        }

        /* ---- Rich text (answers, explanations, examples) on dark ---- */
        .landing .rich {
          color: #a3a3a3;
          overflow-wrap: anywhere;
        }
        .landing .rich h1,
        .landing .rich h2,
        .landing .rich h3,
        .landing .rich h4,
        .landing .rich h5 {
          color: #fafafa;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .landing .rich p,
        .landing .rich li,
        .landing .rich td,
        .landing .rich dd {
          color: #b4b4b4;
        }
        .landing .rich strong,
        .landing .rich b,
        .landing .rich th,
        .landing .rich dt {
          color: #f5f5f5;
        }
        .landing .rich a {
          color: #d4ff4f;
          text-decoration: underline;
          text-decoration-color: rgba(212, 255, 79, 0.35);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.3s;
        }
        .landing .rich a:hover {
          text-decoration-color: #d4ff4f;
        }
        .landing .rich ul > li::marker,
        .landing .rich ol > li::marker {
          color: #d4ff4f;
        }
        .landing .rich code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        .landing .rich :not(pre) > code {
          background: rgba(255, 255, 255, 0.07);
          color: #e5e5e5;
          padding: 0.15em 0.4em;
          border-radius: 6px;
          font-size: 0.88em;
          font-weight: 500;
        }
        .landing .rich :not(pre) > code::before,
        .landing .rich :not(pre) > code::after {
          content: none;
        }
        .landing .rich pre {
          background: #0d1117;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          overflow-x: auto;
        }
        .landing .rich pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
          color: inherit;
        }
        .landing .rich blockquote {
          border-left: 2px solid #d4ff4f;
          color: #d4d4d4;
          font-style: normal;
        }
        .landing .rich hr {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .landing .rich table {
          display: block;
          overflow-x: auto;
        }
        .landing .rich th,
        .landing .rich td {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .landing .rich img {
          border-radius: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .landing .hero-word,
          .landing .hero-fade {
            opacity: 1;
            transform: none;
          }
          .landing .pulse-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

function NavAction({ action, mobile, onDone }) {
  const Icon = action.icon;
  const base = mobile
    ? "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm"
    : "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm";
  const tone =
    action.active || action.primary
      ? "bg-[#D4FF4F] font-medium text-neutral-950"
      : mobile
        ? "border border-white/10 text-neutral-300"
        : "text-neutral-400 hover:text-neutral-50";
  const cls = `${base} ${tone} transition-colors`;
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <Link href={action.href} className={cls} onClick={onDone}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      aria-pressed={action.active}
      className={cls}
      onClick={() => {
        action.onClick?.();
        onDone?.();
      }}
    >
      {content}
    </button>
  );
}

/**
 * crumbs:  [{ label, href? }]  (last one is the current page)
 * actions: [{ key, label, icon, href | onClick, primary?, active? }]
 */
export function SiteNav({ crumbs = [], actions = [] }) {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ghost =
    "rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50";
  const solid =
    "rounded-lg bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-[#D4FF4F]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Primary"
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-500 ${
          scrolled || open
            ? "border-white/10 bg-neutral-950/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={close}>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4FF4F]">
                <span className={`${mono.className} text-[11px] font-bold text-neutral-950`}>
                  IN
                </span>
              </span>
              <span className="hidden text-[15px] font-semibold tracking-tight text-neutral-50 sm:block">
                Interview Nerd
              </span>
            </Link>

            {crumbs.length > 0 && (
              <ol className="hidden min-w-0 items-center gap-2 text-sm text-neutral-500 md:flex">
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-2">
                    <span className="text-neutral-700">/</span>
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-neutral-200">
                        {c.label}
                      </Link>
                    ) : (
                      <span
                        aria-current="page"
                        className="max-w-[16rem] truncate font-medium text-neutral-200"
                      >
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {actions.map((a) => (
              <NavAction key={a.key || a.label} action={a} />
            ))}
            <span className="mx-2 h-5 w-px bg-white/10" aria-hidden="true" />
            {session ? (
              <>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={ghost}
                >
                  Logout
                </button>
                <Link href="/dashboard" className={solid}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={ghost}>
                  Log in
                </Link>
                <Link href="/auth/signup" className={solid}>
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="-mr-2 rounded-lg p-2 text-neutral-300 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 px-4 pb-5 pt-4 md:hidden">
            {actions.length > 0 && (
              <div className="flex flex-col gap-2">
                {actions.map((a) => (
                  <NavAction key={a.key || a.label} action={a} mobile onDone={close} />
                ))}
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              {session ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      signOut({ callbackUrl: "/" });
                    }}
                    className="rounded-lg border border-white/10 py-2.5 text-sm text-neutral-300"
                  >
                    Logout
                  </button>
                  <Link
                    href="/dashboard"
                    onClick={close}
                    className="rounded-lg bg-neutral-50 py-2.5 text-center text-sm font-medium text-neutral-950"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={close}
                    className="rounded-lg border border-white/10 py-2.5 text-center text-sm text-neutral-300"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={close}
                    className="rounded-lg bg-neutral-50 py-2.5 text-center text-sm font-medium text-neutral-950"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}