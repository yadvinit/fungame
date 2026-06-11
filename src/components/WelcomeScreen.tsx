"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="card" style={{ textAlign: "center", position: "relative" }}>
      {/* Decorative Floating SVGs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
        <div style={{ animation: "float-slow 4s ease-in-out infinite", color: "var(--color-red)" }}>
          <Flame size={48} fill="currentColor" />
        </div>
        <div 
          style={{ 
            animation: "float-reverse 5s ease-in-out infinite", 
            fontSize: "3rem", 
            lineHeight: 1 
          }}
        >
          🍟
        </div>
      </div>

      <div className="badge badge-spice" style={{ marginBottom: "16px" }}>
        <Sparkles size={14} /> Specially for Sanika Thote
      </div>

      <h1 style={{ fontSize: "2.4rem", marginBottom: "12px", lineHeight: "1.2" }}>
        Sanika's <span style={{ color: "var(--color-orange)", textShadow: "0 0 15px rgba(255,107,0,0.4)" }}>Foodie Adventure</span> Challenge
      </h1>
      
      <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", marginBottom: "32px" }}>
        Hey Sanika! Welcome to your personal foodie quest. Prove your elite taste buds by answering questions about your favorite and newly tried dishes, spin the wheel of destiny for tonight's dinner, and unlock a treat promise for Vinit! 🍕🧁
      </p>

      <button className="btn btn-primary" onClick={onStart}>
        Start Foodie Quest! <Flame size={18} fill="currentColor" />
      </button>

      {/* Decorative details inside the card */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: "-10px", 
          right: "-10px", 
          opacity: 0.05, 
          fontSize: "10rem", 
          pointerEvents: "none" 
        }}
      >
        🍟
      </div>
    </div>
  );
}
