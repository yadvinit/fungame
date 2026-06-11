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
    text: "What is Sanika's absolute favorite dessert when she wants something sweet?",
    options: [
      "Plain bread toast",
      "Sizzling Brownie with Vanilla Ice Cream! 🍨🍫",
      "Fruit salad without dressing",
      "An oatmeal cookie"
    ],
    correctAnswerIndex: 1,
    explanation: "Correct! Nothing beats the hot, sizzling brownie paired with freezing cold vanilla ice cream!"
  },
  {
    id: 2,
    text: "Which newly tried dish has Sanika been super excited to cook or eat recently?",
    options: [
      "Creamy Homemade White Sauce Pasta! 🍝",
      "Boiled eggs with salt",
      "Bitter gourd soup",
      "Plain white rice"
    ],
    correctAnswerIndex: 0,
    explanation: "Indeed! Freshly made creamy white sauce pasta is a absolute masterpiece!"
  },
  {
    id: 3,
    text: "What is Sanika's ultimate go-to comfort street food or snack for a perfect cheat day?",
    options: [
      "Plain salted crackers",
      "Boiled broccoli florets",
      "Crispy Loaded Cheese Fries! 🍟🧀",
      "Steamed brown rice cakes"
    ],
    correctAnswerIndex: 2,
    explanation: "Correct! Crispy, hot fries loaded with gooey melted cheese make for the best comfort snack!"
  },
  {
    id: 4,
    text: "What is the perfect beverage she loves to pair with a delicious dinner?",
    options: [
      "Thick Creamy Iced Latte / Cold Coffee! ☕✨",
      "Warm tap water",
      "Unsweetened green tea",
      "Strong black coffee"
    ],
    correctAnswerIndex: 0,
    explanation: "Perfect! A sweet, chilled iced latte is the ultimate companion to balance any delicious meal!"
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
        <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Taste Buds Confused! 🥵</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
          Oh no, Sanika! You got a question wrong. Real foodies know their favorite dishes inside out! Let's try again!
        </p>
        <button className="btn btn-primary" onClick={handleReset}>
          Try Again <RotateCcw size={18} />
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
