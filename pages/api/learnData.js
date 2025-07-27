import connectDB from "@/lib/mongodb";
import PrepareData from "@/models/PrepareData";

export default async function handler(req, res) {
  try {
    await connectDB();
    const data = await PrepareData.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
} 