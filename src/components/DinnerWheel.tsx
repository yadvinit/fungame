"use client";

import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Flame, Sparkles, Trophy } from "lucide-react";

interface DinnerWheelProps {
  onComplete: (dinnerOption: string) => void;
}

const DINNER_OPTIONS = [
  "🍕 Cheesy Homemade Pizza",
  "🍝 Creamy Alfredo Pasta",
  "🍜 Spicy Hakka Noodles",
  "🍔 Crispy Paneer Burger",
  "🌮 Loaded Cheese Nachos",
  "🍣 Fresh Veggie Sushi Roll",
  "🍛 Butter Paneer & Garlic Naan",
  "🥗 Dry Salad (Just kidding! Spin again!)"
];

const COLORS = [
  "#e31b23", // Peri Peri Red
  "#160f0d", // Dark Charcoal
  "#ff6b00", // Fiery Orange
  "#2c1c18", // Medium Brown
  "#ffc72c", // Gold Yellow
  "#1c1210", // Deeper Charcoal
  "#ff4d4d", // Soft Chili Red
  "#221411"  // Darkest Charcoal
];

export default function DinnerWheel({ onComplete }: DinnerWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const angleRef = useRef(0);
  const speedRef = useRef(0);
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

    // Draw shadows
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.restore();

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
      ctx.font = "bold 12px 'Outfit', sans-serif";
      
      // Shorten the labels for drawing inside the circle slices
      const rawText = DINNER_OPTIONS[i];
      let cleanText = rawText.split(" (")[0]; // remove extra notes for brevity
      if (cleanText.length > 20) {
        cleanText = cleanText.substring(0, 18) + "...";
      }

      ctx.fillText(cleanText, radius - 25, 5);
      ctx.restore();
    }

    // Outer gold border ring
    ctx.strokeStyle = "var(--color-yellow)";
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

    // Initial spin speed (randomized for unpredictability)
    speedRef.current = Math.random() * 0.2 + 0.25; // Speed in radians per frame

    const animate = () => {
      // Rotate the wheel
      angleRef.current += speedRef.current;
      drawWheel(angleRef.current);

      // Decelerate (friction)
      speedRef.current *= 0.982;

      // Stop condition
      if (speedRef.current < 0.0015) {
        setIsSpinning(false);
        setHasSpun(true);
        
        // Calculate winning slice
        // Pointer is at the top (-Math.PI/2 or 3/2 * Math.PI)
        const currentAngle = angleRef.current % (2 * Math.PI);
        let adjustedAngle = (1.5 * Math.PI - currentAngle) % (2 * Math.PI);
        if (adjustedAngle < 0) {
          adjustedAngle += 2 * Math.PI;
        }
        
        const winningIndex = Math.floor(adjustedAngle / arcSize);
        const winningText = DINNER_OPTIONS[winningIndex];
        
        setResult(winningText);

        // Fire celebration confetti!
        if (!winningText.includes("Salad")) {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="badge badge-yellow" style={{ marginBottom: "16px" }}>
        <Sparkles size={14} /> The Wheel of Dinner Destiny
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>What's for Dinner?</h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "28px" }}>
        Spin the magical wheel to decide what you will eat tonight! Let fate do its job. 🌟
      </p>

      <div className="wheel-outer">
        {/* Pointer pointing down at 12 o'clock */}
        <div className="wheel-pointer">
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 40L0 0H30L15 40Z" fill="var(--color-yellow)" />
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
        <div style={{ marginTop: "20px", animation: "float-slow 6s ease-in-out infinite" }}>
          {result.includes("Salad") ? (
            <div style={{ padding: "16px", background: "rgba(227, 27, 35, 0.1)", borderRadius: "16px", border: "1px solid rgba(227, 27, 35, 0.2)", marginBottom: "20px" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--color-red)" }}>
                🥗 Salad? Oh HELL no!
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                No one eats salad on a cheat day. Spin again!
              </p>
              <button className="btn btn-secondary" style={{ marginTop: "12px" }} onClick={() => { setHasSpun(false); setResult(null); }}>
                Spin Again 🌀
              </button>
            </div>
          ) : (
            <div style={{ padding: "20px", background: "rgba(255, 199, 44, 0.08)", borderRadius: "16px", border: "1px solid rgba(255, 199, 44, 0.2)", marginBottom: "20px" }}>
              <div style={{ color: "var(--color-yellow)", display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                <Trophy size={32} />
              </div>
              <p style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: "600" }}>
                Tonight's Feast Is Settled
              </p>
              <p style={{ fontSize: "1.3rem", fontWeight: "800", color: "#ffffff", margin: "8px 0" }}>
                {result}
              </p>
              <button className="btn btn-primary" style={{ marginTop: "16px" }} onClick={() => onComplete(result)}>
                Secure This Feast! <Flame size={18} fill="currentColor" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
