"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaLeaf, FaGlobeAmericas, FaChartLine, FaBolt, FaLayerGroup } from "react-icons/fa";
import ScrollFadeUp from "./ui/ScrollFadeUp";

const caseStudies = [
    {
        id: "gbk",
        company: "GBK Collective",
        title: "Predicting Movie Success",
        logo: "/companyLogos/gbk.png",
        stats: [
            { label: "Correlation", value: "0.93" },
            { label: "Twin Panel", value: "450" },
        ],
        context: "We collected first-party data from 450 consumers using voice AI-moderated interviews and built personalized digital twins to test interest in upcoming theatrical releases.",
        findings: "Digital twins accurately captured market behavior structure, correctly distinguishing event films from mid-tier releases and identifying outliers.",
        impact: "Strongly predicted real consumer behavior, aligning closely with box office results when awareness was incorporated."
    },
    {
        id: "rootlabs",
        company: "Rootlabs",
        title: "Scaling Content",
        logo: "/companyLogos/rootLabs.png",
        stats: [
            { label: "Speed", value: "<1 Week" },
            { label: "Twins", value: "200+" },
        ],
        context: "Rootlabs needed a faster way to test creator-led content for their supplement brands. We built 200+ personalized digital twins representing their core audiences in under one week.",
        findings: "Used twins to test brand names, value props, and creator hooks without re-running research for every iteration.",
        impact: "Enabled content iteration in days, not weeks, producing high-confidence messaging grounded in first-party consumer thinking."
    },
    {
        id: "nysom",
        company: "Nysom",
        title: "Global Brand Launch",
        logo: "/companyLogos/nysom.png",
        stats: [
            { label: "Panel Size", value: "120" },
            { label: "Market", value: "Global" },
        ],
        context: "Nysom needed deep consumer input to launch a sleep & wellness brand globally. We combined AI interviews with quantitative data to build a panel of 120 digital twins.",
        findings: "The team used the panel to test brand names, positioning statements, and different ways of framing sleep benefits.",
        impact: "Allowed the team to explore multiple strategic directions quickly without re-fielding research, staying grounded in real consumer empathy."
    }
];

const UseCases: React.FC = () => {
    const [activeId, setActiveId] = useState(caseStudies[0].id);
    const activeCase = caseStudies.find(c => c.id === activeId) || caseStudies[0];

    return (
        <section className="py-32 bg-transparent relative">
            <div className="container mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-tighter mb-6">
                            Trusted by Leading <span className="text-[#236a7c]">Brands & Agencies</span>
                        </h2>
                        <p className="text-xl text-[#334155] max-w-2xl mx-auto">
                            From entertainment to wellness, see how diverse organizations use Twinloop to turn complexity into clarity.
                        </p>
                    </ScrollFadeUp>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">

                    {/* Menu / Selector Column */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {caseStudies.map((study) => (
                            <button
                                key={study.id}
                                onClick={() => setActiveId(study.id)}
                                className={`group relative p-6 rounded-2xl text-left transition-all duration-300 border ${activeId === study.id
                                    ? "bg-white shadow-[0_8px_30px_rgba(35,106,124,0.15)] border-[#236a7c]/20"
                                    : "bg-white/40 hover:bg-white/60 border-transparent hover:border-[#236a7c]/10"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl text-xl transition-colors duration-300 h-16 w-16 flex items-center justify-center ${activeId === study.id ? "bg-white border border-[#236a7c]/10" : "bg-white/80"
                                        }`}>
                                        <img
                                            src={study.logo}
                                            alt={`${study.company} logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg leading-tight mb-1 transition-colors ${activeId === study.id ? "text-[#0f172a]" : "text-[#334155]"}`}>
                                            {study.company}
                                        </h3>
                                        <p className="text-sm text-[#236a7c] font-medium opacity-80 uppercase tracking-wider">
                                            {study.title}
                                        </p>
                                    </div>
                                </div>

                                {activeId === study.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-2xl ring-2 ring-[#236a7c] ring-opacity-10 pointer-events-none"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Detailed Display Column */}
                    <div className="lg:col-span-8 relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCase.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="h-full"
                            >
                                <div className="h-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 md:p-12 shadow-[0_20px_60px_rgba(35,106,124,0.08)] relative overflow-hidden">

                                    {/* Decorative Gradient Blob */}
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#236a7c]/5 to-[#b8dce7]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                                    {/* Top Row: company + Stats */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 relative z-10">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 rounded-full bg-[#236a7c]/10 text-[#236a7c] text-xs font-black uppercase tracking-widest border border-[#236a7c]/10">
                                                    Case Study
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <img
                                                    src={activeCase.logo}
                                                    alt={`${activeCase.company} logo`}
                                                    className="w-10 h-10 object-contain"
                                                />
                                                <h3 className="text-3xl md:text-4xl font-black text-[#0f172a]">
                                                    {activeCase.company}
                                                </h3>
                                            </div>
                                            <p className="text-xl text-[#334155] font-medium">
                                                {activeCase.title}
                                            </p>
                                        </div>

                                        <div className="flex gap-4 md:gap-8">
                                            {activeCase.stats.map((stat, i) => (
                                                <div key={i} className="text-right">
                                                    <div className="text-2xl md:text-3xl font-black text-[#236a7c] tracking-tight">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-xs font-bold text-[#334155]/60 uppercase tracking-wider">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-black text-[#0f172a] uppercase tracking-widest mb-3">
                                                    <FaLayerGroup className="text-[#236a7c]" /> Context
                                                </h4>
                                                <p className="text-[#334155] leading-relaxed">
                                                    {activeCase.context}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-black text-[#0f172a] uppercase tracking-widest mb-3">
                                                    <FaChartLine className="text-[#236a7c]" /> Findings
                                                </h4>
                                                <p className="text-[#334155] leading-relaxed">
                                                    {activeCase.findings}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#f8fafc]/80 rounded-3xl p-8 border border-white/50 flex flex-col justify-center">
                                            <h4 className="flex items-center gap-2 text-sm font-black text-[#0f172a] uppercase tracking-widest mb-4">
                                                <span className="w-2 h-2 rounded-full bg-[#236a7c]" /> Impact
                                            </h4>
                                            <p className="text-lg font-medium text-[#236a7c] italic leading-relaxed mb-6">
                                                {activeCase.impact}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-[#236a7c]/10 flex items-center gap-2 text-sm text-[#334155]/60 font-semibold">
                                                <div className="w-5 h-5 rounded-full bg-[#236a7c] flex items-center justify-center text-white text-xs">
                                                    ✓
                                                </div>
                                                Verified Result
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
