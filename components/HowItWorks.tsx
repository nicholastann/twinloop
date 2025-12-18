"use client";

import React from "react";
import HowItWorksDisplay from "../components/FlowDiagram";
import ScrollFadeUp from "./ui/ScrollFadeUp"

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-10 bg-transparent text-[#0f1a1f]">
      {/* Section Header */}
      <div className="text-center mb-8">
        <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight max-w-5xl mx-auto">
            At the intersection of AI interviews and digital personas, <span className="text-[#236a7c]"> Twinloop lets you test every brand decision in minutes</span>
          </h2>
        </ScrollFadeUp>
      </div>

      <ScrollFadeUp yOffset={30} duration={1} delay={0.1}>
        <HowItWorksDisplay />
      </ScrollFadeUp>
    </section>
  );
};

export default HowItWorks;
