import React, { useState, useEffect, useCallback } from "react";
import { HIGHLIGHT_COLORS } from "@/hooks/useHighlights";
import {
  Highlighter,
  Trash2,
  Check,
  Cloud,
  CloudUpload,
  Info,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mono, useModalBehavior } from "@/components/landing/shared";

// ---------------------------------------------------------------------------
// Shared style tokens (same vocabulary as the category / topic pages)
// ---------------------------------------------------------------------------

const EASE = [0.16, 1, 0.3, 1];

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5";
const pillPrimary =
  "inline-flex items-center gap-1.5 rounded-full border border-transparent bg-[#D4FF4F] px-3.5 py-1.5 text-xs font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]";
const pillDanger =
  "inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:border-red-500/40 hover:bg-red-500/20";
const iconButton =
  "shrink-0 rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-white/30 hover:text-neutral-50";
const ghostIconButton =
  "shrink-0 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-white/5 hover:text-neutral-100";
const eyebrow = `${mono.className} text-[11px] uppercase tracking-[0.18em]`;
const floatingSurface =
  "flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950 p-1.5 shadow-2xl shadow-black/60";

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function Swatch({ color, selected = false, onClick, title, size = "h-6 w-6" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={selected}
      className={`${size} flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 ${selected
          ? "ring-2 ring-[#D4FF4F] ring-offset-2 ring-offset-neutral-950"
          : ""
        }`}
      style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}
    >
      {selected && (
        <Check className="h-3 w-3" style={{ color: color.text }} strokeWidth={3} />
      )}
    </button>
  );
}

/**
 * Anchors a floating bar centred above a viewport point. The centring lives in
 * an inline transform on the wrapper so framer-motion's own transform on the
 * inner element cannot override it.
 */
