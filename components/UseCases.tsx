"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaLayerGroup, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScrollFadeUp from "./ui/ScrollFadeUp";

const caseStudies = [
    {
        id: "gbk",
        company: "GBK Collective",
        title: "Force Multiplier for Modern Research Firms",
        logo: "/companyLogos/gbk.png",
        stats: [],
        context: "GBK Collective is an empirically driven strategic insights firm working on thoughtfully leveraging AI – to amplify client outcomes and improve internal productivity. They piloted Twinloop across multiple workflows – including AI-moderated voice interviews, digital twins, and qualitative analysis – to increase speed and depth without sacrificing rigor.",
        findings: "Twinloop’s AI-moderated interview experience was rated #1 by panelists when tested against four other insights tools. GBK saw significantly deeper qualitative input from voice-moderated surveys versus traditional text-based methods, with respondents contributing multiple times more detail enhancing the foundation for high-fidelity digital twins. In a box office prediction pilot, a panel of 450 digital twins showed very promising results, accurately distinguishing event films from mid-tier releases and highlighting meaningful outliers consistent with market performance, reinforcing confidence in the twins’ ability to reflect real consumer signals.",
        testimonial: "Twinloop has proven to be a thoughtful and flexible partner throughout our work together. Our partnership has been grounded in careful experimentation and methodological rigor. Their team was scrappy in execution, highly receptive to our academic perspectives, and collaborative in designing research that tested where AI-driven approaches add value while maintaining our emphasis on research rigor. Twinloop continues to be a strong partner in helping us responsibly explore the frontier of AI in research while innovatively supplementing our established human-centered research methods to expand our offering to key clients.",
        person: {
            name: "Jared Piraneo",
            title: "SVP Research & Insights",
            avatar: "/avatars/gbk.jpeg"
        }
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
        context: "Rootlabs needed a faster way to test creator-led content on TikTok for their hair supplement brand. Twinloop built 200+ personalized digital twins representing their core audience of hair growth supplement shoppers via TikTok Shop using AI-moderated voice interviews.",
        findings: "Rootlabs now uses the digital twin panel to pressure-test video, image and text assets centered on creator scripts and hooks and surface fresh content ideass without re-running research for every iteration.",
        testimonial: "We were running out of ideas and guessing what would work next. Twinloop gave us a repeatable way to test TikTok creator scripts and generate new angles without starting from scratch every time.",
        person: {
            name: "Mayank Kumar",
            title: "CEO",
            avatar: "/avatars/mayank.jpg"
        }
    },
    {
        id: "nysom",
        company: "NYSOM",
        title: "Building a Global Sleep Brand",
        logo: "/companyLogos/nysom.png",
        stats: [
            { label: "Customer Twins", value: "120" },
            { label: "Time To Insight", value: "22 hrs" },
        ],
        context: "NYSOM was launching a sleep & wellness brand from India to a global audience. Twinloop combined AI-moderated voice interviews with quantitative data to build a panel of 120 digital twins.",
        findings: "NYSOM now uses the twin panel as an always-on thought partner to pressure-test brand decisions in real time — name, value proposition, messaging, website, and more — before committing spend.",
        testimonial: `This is incredible! I'm truly feeling the power of AI.`,
        person: {
            name: "Sonam Aron",
            title: "Sales and Marketing Leader",
            avatar: "/avatars/nysom.jpg"
        }
    }
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

const UseCases: React.FC = () => {
    const [activeId, setActiveId] = useState(caseStudies[0].id);
    const [direction, setDirection] = useState(0);

    const activeCase = caseStudies.find(c => c.id === activeId) || caseStudies[0];
    const currentIndex = caseStudies.findIndex(c => c.id === activeId);

    const handleNext = () => {
        setDirection(1);
        const nextIndex = (currentIndex + 1) % caseStudies.length;
        setActiveId(caseStudies[nextIndex].id);
    };

    const handlePrev = () => {
        setDirection(-1);
        const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
        setActiveId(caseStudies[prevIndex].id);
    };

    return (
        <section className="py-12 bg-transparent relative">
            <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
                            From Insights to <span className="text-[#236a7c]">Impact</span>
                        </h2>
                    </ScrollFadeUp>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 w-full mx-auto">

                    {/* Mobile Navigation Pills */}
                    <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-6 px-2">
                        {caseStudies.map((study, index) => (
                            <button
                                key={study.id}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setActiveId(study.id);
                                }}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeId === study.id
                                    ? "bg-[#236a7c] text-white border-transparent shadow-md scale-105"
                                    : "bg-white border-gray-200 text-[#334155]/60"
                                    }`}
                            >
                                {study.company}
                            </button>
                        ))}
                    </div>

                    {/* Menu / Selector Column (Desktop) */}
                    <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
                        {caseStudies.map((study, index) => (
                            <button
                                key={study.id}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setActiveId(study.id);
                                }}
                                className={`group relative p-6 rounded-2xl text-left transition-all duration-300 border cursor-pointer select-none ${activeId === study.id
                                    ? "bg-white shadow-[0_8px_30px_rgba(35,106,124,0.15)] border-[#236a7c]/20 scale-[1.02] z-10"
                                    : "bg-white border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-1"
                                    }`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl text-2xl transition-colors duration-300 h-16 w-16 flex items-center justify-center ${activeId === study.id ? "bg-white border border-[#236a7c]/10" : "bg-white/80"
                                        }`}>
                                        <img
                                            src={study.logo}
                                            alt={`${study.company} logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className={`font-black text-xl leading-tight mb-1.5 transition-colors ${activeId === study.id ? "text-[#0f172a]" : "text-[#334155]"}`}>
                                            {study.company}
                                        </h3>
                                        <p className="text-sm text-[#236a7c] font-bold opacity-90 uppercase tracking-wider">
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
                    <div className="lg:col-span-9 relative min-h-[600px]">
                        {/* Mobile Arrows */}
                        <button onClick={handlePrev} className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c] -ml-4"><FaChevronLeft size={24} /></button>
                        <button onClick={handleNext} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 text-[#236a7c]/50 hover:text-[#236a7c] -mr-4"><FaChevronRight size={24} /></button>

                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <motion.div
                                key={activeCase.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x;
                                    if (swipe < -50) handleNext();
                                    else if (swipe > 50) handlePrev();
                                }}
                                className="h-full cursor-grab active:cursor-grabbing"
                            >
                                <div className="h-full bg-white/70 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/60 p-6 md:p-12 shadow-[0_20px_60px_rgba(35,106,124,0.08)] relative overflow-hidden flex flex-col justify-between">

                                    {/* Decorative Gradient Blob */}
                                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#236a7c]/5 to-[#b8dce7]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                                    {/* Top Row: company + Stats */}
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-6 md:mb-10 relative z-10 border-b border-gray-100/50 pb-6 md:pb-8">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-white/50 rounded-xl p-2 md:p-0 flex items-center justify-center border border-white/60">
                                                <img
                                                    src={activeCase.logo}
                                                    alt={`${activeCase.company} logo`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xl md:text-3xl text-[#0f172a] font-black leading-none mt-1">
                                                    {activeCase.title}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex w-full md:w-auto gap-8 md:gap-10 justify-start md:justify-end pl-2 md:pl-0">
                                            {activeCase.stats.map((stat, i) => (
                                                <div key={i} className="text-left md:text-right">
                                                    <div className="text-2xl md:text-4xl font-black text-[#236a7c] tracking-tight leading-none mb-1">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-[10px] md:text-xs md:text-sm font-black text-[#334155]/60 uppercase tracking-widest">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 md:gap-10 relative z-10 flex-grow">
                                        <div className="space-y-4 md:space-y-8 flex flex-col justify-center">
                                            <div className="bg-white/50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/60">
                                                <h4 className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-black text-[#0f172a] uppercase tracking-widest mb-2 md:mb-3">
                                                    <FaLayerGroup className="text-[#236a7c]" size={14} /> Context
                                                </h4>
                                                <p className="text-sm md:text-base text-[#334155] leading-relaxed font-medium">
                                                    {activeCase.context}
                                                </p>
                                            </div>

                                            <div className="bg-white/50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/60">
                                                <h4 className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-black text-[#0f172a] uppercase tracking-widest mb-2 md:mb-3">
                                                    <FaChartLine className="text-[#236a7c]" size={14} /> Outcome
                                                </h4>
                                                <p className="text-sm md:text-base text-[#334155] leading-relaxed font-medium">
                                                    {activeCase.findings}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#f8fafc] rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#e2e8f0] flex flex-col justify-center mt-2 md:mt-0">
                                            <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-6">
                                                <img
                                                    src={activeCase.person.avatar}
                                                    alt={activeCase.person.name}
                                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md"
                                                />
                                                <div>
                                                    <h4 className="text-[#0f172a] font-black text-base md:text-lg leading-tight">
                                                        {activeCase.person.name}
                                                    </h4>
                                                    <p className="text-[#334155]/70 text-xs md:text-sm font-bold">
                                                        {activeCase.person.title}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm md:text-base font-medium text-[#236a7c] italic leading-relaxed whitespace-pre-line">
                                                "{activeCase.testimonial}"
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Dots */}
                        <div className="flex md:hidden justify-center gap-2 mt-6">
                            {caseStudies.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setActiveId(caseStudies[i].id);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-[#236a7c] w-6" : "bg-[#236a7c]/20"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
