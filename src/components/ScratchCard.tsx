import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  imageSrc: string;
  coverColor?: string;
  text?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ 
  imageSrc, 
  coverColor = '#C6AA76', 
  text = 'Scratch to reveal' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution to match its display size exactly
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          // Draw image with blur and ash effect
          ctx.filter = 'blur(20px) grayscale(100%) brightness(0.9)';
          
          // Calculate object-cover dimensions
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          // Reset filter for text
          ctx.filter = 'none';
          
          // Add text
          ctx.font = '600 13px "Cinzel", serif';
          ctx.shadowColor = 'rgba(0,0,0,0.55)';
          ctx.shadowBlur = 6;
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.letterSpacing = '3px';
          ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
        };
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [imageSrc, coverColor, text]);

  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDrawing || isRevealed) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Check how much is scratched to auto-reveal the rest
    // For performance, we can skip precise pixel calculation and just rely on user scratching enough
    // But a simple timeout or reveal button might be needed if they don't scratch it all.
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full mx-auto rounded-[50%] overflow-hidden shadow-xl border-4 border-[#C6AA76]/30 cursor-pointer"
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
      onMouseMove={scratch}
      onTouchStart={() => setIsDrawing(true)}
      onTouchEnd={() => setIsDrawing(false)}
      onTouchMove={scratch}
    >
      <img 
        src={imageSrc} 
        alt="Hidden Reveal" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