function FloatingBar({ x, y, zIndex, children }) {
  return (
    <div
      className="highlight-popover fixed"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex,
        transform: "translate(-50%, -100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={floatingSurface}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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

  // Keep title/message in state while the exit animation plays.
  const closeConfirm = useCallback(
    () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
    [],
  );
  useModalBehavior(confirmModal.isOpen, closeConfirm);

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
              "in-app-highlight inline cursor-pointer rounded-[5px] px-1 py-0.5 transition-shadow duration-300 hover:ring-2 hover:ring-[#D4FF4F]/50";
            mark.setAttribute("data-highlight-id", h.id || h.highlightId);
            mark.style.backgroundColor = h.color || "#fef08a";
            mark.style.color = h.textColor || "#ededef";
            mark.style.borderBottom = `2px solid ${h.borderColor || "rgba(0,0,0,0.2)"}`;
            mark.title = "Click to recolor or remove";

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

    addHighlight({
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
    showToast(`Highlighted in ${colorToUse.name}`);
  };

  const isDanger = confirmModal.type === "danger";

  return (
    <div className="relative mb-6">
      {/* ---------------------------------------------------------------- */}
      {/* Toast                                                             */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed right-4 top-20 z-[100] flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-950 px-4 py-2.5 text-xs font-medium text-neutral-200 shadow-2xl shadow-black/60 sm:right-6"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4FF4F]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------- */}
      {/* Confirm dialog (same frame as the example / diagram modals)       */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <motion.div
            key="confirm"
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeConfirm}
            />
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-label={confirmModal.title}
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/60"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                <div className="min-w-0">
                  <p
                    className={`${eyebrow} mb-1 ${isDanger ? "text-red-300" : "text-[#D4FF4F]"
                      }`}
                  >
                    {isDanger ? "Warning" : "Confirm"}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-50">
                    {confirmModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeConfirm}
                  aria-label="Close"
                  className={iconButton}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="px-6 py-5 text-sm leading-relaxed text-neutral-400">
                {confirmModal.message}
              </p>

              <div className="flex items-center justify-end gap-2 border-t border-white/[0.08] px-6 py-4">
                <button type="button" onClick={closeConfirm} className={pill}>
                  {confirmModal.cancelText || "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirmModal.onConfirm) confirmModal.onConfirm();
                    closeConfirm();
                  }}
                  className={isDanger ? pillDanger : pillPrimary}
                >
                  {isDanger && <Trash2 className="h-3.5 w-3.5" />}
                  {confirmModal.confirmText || "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------- */}
      {/* Toolbar                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Mode toggle + count */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-pressed={!!isEditMode}
              onClick={() => {
                const nextMode = !isEditMode;
                setIsEditMode(nextMode);
                showToast(
                  nextMode
                    ? "Highlight pen on. Select text to highlight."
                    : "Highlight pen off",
                );
              }}
              className={isEditMode ? pillPrimary : pill}
            >
              <Highlighter className="h-3.5 w-3.5" />
              Highlight pen
              <span
                className={`${mono.className} text-[11px] ${isEditMode ? "text-neutral-950/60" : "text-neutral-600"
                  }`}
              >
                {isEditMode ? "On" : "Off"}
              </span>
            </button>

            <span
              className={`${mono.className} hidden text-[11px] text-neutral-500 sm:inline`}
            >
              {String(highlights.length).padStart(2, "0")}{" "}
              {highlights.length === 1 ? "highlight" : "highlights"}
            </span>
          </div>

          {/* Colour palette */}
          <div className="flex min-w-0 items-center gap-3">
            <span className={`${eyebrow} hidden text-neutral-500 md:inline`}>
              Color
            </span>
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5">
              {HIGHLIGHT_COLORS.map((c) => (
                <Swatch
                  key={c.id}
                  color={c}
                  selected={selectedColor.id === c.id}
                  title={`Use ${c.name}`}
                  onClick={() => {
                    setSelectedColor(c);
                    if (selectionPopover) {
                      triggerHighlight(c);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Save status + clear */}
          <div className="flex items-center gap-3">
            {saveStatus === "saving" ? (
              <span
                className={`${mono.className} flex animate-pulse items-center gap-1.5 text-[11px] text-[#D4FF4F]`}
              >
                <CloudUpload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Saving…</span>
              </span>
            ) : isAuthenticated ? (
              <span
                className={`${mono.className} flex items-center gap-1.5 text-[11px] text-green-400`}
                title="Saved to your account"
              >
                <Cloud className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Saved to account</span>
              </span>
            ) : (
              <span
                className={`${mono.className} flex items-center gap-1.5 text-[11px] text-yellow-300`}
                title="Saved on this device. Log in to sync across devices."
              >
                <Info className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Saved on this device</span>
              </span>
            )}

            {highlights.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    title: "Clear all highlights?",
                    message:
                      "This removes every highlight on this topic. It can't be undone.",
                    confirmText: "Clear all",
                    cancelText: "Cancel",
                    type: "danger",
                    onConfirm: () => {
                      clearAllHighlights();
                      showToast("All highlights cleared");
                    },
                  });
                }}
                className="shrink-0 rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                title="Clear all highlights"
                aria-label="Clear all highlights"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Hint while the pen is on */}
        <AnimatePresence initial={false}>
          {isEditMode && (
            <motion.div
              key="pen-hint"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                <p className="text-xs leading-relaxed text-neutral-400">
                  Select text on the page to highlight it. Click a highlight
                  to recolor or remove it.
                </p>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  aria-label="Turn off highlight pen"
                  className={ghostIconButton}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Floating bar: new selection                                       */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {selectionPopover && (
          <FloatingBar
            key="selection"
            x={selectionPopover.x}
            y={selectionPopover.y}
            zIndex={90}
          >
            <span className={`${eyebrow} hidden pl-2.5 text-neutral-500 sm:inline`}>
              Highlight
            </span>
            <div className="flex items-center gap-1.5 px-1">
              {HIGHLIGHT_COLORS.map((c) => (
                <Swatch
                  key={c.id}
                  color={c}
                  size="h-7 w-7"
                  title={`Highlight in ${c.name}`}
                  onClick={() => triggerHighlight(c)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectionPopover(null)}
              aria-label="Dismiss"
              className={ghostIconButton}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </FloatingBar>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------------- */}
      {/* Floating bar: existing highlight                                  */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {activeHighlightPopover && (
          <FloatingBar
            key="active"
            x={activeHighlightPopover.x}
            y={activeHighlightPopover.y}
            zIndex={95}
          >
            <div className="flex items-center gap-2 pl-2 pr-1">
              {HIGHLIGHT_COLORS.map((c) => (
                <Swatch
                  key={c.id}
                  color={c}
                  selected={activeHighlightPopover.colorName === c.id}
                  title={`Change to ${c.name}`}
                  onClick={() => {
                    updateHighlightColor(activeHighlightPopover.id, c);
                    setActiveHighlightPopover(null);
                    showToast(`Color changed to ${c.name}`);
                  }}
                />
              ))}
            </div>

            <span className="h-4 w-px bg-white/10" aria-hidden="true" />

            <button
              type="button"
              onClick={() => {
                removeHighlight(activeHighlightPopover.id);
                setActiveHighlightPopover(null);
                showToast("Highlight removed");
              }}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>

            <button
              type="button"
              onClick={() => setActiveHighlightPopover(null)}
              aria-label="Dismiss"
              className={ghostIconButton}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </FloatingBar>
        )}
      </AnimatePresence>
    </div>
  );
}