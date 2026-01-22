import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  RotateCcw,
  Edit3,
  Save,
  Plus,
  Trash2,
  MousePointer,
  Type,
  Square,
  Circle,
  Minus,
  Maximize2,
  Minimize2,
  Save as SaveIcon,
  Trash,
  Image as ImageIcon,
  FileText,
  Palette,
  Sliders,
  Move,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from '@/components/ui/input';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to calculate distance from point to line
const distanceToLine = (x, y, x1, y1, x2, y2) => {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
};

// Main DiagramCanvas Component
const DiagramCanvas = ({
  topicData,
  topic,
  themeColors = {
    bg: "#3b82f6",
    text: "#1f2937",
    border: "#d1d5db",
    topic: "#3b82f6",
    light: "#f3f4f6",
  },
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef(null);
  // Canvas state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Drawing state
  const [tool, setTool] = useState("freehand");
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [freehandPoints, setFreehandPoints] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Style state
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [fontSize, setFontSize] = useState(16);

  // View state
  const [showGrid, setShowGrid] = useState(true);
  const [showViewSummary, setShowViewSummary] = useState(true);
  const [activeTab, setActiveTab] = useState("draw");

  // Edit state
  const [isEditMode, setIsEditMode] = useState(true);
  const [editingNode, setEditingNode] = useState(null);
  const [editText, setEditText] = useState("");

  const [textColor, setTextColor] = useState("#000000"); // Default black text

  // Load custom diagram data
  const loadDiagramData = useCallback(() => {
    // Implement your diagram data loading logic here
    setElements([]);
    console.log("Loading diagram data for topic:", topic);
  }, [topic]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (editingNode && e.key === "Enter") {
        setElements((prev) =>
          prev.map((el) =>
            el.id === editingNode ? { ...el, isEditing: false } : el
          )
        );
        setEditingNode(null);
      } else if (editingNode && e.key === "Escape") {
        setElements((prev) => prev.filter((el) => el.id !== editingNode));
        setEditingNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingNode]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isEditMode || !canvasRef.current) return;

      e.preventDefault();
      const delta = -e.deltaY;
      const zoom = delta > 0 ? 1.1 : 0.9;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setScale((prev) => {
        const newScale = Math.min(Math.max(0.1, prev * zoom), 3);
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (mouseX - rect.left - offset.x) / prev;
        const y = (mouseY - rect.top - offset.y) / prev;

        setOffset({
          x: mouseX - rect.left - x * newScale,
          y: mouseY - rect.top - y * newScale,
        });

        return newScale;
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      return () => canvas.removeEventListener("wheel", handleWheel);
    }
  }, [isEditMode, offset.x, offset.y]);

  useEffect(() => {
    if (isOpen && topic) {
      loadDiagramData();
    }
  }, [isOpen, topic, loadDiagramData]);

  const getElementAtPosition = useCallback(
    (x, y) => {
      // Check elements in reverse order (top to bottom in z-index)
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (isPointInElement(x, y, element)) {
          return element;
        }
      }
      return null;
    },
    [elements]
  );

  const getCanvasCoordinates = useCallback(
    (e) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left - offset.x) / scale,
        y: (e.clientY - rect.top - offset.y) / scale,
      };
    },
    [offset.x, offset.y, scale]
  );

  const handleCanvasDoubleClick = useCallback(
    (e) => {
      if (tool !== "text") return;

      const point = getCanvasCoordinates(e);
      const element = getElementAtPosition(point.x, point.y);

      if (element && element.type === "text") {
        setEditingNode(element.id);
        setEditText(element.text);
        setElements((prev) =>
          prev.map((el) =>
            el.id === element.id ? { ...el, isEditing: true } : el
          )
        );
      }
    },
    [getCanvasCoordinates, getElementAtPosition, tool]
  );

  const startDrawing = useCallback(
    (e) => {
      if (!isEditMode || !canvasRef.current) return;

      const point = getCanvasCoordinates(e);

      if (tool === "select") {
        const element = getElementAtPosition(point.x, point.y);
        setSelectedElement(element);
        if (element) {
          setCurrentElement({
            ...element,
            isMoving: true,
            offsetX: point.x - element.x,
            offsetY: point.y - element.y,
          });
        } else {
          setIsPanning(true);
          setPanStart({ x: point.x - offset.x, y: point.y - offset.y });
        }
      } else if (tool === "freehand") {
        setIsDrawing(true);
        setFreehandPoints([{ x: point.x, y: point.y }]);
      } else if (tool === "text") {
        const newText = {
          id: `text_${Date.now()}`,
          type: "text",
          x: point.x,
          y: point.y,
          text: "Double click to edit",
          width: 200,
          height: 30,
          isEditing: true,
          stroke: textColor,
          fontSize: fontSize,
        };
        setElements((prev) => [...prev, newText]);
        setSelectedElement(newText.id);
        setCurrentElement({ ...newText, isEditing: true });
      } else if (tool === "rectangle" || tool === "circle" || tool === "line") {
        setIsDrawing(true);

        if (tool === "line") {
          setCurrentElement({
            id: `element_${Date.now()}`,
            type: "line",
            points: [
              { x: point.x, y: point.y },
              { x: point.x, y: point.y },
            ],
            stroke: strokeColor,
            strokeWidth,
          });
          return;
        }

        setCurrentElement({
          id: `element_${Date.now()}`,
          type: tool === "circle" ? "ellipse" : "rectangle",
          x: point.x,
          y: point.y,
          width: 0,
          height: 0,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
        });
      }
    },
    [
      isEditMode,
      tool,
      getCanvasCoordinates,
      getElementAtPosition,
      offset,
      strokeColor,
      strokeWidth,
      fillColor,
      textColor,
      fontSize,
    ]
  );

  const updateElement = useCallback((id, updates, isMoving = false) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );

    if (isMoving) {
      setCurrentElement((prev) => (prev ? { ...prev, ...updates } : null));
    }
  }, []);

  const isPointInElement = (x, y, element) => {
    switch (element.type) {
      case "rectangle":
        return (
          x >= element.x &&
          x <= element.x + element.width &&
          y >= element.y &&
          y <= element.y + element.height
        );
      case "ellipse":
        const centerX = element.x + element.width / 2;
        const centerY = element.y + element.height / 2;
        const radiusX = Math.abs(element.width) / 2;
        const radiusY = Math.abs(element.height) / 2;
        return (
          Math.pow((x - centerX) / radiusX, 2) +
            Math.pow((y - centerY) / radiusY, 2) <=
          1
        );
      case "line":
        // Simple line hit detection (can be improved)
        const dist = distanceToLine(
          x,
          y,
          element.points[0].x,
          element.points[0].y,
          element.points[1].x,
          element.points[1].y
        );
        return dist < 10; // 10px tolerance
      case "freehand":
        // Check distance to any point in the freehand drawing
        for (let i = 0; i < element.points.length - 1; i++) {
          const dist = distanceToLine(
            x,
            y,
            element.points[i].x,
            element.points[i].y,
            element.points[i + 1].x,
            element.points[i + 1].y
          );
          if (dist < 10) return true;
        }
        return false;
      case "text":
        return (
          x >= element.x &&
          x <= element.x + (element.width || 200) &&
          y >= element.y - 20 && // Account for text baseline
          y <= element.y + 10
        );
      default:
        return false;
    }
  };

  const drawOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply transformations
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Draw all elements
    elements.forEach((element) => {
      drawElement(ctx, element, selectedElement === element.id);
    });

    // Draw current element being drawn
    if (currentElement) {
      drawElement(ctx, currentElement, true);
    }

    // Draw freehand points if in freehand mode
    if (isDrawing && freehandPoints.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const firstPoint = freehandPoints[0];
      ctx.moveTo(firstPoint.x, firstPoint.y);

      for (let i = 1; i < freehandPoints.length; i++) {
        const point = freehandPoints[i];
        ctx.lineTo(point.x, point.y);
      }

      ctx.stroke();
    }

    // Draw view summary if enabled
    if (showViewSummary && topicData) {
      drawViewSummary(ctx, topicData);
    }

    ctx.restore();
  }, [
    elements,
    currentElement,
    isDrawing,
    freehandPoints,
    selectedElement,
    offset,
    scale,
    showGrid,
    showViewSummary,
    topicData,
  ]);

  const drawGrid = (ctx, width, height) => {
    ctx.save();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axis
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.restore();
  };

  const drawViewSummary = (ctx, data) => {
    if (!data || typeof data !== "object") return;

    const summaryX = 20;
    const summaryY = 20;
    const summaryWidth = 300;
    const itemHeight = 24;
    const padding = 15;

    // Prepare summary items
    const summaryItems = [
      { label: "Total Elements", value: elements.length },
      {
        label: "Shapes",
        value: elements.filter((e) => ["rectangle", "ellipse"].includes(e.type))
          .length,
      },
      {
        label: "Text Boxes",
        value: elements.filter((e) => e.type === "text").length,
      },
      {
        label: "Drawings",
        value: elements.filter((e) => e.type === "freehand").length,
      },
    ];

    // Add topic-specific data if available
    if (data.title) {
      summaryItems.unshift({
        label: "Topic",
        value: data.title,
        isHeader: true,
      });
    }
    if (data.description) {
      summaryItems.push({
        label: "Description",
        value: data.description,
        isLongText: true,
      });
    }
    if (data.keyPoints?.length > 0) {
      summaryItems.push({
        label: "Key Points",
        value: data.keyPoints,
        isList: true,
      });
    }

    // Calculate dynamic height based on content
    let contentHeight = 60; // Start with padding + title height
    summaryItems.forEach((item) => {
      if (item.isLongText) {
        // Approximate height for long text (2 lines)
        contentHeight += 40;
      } else if (item.isList) {
        // Height for list items
        contentHeight += (item.value?.length || 0) * 20 + 10;
      } else {
        // Regular item height
        contentHeight += itemHeight;
      }
    });

    // Ensure minimum height
    const minHeight = 120;
    const boxHeight = Math.max(contentHeight, minHeight);

    // Draw summary box
    ctx.save();

    // Background with opacity and shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Rounded rectangle with border
    const radius = 12;
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.strokeStyle = themeColors.border || "#e5e7eb";
    ctx.lineWidth = 1;

    // Draw the box
    ctx.beginPath();
    ctx.roundRect(summaryX, summaryY, summaryWidth, boxHeight, radius);
    ctx.fill();
    ctx.stroke();
    ctx.shadowColor = "transparent"; // Reset shadow

    // Title with accent line
    ctx.fillStyle = themeColors.text || "#1f2937";
    ctx.font = "600 16px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";

    // Draw accent line under title
    const titleY = summaryY + 32;
    ctx.fillText("Summary", summaryX + 15, titleY);

    // Draw content
    let y = titleY + 10;
    const startX = summaryX + padding;
    const contentWidth = summaryWidth - padding * 2;

    ctx.font = "14px system-ui, -apple-system, sans-serif";

    summaryItems.forEach((item, index) => {
      if (item.isHeader) {
        // Header style
        y += 10;
        ctx.fillStyle = themeColors.topic || themeColors.bg || "#3b82f6";
        ctx.font = "600 14px system-ui, -apple-system, sans-serif";
        ctx.fillText(item.value, startX, y);
        y += 5;
        // Draw line under header
        ctx.beginPath();
        ctx.strokeStyle = themeColors.border || "#e5e7eb";
        ctx.moveTo(startX, y);
        ctx.lineTo(summaryX + summaryWidth - padding, y);
        ctx.stroke();
        y += 15;
      } else if (item.isLongText) {
        // Long text with wrapping
        y += 5;
        ctx.fillStyle = themeColors.text || "#1f2937";
        ctx.font = "500 13px system-ui, -apple-system, sans-serif";

        // Simple text wrapping
        const words = item.value.split(" ");
        let line = "";
        let lineCount = 0;
        const maxWidth = contentWidth - 10;

        for (const word of words) {
          const testLine = line + word + " ";
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && lineCount < 2) {
            ctx.fillText(line, startX, y);
            line = word + " ";
            y += 18;
            lineCount++;
          } else {
            line = testLine;
          }
        }

        if (line && lineCount < 2) {
          ctx.fillText(line, startX, y);
          y += 20;
        } else if (lineCount >= 2) {
          // Add ellipsis if text is too long
          ctx.fillText(line.substring(0, line.length - 3) + "...", startX, y);
          y += 20;
        }

        y += 5;
      } else if (item.isList) {
        // List items
        y += 5;
        ctx.fillStyle = themeColors.text || "#1f2937";
        ctx.font = "500 13px system-ui, -apple-system, sans-serif";

        (item.value || []).forEach((point, i) => {
          if (i < 3) {
            // Show max 3 key points
            ctx.fillText(`• ${point}`, startX, y);
            y += 18;
          } else if (i === 3) {
            // Show remaining count if more than 3
            const remaining = (item.value || []).length - 3;
            ctx.fillStyle = themeColors.topic || "#3b82f6";
            ctx.fillText(`+${remaining} more...`, startX, y);
            y += 18;
          }
        });

        y += 5;
      } else {
        // Regular item
        ctx.fillStyle = themeColors.text || "#1f2937";
        ctx.font = "14px system-ui, -apple-system, sans-serif";

        // Label
        ctx.fillText(item.label, startX, y);

        // Value with different color
        ctx.fillStyle = themeColors.topic || themeColors.bg || "#3b82f6";
        ctx.textAlign = "right";
        ctx.fillText(
          item.value.toString(),
          summaryX + summaryWidth - padding,
          y
        );
        ctx.textAlign = "left";

        y += itemHeight;
      }
    });

    ctx.restore();
  };

  const drawElement = (ctx, element, isSelected = false) => {
    switch (element.type) {
      case "rectangle":
        ctx.fillStyle = element.fill || "#ffffff";
        ctx.strokeStyle = element.stroke || "#000000";
        ctx.lineWidth = element.strokeWidth || 2;
        ctx.beginPath();
        ctx.rect(element.x, element.y, element.width, element.height);
        ctx.fill();
        ctx.stroke();
        break;

      case "ellipse":
        ctx.fillStyle = element.fill || "#ffffff";
        ctx.strokeStyle = element.stroke || "#000000";
        ctx.lineWidth = element.strokeWidth || 2;
        ctx.beginPath();
        const centerX = element.x + element.width / 2;
        const centerY = element.y + element.height / 2;
        const radiusX = Math.abs(element.width) / 2;
        const radiusY = Math.abs(element.height) / 2;
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;

      case "line":
        ctx.strokeStyle = element.stroke || "#000000";
        ctx.lineWidth = element.strokeWidth || 2;
        ctx.beginPath();
        ctx.moveTo(element.points[0].x, element.points[0].y);
        ctx.lineTo(element.points[1].x, element.points[1].y);
        ctx.stroke();
        break;

      case "freehand":
        if (element.points.length < 2) return;
        ctx.strokeStyle = element.stroke || "#000000";
        ctx.lineWidth = element.strokeWidth || 2;
        ctx.beginPath();
        ctx.moveTo(element.points[0].x, element.points[0].y);
        for (let i = 1; i < element.points.length; i++) {
          ctx.lineTo(element.points[i].x, element.points[i].y);
        }
        ctx.stroke();
        break;

      case "text":
        if (element.isEditing) return;
        ctx.fillStyle = element.stroke || textColor;
        ctx.font = `bold ${element.fontSize || fontSize}px Arial`;
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        const lines = element.text.split("\n");
        const lineHeight = (element.fontSize || fontSize) * 1.2;

        if (element.text.trim() !== "") {
          const textWidth = Math.max(
            ...lines.map((line) => ctx.measureText(line).width)
          );
          const textHeight = lines.length * lineHeight;

          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(
            element.x - 5,
            element.y - 2,
            textWidth + 10,
            textHeight + 4
          );
        }

        ctx.fillStyle = element.stroke || textColor;
        lines.forEach((line, i) => {
          ctx.fillText(line, element.x, element.y + i * lineHeight);
        });
        break;
    }
  };

  const drawSelectionBox = (ctx, element) => {
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 1 / scale; // Scale the border with zoom
    ctx.setLineDash([5 / scale, 5 / scale]); // Scale dashes with zoom

    if (element.type === "text") {
      const textWidth = ctx.measureText(element.text).width;
      const textHeight =
        (element.fontSize || 16) * (element.text.split("\n").length || 1);
      ctx.strokeRect(
        element.x - 4 / scale,
        element.y - 4 / scale,
        textWidth + 8 / scale,
        textHeight + 8 / scale
      );
    } else if (element.points) {
      // For lines and freehand
      const bounds = getElementBounds(element);
      ctx.strokeRect(
        bounds.x - 4 / scale,
        bounds.y - 4 / scale,
        bounds.width + 8 / scale,
        bounds.height + 8 / scale
      );
    } else {
      // For shapes
      ctx.strokeRect(
        element.x - 4 / scale,
        element.y - 4 / scale,
        element.width + 8 / scale,
        element.height + 8 / scale
      );
    }

    // Draw resize handles (for non-text elements)
    if (
      element.type !== "text" &&
      element.type !== "line" &&
      element.type !== "freehand"
    ) {
      const handles = [
        { x: element.x, y: element.y }, // top-left
        { x: element.x + element.width / 2, y: element.y }, // top
        { x: element.x + element.width, y: element.y }, // top-right
      ];
    }
  };

  const draw = useCallback(
    (e) => {
      if ((!isDrawing && !currentElement) || !canvasRef.current) return;

      const point = getCanvasCoordinates(e);

      if (isPanning) {
        setOffset({
          x: point.x - panStart.x,
          y: point.y - panStart.y,
        });
        return;
      }

      if (tool === "freehand" && isDrawing) {
        setFreehandPoints((prev) => [...prev, { x: point.x, y: point.y }]);
      } else if (currentElement) {
        if (currentElement.isMoving) {
          updateElement(
            currentElement.id,
            {
              x: point.x - currentElement.offsetX,
              y: point.y - currentElement.offsetY,
            },
            true
          );
        } else {
          const newElement = { ...currentElement };
          if (tool === "line") {
            newElement.points = [
              newElement.points[0],
              { x: point.x, y: point.y },
            ];
          } else {
            newElement.width = point.x - currentElement.x;
            newElement.height = point.y - currentElement.y;
          }
          setCurrentElement(newElement);
        }
      }
    },
    [
      isDrawing,
      currentElement,
      isPanning,
      panStart,
      tool,
      getCanvasCoordinates,
      updateElement,
    ]
  );

  const stopDrawing = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawing && tool === "freehand" && freehandPoints.length > 1) {
      const newElement = {
        id: `element_${Date.now()}`,
        type: "freehand",
        points: [...freehandPoints],
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
      setElements((prev) => [...prev, newElement]);
    } else if (currentElement && !currentElement.isMoving) {
      if (
        Math.abs(currentElement.width) > 5 ||
        Math.abs(currentElement.height) > 5 ||
        (currentElement.points && currentElement.points.length > 1)
      ) {
        setElements((prev) => [...prev, currentElement]);
      }
    }

    setFreehandPoints([]);
    setIsDrawing(false);
    setCurrentElement(null);
  }, [
    isPanning,
    isDrawing,
    tool,
    freehandPoints,
    currentElement,
    strokeColor,
    strokeWidth,
  ]);

  // Set up canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle window resize
    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation frame loop
    let animationFrameId;
    const render = () => {
      drawOnCanvas();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawOnCanvas]);

  // Render
  return (
    <div className="relative w-full h-full bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
          onDoubleClick={handleCanvasDoubleClick}
          onContextMenu={(e) => e.preventDefault()}
          className="block w-full h-full touch-none"
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>

      {/* Toolbar */}
      {isEditMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md flex items-center space-x-2">
          <Button
            variant={tool === "select" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("select")}
            title="Select"
          >
            <MousePointer className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "text" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("text")}
            title="Text"
          >
            <Type className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <Button
            variant={tool === "rectangle" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("rectangle")}
            title="Rectangle"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "circle" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("circle")}
            title="Circle"
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "line" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("line")}
            title="Line"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "freehand" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("freehand")}
            title="Freehand"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))}
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.1))}
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setScale(1);
              setOffset({ x: 0, y: 0 });
            }}
            title="Reset View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowGrid(!showGrid)}
            title={showGrid ? "Hide Grid" : "Show Grid"}
          >
            <Sliders className="h-4 w-4" />
          </Button>
          {/* Add this to your toolbar, near other tool buttons */}
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Text:</span>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer"
              title="Text Color"
            />
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-1 px-3 text-xs text-gray-500 flex justify-between items-center border-t border-gray-200">
        <div>
          {Math.round(scale * 100)}% • {canvasSize.width} × {canvasSize.height}
        </div>
        <div>{isEditMode ? "Edit Mode" : "View Mode"}</div>
      </div>
    </div>
  );
};

// Helper components
const Switch = ({ checked, onCheckedChange, className = "" }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
      checked ? "bg-blue-500" : "bg-gray-200"
    } ${className}`}
  >
    <span
      className={`block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

export default DiagramCanvas;
