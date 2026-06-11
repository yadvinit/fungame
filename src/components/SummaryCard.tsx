"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Copy, Flame, RotateCcw, Share2, Sparkles } from "lucide-react";

interface SummaryCardProps {
  dinnerOption: string;
  vinitTreat: string;
  onRestart: () => void;
}

export default function SummaryCard({ dinnerOption, vinitTreat, onRestart }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `🌀 *Nupur's High-Vibe Chill & Grind Challenge Completed!* 💼\n\n👤 *Candidate:* Nupur\n👑 *Status:* Certified Workaholic & High-Vibe Queen\n🥤 *Beverage Won:* ${dinnerOption}\n💀 *Vinit's Fate Tomorrow:* ${vinitTreat}\n\n_Contract locked! Plain water duty awaits Nupur, and Vinit's fate is sealed!_ 💧☠️`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Fun mini confetti explosion on copy
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const celebrateAgain = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="card" style={{ textAlign: "center", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div className="badge badge-spice">
          <Sparkles size={14} /> High-Vibe Queen
        </div>
      </div>

      <h2 style={{ fontSize: "2rem", marginBottom: "8px", color: "var(--color-orange)" }}>
        Lounge Challenge Clear! 🍸
      </h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "24px" }}>
        Nupur has officially sealed the high-vibe chill and grind contract. No backing out!
      </p>

      {/* Stylized Receipt */}
      <div className="receipt">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-orange)" }}>
            HIGH-VIBE CONTRACT RECEIPT
          </h3>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            DATE: {new Date().toLocaleDateString("en-IN")} | ID: #BAR-{(Math.random() * 10000).toFixed(0)}
          </span>
        </div>

        <div className="receipt-divider"></div>

        <div className="receipt-row">
          <span className="receipt-label">Candidate:</span>
          <span className="receipt-value" style={{ color: "var(--color-orange)" }}>Nupur</span>
        </div>
        
        <div className="receipt-row">
          <span className="receipt-label">Lounge Status:</span>
          <span className="receipt-value" style={{ color: "var(--color-orange)" }}>Hydrated (100% Legit)</span>
        </div>

        <div className="receipt-divider"></div>

        <div className="receipt-row" style={{ flexDirection: "column", gap: "4px" }}>
          <span className="receipt-label">Beverage Won:</span>
          <span className="receipt-value" style={{ fontSize: "1.05rem", color: "#ffffff" }}>
            {dinnerOption}
          </span>
        </div>

        <div className="receipt-divider"></div>

        <div className="receipt-row" style={{ flexDirection: "column", gap: "4px" }}>
          <span className="receipt-label">Vinit's Fate Tomorrow:</span>
          <span className="receipt-value" style={{ fontSize: "1.05rem", color: "#ffffff" }}>
            {vinitTreat}
          </span>
        </div>

        <div className="receipt-divider" style={{ borderStyle: "dashed" }}></div>

        <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", textAlign: "center", fontStyle: "italic" }}>
          "By clicking below, Nupur agrees to remain sober with plain water tonight and carry out the designated fate for Vinit tomorrow."
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button className="btn btn-primary" onClick={handleCopy}>
          {copied ? (
            <>
              Copied Agreement! <Check size={18} />
            </>
          ) : (
            <>
              Copy Contract to Share <Copy size={18} />
            </>
          )}
        </button>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={celebrateAgain}>
            Celebrate 🎉
          </button>
          
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onRestart}>
            Play Again 🌀
          </button>
        </div>
      </div>

      {/* Decorative background element */}
      <div 
        style={{ 
          position: "absolute", 
          top: "-20px", 
          left: "-20px", 
          opacity: 0.03, 
          fontSize: "12rem", 
          pointerEvents: "none",
          transform: "rotate(-15deg)"
        }}
      >
        🍸
      </div>
    </div>
  );
}
