"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaUserFriends, FaRocket, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const steps = [
  {
    id: "01",
    label: "Data Collection",
    title: "Collect Rich First-Party Data",
    description: "We intake your existing data or run AI-moderated voice interviews to gather deep, first-party insights from your actual customers.",
    icon: <FaMicrophone />,
    theme: "from-[#236a7c] to-[#1e5b6d]", // Teal Gradient
    image: "/step1.png"
  },
  {
    id: "02",
    label: "Twin Generation",
    title: "Generate Robust Digital Twins",
    description: "Our proprietary engine creates thousands of personalized digital twins that accurately mirror the behaviors and preferences of your audience.",
    icon: <FaUserFriends />,
    theme: "from-[#0f172a] to-[#334155]", // Slate Gradient
    image: "/step2.png"
  },
  {
    id: "03",
    label: "Simulation",
    title: "Run Simulations On-Demand",
    description: "Test creative, messaging, and strategic decisions against your twin panel in minutes to get statistically significant feedback before you launch.",
    icon: <FaRocket />,
    theme: "from-[#236a7c] to-[#164656]", // Dark Teal Gradient
    image: "/step3.png"
  }
];

const HowItWorksDisplay: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % steps.length);
  const handlePrev = () => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000); // 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-6 lg:px-8 relative">
      <div className="flex flex-col gap-8">

        {/* Step Navigation - Horizontal Pills */}
        <div className="hidden md:flex flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-4 md:pb-1 px-4 md:px-0 scrollbar-hide md:justify-center">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`relative px-10 py-6 rounded-full text-base font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden group mb-1 cursor-pointer ${activeStep === index
                ? "text-white shadow-[0_10px_30px_rgba(35,106,124,0.3)] scale-105"
                : "bg-white/50 text-[#334155] border border-white/60 hover:bg-white hover:scale-105"
                }`}
            >
              {activeStep === index && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${step.theme}`}
                  transition={{ duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-4">
                <span className={`opacity-50 ${activeStep === index ? "text-white" : "text-[#236a7c]"}`}>{step.id}</span>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Area */}
        {/* Dynamic Display Area */}
        <div className="relative">
          {/* Arrows (Mobile) */}
          <button onClick={handlePrev} className="md:hidden absolute left-0 top-[40%] -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronLeft size={24} /></button>
          <button onClick={handleNext} className="md:hidden absolute right-0 top-[40%] -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronRight size={24} /></button>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-24 items-center max-w-7xl mx-auto px-8 md:px-0">

            {/* Text Content with Framer Motion */}
            <div className="text-center lg:text-left order-1 lg:order-1 py-4 md:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) handleNext();
                    else if (offset.x > 50) handlePrev();
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-4 md:mb-8 group-hover:scale-[1.02] transition-transform duration-500 justify-center lg:justify-start">
                    <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br ${steps[activeStep].theme} text-white text-2xl md:text-3xl shadow-xl md:shadow-2xl shrink-0`}>
                      {steps[activeStep].icon}
                    </div>
                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-tight text-center md:text-left">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-xl md:text-3xl text-[#334155] leading-relaxed font-medium max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image / Graphic Display */}
            <div className="relative order-2 lg:order-2 h-[350px] md:h-[450px] lg:h-[550px]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#236a7c]/20 to-[#b8dce7]/30 blur-3xl rounded-full scale-110 pointer-events-none animate-pulse" />

              <div className="relative w-full h-full bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden p-8 group">
                <div className="absolute inset-8 rounded-[2.5rem] overflow-hidden bg-[#f8fafc]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeStep}
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.05, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -50) handleNext();
                        else if (offset.x > 50) handlePrev();
                      }}
                      className="w-full h-full object-contain p-8 cursor-grab active:cursor-grabbing"
                    />
                  </AnimatePresence>
                </div>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[3rem]" />
              </div>
            </div>

          </div>

          {/* Mobile Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeStep ? "bg-[#236a7c] w-6" : "bg-[#236a7c]/20"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksDisplay;
