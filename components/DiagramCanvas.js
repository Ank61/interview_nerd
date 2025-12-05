import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiagramCanvas = ({
    topicData,
    topic,
    themeColors,
    isOpen,
    onClose
}) => {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

    // Calculate canvas size based on content
    useEffect(() => {
        if (!topicData) return;

        const conceptCount = topicData.reduce((acc, level) => acc + (level.concepts?.length || 0), 0);
        const width = Math.max(800, conceptCount * 120);
        const height = Math.max(600, (topicData.length || 1) * 200 + 200);
        setCanvasSize({ width, height });
    }, [topicData]);

    // Draw diagram on canvas
    const drawDiagram = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !topicData) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvasSize;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Apply transformations
        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);

        // Set background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);

        for (let x = 0; x < width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y < height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.setLineDash([]);

        // Draw central topic node
        const centerX = width / 2;
        const centerY = 100;

        // Topic circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
        ctx.fillStyle = themeColors.bg;
        ctx.fill();
        ctx.strokeStyle = themeColors.border;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Topic text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(topic, centerX, centerY);

        // Draw levels and concepts
        topicData.forEach((level, levelIndex) => {
            const levelY = 250 + levelIndex * 200;
            const levelColor = levelIndex === 0 ? '#10b981' : '#f59e0b'; // Green for beginner, orange for advanced

            // Level label
            ctx.fillStyle = levelColor;
            ctx.font = 'bold 14px system-ui';
            ctx.textAlign = 'left';
            ctx.fillText(level.label || `Level ${levelIndex + 1}`, 50, levelY);

            // Draw concepts for this level
            if (level.concepts && level.concepts.length > 0) {
                const conceptSpacing = Math.min(120, (width - 200) / level.concepts.length);
                const startX = (width - (level.concepts.length - 1) * conceptSpacing) / 2;

                level.concepts.forEach((concept, conceptIndex) => {
                    const conceptX = startX + conceptIndex * conceptSpacing;
                    const conceptY = levelY + 50;

                    // Draw connection line from topic to concept
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY + 60);
                    ctx.lineTo(conceptX, conceptY - 20);
                    ctx.strokeStyle = themeColors.border;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Concept box
                    const boxWidth = 100;
                    const boxHeight = 40;
                    const borderRadius = 8;

                    ctx.beginPath();
                    ctx.roundRect(conceptX - boxWidth / 2, conceptY - boxHeight / 2, boxWidth, boxHeight, borderRadius);
                    ctx.fillStyle = themeColors.light;
                    ctx.fill();
                    ctx.strokeStyle = themeColors.topic;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Concept text
                    ctx.fillStyle = themeColors.text;
                    ctx.font = '12px system-ui';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // Wrap text if too long
                    const maxWidth = boxWidth - 10;
                    const text = concept.topic;
                    if (ctx.measureText(text).width > maxWidth) {
                        const words = text.split(' ');
                        let line = '';
                        let y = conceptY - 8;

                        for (let word of words) {
                            const testLine = line + word + ' ';
                            if (ctx.measureText(testLine).width > maxWidth && line !== '') {
                                ctx.fillText(line, conceptX, y);
                                line = word + ' ';
                                y += 14;
                            } else {
                                line = testLine;
                            }
                        }
                        ctx.fillText(line, conceptX, y);
                    } else {
                        ctx.fillText(text, conceptX, conceptY);
                    }

                    // Draw tags if any
                    if (concept.tags && concept.tags.length > 0) {
                        ctx.fillStyle = '#64748b';
                        ctx.font = '10px system-ui';
                        const tagText = concept.tags.slice(0, 2).join(', ');
                        ctx.fillText(tagText, conceptX, conceptY + 25);
                    }
                });
            }
        });

        // Draw legend
        const legendX = width - 150;
        const legendY = 20;

        ctx.fillStyle = '#475569';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText('Legend:', legendX, legendY);

        // Beginner indicator
        ctx.fillStyle = '#10b981';
        ctx.fillRect(legendX, legendY + 10, 12, 12);
        ctx.fillStyle = '#475569';
        ctx.fillText('Beginner', legendX + 18, legendY + 20);

        // Advanced indicator
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(legendX, legendY + 30, 12, 12);
        ctx.fillStyle = '#475569';
        ctx.fillText('Advanced', legendX + 18, legendY + 40);

        ctx.restore();
    }, [topicData, topic, themeColors, scale, offset, canvasSize]);

    useEffect(() => {
        drawDiagram();
    }, [drawDiagram]);

    // Mouse wheel zoom
    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setScale(prev => Math.min(Math.max(0.5, prev * delta), 3));
    };

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Reset view
    const resetView = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    };

    // Download diagram
    const downloadDiagram = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `${topic}-diagram.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] max-w-7xl max-h-[900px] overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {topic} - Visual Summary
                            </h2>
                            <span className="text-sm text-gray-500">
                                {topicData?.reduce((acc, level) => acc + (level.concepts?.length || 0), 0) || 0} concepts
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Zoom controls */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setScale(prev => Math.min(prev * 1.2, 3))}
                                className="p-2"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setScale(prev => Math.max(prev * 0.8, 0.5))}
                                className="p-2"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetView}
                                className="p-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={downloadDiagram}
                                className="p-2"
                            >
                                <Download className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="p-2"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Canvas container */}
                    <div
                        className="relative flex-1 overflow-hidden bg-gray-100"
                        style={{ height: 'calc(90vh - 80px)' }}
                    >
                        <canvas
                            ref={canvasRef}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            className="absolute cursor-move"
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />

                        {/* Scale indicator */}
                        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-3 py-2">
                            <span className="text-sm font-medium text-gray-600">
                                {Math.round(scale * 100)}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DiagramCanvas;
