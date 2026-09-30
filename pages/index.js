import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import mongodb from "../images/mongodb.png";
import python from "../images/python1.png";
import redis from "../images/redis.png";
import nest from "../images/nest.png";
import docker from "../images/docker.png";
import js from "../images/js_logo.png";
import ts from "../images/ts.png";
import rabbitmq from "../images/rabitt.png";
import aws from "../images/aws.png";
import {
  ArrowRight,
  ArrowUpRight,
  Binary,
  Brain,
  ChevronDown,
  Cloud,
  Code,
  Code2,
  Container,
  Database,
  DatabaseZap,
  FileCode2,
  Menu,
  MonitorCog,
  Play,
  Quote,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";

const display = Inter_Tight({ subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

const ACCENT = "#D4FF4F";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "JavaScript Playground",
    href: "/playground",
    icon: Code,
    desc: "Run JS in the browser with real-time output and adaptive challenges.",
  },
  {
    name: "SQL Practice",
    href: "/sql-practice",
    icon: DatabaseZap,
    desc: "Write real queries against realistic datasets.",
  },
  {
    name: "MongoDB Practice",
    href: "/mongodb-practice",
    icon: Database,
    desc: "Queries and aggregation pipelines, hands-on.",
  },
  {
    name: "Python Practice",
    href: "/python-practice",
    icon: FileCode2,
    desc: "In-browser Python, beginner to advanced.",
  },
  {
    name: "Docker Practice",
    href: "/docker-practice",
    icon: Container,
    desc: "Write Dockerfiles and learn container concepts.",
  },
  {
    name: "Go Practice",
    href: "/go-practice",
    icon: Code2,
    desc: "Goroutines, channels and real interviewer questions.",
  },
  {
    name: "Linux Practice",
    href: "/linux-practice",
    icon: Terminal,
    desc: "Commands, permissions and shell scripting.",
  },
];

const TOPICS = [
  { name: "JavaScript", href: "/category/Javascript", img: js, count: "52", desc: "ES6+, async/await, closures, prototypes" },
  { name: "Next.js", href: "/category/Next", img: next, count: "64", desc: "Routing, SSR, API routes" },
  { name: "React", href: "/category/React", img: react, count: "40", desc: "Hooks, state, context, JSX" },
  { name: "Node.js", href: "/category/Node", img: node, count: "52", desc: "Express, async, event loop" },
  { name: "TypeScript", href: "/category/Typescript", img: ts, count: "30", desc: "Types, interfaces, generics" },
  { name: "SQL", href: "/category/SQL", icon: Database, count: "45", desc: "Queries, joins, indexing" },
  { name: "RabbitMQ", href: "/category/RabbitMQ", img: rabbitmq, count: "28", desc: "Queues, exchanges, routing" },
  { name: "OOP", href: "/category/OOP", icon: Code, count: "35", desc: "Inheritance, polymorphism, patterns" },
  { name: "Python", href: "/category/python", img: python, count: "15", desc: "Data structures, problem-solving" },
  { name: "Redis", href: "/category/redis", img: redis, count: "25", desc: "Caching, in-memory storage" },
  { name: "NestJS", href: "/category/nest", img: nest, count: "45", desc: "Modules, DI, backend architecture" },
  { name: "Docker", href: "/category/docker", img: docker, count: "20", desc: "Containers, orchestration, deploys" },
  { name: "Golang", href: "/category/go", text: "Go", count: "30+", desc: "Goroutines, channels, concurrency" },
  { name: "Linux", href: "/linux-practice", icon: Terminal, count: "32+", desc: "Commands, scripting, SSH, sysadmin" },
  { name: "DSA Sheet", href: "/category/dsa", icon: Binary, count: "32+", desc: "Data structures & algorithms" },
  { name: "AWS", href: "/aws", img: aws, count: "32+", desc: "Amazon Web Services" },
  { name: "AI", href: "/category/AI", icon: Brain, count: "25+", desc: "LLMs, prompting, ML concepts" },
];

const MCQS = [
  { name: "JavaScript", category: "Javascript", img: js, questions: 400, topics: "ES6+, async, closures" },
  { name: "TypeScript", category: "Typescript", img: ts, questions: 400, topics: "Types, interfaces, generics" },
  { name: "React", category: "React", img: react, questions: 348, topics: "Hooks, state, components" },
  { name: "Node.js", category: "Node", img: node, questions: 200, topics: "Express, APIs, middleware" },
  { name: "SQL", category: "SQL", icon: Database, questions: 400, topics: "Queries, joins, optimization" },
  { name: "MongoDB", category: "MongoDB", img: mongodb, questions: 400, topics: "Aggregation, queries, schema" },
  { name: "OOP", category: "OOP", icon: Code, questions: 400, topics: "Classes, inheritance, polymorphism" },
];

const ADVANCED = [
  { name: "System Design", href: "/components/SystemDesign", icon: MonitorCog, count: "+38", desc: "Scalability, architecture patterns and distributed systems" },
  { name: "Database Design", href: "/components/Database", icon: DatabaseZap, count: "+42", desc: "SQL, NoSQL, indexing and optimization strategies" },
  { name: "AWS", href: "/components/AWS", icon: Cloud, count: "+45", desc: "EC2, S3, Lambda, CloudFormation and more" },
  { name: "DevOps & CI/CD", href: "/components/DevOps", icon: Workflow, count: "+35", desc: "Docker, Kubernetes, Jenkins and deployment strategies" },
];

const STEPS = [
  { title: "Learn", desc: "Handpicked questions for every major stack, with clear, expert-written answers." },
  { title: "Practice", desc: "Seven live sandboxes. Write real code, run real queries, get instant feedback." },
  { title: "Test", desc: "2,500+ MCQs to pressure-test what you know before the interviewer does." },
  { title: "Track", desc: "Watch your progress, spot weak areas and keep your streak alive." },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Frontend Engineer", quote: "The questions are spot on and the explanations are super clear. Helped me land my dream job!" },
  { name: "Alex T.", role: "Full Stack Developer", quote: "I love the real-world scenarios. It's like practicing for the real thing!" },
  { name: "Samir K.", role: "Software Engineer", quote: "The progress tracking kept me motivated. Highly recommend!" },
];

const DAILY_QUESTIONS = [
  { topic: "React", href: "/category/React", q: "Why does React need a key on list items, and what breaks when you use the index?" },
  { topic: "JavaScript", href: "/category/Javascript", q: "What's the difference between == and ===, and is == ever the right choice?" },
  { topic: "Node.js", href: "/category/Node", q: "Walk through the phases of the Node.js event loop. Where do promise callbacks run?" },
  { topic: "SQL", href: "/category/SQL", q: "When can a LEFT JOIN return more rows than the left table has?" },
  { topic: "System Design", href: "/components/SystemDesign", q: "How would you design a URL shortener that handles 10k writes per second?" },
  { topic: "TypeScript", href: "/category/Typescript", q: "interface vs type: when does the difference actually matter?" },
  { topic: "Redis", href: "/category/redis", q: "How would you use Redis to rate-limit an API per user?" },
  { topic: "Docker", href: "/category/docker", q: "Why do layer order and .dockerignore matter for build speed?" },
  { topic: "Python", href: "/category/python", q: "List vs generator: what's the difference, and when does it matter?" },
  { topic: "Next.js", href: "/category/Next", q: "When would you choose SSR over static generation in Next.js?" },
  { topic: "Golang", href: "/category/go", q: "What happens when you send on an unbuffered channel with no receiver?" },
  { topic: "OOP", href: "/category/OOP", q: "Composition or inheritance: which do you reach for first, and why?" },
];

const HEADLINE = [
  [{ w: "Interview-ready," }],
  [{ w: "one" }, { w: "question", accent: true }],
  [{ w: "at" }, { w: "a" }, { w: "time." }],
];

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function HeroOrb({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const small = window.innerWidth < 768;

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch {
          return; // No WebGL: the hero still works without the orb.
        }
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 7;

        const group = new THREE.Group();
        scene.add(group);

        // Points on a Fibonacci sphere.
        const count = small ? 1400 : 2600;
        const positions = new Float32Array(count * 3);
        const rand = new Float32Array(count);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
          const y = 1 - (i / (count - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const theta = golden * i;
          positions[i * 3] = Math.cos(theta) * r * 1.6;
          positions[i * 3 + 1] = y * 1.6;
          positions[i * 3 + 2] = Math.sin(theta) * r * 1.6;
          rand[i] = Math.random();
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: pixelRatio },
            uBase: { value: new THREE.Color("#a3a3a3") },
            uGlow: { value: new THREE.Color(ACCENT) },
          },
          vertexShader: /* glsl */ `
            uniform float uTime;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vGlow;
            varying float vRand;
            void main() {
              vec3 n = normalize(position);
              vec3 dir = normalize(vec3(sin(uTime * 0.21), 0.55, cos(uTime * 0.17)));
              float wave = sin(dot(n, dir) * 7.0 - uTime * 1.6);
              float glow = smoothstep(0.72, 1.0, wave);
              vec3 p = position + n * (glow * 0.14 + aRand * 0.03);
              vGlow = glow;
              vRand = aRand;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = (12.0 + glow * 20.0) * uPixelRatio / -mv.z;
              gl_Position = projectionMatrix * mv;
            }
          `,
          fragmentShader: /* glsl */ `
            uniform vec3 uBase;
            uniform vec3 uGlow;
            varying float vGlow;
            varying float vRand;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              if (d > 0.5) discard;
              float a = smoothstep(0.5, 0.0, d);
              vec3 c = mix(uBase, uGlow, vGlow);
              gl_FragColor = vec4(c, a * (0.4 + vRand * 0.25 + vGlow * 0.6));
            }
          `,
        });
        group.add(new THREE.Points(geometry, material));

        // A thin orbit with a small satellite.
        const ringPts = [];
        for (let i = 0; i < 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          ringPts.push(new THREE.Vector3(Math.cos(a) * 2.35, 0, Math.sin(a) * 2.35));
        }
        const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
        const ringMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.1,
        });
        const orbit = new THREE.Group();
        orbit.rotation.set(1.15, 0, 0.35);
        orbit.add(new THREE.LineLoop(ringGeo, ringMat));
        const satGeo = new THREE.SphereGeometry(0.045, 16, 16);
        const satMat = new THREE.MeshBasicMaterial({ color: ACCENT });
        const satellite = new THREE.Mesh(satGeo, satMat);
        orbit.add(satellite);
        group.add(orbit);

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = mount;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(mount);

        const pointer = { x: 0, y: 0 };
        const onPointer = (e) => {
          pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
          pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });

        const startTime = performance.now();
        let raf = 0;
        let visible = true;
        const render = () => {
          const t = (performance.now() - startTime) / 1000;
          material.uniforms.uTime.value = t;
          group.rotation.y += (t * 0.08 + pointer.x * 0.35 - group.rotation.y) * 0.05;
          group.rotation.x += (pointer.y * 0.2 - group.rotation.x) * 0.05;
          satellite.position.set(Math.cos(t * 0.6) * 2.35, 0, Math.sin(t * 0.6) * 2.35);
          renderer.render(scene, camera);
        };
        const loop = () => {
          render();
          raf = requestAnimationFrame(loop);
        };
        const start = () => {
          if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
        };
        const stop = () => {
          cancelAnimationFrame(raf);
          raf = 0;
        };

        let io;
        const onVisibility = () => (document.hidden ? stop() : start());
        if (reduceMotion) {
          render();
        } else {
          io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            visible ? start() : stop();
          });
          io.observe(mount);
          document.addEventListener("visibilitychange", onVisibility);
          start();
        }

        cleanup = () => {
          stop();
          io?.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("pointermove", onPointer);
          geometry.dispose();
          material.dispose();
          ringGeo.dispose();
          ringMat.dispose();
          satGeo.dispose();
          satMat.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className={className} />;
}

