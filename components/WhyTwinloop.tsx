"use client";

import React from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp"

const StatsBanner: React.FC = () => {
    const stats = [
        { value: "1/10th", label: "The time to insight" },
        { value: "80%", label: "More affordable" },
        { value: "10x", label: "Scale of testing" },
        { value: "24/7", label: "Always-on availability" },
    ];

    return (
        <section className="bg-[#236a7c] text-white py-12 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#b8dce7] tracking-tight leading-tight">
                            <span className="text-white">No brainer</span> compared to traditional market research
                        </h2>
                    </ScrollFadeUp>
                </div>

                <ScrollFadeUp yOffset={20} duration={0.8} delay={0.2}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tighter text-white group-hover:scale-110 transition-transform duration-500 ease-out">{stat.value}</div>
                                <p className="text-base md:text-xl font-bold text-[#b8dce7] leading-snug max-w-[200px] mx-auto">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </ScrollFadeUp>
            </div>
        </section>
    );
};

export default StatsBanner;
