"use client";

import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Flame, Sparkles, AlertTriangle } from "lucide-react";

interface DinnerWheelProps {
  onComplete: (dinnerOption: string) => void;
}

const DINNER_OPTIONS = [
  "🍗 Butter Chicken & Butter Naan",
  "🥩 Mutton Seekh Kebab Platter",
  "🍔 Crispy Chicken Burger",
  "🍛 Tandoori Chicken Tikka",
  "🍤 Spicy Chili Garlic Prawns",
  "🍲 Goan Fish Curry & Rice",
  "🍗 Hot Crispy Chicken Wings",
  "🍽️ Absolutely Nothing! (Khaali Thali)"
];

const COLORS = [
  "#e2583e", // Coral Red
  "#160f0d", // Dark Charcoal
  "#fbb03b", // Honey Gold
  "#2c1c18", // Medium Brown
  "#ffc72c", // Gold Yellow
  "#1c1210", // Deeper Charcoal
  "#ff6d54", // Soft Coral
  "#221411"  // Darkest Charcoal
];

export default function DinnerWheel({ onComplete }: DinnerWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const angleRef = useRef(0);
  const totalSlices = DINNER_OPTIONS.length;
  const arcSize = (2 * Math.PI) / totalSlices;

  // Draw the wheel on mounting/updating
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;
    ctx.clearRect(0, 0, width, height);

    // Draw segments
    for (let i = 0; i < totalSlices; i++) {
      const sliceAngle = i * arcSize + angle;
      ctx.fillStyle = COLORS[i % COLORS.length];

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 10, sliceAngle, sliceAngle + arcSize);
      ctx.lineTo(radius, radius);
      ctx.fill();

      // Add a thin border
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(sliceAngle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Outfit', sans-serif";
      
      const rawText = DINNER_OPTIONS[i];
      let cleanText = rawText.split(" (")[0];
      if (cleanText.length > 20) {
        cleanText = cleanText.substring(0, 18) + "...";
      }

      ctx.fillText(cleanText, radius - 25, 5);
      ctx.restore();
    }

    // Outer gold border ring
    ctx.strokeStyle = "var(--color-orange)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.stroke();

    // Small inner circle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(radius, radius, 28, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "var(--color-red)";
    ctx.beginPath();
    ctx.arc(radius, radius, 22, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    drawWheel(0);
  }, []);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const startAngle = angleRef.current % (2 * Math.PI);
    
    // RIGGED MATH: We want it to land exactly on index 7: "Absolutely Nothing! (Khaali Thali)"
    // To center index 7 under the pointer at 1.5 * PI (270 degrees):
    // R = 1.5 * PI - (7.5 * arcSize)
    // R = 1.5 * PI - 1.875 * PI = -0.375 * PI = 1.625 * PI
    const targetPos = 1.625 * Math.PI;
    const spinCount = Math.floor(Math.random() * 3 + 6); // Spin 6 to 8 full rotations
    const targetAngle = targetPos + spinCount * 2 * Math.PI;

    const duration = 4500; // 4.5 seconds spin
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      angleRef.current = startAngle + (targetAngle - startAngle) * easeProgress;
      drawWheel(angleRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setHasSpun(true);
        setResult(DINNER_OPTIONS[7]); // Landed on index 7
        
        // Trigger a fake sad confetti/balloon animation or actual funny sound
        confetti({
          particleCount: 40,
          spread: 40,
          colors: ["#888888", "#555555", "#000000"], // sad grey/black confetti
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="badge badge-yellow" style={{ marginBottom: "16px" }}>
        <Sparkles size={14} /> The Non-Veg Feast Destiny
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Spin for Dinner!</h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "28px" }}>
        Spin the wheel of delicious non-veg options to determine your dinner tonight! 🍖
      </p>

      <div className="wheel-outer">
        {/* Pointer pointing down at 12 o'clock */}
        <div className="wheel-pointer">
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 40L0 0H30L15 40Z" fill="var(--color-orange)" />
            <path d="M15 32L5 0H25L15 32Z" fill="var(--color-red)" />
          </svg>
        </div>

        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          style={{ width: "320px", height: "320px", display: "block" }}
        />

        <div className="wheel-center-button" onClick={spin}>
          {isSpinning ? "🌀" : "SPIN"}
        </div>
      </div>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <div 
            style={{ 
              padding: "16px", 
              background: "rgba(226, 88, 62, 0.1)", 
              borderRadius: "16px", 
              border: "1px solid rgba(226, 88, 62, 0.3)", 
              marginBottom: "20px" 
            }}
          >
            <div style={{ color: "var(--color-red)", display: "flex", justifyContent: "center", marginBottom: "8px" }}>
              <AlertTriangle size={32} />
            </div>
            <p style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff", margin: "4px 0" }}>
               Laded on: {result}
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: "8px 0" }}>
              Whaaat?! The wheel of destiny has spoken! You got absolutely NOTHING for dinner! 😭 Better share Vinit's cold coffee!
            </p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }} 
                onClick={() => { setHasSpun(false); setResult(null); }}
              >
                Spin Again 🌀
              </button>
              
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }} 
                onClick={() => onComplete(result)}
              >
                Accept Destiny 🤐
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
