"use client";

import React, { useState } from "react";
import { Coffee, Gift, Heart, HelpCircle, Utensils } from "lucide-react";

interface VinitTreatProps {
  onComplete: (treat: string) => void;
}

const TREAT_OPTIONS = [
  { text: "🍟 A fresh packet of Peri Peri Fries!", icon: "🍟" },
  { text: "🍩 Creamy chocolate donuts", icon: "🍩" },
  { text: "☕ A cold coffee / iced latte shake", icon: "☕" },
  { text: "🍪 Premium chocolate chip cookies", icon: "🍪" },
  { text: "🎁 A surprise gourmet snack of his choice!", icon: "🎁" },
  { text: "✍️ Write a custom snack...", icon: "✍️" }
];

export default function VinitTreat({ onComplete }: VinitTreatProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [customTreat, setCustomTreat] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIdx === null) {
      setError("Please select a treat option!");
      return;
    }

    const chosenOption = TREAT_OPTIONS[selectedIdx];
    let finalTreat = chosenOption.text;

    if (chosenOption.text.includes("Write a custom snack")) {
      if (!customTreat.trim()) {
        setError("Please type in what custom snack you'll bring!");
        return;
      }
      finalTreat = `✍️ Custom: ${customTreat.trim()}`;
    }

    setError("");
    onComplete(finalTreat);
  };

  return (
    <div className="card">
      <div className="badge badge-spice" style={{ marginBottom: "16px" }}>
        <Heart size={14} fill="currentColor" /> Spice Partnership Contract
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", lineHeight: "1.2" }}>
        Treat for Vinit! 🤝
      </h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "24px" }}>
        Since you cleared the foodie trivia and decided tonight's dinner, what delicious treat are you bringing for Vinit tomorrow to keep the food synergy alive?
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {TREAT_OPTIONS.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                style={{
                  background: isSelected ? "rgba(255, 107, 0, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  border: isSelected ? "2px solid var(--color-orange)" : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "16px 12px",
                  color: isSelected ? "#ffffff" : "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  fontWeight: isSelected ? "700" : "500"
                }}
                onClick={() => {
                  setSelectedIdx(idx);
                  setError("");
                }}
              >
                <span style={{ fontSize: "2rem" }}>{option.icon}</span>
                <span>{option.text.split("!")[0].split("...")[0]}</span>
              </button>
            );
          })}
        </div>

        {selectedIdx !== null && TREAT_OPTIONS[selectedIdx].text.includes("Write a custom snack") && (
          <div className="input-group" style={{ animation: "float-slow 8s ease-in-out infinite" }}>
            <label className="input-label" htmlFor="custom-treat-input">What's the custom treat?</label>
            <input
              id="custom-treat-input"
              type="text"
              className="input-field"
              placeholder="e.g. A hot samosa or chocolate lava cake"
              value={customTreat}
              onChange={(e) => {
                setCustomTreat(e.target.value);
                setError("");
              }}
            />
          </div>
        )}

        {error && (
          <p style={{ color: "var(--color-red)", fontSize: "0.9rem", marginBottom: "16px", fontWeight: "600" }}>
            ⚠️ {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          Confirm Treat Promise 🔒
        </button>
      </form>
    </div>
  );
}
