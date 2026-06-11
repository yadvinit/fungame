"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which famous stout brand features a gold harp on its label?",
    options: [
      "Budweiser",
      "Guinness 🍺",
      "Corona Extra",
      "Heineken"
    ],
    correctAnswerIndex: 1,
    explanation: "Correct! The gold harp has been the official trademark of Guinness since 1862!"
  },
  {
    id: 2,
    text: "What is the primary alkaloid chemical compound naturally found in tobacco leaves?",
    options: [
      "Caffeine",
      "Nicotine 🚬",
      "Morphine",
      "Taurine"
    ],
    correctAnswerIndex: 1,
    explanation: "Indeed! Nicotine is the naturally occurring stimulant found in tobacco leaves."
  },
  {
    id: 3,
    text: "Which famous sativa-dominant hybrid weed strain is known for its distinct diesel-like fuel aroma?",
    options: [
      "White Widow",
      "Northern Lights",
      "Sour Diesel 🍁",
      "Granddaddy Purple"
    ],
    correctAnswerIndex: 2,
    explanation: "Correct! Sour Diesel (sometimes called Sour D) is a fast-acting sativa-dominant strain named after its pungent, diesel-like smell."
  },
  {
    id: 4,
    text: "What is Nupur's ultimate survival code when corporate tasks pile up on Friday night?",
    options: [
      "Close the laptop and order a double shot! 🥃💼",
      "Write code until sunrise",
      "Organize email inbox folders",
      "Call an emergency sync meeting"
    ],
    correctAnswerIndex: 0,
    explanation: "Spot on! Respect the weekend, close the laptop, and toast to freedom! 🥃"
  }
];

interface FoodieQuizProps {
  onComplete: (allCorrect: boolean) => void;
}

export default function FoodieQuiz({ onComplete }: FoodieQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionClick = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedIdx(optionIndex);
    setIsAnswered(true);

    if (optionIndex !== currentQuestion.correctAnswerIndex) {
      // She answered incorrectly
      setTimeout(() => {
        setIsFailed(true);
      }, 1000);
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Quiz finished successfully with all correct answers
      onComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsFailed(false);
  };

  if (isFailed) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ color: "var(--color-red)", fontSize: "4rem", marginBottom: "16px" }}>
          <XCircle size={64} style={{ margin: "0 auto" }} />
        </div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Brain Overheated! 🥵</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
          Oh no, Nupur! You got a question wrong. Real workaholics know their coffee and cocktails inside out! Let's reboot and try again!
        </p>
        <button className="btn btn-primary" onClick={handleReset}>
          Reboot System <RotateCcw size={18} />
        </button>
      </div>
    );
  }

  const progressPercent = ((currentIdx) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div className="badge badge-yellow">
          Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
        </div>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
          <HelpCircle size={14} /> Spicy Level: Hot
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <h2 style={{ fontSize: "1.35rem", marginBottom: "24px", lineHeight: "1.4" }}>
        {currentQuestion.text}
      </h2>

      <div style={{ marginBottom: "24px" }}>
        {currentQuestion.options.map((option, idx) => {
          let btnClass = "option-btn";
          let icon = null;

          if (isAnswered) {
            if (idx === currentQuestion.correctAnswerIndex) {
              btnClass += " correct";
              icon = <CheckCircle2 size={18} />;
            } else if (idx === selectedIdx) {
              btnClass += " incorrect";
              icon = <XCircle size={18} />;
            }
          }

          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
            >
              <span>{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {isAnswered && selectedIdx === currentQuestion.correctAnswerIndex && (
        <div 
          style={{ 
            background: "rgba(255, 255, 255, 0.03)", 
            padding: "16px", 
            borderRadius: "12px", 
            marginBottom: "24px",
            borderLeft: "3px solid var(--color-yellow)",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)"
          }}
        >
          {currentQuestion.explanation}
        </div>
      )}

      {isAnswered && selectedIdx === currentQuestion.correctAnswerIndex && (
        <button className="btn btn-primary" onClick={handleNext}>
          {currentIdx === QUIZ_QUESTIONS.length - 1 ? "Complete Challenge!" : "Next Question"} 
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
