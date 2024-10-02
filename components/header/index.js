import Box from "@mui/material/Box";
import { ArrowLeft } from "lucide-react";

export default function Header({topic, indexSelected}){
    return (
        <Box className="sticky top-0 z-10 bg-white" 
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowLeft size={28} className={` cursor-pointer ${topic === "Javascript" ? "text-Javascript-text" : "text-violet-800"}`} onClick={()=>window.history.back()}/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {indexSelected !== -1 && (
            <span
              className={`scroll-m-20 text-[22px] font-semibold tracking-tight ${
                topic === "Javascript" ? "text-Javascript-topic" : ""
              }`}
            >
              {topic}
            </span>
          )}
        </Box>
      </Box>
    )
}