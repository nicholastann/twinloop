import React, { useState } from "react";
import {
  FaExclamationTriangle, FaRandom, FaLightbulb
} from "react-icons/fa";
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
  return (
    <section id="problem" className="py-12 md:py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 text-center">

        {/* --- Header Section --- */}
        <ScrollFadeUp yOffset={30} duration={1} delay={0.1} className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[0.9] mb-12 md:mb-20 pt-10 max-w-5xl mx-auto">
          Despite more tools and data than ever before, the missing link is <span className="text-[#236a7c]">Customer Connection</span>
        </ScrollFadeUp>

        <ScrollFadeUp yOffset={30} duration={0.8} delay={0.2}>
          {/* --- Unified Grid (Vertical on Mobile, Horizontal on Desktop) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto divide-y md:divide-y-0 md:divide-x divide-[#236a7c]/20 border-t border-b border-[#236a7c]/20 md:border-none">
            {PROBLEMS.map((problem, index) => (
              <div
                key={index}
                className="group relative p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-[#e0f7fa]/20 cursor-default"
              >
                {/* Icon Wrapper - Lifts on hover */}
                <div className="mb-6 md:mb-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#def2f8] to-[#ffffff] border border-white shadow-[0_10px_30px_-5px_rgba(35,106,124,0.25)] text-[#236a7c] text-3xl md:text-4xl relative overflow-hidden group-hover:shadow-[0_15px_30px_-5px_rgba(35,106,124,0.4)] group-hover:border-[#236a7c]/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#236a7c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {problem.icon}
                  </div>
                </div>

                {/* Text - Darkens on hover */}
                <p className="text-[#334155] text-xl md:text-3xl font-black leading-tight max-w-xs mx-auto tracking-tight transition-colors duration-300 group-hover:text-[#0f172a]">
                  {problem.text}
                </p>

                {/* Bottom Line - Expands on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#236a7c] group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100 ease-out" />
              </div>
            ))}
          </div>
        </ScrollFadeUp>

      </div>
    </section>
  );
};

export default ProblemSection;
