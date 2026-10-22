import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import {
  ArrowLeft,
  BookCheck,
  BookOpenCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code,
  Hash,
  Lightbulb,
  Network,
  Search,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { interviewData } from "@/data/interviewData";
import { prepareData } from "@/data/prepareData";
import { linuxPrepareData } from "@/data/linuxPrepareData";
import { awsServiceCategories } from "@/data/awsServices";
import { getThemeColors } from "@/lib/themeUtils";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import XPNotification from "@/components/gamification/XPNotification";
import MCQDailyChallenge from "@/components/gamification/MCQDailyChallenge";
import QuestionFeedback from "@/components/questions/QuestionFeedback";
import { useGamification } from "@/hooks/useGamification";
import DiagramCanvas from "@/components/DiagramCanvas";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  mono,
  trackSpotlight,
  usePageMotion,
  useListMotion,
  useModalBehavior,
} from "@/components/landing/shared";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function getStaticPaths() {
  const topics = [
    "Javascript",
    "React",
    "Node",
    "Typescript",
    "AWS S3",
    "Next",
    "SQL",
    "RabbitMQ",
    "OOP",
    "python",
    "redis",
    "nest",
    "docker",
    "linux",
    "go",
    "dsa",
    "AI",
  ];
  // One category page per AWS service (data/aws/*.js)
  const awsTopics = awsServiceCategories.map((item) => item.category);
  const paths = [...topics, ...awsTopics].map((topic) => ({
    params: { slug: topic },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // The old combined "aws" category is now a service picker at /aws
  if (slug === "aws") {
    return { redirect: { destination: "/aws", permanent: false } };
  }
  // linux and the AWS services live in their own data files to keep them
  // independent of the very large prepareData bundle (8MB static-props limit)
  const topicPrepareData =
    slug === "linux"
      ? linuxPrepareData
      : awsServiceCategories.find((item) => item.category === slug) ||
      prepareData.find((item) => item.category === slug);
  const topicInterviewData = interviewData.filter(
    (item) => item.topic === slug,
  );

  return {
    props: {
      topicPrepareData: topicPrepareData || null,
      topicInterviewData: topicInterviewData || [],
      topic: slug,
    },
    revalidate: 216000,
  };
}

// ---------------------------------------------------------------------------
// Constants + helpers
// ---------------------------------------------------------------------------

const ITEMS_PER_PAGE = 15;

const TITLES = {
  dsa: "DSA",
  go: "Golang",
  nest: "NestJS",
  redis: "Redis",
  docker: "Docker",
  python: "Python",
  linux: "Linux",
  Next: "Next.js",
  Node: "Node.js",
  Javascript: "JavaScript",
  Typescript: "TypeScript",
};
const prettyTitle = (topic) =>
  TITLES[topic] || topic.charAt(0).toUpperCase() + topic.slice(1);

const getConceptKey = (t, concept) => `${t}__${concept}`;

const paginate = (items, page) =>
  items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
const totalPagesFor = (n) => Math.ceil(n / ITEMS_PER_PAGE);

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5";
const pillPrimary =
  "inline-flex items-center gap-1.5 rounded-full bg-[#D4FF4F] px-3.5 py-1.5 text-xs font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]";

/**
 * Normalises `concept.examples` from prepareData into a single renderable shape.
 *
 * prepareData is inconsistent - three real shapes exist in the file, plus junk:
 *   1. "code string"                        -> the vast majority (~1616 entries)
 *   2. { language, snippet }                -> a couple of OOP/python entries
 *   3. { 0: { questions, explanation }, 1: {...} }  -> indexed object, HTML body
 *   4. {}                                   -> ~50 empty objects (React "Question Set")
 *
 * Returns [{ title?, language?, code?, html? }]. Empty objects and blank
 * strings are dropped, so `length === 0` reliably means "no example to show"
 * and the button can be hidden entirely.
 */
function normalizeExamples(concept) {
  const raw = concept?.examples;
  if (!Array.isArray(raw)) return [];

  const out = [];
  for (const item of raw) {
    if (typeof item === "string") {
      if (item.trim()) out.push({ code: item });
      continue;
    }
    if (!item || typeof item !== "object") continue;

    // Shape 2: { language, snippet }
    if (typeof item.snippet === "string") {
      if (item.snippet.trim()) {
        out.push({ language: item.language, code: item.snippet });
      }
      continue;
    }

    // Shape 3: indexed object of { questions, explanation }.
    // Object.values({}) is [] so shape 4 (junk) falls out here for free.
    for (const value of Object.values(item)) {
      if (!value || typeof value !== "object") continue;
      const title =
        typeof value.questions === "string" ? value.questions : undefined;
      const html =
        typeof value.explanation === "string" ? value.explanation : undefined;
      if (title || html) out.push({ title, html });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function Segmented({ options, value, onChange, label, className = "" }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 ${className}`}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${active
                ? "bg-[#D4FF4F] text-neutral-950"
                : "text-neutral-400 hover:text-neutral-100"
              }`}
          >
            {o.label}
            {o.count != null && (
              <span
                className={`${mono.className} text-[11px] ${active ? "text-neutral-950/60" : "text-neutral-600"
                  }`}
              >
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push("...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, "...");
    for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, "...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("...", totalPages);
  }

  const arrow =
    "flex h-10 items-center gap-1 rounded-full px-3 text-sm text-neutral-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrow}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="mx-1 flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="px-2 text-neutral-600">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`${mono.className} h-10 min-w-[40px] rounded-full px-3 text-sm transition-colors duration-300 ${p === currentPage
                  ? "bg-[#D4FF4F] font-semibold text-neutral-950"
                  : "text-neutral-400 hover:bg-white/5 hover:text-neutral-100"
                }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrow}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function ConceptRow({
  concept,
  number,
  topic,
  showCheck,
  checked,
  onToggle,
  onOpenExample,
}) {
  const examples = React.useMemo(() => normalizeExamples(concept), [concept]);
  const suffix = `${encodeURIComponent(topic)}/${encodeURIComponent(
    concept.topic,
  )}`;
  const learnHref = `/learn/${suffix}`;
  const testHref = `/test/${suffix}`;

  return (
    <li
      data-row
      onMouseMove={trackSpotlight}
      className="spotlight group relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col gap-3 px-4 py-4 sm:px-5 md:flex-row md:items-center md:gap-5">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {showCheck && (
            <Checkbox
              className="h-5 w-5 shrink-0 rounded-md border-white/25 data-[state=checked]:border-[#D4FF4F] data-[state=checked]:bg-[#D4FF4F] data-[state=checked]:text-neutral-950"
              checked={checked}
              onCheckedChange={() => onToggle(concept)}
              aria-label={`Mark "${concept.topic}" as learned`}
            />
          )}
          <span
            className={`${mono.className} hidden w-7 shrink-0 text-xs text-neutral-600 transition-colors group-hover:text-[#D4FF4F] sm:block`}
          >
            {String(number).padStart(2, "0")}
          </span>
          <Link
            href={learnHref}
            prefetch={false}
            className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-neutral-100 transition-transform duration-500 group-hover:translate-x-1"
          >
            {concept.topic}
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 pl-0 md:justify-end">
          <Link href={learnHref} prefetch={false} className={pillPrimary}>
            <BookOpenCheck className="h-3.5 w-3.5" />
            Learn
          </Link>
          <Link href={testHref} prefetch={false} className={pill}>
            <Code className="h-3.5 w-3.5" />
            Practice
          </Link>
          {examples.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenExample(concept, examples)}
              className={pill}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              Example
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function AccordionQuestion({ question, number }) {
  const [open, setOpen] = React.useState(false);
  // Mount the answer (and its feedback widget) only once it has been opened.
  const [everOpened, setEverOpened] = React.useState(false);

  const toggle = () => {
    setOpen((o) => !o);
    setEverOpened(true);
  };

  return (
    <li
      data-row
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors hover:border-white/20"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <span
          className={`${mono.className} mt-0.5 hidden w-7 shrink-0 text-xs text-neutral-600 sm:block`}
        >
          {String(number).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium leading-relaxed text-neutral-100">
            {question.question}
          </span>
          {question.tags && question.tags.length > 0 && (
            <span className="mt-2.5 flex flex-wrap gap-1.5">
              {question.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className={`${mono.className} inline-flex items-center rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-neutral-400`}
                >
                  <Hash className="mr-0.5 h-3 w-3 text-[#D4FF4F]" />
                  {tag.name}
                </span>
              ))}
            </span>
          )}
        </span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-500 ${open ? "rotate-180 text-[#D4FF4F]" : ""
            }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          {everOpened && (
            <div className="border-t border-white/[0.06] px-5 pb-5 pt-5 sm:pl-16">
              {question.solution ? (
                <>
                  <div
                    className="rich prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(question.solution),
                    }}
                  />
                  <QuestionFeedback
                    questionId={question.id || question._id}
                    className="mt-5 border-t border-white/[0.06] pt-4"
                  />
                </>
              ) : (
                <p className="text-sm italic text-neutral-500">
                  Answer not available yet. This question is under development.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/** Backdrop + dialog used by the example and diagram modals. */
function ModalFrame({ isOpen, onClose, label, className = "max-w-4xl", children }) {
  useModalBehavior(isOpen, onClose);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/60 ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalHeader({ eyebrow, title, onClose, closeLabel }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
      <div className="min-w-0">
        {eyebrow && (
          <p className={`${mono.className} mb-1 text-[11px] uppercase tracking-[0.18em] text-[#D4FF4F]`}>
            {eyebrow}
          </p>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-neutral-50">
          {title}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="shrink-0 rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-white/30 hover:text-neutral-50"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ExampleModal({ isOpen, onClose, concept, examples }) {
  return (
    <ModalFrame isOpen={isOpen && !!concept} onClose={onClose} label="Example">
      <ModalHeader
        eyebrow="Example"
        title={concept?.topic}
        onClose={onClose}
        closeLabel="Close example"
      />
      <div className="thin-scroll flex flex-col gap-4 overflow-y-auto p-6">
        {examples.map((example, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-neutral-200">
              <span>{example.title || `Example ${i + 1}`}</span>
              {example.language && (
                <span className={`${mono.className} shrink-0 text-xs text-neutral-500`}>
                  {example.language}
                </span>
              )}
            </div>

            {example.code && (
              <pre
                className={`${mono.className} m-0 overflow-x-auto bg-black/40 p-4 text-[13px] leading-relaxed text-neutral-300`}
              >
                <code className="whitespace-pre">{example.code}</code>
              </pre>
            )}

            {example.html && (
              <div
                className="rich prose prose-invert prose-sm max-w-none overflow-x-auto p-4"
                dangerouslySetInnerHTML={{ __html: example.html }}
              />
            )}
          </div>
        ))}
      </div>
    </ModalFrame>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CategoryPage({
  topicPrepareData,
  topicInterviewData,
  topic,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);

  // Only DiagramCanvas still takes the per-topic palette.
  const themeColors = getThemeColors(topic);
  const title = prettyTitle(topic);

  const [tab, setTab] = React.useState("prepare");
  const [level, setLevel] = React.useState("Beginner");
  const [interviewSelection, setInterviewSelection] = React.useState("Junior");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [prepPage, setPrepPage] = React.useState(1);
  const [interviewPage, setInterviewPage] = React.useState(1);
  const [learnedConcepts, setLearnedConcepts] = React.useState({});
  const [exampleConcept, setExampleConcept] = React.useState(null);
  const [exampleList, setExampleList] = React.useState([]);
  const [isExampleOpen, setIsExampleOpen] = React.useState(false);
  const [isDiagramOpen, setIsDiagramOpen] = React.useState(false);

  const { processQuestionAnswer, notifications, clearNotification } =
    useGamification();

  // ----- data -------------------------------------------------------------

  const selectedTopicData = React.useMemo(
    () => topicPrepareData?.type || [],
    [topicPrepareData],
  );

  // Keep every level (even when a search empties it) so Beginner/Advance
  // indexes never shift.
  const filteredLevels = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return selectedTopicData;
    return selectedTopicData.map((lvl) => ({
      ...lvl,
      concepts:
        lvl.concepts?.filter((c) => c.topic.toLowerCase().includes(query)) ||
        [],
    }));
  }, [selectedTopicData, searchQuery]);

  const activeConcepts =
    filteredLevels[level === "Beginner" ? 0 : 1]?.concepts || [];
  const pagedConcepts = paginate(activeConcepts, prepPage);

  const interviewQues = React.useMemo(
    () =>
      topicInterviewData.find((i) => i.categories === interviewSelection) || {},
    [topicInterviewData, interviewSelection],
  );
  const interviewQuestions = interviewQues.questions || [];
  const pagedQuestions = paginate(interviewQuestions, interviewPage);

  const beginnerCount = selectedTopicData[0]?.concepts?.length || 0;
  const advanceCount = selectedTopicData[1]?.concepts?.length || 0;
  const questionCount = topicInterviewData.reduce(
    (n, d) => n + (d.questions?.length || 0),
    0,
  );

  // ----- motion -----------------------------------------------------------

  usePageMotion(rootRef, [topic]);
  useListMotion(
    listRef,
    `${topic}|${tab}|${level}|${interviewSelection}|${tab === "prepare" ? prepPage : interviewPage
    }`,
  );

  // ----- effects ----------------------------------------------------------

  // New topic -> fresh search + first page.
  React.useEffect(() => {
    setSearchQuery("");
    setPrepPage(1);
    setInterviewPage(1);
  }, [topic]);

  React.useEffect(() => {
    const stored = localStorage.getItem("learnedConcepts");
    if (stored) {
      setLearnedConcepts(JSON.parse(stored));
    }
  }, []);

  React.useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/auth/learned-topic?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.learnedPrepareTopics)) {
          const dbLearned = {};
          data.learnedPrepareTopics.forEach((item) => {
            dbLearned[getConceptKey(item.topic, item.concept)] = true;
          });
          setLearnedConcepts(dbLearned);
        }
      })
      .catch((err) => console.error("Failed to load learned topics", err));
  }, [session?.user?.id, topic]);

  // ----- handlers ---------------------------------------------------------

  const handleLearnedToggle = async (concept) => {
    const key = getConceptKey(topic, concept.topic);
    const wasChecked = !!learnedConcepts[key];

    setLearnedConcepts((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("learnedConcepts", JSON.stringify(updated));
      return updated;
    });

    // If user is logged in, sync with database
    if (session?.user?.id) {
      try {
        if (!wasChecked) {
          await fetch("/api/auth/learned-topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              topic,
              concept: concept.topic,
            }),
          });

          // Award XP for learning a concept
          await processQuestionAnswer({
            questionId: `concept_${concept.topic}`,
            category: topic,
            difficulty: "easy",
            isCorrect: true,
            timeSpent: 30,
            actionType: "concept_learned",
          });
        } else {
          await fetch("/api/auth/learned-topic", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              topic,
              concept: concept.topic,
            }),
          });
        }
      } catch (err) {
        console.error("Failed to update learned topic in DB", err);
      }
    }
  };

  const changeLevel = (next) => {
    setLevel(next);
    setPrepPage(1);
  };
  const changeSearch = (value) => {
    setSearchQuery(value);
    setPrepPage(1);
  };
  const changeInterview = (next) => {
    setInterviewSelection(next);
    setInterviewPage(1);
  };

  const openExample = (concept, examples) => {
    setExampleConcept(concept);
    setExampleList(examples);
    setIsExampleOpen(true);
  };
  // Keep concept/examples while the exit animation plays.
  const closeExample = React.useCallback(() => setIsExampleOpen(false), []);
  const closeDiagram = React.useCallback(() => setIsDiagramOpen(false), []);

  // ----- render -----------------------------------------------------------

  return (
    <PageShell ref={rootRef}>
      <Head>
        <title>{`${title} Interview Questions | Interview Nerd`}</title>
      </Head>

      {/* XP notifications */}
      {notifications?.map((notification) => (
        <XPNotification
          key={notification.id}
          notification={notification}
          onClose={() => clearNotification(notification.id)}
        />
      ))}

      <SiteNav
        crumbs={[{ label: "Topics", href: "/#categories" }, { label: title }]}
        actions={[
          {
            key: "mcq",
            label: "Practice MCQ",
            icon: BookCheck,
            href: `/practice-mcq/${encodeURIComponent(topic)}`,
            primary: true,
          },
          {
            key: "visual",
            label: "Visual summary",
            icon: Network,
            onClick: () => setIsDiagramOpen(true),
          },
        ]}
      />

      <main>
        {/* ------------------------------------------------------------ */}
        {/* Hero                                                          */}
        {/* ------------------------------------------------------------ */}
        <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/#categories"
              className="hero-fade group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              All topics
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="Master" />
              </span>
              <span className="block">
                <SplitTitle text={title} accent />
              </span>
            </h1>

            <dl
              data-stagger
              className="mt-12 grid max-w-2xl grid-cols-3 gap-y-6"
            >
              {[
                { value: beginnerCount, label: "Beginner concepts" },
                { value: advanceCount, label: "Advanced concepts" },
                { value: questionCount, label: "Interview questions" },
              ].map((s) => (
                <div key={s.label} className="border-l border-white/10 pl-5">
                  <dd
                    data-count={s.value}
                    className="text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl"
                  >
                    {s.value.toLocaleString("en-US")}
                  </dd>
                  <dt className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Content                                                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          {session?.user?.id && (
            <div data-reveal className="mb-6 space-y-4">
              <GamificationDashboard userId={session.user.id} compact={true} />
              <MCQDailyChallenge />
            </div>
          )}

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6 md:p-8">
            <Segmented
              label="Section"
              value={tab}
              onChange={setTab}
              options={[
                { value: "prepare", label: "Prepare" },
                { value: "interview", label: "Interview questions" },
              ]}
            />

            <div ref={listRef} className="mt-8">
              {tab === "prepare" ? (
                <>
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Segmented
                      label="Level"
                      value={level}
                      onChange={changeLevel}
                      options={[
                        {
                          value: "Beginner",
                          label: "Beginner",
                          count: filteredLevels[0]?.concepts?.length ?? 0,
                        },
                        {
                          value: "Advance",
                          label: "Advance",
                          count: filteredLevels[1]?.concepts?.length ?? 0,
                        },
                      ]}
                    />
                    <div className="relative w-full md:max-w-xs">
                      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => changeSearch(e.target.value)}
                        placeholder="Search topics"
                        aria-label="Search topics"
                        className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-neutral-100 placeholder:text-neutral-600 transition-colors focus:border-[#D4FF4F]/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  {pagedConcepts.length > 0 ? (
                    <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
                      {pagedConcepts.map((concept, i) => (
                        <ConceptRow
                          key={concept.topic}
                          concept={concept}
                          number={(prepPage - 1) * ITEMS_PER_PAGE + i + 1}
                          topic={topic}
                          showCheck={!!session?.user?.id}
                          checked={
                            !!learnedConcepts[getConceptKey(topic, concept.topic)]
                          }
                          onToggle={handleLearnedToggle}
                          onOpenExample={openExample}
                        />
                      ))}
                    </ul>
                  ) : searchQuery.trim() ? (
                    <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
                      <Search className="mx-auto mb-3 h-7 w-7 text-neutral-600" />
                      <p className="text-sm font-medium text-neutral-300">
                        No topics match “{searchQuery.trim()}”
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Try a shorter or different keyword.
                      </p>
                    </div>
                  ) : (
                    <p className="py-14 text-center text-sm text-neutral-500">
                      No concepts in this level yet.
                    </p>
                  )}

                  <Pagination
                    currentPage={prepPage}
                    totalPages={totalPagesFor(activeConcepts.length)}
                    onPageChange={setPrepPage}
                  />
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <Segmented
                      label="Seniority"
                      value={interviewSelection}
                      onChange={changeInterview}
                      options={["Junior", "Mid", "Senior"].map((v) => ({
                        value: v,
                        label: v,
                        count:
                          topicInterviewData.find((d) => d.categories === v)
                            ?.questions?.length ?? 0,
                      }))}
                    />
                  </div>

                  {pagedQuestions.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                      {pagedQuestions.map((item, i) => (
                        <AccordionQuestion
                          key={`${interviewSelection}-${interviewPage}-${i}`}
                          question={item}
                          number={(interviewPage - 1) * ITEMS_PER_PAGE + i + 1}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-white/10 py-14 text-center text-sm text-neutral-500">
                      No {interviewSelection.toLowerCase()} questions for{" "}
                      {title} yet.
                    </p>
                  )}

                  <Pagination
                    currentPage={interviewPage}
                    totalPages={totalPagesFor(interviewQuestions.length)}
                    onPageChange={setInterviewPage}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modals live at shell level so no transformed ancestor can trap them. */}
      <ExampleModal
        isOpen={isExampleOpen}
        onClose={closeExample}
        concept={exampleConcept}
        examples={exampleList}
      />

      <ModalFrame
        isOpen={isDiagramOpen}
        onClose={closeDiagram}
        label={`${title} visual summary`}
        className="h-[90vh] max-w-6xl"
      >
        <ModalHeader
          title={`${title} · Visual summary`}
          onClose={closeDiagram}
          closeLabel="Close visual summary"
        />
        <div className="min-h-0 flex-1 overflow-hidden">
          <DiagramCanvas
            topicData={selectedTopicData}
            topic={topic}
            themeColors={themeColors}
            isOpen={isDiagramOpen}
            onClose={closeDiagram}
          />
        </div>
      </ModalFrame>
    </PageShell>
  );
}