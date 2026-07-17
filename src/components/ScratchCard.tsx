import React, { useRef, useEffect, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  coverText?: string;
  className?: string;
}

export function ScratchCard({
  children,
  coverText = "Scratch to reveal date!",
  className = "",
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set actual size in memory (scaled to account for extra pixel density)
    const ratio = window.devicePixelRatio || 1;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);

    // Fill with gold/maroon gradient cover
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#a87a38"); // gold
    gradient.addColorStop(1, "#662222"); // maroon

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some text instruction on the cover
    ctx.fillStyle = "#fefefa"; // ivory
    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(coverText, width / 2, height / 2);

    // Prepare for scratching
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 30; // scratch brush size
    ctx.globalCompositeOperation = "destination-out";
  }, [coverText]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();

    checkPercentage();
  };

  const startScratching = (e: React.MouseEvent | React.TouchEvent) => {
    if (isScratched) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopScratching = () => {
    setIsDrawing(false);
  };

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    // Prevent scrolling while scratching on mobile
    if ("touches" in e && e.cancelable) {
      e.preventDefault();
    }
    const { x, y } = getMousePos(e);
    scratch(x, y);
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentCount = 0;

    // Check every 4th byte (alpha channel)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = (transparentCount / (pixels.length / 4)) * 100;
    if (percentage > 50) {
      // If 50% scratched, reveal entirely
      setIsScratched(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden rounded-xl touch-none ${className}`}
    >
      <div className="relative z-0 select-none">{children}</div>

      {!isScratched && (
        <canvas
          ref={canvasRef}
          onMouseDown={startScratching}
          onMouseMove={handleMouseMove}
          onMouseUp={stopScratching}
          onMouseLeave={stopScratching}
          onTouchStart={startScratching}
          onTouchMove={handleMouseMove}
          onTouchEnd={stopScratching}
          onTouchCancel={stopScratching}
          className="absolute inset-0 z-10 cursor-pointer transition-opacity duration-500"
          style={{ opacity: isScratched ? 0 : 1 }}
        />
      )}
    </div>
  );
}