function Magnetic({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
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

function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

function LogoChip({ item, size = 40 }) {
  const Icon = item.icon;
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl bg-neutral-100 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
      style={{ width: size, height: size }}
    >
      {item.img ? (
        <Image
          src={item.img}
          alt=""
          width={size * 0.6}
          height={size * 0.6}
          className="object-contain"
        />
      ) : Icon ? (
        <Icon className="text-neutral-900" style={{ width: size * 0.5, height: size * 0.5 }} />
      ) : (
        <span className="text-sm font-bold text-[#00ADD8]">{item.text}</span>
      )}
    </span>
  );
}

function SectionHeader({ index, label, title, children }) {
  return (
    <div data-reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className={`${mono.className} mb-4 text-xs uppercase tracking-[0.2em] text-neutral-500`}>
          <span className="text-[#D4FF4F]">{index}</span> / {label}
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-50 md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {children && (
        <p className="max-w-md text-base leading-relaxed text-neutral-400 md:col-span-5 md:justify-self-end">
          {children}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const { data: session } = useSession();
  const rootRef = useRef(null);
  const mcqSectionRef = useRef(null);
  const mcqViewportRef = useRef(null);
  const mcqTrackRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [daily, setDaily] = useState(null);

  // Pick the question of the day on the client so it follows the visitor's date.
  useEffect(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now - new Date(now.getFullYear(), 0, 0)) / 86400000
    );
    setDaily(DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length]);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(rootRef);

    // Pinned horizontal MCQ rail. Created first so triggers below it
    // are measured with the pin spacing in place.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = mcqTrackRef.current;
        const viewport = mcqViewportRef.current;
        const distance = () => {
          const cs = getComputedStyle(viewport);
          const inner =
            viewport.clientWidth -
            parseFloat(cs.paddingLeft) -
            parseFloat(cs.paddingRight);
          return Math.max(0, track.scrollWidth - inner);
        };
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: mcqSectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              gsap.set(".mcq-progress", { scaleX: self.progress }),
          },
        });
      }
    );

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".hero-word", { y: 0, duration: 1.2, stagger: 0.07 })
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=0.8");

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent =
              Math.round(counter.v).toLocaleString("en-US") + suffix;
          },
        });
      });

      gsap.to(".cta-glow", {
        scale: 1.25,
        opacity: 0.32,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div
      ref={rootRef}
      className={`${display.className} landing relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-neutral-200 antialiased selection:bg-[#D4FF4F] selection:text-neutral-950`}
    >
      <Head>
        <title>Interview Nerd | Master Tech Interviews</title>
      </Head>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation                                                          */}
      {/* ------------------------------------------------------------------ */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
        <nav
          className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-500 ${
            scrolled || isMobileMenuOpen
              ? "border-white/10 bg-neutral-950/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="flex h-14 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4FF4F]">
                <span className={`${mono.className} text-[11px] font-bold text-neutral-950`}>
                  IN
                </span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-neutral-50">
                Interview Nerd
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <div
                className="relative"
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <button
                  onClick={() => setIsToolsOpen((o) => !o)}
                  aria-expanded={isToolsOpen}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
                >
                  Practice
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${isToolsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute left-1/2 top-full w-[460px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                    isToolsOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl">
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-[#D4FF4F]" />
                          <span>
                            <span className="block text-sm font-medium text-neutral-100">
                              {tool.name}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-neutral-500">
                              {tool.desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <a href="#categories" className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50">
                Topics
              </a>
              <a href="#mcq" className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50">
                MCQs
              </a>
              <Link href="/resources" className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50">
                Resources
              </Link>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {session ? (
                <>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
                  >
                    Logout
                  </button>
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-[#D4FF4F]"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-50">
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-lg bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-[#D4FF4F]"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="-mr-2 rounded-lg p-2 text-neutral-300 md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 px-4 pb-5 pt-4 md:hidden">
              <p className={`${mono.className} mb-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500`}>
                Practice
              </p>
              <div className="grid grid-cols-2 gap-1">
                {TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={closeMenu}
                      className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-neutral-300 hover:bg-white/5"
                    >
                      <Icon className="h-4 w-4 text-neutral-500" />
                      {tool.name.replace(" Practice", "").replace(" Playground", "")}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-col border-t border-white/10 pt-3">
                <a href="#categories" onClick={closeMenu} className="py-2.5 text-sm text-neutral-300">Topics</a>
                <a href="#mcq" onClick={closeMenu} className="py-2.5 text-sm text-neutral-300">MCQs</a>
                <Link href="/resources" onClick={closeMenu} className="py-2.5 text-sm text-neutral-300">Resources</Link>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                {session ? (
                  <>
                    <button
                      onClick={() => {
                        closeMenu();
                        signOut({ callbackUrl: "/" });
                      }}
                      className="rounded-lg border border-white/10 py-2.5 text-sm text-neutral-300"
                    >
                      Logout
                    </button>
                    <Link href="/dashboard" onClick={closeMenu} className="rounded-lg bg-neutral-50 py-2.5 text-center text-sm font-medium text-neutral-950">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={closeMenu} className="rounded-lg border border-white/10 py-2.5 text-center text-sm text-neutral-300">
                      Log in
                    </Link>
                    <Link href="/auth/signup" onClick={closeMenu} className="rounded-lg bg-neutral-50 py-2.5 text-center text-sm font-medium text-neutral-950">
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <HeroOrb className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 opacity-60 md:left-auto md:right-[-8%] md:top-1/2 md:h-[min(62vw,760px)] md:w-[min(62vw,760px)] md:-translate-y-1/2 md:translate-x-0 md:opacity-100" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Link
              href="/linux-practice"
              className="hero-fade group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <span className="rounded-full bg-[#D4FF4F] px-2 py-0.5 font-medium text-neutral-950">
                New
              </span>
              Go &amp; Linux sandboxes are live
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em]">
                  {line.map(({ w, accent }, j) => (
                    <span
                      key={j}
                      className={`hero-word inline-block ${
                        accent ? `${serif.className} font-normal tracking-[-0.02em] text-[#D4FF4F]` : ""
                      }`}
                    >
                      {w}
                      {j < line.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
              500+ curated questions, 2,500+ MCQs and seven live coding
              sandboxes across every stack interviewers actually ask about.
            </p>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/category/Javascript"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_40px_-6px_rgba(212,255,79,0.6)]"
                >
                  Start practicing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Explore topics
              </a>
            </div>

            {/* Question of the day */}
            <Link
              href={daily?.href || "/category/Javascript"}
              className={`hero-fade group mt-14 block max-w-md rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-md transition-colors hover:border-white/20`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className={`${mono.className} flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500`}>
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#D4FF4F]" />
                  Question of the day
                </span>
                <span className="text-xs text-neutral-500">{daily?.topic}</span>
              </div>
              <p
                className={`min-h-[3.25rem] text-[15px] leading-relaxed text-neutral-100 transition-opacity duration-500 ${
                  daily ? "opacity-100" : "opacity-0"
                }`}
              >
                {daily?.q || DAILY_QUESTIONS[0].q}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors group-hover:text-[#D4FF4F]">
                Answer it
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Logo marquee                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section aria-label="Covered technologies" className="border-y border-white/[0.06] py-8">
          <div className="marquee relative overflow-hidden">
            <div className="marquee-track flex w-max gap-12">
              {[...TOPICS, ...TOPICS].map((t, i) => (
                <Link
                  key={`${t.name}-${i}`}
                  href={t.href}
                  aria-hidden={i >= TOPICS.length}
                  tabIndex={i >= TOPICS.length ? -1 : undefined}
                  className="flex items-center gap-3 text-neutral-500 transition-colors hover:text-neutral-100"
                >
                  <span className="opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                    <LogoChip item={t} size={28} />
                  </span>
                  <span className="whitespace-nowrap text-lg font-medium tracking-tight">
                    {t.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Stats                                                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <dl data-stagger className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {[
              { value: 500, suffix: "+", label: "Interview questions" },
              { value: 2500, suffix: "+", label: "Multiple-choice questions" },
              { value: 7, suffix: "", label: "Live coding sandboxes" },
              { value: TOPICS.length, suffix: "", label: "Topics covered" },
            ].map((s) => (
              <div key={s.label} className="border-l border-white/10 pl-5">
                <dd
                  data-count={s.value}
                  data-suffix={s.suffix}
                  className="text-4xl font-semibold tracking-tight text-neutral-50 md:text-5xl"
                >
                  {s.value.toLocaleString("en-US")}
                  {s.suffix}
                </dd>
                <dt className="mt-2 text-sm text-neutral-500">{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Practice bento                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section id="practice" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeader index="01" label="Practice" title={<>Don&apos;t just read it. <span className="text-neutral-500">Run it.</span></>}>
            Seven in-browser sandboxes with real execution and instant feedback.
            No setup, no installs.
          </SectionHeader>

          <div data-stagger className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              const layout =
                i === 0
                  ? "sm:col-span-2 lg:row-span-2"
                  : i === 1 || i === 6
                    ? "sm:col-span-2"
                    : "";
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onMouseMove={trackSpotlight}
                  className={`spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/20 ${layout}`}
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-neutral-300 transition-colors group-hover:text-[#D4FF4F]" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                  </div>

                  {i === 0 && (
                    <div className={`${mono.className} relative z-10 mt-6 flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 text-[13px] leading-6`}>
                      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <span className="ml-3 text-xs text-neutral-500">closure.js</span>
                      </div>
                      <pre className="overflow-x-auto px-4 py-3 text-neutral-400">
{`function counter() {
  let n = 0;
  return () => ++n;
}

const next = counter();
next(); next();
console.log(`}<span className="text-[#D4FF4F]">next()</span>{`);`}
                      </pre>
                      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5">
                        <span className="text-neutral-500">
                          <span className="text-neutral-600">›</span> 3
                        </span>
                        <span className="flex items-center gap-1.5 rounded-md bg-[#D4FF4F] px-2 py-0.5 text-xs font-semibold text-neutral-950">
                          <Play className="h-3 w-3 fill-current" /> Run
                        </span>
                      </div>
                    </div>
                  )}

                  {i === 1 && (
                    <pre className={`${mono.className} relative z-10 mt-5 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/30 px-4 py-3 text-[12.5px] leading-6 text-neutral-400`}>
                      <span className="text-[#D4FF4F]">SELECT</span> name, COUNT(*) <span className="text-[#D4FF4F]">FROM</span> orders{"\n"}
                      <span className="text-[#D4FF4F]">GROUP BY</span> name <span className="text-[#D4FF4F]">HAVING</span> COUNT(*) &gt; 5;
                    </pre>
                  )}

                  {i === 6 && (
                    <div className={`${mono.className} relative z-10 mt-5 rounded-lg border border-white/[0.06] bg-black/30 px-4 py-3 text-[12.5px] leading-6 text-neutral-400`}>
                      <span className="text-[#D4FF4F]">~$</span> chmod 755 deploy.sh
                      <br />
                      <span className="text-[#D4FF4F]">~$</span> <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-neutral-300" />
                    </div>
                  )}

                  <div className="relative z-10 mt-auto pt-6">
                    <h3 className="text-lg font-semibold tracking-tight text-neutral-50">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Topics                                                            */}
        {/* ---------------------------------------------------------------- */}
        <section id="categories" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeader index="02" label="Topics" title="Pick a stack. Go deep.">
            Curated, interview-grade questions with clear explanations for
            every major language, framework and tool.
          </SectionHeader>

          <div
            data-reveal
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
          >
            {TOPICS.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="group flex items-center gap-4 bg-[#0A0A0A] p-5 transition-colors duration-300 hover:bg-neutral-900"
              >
                <LogoChip item={t} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-medium text-neutral-100">{t.name}</h3>
                    <span className={`${mono.className} text-xs text-neutral-500`}>
                      {t.count}
                    </span>
                  </div>
                  <p className="truncate text-sm text-neutral-500">{t.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-2 text-[#D4FF4F] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
            {/* Fill the last row so the grid lines stay even. */}
            <div className="hidden bg-[#0A0A0A] sm:block" />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* MCQ rail (pinned horizontal scroll on desktop)                    */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="mcq"
          ref={mcqSectionRef}
          className="relative overflow-hidden py-24 lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <SectionHeader index="03" label="Test yourself" title={<>2,500+ MCQs. <span className="text-neutral-500">Zero guesswork.</span></>}>
              Timed multiple-choice tests that show exactly where you stand,
              before the interviewer does.
            </SectionHeader>
          </div>

          <div
            ref={mcqViewportRef}
            className="no-scrollbar mx-auto w-full max-w-6xl snap-x snap-mandatory overflow-x-auto px-4 sm:px-6 lg:snap-none lg:overflow-visible"
          >
            <div ref={mcqTrackRef} className="flex w-max gap-4 pb-2">
              {MCQS.map((m, i) => (
                <Link
                  key={m.category}
                  href={`/practice-mcq/${m.category}`}
                  onMouseMove={trackSpotlight}
                  className="spotlight group relative flex h-[300px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/20 sm:w-[340px]"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <LogoChip item={m} size={44} />
                    <span className={`${mono.className} text-xs text-neutral-600`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <p className="text-5xl font-semibold tracking-tight text-neutral-50">
                      {m.questions}
                      <span className="ml-1 text-base font-normal text-neutral-500">MCQs</span>
                    </p>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-100">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{m.topics}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors group-hover:text-[#D4FF4F]">
                      Start test <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 hidden w-full max-w-6xl px-6 lg:block">
            <div className="h-px w-full bg-white/10">
              <div className="mcq-progress h-px origin-left scale-x-0 bg-[#D4FF4F]" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Advanced topics                                                   */}
        {/* ---------------------------------------------------------------- */}
        <section id="advanced" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeader index="04" label="Go further" title="The rounds that decide senior offers.">
            System design, databases, cloud and DevOps: the conversations that
            separate a good answer from a great one.
          </SectionHeader>

          <div data-stagger className="border-t border-white/[0.08]">
            {ADVANCED.map((a, i) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/[0.08] py-7 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <span className={`${mono.className} relative text-sm text-neutral-600 transition-colors group-hover:text-[#D4FF4F]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex items-center gap-4">
                    <Icon className="hidden h-5 w-5 text-neutral-500 transition-colors group-hover:text-neutral-100 md:block" />
                    <span className="text-2xl font-semibold tracking-tight text-neutral-100 transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {a.name}
                    </span>
                  </span>
                  <span className="relative hidden text-sm leading-relaxed text-neutral-500 md:block">
                    {a.desc}
                  </span>
                  <span className="relative flex items-center gap-4">
                    <span className={`${mono.className} text-sm text-neutral-500`}>{a.count}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#D4FF4F] group-hover:bg-[#D4FF4F]">
                      <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-neutral-950" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* How it works                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeader index="05" label="How it works" title="A loop that compounds." />
          <ol data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/[0.08] p-6">
                <span className={`${mono.className} text-xs text-[#D4FF4F]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-neutral-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Testimonials                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeader index="06" label="Voices" title="Developers who got the offer." />
          <div data-stagger className="grid gap-3 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
                <Quote className="h-5 w-5 text-[#D4FF4F]" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-neutral-200">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-neutral-300">
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .replace(".", "")}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-neutral-100">{t.name}</span>
                    <span className="block text-xs text-neutral-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-4 py-24 sm:px-6">
          <div
            data-reveal
            className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/[0.08] px-6 py-20 text-center md:py-28"
          >
            <div
              className="cta-glow pointer-events-none absolute left-1/2 top-full h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4FF4F] blur-[140px]"
              style={{ opacity: 0.18 }}
              aria-hidden="true"
            />
            <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <Sparkles className="mx-auto h-6 w-6 text-[#D4FF4F]" />
              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-50 md:text-6xl">
                Your next offer starts with{" "}
                <span className={`${serif.className} font-normal text-[#D4FF4F]`}>
                  today&apos;s
                </span>{" "}
                question.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-neutral-400">
                Fifteen minutes a day. Come back tomorrow for a new one.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <Link
                    href={session ? "/dashboard" : "/auth/signup"}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#D4FF4F] px-7 py-4 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_40px_-6px_rgba(212,255,79,0.6)]"
                  >
                    {session ? "Go to dashboard" : "Create a free account"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
                >
                  Browse topics
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4FF4F]">
                <span className={`${mono.className} text-[11px] font-bold text-neutral-950`}>IN</span>
              </span>
              <span className="font-semibold tracking-tight text-neutral-50">Interview Nerd</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Curated questions, live sandboxes and MCQs to help you walk into
              every technical interview ready.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h3 className={`${mono.className} text-[11px] uppercase tracking-[0.2em] text-neutral-500`}>Practice</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {TOOLS.slice(0, 5).map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="text-neutral-400 transition-colors hover:text-neutral-50">
                      {t.name.replace(" Practice", "").replace(" Playground", "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`${mono.className} text-[11px] uppercase tracking-[0.2em] text-neutral-500`}>Topics</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {TOPICS.slice(0, 5).map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="text-neutral-400 transition-colors hover:text-neutral-50">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`${mono.className} text-[11px] uppercase tracking-[0.2em] text-neutral-500`}>Platform</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/resources" className="text-neutral-400 transition-colors hover:text-neutral-50">Resources</Link></li>
                <li><a href="#mcq" className="text-neutral-400 transition-colors hover:text-neutral-50">MCQ tests</a></li>
                <li><Link href="/dashboard" className="text-neutral-400 transition-colors hover:text-neutral-50">Dashboard</Link></li>
                <li><Link href="/auth/login" className="text-neutral-400 transition-colors hover:text-neutral-50">Log in</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/[0.06] px-4 py-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>&copy; {new Date().getFullYear()} Interview Nerd. All rights reserved.</p>
          <p className={mono.className}>Built for developers, by developers.</p>
        </div>
      </footer>

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
          background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
        }
        .landing .spotlight::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
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
        .landing .marquee {
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .landing .marquee-track {
          animation: marquee 50s linear infinite;
        }
        .landing .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          to {
            transform: translateX(calc(-50% - 1.5rem));
          }
        }
        .landing .no-scrollbar {
          scrollbar-width: none;
        }
        .landing .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .landing .cursor-blink {
          animation: blink 1.1s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
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
        @media (prefers-reduced-motion: reduce) {
          .landing .hero-word,
          .landing .hero-fade {
            opacity: 1;
            transform: none;
          }
          .landing .marquee-track,
          .landing .pulse-dot,
          .landing .cursor-blink {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
