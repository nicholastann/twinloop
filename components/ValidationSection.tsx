"use client";

import React from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp";
import { motion } from "framer-motion";

const validations = [
    {
        title: "Stanford & Google DeepMind research",
        description: "Simulating 1,052 people, agents replicated human behavior with 85% accuracy.",
        logo: "/stanford.png",
        logo2: "/deepMind.png",
        href: "https://drive.google.com/file/d/1BHEm78faqPACOzCTwLplLFDYxbUCcbBj/view?usp=sharing",
    },
    {
        title: "Columbia University studies",
        description: "Modeling 2,058 participants, digital twins predicted real-world decisions with 88% accuracy.",
        logo: "/columbia.png",
        href: "https://drive.google.com/file/d/1oQIfnKgTQPdosyuky1pB_xPJ0869Ip4x/view?usp=share_link",
    },
];

const ValidationSection: React.FC = () => {
    return (
        <section id="validation" className="pt-12 pb-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 mb-8">
                <div className="text-center mb-12">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
                            Our digital twin methodology is informed by<br /><span className="text-[#236a7c]">published academic research.</span>
                        </h2>
                    </ScrollFadeUp>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
                    {validations.map((v, index) => (
                        <ScrollFadeUp key={index} yOffset={20} duration={0.8} delay={0.2 + index * 0.1} className="h-full">
                            <motion.a
                                href={v.href || "#"}
                                target={v.href ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(35,106,124,0.12)" }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="group relative flex flex-col h-full min-h-[350px] bg-white/50 backdrop-blur-sm border border-white/60 p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center items-center hover:bg-white transition-colors duration-300"
                            >
                                <div className="h-24 flex items-center justify-center gap-4 mb-6 w-full">
                                    <img
                                        src={v.logo}
                                        alt={v.title}
                                        className={`w-auto object-contain ${index === 1 ? 'h-24' : 'h-10'}`}
                                    />
                                    {v.logo2 && (
                                        <>
                                            <div className="h-6 w-px bg-gray-200" />
                                            <img src={v.logo2} alt="Partner Logo" className="h-8 w-auto object-contain" />
                                        </>
                                    )}
                                </div>

                                <h3 className="text-2xl font-black mb-4 text-[#236a7c] leading-tight">{v.title}</h3>

                                <p className="text-[#334155] text-lg font-medium leading-relaxed mb-8 flex-grow max-w-md mx-auto">
                                    {v.description}
                                </p>

                                {v.href && (
                                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#236a7c]/10 text-[#236a7c] font-extrabold text-base group-hover:bg-[#236a7c] group-hover:text-white transition-all duration-300">
                                        Read Study <span className="ml-2">→</span>
                                    </div>
                                )}
                            </motion.a>
                        </ScrollFadeUp>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default ValidationSection;
