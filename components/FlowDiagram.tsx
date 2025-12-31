"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaMicrophone, FaUserFriends, FaRocket, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const steps = [
  {
    id: "01",
    label: "Data Collection",
    title: "Collect Rich First-Party Data",
    description: "We run voice AI–moderated interviews with hundreds of your customers to capture deep, open-ended insights at scale so you no longer have to compromise between speed, depth, and rigor.",
    icon: <FaMicrophone />,
    theme: "from-[#236a7c] to-[#1e5b6d]", // Teal Gradient
    image: "/step1.png"
  },
  {
    id: "02",
    label: "Twin Generation",
    title: "Generate Robust Digital Twins",
    description: "Our engine builds 1:1 personalized digital twins of your customers that mirror their preferences, opinions, and behaviors so you can test decisions with confidence.",
    icon: <FaUserFriends />,
    theme: "from-[#0f172a] to-[#334155]", // Slate Gradient
    image: "/step2.png"
  },
  {
    id: "03",
    label: "Simulation",
    title: "Run Simulations On-Demand",
    description: "Use your twin panel to ideate, test, and refine creative, messaging, and strategic decisions in minutes before you launch.",
    icon: <FaRocket />,
    theme: "from-[#236a7c] to-[#164656]", // Dark Teal Gradient
    image: "/step3.png"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
};

const HowItWorksDisplay: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleNext = () => {
    setDirection(1);
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Auto-advance timer - only runs when in view
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds
    return () => clearInterval(timer);
  }, [activeStep, isInView]);

  return (
    <section ref={containerRef} className="container mx-auto px-6 lg:px-8 relative">
      <div className="flex flex-col gap-8">

        {/* Step Navigation - Horizontal Pills */}
        <div className="hidden md:flex flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-4 md:pb-1 px-4 md:px-0 scrollbar-hide md:justify-center">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeStep ? 1 : -1);
                setActiveStep(index);
              }}
              className={`relative px-8 md:px-10 py-5 md:py-6 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group mb-1 cursor-pointer border select-none ${activeStep === index
                ? "text-white border-transparent shadow-[0_10px_30px_rgba(35,106,124,0.4)] scale-105 z-10"
                : "bg-white border-gray-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5"
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
        <div className="relative">
          {/* Arrows (Mobile) */}
          <button onClick={handlePrev} className="md:hidden absolute left-0 top-[65px] -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronLeft size={24} /></button>
          <button onClick={handleNext} className="md:hidden absolute right-0 top-[65px] -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronRight size={24} /></button>

          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-4 lg:gap-12 items-center max-w-7xl mx-auto px-0 md:px-0">

            {/* Text Content with Framer Motion */}
            <div className="text-center lg:text-left order-1 lg:order-1 py-4 md:py-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
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
                    <div className={`inline-flex items-center justify-center w-16 h-16 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-gradient-to-br ${steps[activeStep].theme} text-white text-2xl md:text-2xl shadow-xl md:shadow-2xl shrink-0`}>
                      {steps[activeStep].icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0f172a] tracking-tight leading-tight text-center md:text-left">
                      <span className="md:hidden">{activeStep + 1}. </span>
                      {steps[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-lg md:text-xl text-[#334155] leading-relaxed font-medium max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image / Graphic Display */}
            {/* Image / Graphic Display */}
            <div className="relative order-2 lg:order-2 w-full h-[400px] md:h-[550px] lg:h-[620px] flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#236a7c]/20 to-[#b8dce7]/30 blur-3xl rounded-full scale-110 pointer-events-none animate-pulse" />

              <motion.div
                layout
                className="relative w-auto h-auto bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden group"
                transition={{ duration: 0.4 }}
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.img
                    key={activeStep}
                    custom={direction}
                    variants={slideVariants}
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -50) handleNext();
                      else if (offset.x > 50) handlePrev();
                    }}
                    className="block w-auto h-auto max-h-[390px] md:max-h-[540px] lg:max-h-[610px] max-w-full object-contain cursor-grab active:cursor-grabbing"
                  />
                </AnimatePresence>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-[2rem]" />
              </motion.div>
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
