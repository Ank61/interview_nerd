import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import connectDB from "../../lib/mongodb";
import Highlight from "../../models/Highlight";
import User from "../../models/User";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        highlights: [],
        message: "User not authenticated",
      });
    }

    await connectDB();

    // Resolve user ObjectId
    let userId = null;
    if (session.user.id && mongoose.Types.ObjectId.isValid(session.user.id)) {
      userId = new mongoose.Types.ObjectId(session.user.id);
    } else if (session.user.email) {
      const user = await User.findOne({ email: session.user.email.toLowerCase() });
      if (user) {
        userId = user._id;
      }
    }

    if (!userId) {
      return res.status(404).json({
        success: false,
        authenticated: true,
        message: "User account not found in database",
      });
    }

    const { category, topic } = req.query;

    // GET: Fetch highlights for user & topic
    if (req.method === "GET") {
      if (!category || !topic) {
        return res.status(400).json({
          success: false,
          message: "Category and topic query parameters are required",
        });
      }

      const highlights = await Highlight.find({
        userId,
        category: category.toLowerCase(),
        topic: decodeURIComponent(topic),
      }).sort({ createdAt: 1 });

      return res.status(200).json({
        success: true,
        authenticated: true,
        highlights: highlights.map((h) => ({
          id: h.highlightId || h._id.toString(),
          highlightId: h.highlightId || h._id.toString(),
          category: h.category,
          topic: h.topic,
          text: h.text,
          color: h.color,
          colorName: h.colorName,
          prefix: h.prefix,
          suffix: h.suffix,
          createdAt: h.createdAt,
        })),
      });
    }

    // POST: Add a new highlight
    if (req.method === "POST") {
      const {
        category: reqCategory,
        topic: reqTopic,
        highlightId,
        text,
        color,
        colorName,
        prefix,
        suffix,
      } = req.body;

      if (!reqCategory || !reqTopic || !text || !highlightId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: category, topic, highlightId, and text are required",
        });
      }

      const decodedTopic = decodeURIComponent(reqTopic);
      const normalizedCategory = reqCategory.toLowerCase();

      // Upsert highlight by highlightId and userId
      const highlight = await Highlight.findOneAndUpdate(
        { userId, category: normalizedCategory, topic: decodedTopic, highlightId },
        {
          userId,
          category: normalizedCategory,
          topic: decodedTopic,
          highlightId,
          text,
          color: color || "#fef08a",
          colorName: colorName || "yellow",
          prefix: prefix || "",
          suffix: suffix || "",
        },
        { upsert: true, new: true }
      );

      return res.status(200).json({
        success: true,
        authenticated: true,
        highlight: {
          id: highlight.highlightId,
          highlightId: highlight.highlightId,
          category: highlight.category,
          topic: highlight.topic,
          text: highlight.text,
          color: highlight.color,
          colorName: highlight.colorName,
          prefix: highlight.prefix,
          suffix: highlight.suffix,
        },
      });
    }

    // PUT: Bulk sync all highlights for topic
    if (req.method === "PUT") {
      const { category: reqCategory, topic: reqTopic, highlights } = req.body;

      if (!reqCategory || !reqTopic || !Array.isArray(highlights)) {
        return res.status(400).json({
          success: false,
          message: "Category, topic, and highlights array are required",
        });
      }

      const decodedTopic = decodeURIComponent(reqTopic);
      const normalizedCategory = reqCategory.toLowerCase();

      // Remove existing highlights for this user & topic, then insert current highlights
      await Highlight.deleteMany({
        userId,
        category: normalizedCategory,
        topic: decodedTopic,
      });

      if (highlights.length > 0) {
        const docs = highlights.map((h) => ({
          userId,
          category: normalizedCategory,
          topic: decodedTopic,
          highlightId: h.id || h.highlightId || `hl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          text: h.text,
          color: h.color || "#fef08a",
          colorName: h.colorName || "yellow",
          prefix: h.prefix || "",
          suffix: h.suffix || "",
        }));

        await Highlight.insertMany(docs);
      }

      const updatedHighlights = await Highlight.find({
        userId,
        category: normalizedCategory,
        topic: decodedTopic,
      }).sort({ createdAt: 1 });

      return res.status(200).json({
        success: true,
        authenticated: true,
        highlights: updatedHighlights.map((h) => ({
          id: h.highlightId,
          highlightId: h.highlightId,
          category: h.category,
          topic: h.topic,
          text: h.text,
          color: h.color,
          colorName: h.colorName,
          prefix: h.prefix,
          suffix: h.suffix,
        })),
      });
    }

    // DELETE: Delete highlight by highlightId
    if (req.method === "DELETE") {
      const { highlightId, category: reqCategory, topic: reqTopic, clearAll } = req.body || req.query;

      const decodedTopic = decodeURIComponent(reqTopic || topic || "");
      const normalizedCategory = (reqCategory || category || "").toLowerCase();

      if (clearAll) {
        await Highlight.deleteMany({
          userId,
          category: normalizedCategory,
          topic: decodedTopic,
        });

        return res.status(200).json({
          success: true,
          authenticated: true,
          message: "All highlights cleared for this topic",
        });
      }

      if (!highlightId) {
        return res.status(400).json({
          success: false,
          message: "highlightId is required for deletion",
        });
      }

      await Highlight.deleteOne({
        userId,
        category: normalizedCategory,
        topic: decodedTopic,
        highlightId,
      });

      return res.status(200).json({
        success: true,
        authenticated: true,
        message: "Highlight deleted successfully",
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error in highlights API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
