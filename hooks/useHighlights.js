import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";

export const HIGHLIGHT_COLORS = [
  {
    id: "yellow",
    name: "Yellow",
    bg: "#fef08a",
    border: "#eab308",
    text: "#713f12",
    badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    id: "green",
    name: "Green",
    bg: "#bbf7d0",
    border: "#22c55e",
    text: "#14532d",
    badgeClass: "bg-green-100 text-green-800 border-green-300",
  },
  {
    id: "pink",
    name: "Pink",
    bg: "#fbcfe8",
    border: "#ec4899",
    text: "#831843",
    badgeClass: "bg-pink-100 text-pink-800 border-pink-300",
  },
  {
    id: "blue",
    name: "Blue",
    bg: "#bfdbfe",
    border: "#3b82f6",
    text: "#1e3a8a",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "purple",
    name: "Purple",
    bg: "#e9d5ff",
    border: "#a855f7",
    text: "#581c87",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "orange",
    name: "Orange",
    bg: "#fed7aa",
    border: "#f97316",
    text: "#7c2d12",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-300",
  },
];

export function useHighlights(category, topic) {
  const { data: session, status } = useSession();
  const [highlights, setHighlights] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_COLORS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saving' | 'saved' | 'error'

  const storageKey = `interview_nerd_highlights_${category}_${topic}`;

  // Fetch highlights from DB or localStorage on mount/topic change
  useEffect(() => {
    if (!category || !topic) return;

    let isMounted = true;
    setIsLoading(true);

    const loadHighlights = async () => {
      // Check local storage first as fast initial render
      let localData = [];
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          localData = JSON.parse(cached);
        }
      } catch (err) {
        console.error("Failed to read highlights from localStorage", err);
      }

      if (isMounted && localData.length > 0) {
        setHighlights(localData);
      }

      // If user is authenticated, fetch from DB
      if (status === "authenticated" && session?.user) {
        try {
          const res = await fetch(
            `/api/highlights?category=${encodeURIComponent(category)}&topic=${encodeURIComponent(topic)}`
          );
          const data = await res.json();

          if (data.success && data.highlights && isMounted) {
            setHighlights(data.highlights);
            localStorage.setItem(storageKey, JSON.stringify(data.highlights));
          }
        } catch (error) {
          console.error("Failed to fetch highlights from database", error);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadHighlights();

    return () => {
      isMounted = false;
    };
  }, [category, topic, status, session?.user, storageKey]);

  // Sync to database function
  const syncToDatabase = useCallback(
    async (newHighlights) => {
      // Save to localStorage immediately
      try {
        localStorage.setItem(storageKey, JSON.stringify(newHighlights));
      } catch (e) {
        console.error("LocalStorage save error:", e);
      }

      if (status !== "authenticated" || !session?.user) {
        setSaveStatus("saved");
        return;
      }

      setIsSaving(true);
      setSaveStatus("saving");

      try {
        const res = await fetch("/api/highlights", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            topic,
            highlights: newHighlights,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        } else {
          setSaveStatus("error");
        }
      } catch (error) {
        console.error("Failed to sync highlights with DB:", error);
        setSaveStatus("error");
      } finally {
        setIsSaving(false);
      }
    },
    [category, topic, status, session?.user, storageKey]
  );

  // Add a single highlight
  const addHighlight = useCallback(
    (highlightData) => {
      const newHighlight = {
        id: `hl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        category,
        topic,
        text: highlightData.text,
        color: highlightData.color || selectedColor.bg,
        colorName: highlightData.colorName || selectedColor.id,
        textColor: highlightData.textColor || selectedColor.text,
        borderColor: highlightData.borderColor || selectedColor.border,
        prefix: highlightData.prefix || "",
        suffix: highlightData.suffix || "",
        createdAt: new Date().toISOString(),
      };

      setHighlights((prev) => {
        // Prevent duplicate exact highlight
        const exists = prev.some(
          (h) => h.text === newHighlight.text && h.prefix === newHighlight.prefix
        );
        if (exists) return prev;
        const updated = [...prev, newHighlight];
        syncToDatabase(updated);
        return updated;
      });

      return newHighlight;
    },
    [category, topic, selectedColor, syncToDatabase]
  );

  // Remove a single highlight by ID
  const removeHighlight = useCallback(
    (id) => {
      setHighlights((prev) => {
        const updated = prev.filter((h) => h.id !== id && h.highlightId !== id);
        syncToDatabase(updated);
        return updated;
      });
    },
    [syncToDatabase]
  );

  // Update color of an existing highlight
  const updateHighlightColor = useCallback(
    (id, newColorObj) => {
      setHighlights((prev) => {
        const updated = prev.map((h) => {
          if (h.id === id || h.highlightId === id) {
            return {
              ...h,
              color: newColorObj.bg,
              colorName: newColorObj.id,
              textColor: newColorObj.text,
              borderColor: newColorObj.border,
            };
          }
          return h;
        });
        syncToDatabase(updated);
        return updated;
      });
    },
    [syncToDatabase]
  );

  // Clear all highlights for this topic
  const clearAllHighlights = useCallback(() => {
    setHighlights([]);
    syncToDatabase([]);
  }, [syncToDatabase]);

  return {
    highlights,
    isEditMode,
    setIsEditMode,
    selectedColor,
    setSelectedColor,
    addHighlight,
    removeHighlight,
    updateHighlightColor,
    clearAllHighlights,
    isLoading,
    isSaving,
    saveStatus,
    isAuthenticated: status === "authenticated",
  };
}
