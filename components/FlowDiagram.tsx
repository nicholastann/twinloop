"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaUserFriends, FaRocket } from "react-icons/fa";

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

  return (
    <section className="container mx-auto px-6 lg:px-8 relative">
      <div className="flex flex-col gap-20">

        {/* Step Navigation - Horizontal Pills */}
        <div className="flex justify-center flex-wrap gap-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`relative px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden group ${activeStep === index
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
              <span className="relative z-10 flex items-center gap-3">
                <span className={`opacity-50 ${activeStep === index ? "text-white" : "text-[#236a7c]"}`}>{step.id}</span>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Area */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">

          {/* Text Content with Framer Motion */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 bg-gradient-to-br ${steps[activeStep].theme} text-white text-3xl shadow-xl`}>
                  {steps[activeStep].icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xl text-[#334155] leading-relaxed font-medium">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image / Graphic Display */}
          <div className="relative order-1 lg:order-2">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#236a7c]/20 to-[#b8dce7]/30 blur-3xl rounded-full scale-110 pointer-events-none animate-pulse" />

            <div className="relative aspect-[4/3] w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden p-4 group">
              <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-[#f8fafc]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.05, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-contain p-4"
                  />
                </AnimatePresence>
              </div>
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[2.5rem]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksDisplay;
