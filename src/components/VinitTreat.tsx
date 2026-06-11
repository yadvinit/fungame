"use client";

import React, { useState } from "react";
import { Coffee, Heart, AlertTriangle } from "lucide-react";

interface VinitTreatProps {
  onComplete: (treat: string) => void;
}

export default function VinitTreat({ onComplete }: VinitTreatProps) {
  const [noPosition, setNoPosition] = useState<{ top: string; left: string; position: "relative" | "absolute" }>({
    top: "0px",
    left: "0px",
    position: "relative"
  });
  const [hasHovered, setHasHovered] = useState(false);

  const handleNoHover = () => {
    // Move the button to a random position inside the container boundaries
    const randomTop = Math.floor(Math.random() * 65 + 15) + "%";
    const randomLeft = Math.floor(Math.random() * 65 + 15) + "%";
    setNoPosition({
      top: randomTop,
      left: randomLeft,
      position: "absolute"
    });
    setHasHovered(true);
  };

  const handleYes = () => {
    onComplete("☕ Cold Coffee (With Extra Love & Ice)");
  };

  return (
    <div className="card" style={{ textAlign: "center", minHeight: "450px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div className="badge badge-spice" style={{ marginBottom: "16px" }}>
          <Heart size={14} fill="currentColor" /> Mandatory Sweetness Clause
        </div>

        <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", lineHeight: "1.2" }}>
          A Quick Question for Sanika... 😉
        </h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "16px" }}>
          Since you completed the foodie trivia, are you bringing a delicious treat for Vinit tomorrow to brighten his day?
        </p>
      </div>

      {/* Action Container with relative positioning for runaway button */}
      <div 
        style={{ 
          position: "relative", 
          height: "220px", 
          width: "100%", 
          background: "rgba(255, 255, 255, 0.02)", 
          border: "1px dashed rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          overflow: "hidden"
        }}
      >
        <button 
          className="btn btn-primary" 
          style={{ width: "auto", minWidth: "160px", zIndex: 10 }}
          onClick={handleYes}
        >
          Yes! Cold Coffee ☕
        </button>

        <button
          className="btn btn-secondary"
          style={{
            width: "auto",
            position: noPosition.position,
            top: noPosition.position === "absolute" ? noPosition.top : "auto",
            left: noPosition.position === "absolute" ? noPosition.left : "auto",
            transform: noPosition.position === "absolute" ? "translate(-50%, -50%)" : "none",
            transition: "all 0.1s ease-out",
            zIndex: 20,
            whiteSpace: "nowrap"
          }}
          onMouseEnter={handleNoHover}
          onClick={handleNoHover} // For mobile taps
          onTouchStart={handleNoHover} // Direct mobile touch
        >
          No, absolutely not! 🙅‍♀️
        </button>
      </div>

      {hasHovered && (
        <p 
          style={{ 
            color: "var(--color-orange)", 
            fontSize: "0.85rem", 
            fontWeight: "600", 
            marginTop: "12px",
            animation: "float-slow 4s ease-in-out infinite"
          }}
        >
          ⚠️ Error 404: The 'No' option is currently out of service. Please select Yes!
        </p>
      )}
    </div>
  );
}
