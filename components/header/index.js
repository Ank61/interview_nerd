import { getThemeColors } from "@/lib/themeUtils";
import Box from "@mui/material/Box";
import { ArrowLeft, BarChart3, Target } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header({ topic, indexSelected }) {
  const { data: session } = useSession();
  const router = useRouter();
  const themeColors = getThemeColors(topic);
  return (
    <Box
      className="sticky top-0 z-10 bg-surface"
      sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowLeft
          size={28}
          className={` cursor-pointer ${
            topic === "Javascript"
              ? "text-Javascript-text"
              : topic === "Typescript"
              ? "text-Typescript-text"
              : topic === "AWS S3"
              ? "text-AWS-text"
              : "text-slate-800"
          }`}
          onClick={() =>
            router.pathname.startsWith("/learn/")
              ? router.push(`/category/${topic}`)
              : router.pathname.startsWith("/category/")
              ? router.push("/")
              : window.history.back()
          }
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {indexSelected !== -1 && (
          <span
            className={`scroll-m-20 text-[22px] font-semibold tracking-tight ${
              topic === "Javascript"
                ? "text-Javascript-topic"
                : topic === "Typescript"
                ? "text-Typescript-topic"
                : topic === "AWS S3"
                ? "text-AWS-topic"
                : "text-slate-800"
            }`}
            style={{
              color: themeColors.text,
            }}
          >
            {topic}
          </span>
        )}

        {session?.user?.id && (
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Go to Dashboard"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </button>
            {router.pathname.includes("/category/") && (
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                title="Go to Challenge"
                onClick={() => router.push("/challenge/daily")}
              >
                <Target className="w-4 h-4" />
                Daily Challenge
              </button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
