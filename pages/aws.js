/**
 * AWS service selection page.
 *
 * Lists every AWS service (plus Sentry) as a card. Picking one redirects to
 * the shared category page at /category/[slug], which renders that service's
 * Beginner / Advance concepts from data/aws/*.js (or, for S3, SQS and SNS,
 * from the existing categories in prepareData.js).
 */
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowRight,
  BookOpen,
  User,
  Settings,
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

export default function AwsServices() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return awsServices;
    return awsServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.group.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const service of filtered) {
      if (!map.has(service.group)) map.set(service.group, []);
      map.get(service.group).push(service);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)]);
  }, [filtered]);

  const openService = (service) => {
    router.push(`/category/${encodeURIComponent(service.slug)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <BookOpen size={24} className="text-gray-700" />
                </div>
                <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                  Interview Nerd
                </h1>
              </div>

              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">AWS</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-white pt-14 pb-10 sm:pt-16 sm:pb-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-inset ring-orange-200">
              {awsServices.length} services
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              AWS Interview Prep
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg">
              Pick a service to open its Beginner and Advance concepts, practice
              questions and interview answers.
            </p>

            <div className="relative mt-8 max-w-xl mx-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, e.g. Lambda, networking, queue…"
                className="pl-9 h-11 bg-gray-50 border-gray-200 focus-visible:ring-orange-400"
              />
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {grouped.length === 0 && (
              <p className="text-center text-gray-500">
                No services match “{query}”.
              </p>
            )}

            {grouped.map(([group, services]) => (
              <div key={group}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {group}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {services.map((service, index) => {
                    const Icon = ICONS[service.icon] || Cloud;
                    return (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openService(service)}
                        className="cursor-pointer group h-full"
                      >
                        <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                          <div
                            className="h-1.5 w-full"
                            style={{ backgroundColor: service.color }}
                          />
                          <CardContent className="p-5 flex flex-col h-full">
                            <div className="flex items-start justify-between gap-3">
                              <div
                                className="p-2.5 rounded-lg shrink-0"
                                style={{ backgroundColor: service.bg }}
                              >
                                <Icon
                                  className="h-6 w-6"
                                  style={{ color: service.color }}
                                />
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all mt-1" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-900">
                              {service.name}
                            </h3>
                            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed flex-1">
                              {service.description}
                            </p>
                            <span
                              className="mt-4 inline-flex items-center text-sm font-semibold"
                              style={{ color: service.color }}
                            >
                              Start learning
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
