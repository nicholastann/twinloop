"use client";

import React, { useState } from "react";
import {
  FaExclamationTriangle, FaRandom, FaLightbulb, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFadeUp from "./ui/ScrollFadeUp";

// --- Data ---
const PROBLEMS = [
  {
    icon: <FaExclamationTriangle size={24} />,
    text: "Primary research is either too slow, expensive, or shallow",
  },
  {
    icon: <FaRandom size={24} />,
    text: "Customer feedback is scattered and episodic",
  },
  {
    icon: <FaLightbulb size={24} />,
    text: "Teams are often forced to rely on gut-feel",
  },
];

const ProblemSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % PROBLEMS.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + PROBLEMS.length) % PROBLEMS.length);

  return (
    <section id="problem" className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 text-center">

        {/* --- Header Section --- */}
        <ScrollFadeUp yOffset={30} duration={1} delay={0.1} className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[0.9] mb-20 pt-10 max-w-5xl mx-auto">
          Despite more tools and data than ever before, the missing link is <span className="text-[#236a7c]">Customer Connection</span>
        </ScrollFadeUp>

        <ScrollFadeUp yOffset={30} duration={0.8} delay={0.2}>

          {/* --- Mobile Carousel --- */}
          <div className="md:hidden relative min-h-[400px] flex items-center justify-center">
            <button onClick={handlePrev} className="absolute left-0 z-20 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronLeft size={20} /></button>
            <button onClick={handleNext} className="absolute right-0 z-20 p-2 text-[#236a7c]/50 hover:text-[#236a7c]"><FaChevronRight size={20} /></button>

            <div className="w-full max-w-[320px] mx-auto overflow-visible relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) handleNext();
                    else if (offset.x > 50) handlePrev();
                  }}
                  className="bg-white/50 rounded-3xl p-8 border border-[#236a7c]/10 shadow-[0_10px_30px_-5px_rgba(35,106,124,0.1)] cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 transform scale-100">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#def2f8] to-[#ffffff] border border-white shadow-md text-[#236a7c] text-3xl">
                        {PROBLEMS[activeIndex].icon}
                      </div>
                    </div>
                    <p className="text-[#0f172a] text-xl font-black leading-tight tracking-tight">
                      {PROBLEMS[activeIndex].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {PROBLEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#236a7c] w-6" : "bg-[#236a7c]/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* --- Desktop Grid --- */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 max-w-7xl mx-auto divide-x divide-[#236a7c]/20">
            {PROBLEMS.map((problem, index) => (
              <div
                key={index}
                className="group relative p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#e0f7fa]/30"
              >

                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 ease-out">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#def2f8] to-[#ffffff] border border-white shadow-[0_10px_30px_-5px_rgba(35,106,124,0.25)] text-[#236a7c] text-4xl group-hover:text-[#0e4b5b] group-hover:shadow-[0_20px_40px_-5px_rgba(35,106,124,0.4)] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#236a7c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {problem.icon}
                  </div>
                </div>

                <p className="text-[#0f172a] text-2xl md:text-3xl font-black leading-tight max-w-xs mx-auto tracking-tight group-hover:text-[#164656] transition-colors duration-300">
                  {problem.text}
                </p>

                <div className="w-16 h-1.5 bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full transform scale-x-0 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </ScrollFadeUp>

      </div>
    </section>
  );
};

export default ProblemSection;
