"use client";

import React from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp";

const validations = [
    {
        title: "Stanford & Google DeepMind Research",
        description: "Simulating 1,052 people, agents replicated human behavior with 85% accuracy.",
        logo: "/stanford.png",
        logo2: "/deepMind.png",
        href: "https://drive.google.com/file/d/1BHEm78faqPACOzCTwLplLFDYxbUCcbBj/view?usp=sharing",
    },
    {
        title: "Columbia University Studies",
        description: "Modeling 2,058 participants, digital twins predicted real-world decisions with 88% accuracy.",
        logo: "/columbia.png",
        href: "https://drive.google.com/file/d/1oQIfnKgTQPdosyuky1pB_xPJ0869Ip4x/view?usp=share_link",
    },
];

const ValidationSection: React.FC = () => {
    return (
        <section id="validation" className="py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 mb-24">
                <div className="text-center mb-20">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-tighter mb-6">
                            Predictive Power.<br /><span className="text-[#236a7c]">Proven Performance.</span>
                        </h2>
                    </ScrollFadeUp>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {validations.map((v, index) => (
                        <ScrollFadeUp key={index} yOffset={20} duration={0.8} delay={0.2 + index * 0.1} className="h-full">
                            <a
                                href={v.href || "#"}
                                target={v.href ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="group relative flex flex-col h-full bg-white/50 backdrop-blur-sm border border-white/60 p-12 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(35,106,124,0.12)] hover:-translate-y-2 transition-all duration-300 text-center items-center hover:bg-white"
                            >
                                <div className="h-32 flex items-center justify-center gap-6 mb-8 w-full">
                                    <img
                                        src={v.logo}
                                        alt={v.title}
                                        className={`w-auto object-contain ${index === 1 ? 'h-32' : 'h-14'}`}
                                    />
                                    {v.logo2 && (
                                        <>
                                            <div className="h-8 w-px bg-gray-200" />
                                            <img src={v.logo2} alt="Partner Logo" className="h-10 w-auto object-contain" />
                                        </>
                                    )}
                                </div>

                                <h3 className="text-3xl font-black mb-6 text-[#236a7c] leading-tight">{v.title}</h3>

                                <p className="text-[#334155] text-xl font-medium leading-relaxed mb-10 flex-grow max-w-md mx-auto">
                                    {v.description}
                                </p>

                                {v.href && (
                                    <div className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#236a7c]/10 text-[#236a7c] font-extrabold text-lg group-hover:bg-[#236a7c] group-hover:text-white transition-all duration-300">
                                        Read Study <span className="ml-2">→</span>
                                    </div>
                                )}
                            </a>
                        </ScrollFadeUp>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default ValidationSection;
