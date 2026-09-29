import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    highlightId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#fef08a", // Yellow hex
    },
    colorName: {
      type: String,
      default: "yellow",
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Compound index for querying user highlights for a specific topic in a category
highlightSchema.index({ userId: 1, category: 1, topic: 1 });

const Highlight = mongoose.models.Highlight || mongoose.model("Highlight", highlightSchema);

export default Highlight;
