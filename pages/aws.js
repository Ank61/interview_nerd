/**
 * AWS service selection page.
 *
 * Lists every AWS service (plus Sentry) as a compact card. Picking one
 * redirects to the shared category page at /category/[slug].
 *
 * Layout is deliberately dense: one screen, no section-by-section scrolling.
 * Groups are filter chips rather than headings so the grid stays unbroken.
 */
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import {
  Server,
  HardDrive,
  ShieldCheck,
  Network,
  Zap,
  Database,
  Scale,
  Activity,
  Globe,
  Cloud,
  Inbox,
  Bell,
  Workflow,
  KeyRound,
  Container,
  GitBranch,
  Users,
  Bug,
  BookOpen,
  SearchIcon,
} from "lucide-react";
import { awsServices } from "@/data/awsServices";

const ICONS = {
  Server,
  HardDrive,
  ShieldCheck,
  Network,
  Zap,
  Database,
  Scale,
  Activity,
  Globe,
  Cloud,
  Inbox,
  Bell,
  Workflow,
  KeyRound,
  Container,
  GitBranch,
  Users,
  Bug,
};

const GROUP_ORDER = [
  "Compute",
  "Storage",
  "Database",
  "Networking",
  "Security",
  "Messaging",
  "Containers",
  "DevOps",
  "Observability",
];

const rank = (group) => {
  const i = GROUP_ORDER.indexOf(group);
  return i === -1 ? GROUP_ORDER.length : i;
};

export default function AwsServices() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const groups = useMemo(() => {
    const present = new Set(awsServices.map((s) => s.group));
    return ["All", ...GROUP_ORDER.filter((g) => present.has(g))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return awsServices
      .filter((s) => group === "All" || s.group === group)
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.group.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      )
      .sort((a, b) => rank(a.group) - rank(b.group) || a.name.localeCompare(b.name));
  }, [query, group]);

  return (
    <div className="min-h-screen bg-surface text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-900"
          >
            <BookOpen size={18} className="text-gray-400" />
            <span className="text-sm font-semibold">Interview Nerd</span>
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">AWS</span>

          <div className="relative ml-auto w-44 sm:w-72">
            <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              className="h-9 border-gray-200 pl-9 text-sm focus-visible:ring-gray-300"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${group === g
                  ? "bg-gray-900 text-neutral-950"
                  : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              {g}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">
            No services match “{query}”.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((service) => {
              const Icon = ICONS[service.icon] || Cloud;
              return (
                <button
                  key={service.slug}
                  onClick={() =>
                    router.push(`/category/${encodeURIComponent(service.slug)}`)
                  }
                  className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 text-left transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <Icon
                    className="h-4 w-4 shrink-0"
                    style={{ color: service.color }}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium leading-tight">
                      {service.name}
                    </span>
                    <span className="block truncate text-xs text-gray-500">
                      {service.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
