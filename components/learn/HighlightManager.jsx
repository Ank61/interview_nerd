import React, { useState, useEffect, useRef, useCallback } from "react";
import { HIGHLIGHT_COLORS } from "@/hooks/useHighlights";
import {
  Highlighter,
  Trash2,
  Check,
  RotateCcw,
  CloudCheck,
  CloudUpload,
  Sparkles,
  Info,
  X,
  Palette,
  Eye,
  Pencil,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HighlightManager({
  containerRef,
  highlights = [],
  isEditMode,
  setIsEditMode,
  selectedColor,
  setSelectedColor,
  addHighlight,
  removeHighlight,
  updateHighlightColor,
  clearAllHighlights,
  saveStatus,
  isAuthenticated,
}) {
  const [selectionPopover, setSelectionPopover] = useState(null); // { x, y, text, prefix, suffix }
  const [activeHighlightPopover, setActiveHighlightPopover] = useState(null); // { id, x, y, text, color }
  const [toastMessage, setToastMessage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "danger",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper to get text context around selection
  const getSelectionContext = (selection) => {
    if (!selection || selection.isCollapsed) return { text: "", prefix: "", suffix: "" };
    const text = selection.toString().trim();
    if (!text) return { text: "", prefix: "", suffix: "" };

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const fullText = container.textContent || "";

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const prefix = fullText.substring(Math.max(0, startOffset - 25), startOffset).trim();
    const suffix = fullText.substring(endOffset, Math.min(fullText.length, endOffset + 25)).trim();

    return { text, prefix, suffix };
  };

  // Handle user selecting text in the document
  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !containerRef.current) {
      // Don't hide selection popover immediately if user clicked inside popover
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2) return; // ignore tiny selections

    const range = selection.getRangeAt(0);
    // Ensure selection is inside the container
    if (!containerRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    const rect = range.getBoundingClientRect();
    const { text, prefix, suffix } = getSelectionContext(selection);

    setSelectionPopover({
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
      text,
      prefix,
      suffix,
    });
  }, [containerRef]);

  // Global mouseup / touchend listener for text selection
  useEffect(() => {
    const onMouseUp = (e) => {
      // If clicking inside a popover, do not clear
      if (e.target.closest(".highlight-popover")) return;

      setTimeout(() => {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
          handleSelection();
        } else {
          setSelectionPopover(null);
        }
      }, 10);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseup", onMouseUp);
      container.addEventListener("touchend", onMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseup", onMouseUp);
        container.removeEventListener("touchend", onMouseUp);
      }
    };
  }, [containerRef, handleSelection]);

  // Apply highlights into DOM nodes
  const applyHighlightsToDOM = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Clean existing highlights in container first
    const existingMarks = container.querySelectorAll("mark.in-app-highlight");
    existingMarks.forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize(); // merge adjacent text nodes
    });

    if (!highlights || highlights.length === 0) return;

    // 2. Iterate highlights and wrap text nodes
    highlights.forEach((h) => {
      if (!h.text || !h.text.trim()) return;
      const targetText = h.text.trim();

      // Find text nodes inside container
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          let parent = node.parentElement;
          while (parent && parent !== container) {
            if (
              parent.tagName === "SCRIPT" ||
              parent.tagName === "STYLE" ||
              parent.tagName === "CODE" ||
              parent.tagName === "PRE" ||
              parent.classList.contains("in-app-highlight")
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textNodes = [];
      let currentNode;
      while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
      }

      // Find matching node
      for (const node of textNodes) {
        const val = node.nodeValue;
        const index = val.indexOf(targetText);
        if (index !== -1) {
          try {
            const highlightNode = node.splitText(index);
            highlightNode.splitText(targetText.length);

            const mark = document.createElement("mark");
            mark.className =
              "in-app-highlight transition-all duration-200 cursor-pointer inline rounded px-1 py-0.5 font-medium shadow-sm hover:opacity-90 hover:ring-2 hover:ring-offset-1 hover:ring-indigo-400";
            mark.setAttribute("data-highlight-id", h.id || h.highlightId);
            mark.style.backgroundColor = h.color || "#fef08a";
            mark.style.color = h.textColor || "#1f2937";
            mark.style.borderBottom = `2px solid ${h.borderColor || "rgba(0,0,0,0.2)"}`;
            mark.title = "Click highlight to view options";

            // Click listener on highlight
            mark.addEventListener("click", (e) => {
              e.stopPropagation();
              const rect = mark.getBoundingClientRect();
              setActiveHighlightPopover({
                id: h.id || h.highlightId,
                x: rect.left + rect.width / 2,
                y: rect.top - 10,
                text: h.text,
                color: h.color,
                colorName: h.colorName,
              });
            });

            highlightNode.parentNode.replaceChild(mark, highlightNode);
            mark.appendChild(highlightNode);
            break; // Done with this highlight instance
          } catch (err) {
            console.error("Error wrapping highlight in DOM", err);
          }
        }
      }
    });
  }, [containerRef, highlights]);

  // Re-apply highlights whenever container content or highlights change
  useEffect(() => {
    const timer = setTimeout(() => {
      applyHighlightsToDOM();
    }, 50);
    return () => clearTimeout(timer);
  }, [highlights, containerRef, applyHighlightsToDOM]);

  // Execute highlight creation from selection
  const triggerHighlight = (colorObj) => {
    if (!selectionPopover) return;
    const colorToUse = colorObj || selectedColor;

    const newHl = addHighlight({
      text: selectionPopover.text,
      prefix: selectionPopover.prefix,
      suffix: selectionPopover.suffix,
      color: colorToUse.bg,
      colorName: colorToUse.id,
      textColor: colorToUse.text,
      borderColor: colorToUse.border,
    });

    // Clear selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    setSelectionPopover(null);
    showToast(`Highlighted in ${colorToUse.name}!`);
  };

  return (
    <div className="relative mb-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[100] bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700"
          >
            <Sparkles size={14} className="text-yellow-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 overflow-hidden"
            >
              {/* Decorative top color bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  confirmModal.type === "danger"
                    ? "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                }`}
              />

              <div className="flex items-start gap-4 pt-1">
                {/* Icon */}
                <div
                  className={`p-3 rounded-2xl flex-shrink-0 ${
                    confirmModal.type === "danger"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                  }`}
                >
                  {confirmModal.type === "danger" ? (
                    <AlertTriangle size={24} />
                  ) : (
                    <Info size={24} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {confirmModal.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    {confirmModal.message}
                  </p>
                </div>

                <button
                  onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {confirmModal.cancelText || "Cancel"}
                </button>

                <button
                  onClick={() => {
                    if (confirmModal.onConfirm) confirmModal.onConfirm();
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${
                    confirmModal.type === "danger"
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/20 active:scale-95"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 active:scale-95"
                  }`}
                >
                  {confirmModal.type === "danger" && <Trash2 size={16} />}
                  <span>{confirmModal.confirmText || "Confirm"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Highlight Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-200/80 shadow-sm transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left section: Mode Toggle & Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const nextMode = !isEditMode;
                setIsEditMode(nextMode);
                showToast(nextMode ? "Highlight Pen Activated! Select text to highlight." : "Edit mode disabled");
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                isEditMode
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 ring-2 ring-indigo-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {isEditMode ? (
                <>
                  <Pencil size={16} className="animate-bounce" />
                  <span>Highlight Pen Mode (ON)</span>
                </>
              ) : (
                <>
                  <Highlighter size={16} />
                  <span>Highlight Pen Mode</span>
                </>
              )}
            </button>

            {/* Counter badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">
              <Sparkles size={13} className="text-amber-500" />
              <span>
                {highlights.length} {highlights.length === 1 ? "Highlight" : "Highlights"}
              </span>
            </div>
          </div>

          {/* Center section: Color Selection Palette */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:inline">
              Color:
            </span>
            <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
              {HIGHLIGHT_COLORS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedColor(c);
                      if (selectionPopover) {
                        triggerHighlight(c);
                      }
                    }}
                    title={`Select ${c.name} highlight pen`}
                    className={`w-7 h-7 rounded-lg transition-all duration-200 flex items-center justify-center relative ${
                      isSelected
                        ? "scale-110 shadow-md ring-2 ring-indigo-500 ring-offset-1"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.bg, border: `1.5px solid ${c.border}` }}
                  >
                    {isSelected && <Check size={14} style={{ color: c.text }} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right section: Storage / Actions */}
          <div className="flex items-center gap-2">
            {/* Sync / Save status indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium">
              {saveStatus === "saving" ? (
                <span className="flex items-center gap-1.5 text-indigo-600 animate-pulse">
                  <CloudUpload size={14} />
                  <span className="hidden sm:inline">Saving...</span>
                </span>
              ) : isAuthenticated ? (
                <span className="flex items-center gap-1.5 text-emerald-600" title="Saved to cloud database">
                  <CloudCheck size={15} />
                  <span className="hidden sm:inline">Saved in DB</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-600" title="Saved locally (Login to sync to DB)">
                  <Info size={14} />
                  <span className="hidden sm:inline">Device Storage</span>
                </span>
              )}
            </div>

            {/* Clear All button with Custom Site Confirmation Dialog */}
            {highlights.length > 0 && (
              <button
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    title: "Clear All Highlights?",
                    message: "Are you sure you want to remove all highlights for this topic? This action cannot be undone.",
                    confirmText: "Clear All",
                    cancelText: "Cancel",
                    type: "danger",
                    onConfirm: () => {
                      clearAllHighlights();
                      showToast("All highlights cleared!");
                    },
                  });
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Clear all highlights"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Tip / instructions banner when Edit Mode is active */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-indigo-900 bg-indigo-50/70 px-3 py-2 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Pencil size={14} className="text-indigo-600" />
              <span>
                <strong>Pen mode active:</strong> Select any word or sentence on the page to highlight it. Click an existing highlight to edit or delete it.
              </span>
            </div>
            <button
              onClick={() => setIsEditMode(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Selection Toolbar Popover when user selects text */}
      <AnimatePresence>
        {selectionPopover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="highlight-popover fixed z-[90] transform -translate-x-1/2 -translate-y-full mb-3 bg-gray-900 text-white rounded-2xl shadow-2xl p-2 flex items-center gap-2 border border-gray-700/80 backdrop-blur-md"
            style={{
              left: `${selectionPopover.x}px`,
              top: `${selectionPopover.y}px`,
            }}
          >
            <span className="text-xs font-semibold text-gray-300 pl-2 pr-1 hidden sm:inline">Highlight:</span>

            {/* Quick Color Swatches in Popover */}
            <div className="flex items-center gap-1.5">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => triggerHighlight(c)}
                  className="w-7 h-7 rounded-lg transition-transform duration-150 hover:scale-125 flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: c.bg, border: `1.5px solid ${c.border}` }}
                  title={`Highlight in ${c.name}`}
                >
                  <Highlighter size={12} style={{ color: c.text }} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectionPopover(null)}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 ml-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popover when user clicks an existing highlight mark */}
      <AnimatePresence>
        {activeHighlightPopover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="highlight-popover fixed z-[95] transform -translate-x-1/2 -translate-y-full mb-2 bg-white text-gray-800 rounded-2xl shadow-2xl p-2.5 flex items-center gap-2 border border-gray-200"
            style={{
              left: `${activeHighlightPopover.x}px`,
              top: `${activeHighlightPopover.y}px`,
            }}
          >
            <span className="text-xs font-medium text-gray-500 pl-1 pr-1 border-r border-gray-200">
              Highlight Options
            </span>

            {/* Change Color Palette */}
            <div className="flex items-center gap-1">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    updateHighlightColor(activeHighlightPopover.id, c);
                    setActiveHighlightPopover(null);
                    showToast(`Color changed to ${c.name}`);
                  }}
                  className={`w-6 h-6 rounded-md transition-transform hover:scale-110 ${
                    activeHighlightPopover.colorName === c.id ? "ring-2 ring-indigo-600 ring-offset-1" : ""
                  }`}
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                  title={`Change to ${c.name}`}
                />
              ))}
            </div>

            <div className="h-4 w-px bg-gray-200 my-auto" />

            {/* Remove Highlight Button */}
            <button
              onClick={() => {
                removeHighlight(activeHighlightPopover.id);
                setActiveHighlightPopover(null);
                showToast("Highlight removed");
              }}
              className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
            >
              <Trash2 size={13} />
              <span>Remove</span>
            </button>

            <button
              onClick={() => setActiveHighlightPopover(null)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

