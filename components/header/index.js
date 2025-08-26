import Box from "@mui/material/Box";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header({ topic, indexSelected }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Box
      className="sticky top-0 z-10 bg-white"
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
          onClick={() => window.history.back()}
        />
        {/* <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              // onClick={handleBackClick}
              className="text-gray-900 flex items-center gap-2 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-900" />
              Back
            </button>
          </div>
        </div> */}
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
          >
            {topic}
          </span>
        )}
        
        {session?.user?.id && (
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Go to Dashboard"
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>
        )}
      </Box>
    </Box>
  );
}
