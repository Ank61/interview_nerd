import Box from "@mui/material/Box";
import { ArrowLeft } from "lucide-react";

export default function Header({ topic, indexSelected }) {
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
      </Box>
    </Box>
  );
}
