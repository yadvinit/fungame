"use client";

import React, { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import FoodieQuiz from "@/components/FoodieQuiz";
import DinnerWheel from "@/components/DinnerWheel";
import VinitTreat from "@/components/VinitTreat";
import SummaryCard from "@/components/SummaryCard";

type GameStep = "WELCOME" | "QUIZ" | "WHEEL" | "TREAT" | "SUMMARY";

export default function Home() {
  const [step, setStep] = useState<GameStep>("WELCOME");
  const [dinnerOption, setDinnerOption] = useState<string | null>(null);
  const [vinitTreat, setVinitTreat] = useState<string | null>(null);

  const handleStartGame = () => {
    setStep("QUIZ");
  };

  const handleQuizComplete = (allCorrect: boolean) => {
    if (allCorrect) {
      setStep("TREAT");
    }
  };

  const handleTreatComplete = (treat: string) => {
    setVinitTreat(treat);
    setStep("WHEEL");
  };

  const handleWheelComplete = (option: string) => {
    setDinnerOption(option);
    setStep("SUMMARY");
  };

  const handleRestart = () => {
    setDinnerOption(null);
    setVinitTreat(null);
    setStep("WELCOME");
  };

  return (
    <>
      {/* Floating Background Foods for Atmosphere */}
      <div className="background-decorations">
        <div className="floating-item item-1" style={{ fontSize: "3rem" }}>🌶️</div>
        <div className="floating-item item-2" style={{ fontSize: "2.5rem" }}>🍟</div>
        <div className="floating-item item-3" style={{ fontSize: "2.5rem" }}>🍕</div>
        <div className="floating-item item-4" style={{ fontSize: "3rem" }}>🔥</div>
      </div>

      <main className="app-container">
        {step === "WELCOME" && (
          <WelcomeScreen onStart={handleStartGame} />
        )}

        {step === "QUIZ" && (
          <FoodieQuiz onComplete={handleQuizComplete} />
        )}

        {step === "WHEEL" && (
          <DinnerWheel onComplete={handleWheelComplete} />
        )}

        {step === "TREAT" && (
          <VinitTreat onComplete={handleTreatComplete} />
        )}

        {step === "SUMMARY" && dinnerOption && vinitTreat && (
          <SummaryCard 
            dinnerOption={dinnerOption} 
            vinitTreat={vinitTreat} 
            onRestart={handleRestart} 
          />
        )}
      </main>
    </>
  );
}
