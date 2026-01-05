"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    FaCommentDots, FaMapMarkerAlt, FaLightbulb, FaUsers,
    FaBoxOpen, FaTags, FaSignature, FaClipboardCheck, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollFadeUp from "./ui/ScrollFadeUp";

const USE_CASES = [
    {
        id: 1,
        title: "Positioning & messaging",
        icon: <FaCommentDots />,
        decisions: [
            "Core promise",
            "Differentiator",
            "Proof points",
            "Category framing",
            "Tone",
        ],
        customer: [
            "“This is actually compelling — I get the outcome right away.”",
            "“I can see why a brand team would want this.”",
            "“I can’t repeat it back in one sentence yet.”",
            "“I like it, but it still sounds a little like other tools in the space.”",
        ],
        simulation: [
            "Message comprehension: 58%",
            "Biggest gap: differentiation blends into category language.",
            "One crisp “unlike X…” line + one proof point near the headline.",
        ]
    },
    {
        id: 2,
        title: "Ad creative & scripts",
        icon: <FaLightbulb />,
        decisions: [
            "Hook (first 2 seconds)",
            "Visual pacing",
            "Script beats",
            "Brand cue timing",
            "CTA",
        ],
        customer: [
            "“I’d stop scrolling — it’s genuinely interesting.”",
            "“The first moment is strong. I wanted to see where it goes.”",
            "“I remember the vibe, not the brand.”",
            "“You lost me halfway — it got complicated fast.”",
        ],
        simulation: [
            "Thumbstop: 7.8/10",
            "Drop-off: benefit arrives after peak attention.",
            "Put benefit inside the hook + earlier brand cue.",
        ]
    },
    {
        id: 3,
        title: "Audience fit",
        icon: <FaUsers />,
        decisions: [
            "Which segment to target first",
            "Message angle per segment",
            "Primary objection",
            "Context cues (who it’s for)",
            "Channel fit",
        ],
        customer: [
            "“If I did this kind of work, I’d use it.”",
            "“This feels made for a brand manager.”",
            "“This is for my friend, not for me.”",
            "“It’s trying to talk to everyone at once.”",
        ],
        simulation: [
            "Resonance split: 8.1 vs 5.9",
            "Two segments are reacting very differently.",
            "Two cutdowns with distinct hooks + pain framing.",
        ]
    },
    {
        id: 4,
        title: "Pricing & offer",
        icon: <FaTags />,
        decisions: [
            "Price point / tiering",
            "Bundle structure",
            "Trial vs commitment",
            "Discount framing",
            "Risk reversal (guarantee)",
        ],
        customer: [
            "“If this saves me time, the price makes sense.”",
            "“I like that it’s outcome-based — feels practical.”",
            "“I’m not paying that without knowing it’ll work for me.”",
            "“If there was a starter option, I’d try it.”",
        ],
        simulation: [
            "Offer acceptance: 29%",
            "Biggest blocker: perceived risk > perceived value.",
            "Starter option + one-line guarantee + clearer deliverable framing.",
        ]
    },
    {
        id: 5,
        title: "Packaging & claims",
        icon: <FaBoxOpen />,
        decisions: [
            "Pack hierarchy",
            "Claim wording",
            "Proof markers",
            "SKU naming",
            "Visual identity cues",
        ],
        customer: [
            "“This looks premium — I’d pick it up.”",
            "“The design feels clean and trustworthy.”",
            "“I’m not sure what it does from the front.”",
            "“Too many badges — I don’t know what to trust.”",
        ],
        simulation: [
            "2-second clarity: 52%",
            "Main issue: competing claims dilute the hero benefit.",
            "One hero benefit + one proof marker, reduce the rest.",
        ]
    },
    {
        id: 6,
        title: "Landing page & conversion",
        icon: <FaClipboardCheck />,
        decisions: [
            "Hero headline/subhead",
            "How it works placement",
            "Proof placement",
            "CTA copy/placement",
            "Objection handling",
        ],
        customer: [
            "“This is exactly the kind of shortcut I wish we had.”",
            "“Once I understood it, I wanted to click.”",
            "“I’m interested, but what happens after I click?”",
            "“Show me one example output and I’m sold.”",
        ],
        simulation: [
            "Time-to-understand: 13s",
            "Missing: quick “how it works” + concrete example output.",
            "3-step flow under hero + move proof above first CTA.",
        ]
    },
];

const VennDiagramSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + USE_CASES.length) % USE_CASES.length);
    };

    // Auto-advance timer
    // Auto-advance timer (only when in view)
    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            handleNext();
        }, 10000); // 10 seconds per slide

        return () => clearInterval(interval);
    }, [activeIndex, isInView]);

    const activeCase = USE_CASES[activeIndex];

    const getCarouselStyles = (index: number) => {
        const total = USE_CASES.length;
        // Calculate shortest distance handling wrap-around
        let diff = (index - activeIndex + total) % total;
        if (diff > total / 2) diff -= total;

        // Only show center and one on each side
        const isVisible = Math.abs(diff) <= 1;

        return {
            x: diff * 280, // Distance between items
            scale: diff === 0 ? 1 : 0.7,
            opacity: isVisible ? (diff === 0 ? 1 : 0.4) : 0,
            zIndex: diff === 0 ? 20 : 10,
            // rotateY: diff * -15, // Removed to prevent Safari flickering
        };
    };

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

    return (
        <section ref={containerRef} className="py-12 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 text-center">

                {/* --- Section Header --- */}
                <ScrollFadeUp yOffset={20} duration={0.8} delay={0.2} className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-8 pt-8 max-w-4xl mx-auto">
                    Put your <span className="text-[#236a7c]">customer in the room</span> <br className="hidden md:block" /> for every brand decision
                </ScrollFadeUp>

                {/* --- Carousel Selector (Wheel Animation) --- */}
                <div className="relative h-[200px] flex justify-center items-center mb-0 perspective-1000">
                    {/* Mobile Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 hover:bg-white shadow text-[#236a7c] transition-colors md:hidden"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 hover:bg-white shadow text-[#236a7c] transition-colors md:hidden"
                    >
                        <FaChevronRight />
                    </button>

                    {/* Wheel Items */}
                    {USE_CASES.map((item, index) => {
                        const styles = getCarouselStyles(index);
                        return (
                            <motion.div
                                key={item.id}
                                // Fix: Use fixed dimensions + negative margins to center, avoid w-0 h-0 which confuses Safari
                                className="absolute top-1/2 left-1/2 w-64 h-40 -ml-32 -mt-20 flex flex-col items-center justify-center cursor-pointer"
                                initial={false}
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden", // Safari-specific fix
                                }}
                                animate={{
                                    x: styles.x,
                                    scale: styles.scale,
                                    opacity: styles.opacity,
                                    zIndex: styles.zIndex,
                                }}
                                transition={{ type: "spring", stiffness: 250, damping: 32 }} // Tuned to prevent overshoot
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                            >
                                <div
                                    className={`p-6 rounded-2xl shadow-xl text-4xl transition-colors duration-300 w-max ${index === activeIndex
                                        ? "bg-gradient-to-br from-[#236a7c] to-[#164656] text-white"
                                        : "bg-white text-[#334155] border border-gray-200"
                                        }`}
                                >
                                    {item.icon}
                                </div>
                                <h3 className={`text-xl font-bold transition-colors duration-300 w-[200px] ${index === activeIndex ? "text-[#0f172a]" : "text-[#64748b]"
                                    }`}>
                                    {item.title}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>


                {/* --- Venn Diagram --- */}
                <div className="relative w-full max-w-[1200px] mx-auto min-h-[650px] flex justify-center items-center font-sans transform scale-[0.85] lg:scale-[1] origin-top">

                    {/* Mobile Layout (Vertical Stack) */}
                    <div className="md:hidden w-full flex flex-col items-center gap-6 py-2">
                        <h4 className="text-base font-black text-[#64748b] tracking-wider">Decisions you’re making</h4>

                        <div className="relative w-full h-[550px]">
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x; // Simple offset check
                                        if (swipe < -50) {
                                            handleNext();
                                        } else if (swipe > 50) {
                                            handlePrev();
                                        }
                                    }}
                                    className="w-full h-full cursor-grab active:cursor-grabbing"
                                >
                                    {/* Circle 1 (Top) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-4 border-[#333333] bg-white/95 shadow-lg flex flex-col items-center justify-start pt-16 z-0">
                                        <div className="flex flex-col gap-2 items-center w-full px-12">
                                            {activeCase.decisions.slice(0, activeCase.id === 4 ? 2 : 3).map((d, i) => (
                                                <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-2 text-xs font-bold text-[#334155] w-full text-center leading-tight">
                                                    {d}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Circle 2 (Bottom) */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-4 border-[#236a7c] bg-white/95 shadow-lg flex flex-col items-center justify-end pb-16 z-10 glass">
                                        <div className="flex flex-col gap-2 items-center w-full px-10">
                                            {activeCase.customer.slice(2, 4).map((c, i) => (
                                                <div key={i} className="bg-[#f0f9ff] border border-[#236a7c]/10 shadow-sm rounded-lg px-3 py-2 text-[10px] font-medium italic text-[#0f172a] w-full text-center leading-tight">
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Intersection Card */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[280px] pointer-events-none text-center">
                                        <div className="bg-white p-4 rounded-xl border border-[#236a7c]/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]">
                                            <div className="flex justify-center mb-2">
                                                <span className="bg-[#236a7c] text-white px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest">Result</span>
                                            </div>

                                            <div className="border-b border-gray-100 pb-2 mb-2">
                                                <p className="text-2xl font-black text-[#164656] leading-none mb-0.5">
                                                    {activeCase.simulation[0].split(":")[1]?.split(",")[0] || activeCase.simulation[0]}
                                                </p>
                                                <p className="text-[9px] font-bold text-[#64748b] tracking-wider">
                                                    {activeCase.simulation[0].split(":")[0]}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-left">
                                                <div className="flex flex-col">
                                                    <p className="text-[9px] font-black text-[#64748b] mb-1">Problem</p>
                                                    <p className="text-[10px] text-[#334155] leading-tight">{activeCase.simulation[1]}</p>
                                                </div>

                                                <div className="flex flex-col bg-[#f0f9ff] p-2 rounded-lg border border-[#236a7c]/20">
                                                    <p className="text-[9px] font-black text-[#236a7c] mb-1">Fix</p>
                                                    <p className="text-[10px] font-bold text-[#164656] leading-tight">{activeCase.simulation[2]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>


                        <h4 className="text-base font-black text-[#236a7c] tracking-wider">How it lands with customers</h4>

                        {/* Mobile Dots */}
                        <div className="flex md:hidden justify-center gap-2 mt-4 mb-8">
                            {USE_CASES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > activeIndex ? 1 : -1);
                                        setActiveIndex(i);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#236a7c] w-6" : "bg-[#236a7c]/20"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Layout (Horizontal) */}
                    <div className="hidden md:block relative w-[1000px] h-[680px] overflow-visible">

                        {/* --- Background Layer --- */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-white shadow-xl" />
                            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-white shadow-xl" />
                        </div>

                        {/* --- Border Layer --- */}
                        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border-[6px] border-[#333333] z-10 pointer-events-none" />
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border-[6px] border-[#236a7c] z-20 pointer-events-none" style={{ mixBlendMode: "normal" }} />

                        {/* --- Content Layer --- */}

                        {/* Left Content (Decisions) */}
                        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full z-20 pointer-events-none">
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <motion.div
                                    key={`left-${activeIndex}`}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full"
                                >
                                    <div className="absolute top-[12%] left-[45%] -translate-x-1/2 text-center w-[180px]">
                                        <h4 className="text-[#64748b] font-black tracking-widest text-base">Decisions<br />you’re making</h4>
                                    </div>

                                    {/* Scattered Cards for Decisions - Arc "(" following left curve */}
                                    {activeCase.decisions.map((item, i) => {
                                        // Arc shape points (visually adjusted for 680px circle)
                                        const positions = [
                                            { top: "24%", left: "28%" },  // Top
                                            { top: "38%", left: "18%" },   // Upper-Mid
                                            { top: "54%", left: "16%" },   // Mid
                                            { top: "70%", left: "20%" },  // Lower-Mid
                                            { top: "84%", left: "30%" },  // Bottom
                                        ];
                                        const pos = positions[i] || { top: "50%", left: "20%" };

                                        return (
                                            <div
                                                key={i}
                                                className="absolute px-5 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl text-[#334155] font-bold text-sm max-w-[160px] leading-tight flex items-center justify-center text-center"
                                                style={{ top: pos.top, left: pos.left }}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Content (Customers) */}
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full z-20 pointer-events-none">
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <motion.div
                                    key={`right-${activeIndex}`}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full"
                                >
                                    <div className="absolute top-[12%] right-[45%] translate-x-1/2 text-center w-[180px]">
                                        <h4 className="text-[#236a7c] font-black tracking-widest text-base">How it lands<br />with customers</h4>
                                    </div>

                                    {/* Scattered Cards for Customers - Arc ")" following right curve */}
                                    {activeCase.customer.map((item, i) => {
                                        // Arc shape points
                                        const positions = [
                                            { top: "27%", right: "24%" }, // Top
                                            { top: "42%", right: "14%" },  // Upper-Mid
                                            { top: "60%", right: "14%" },  // Lower-Mid
                                            { top: "77%", right: "24%" }, // Bottom
                                        ];
                                        const pos = positions[i] || { top: "50%", right: "20%" };

                                        return (
                                            <div
                                                key={i}
                                                className="absolute px-5 py-3 bg-[#f0f9ff]/90 backdrop-blur-sm border border-[#236a7c]/10 shadow-sm rounded-xl text-[#0f172a] font-medium text-sm italic max-w-[180px] leading-snug"
                                                style={{ top: pos.top, right: pos.right }}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Intersection (Center) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] z-30 text-center pointer-events-none">
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <motion.div
                                    key={`center-${activeIndex}`}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <div className="bg-white rounded-3xl p-6 shadow-[0_25px_60px_-15px_rgba(35,106,124,0.35)] border border-[#236a7c]/20 z-50 relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#236a7c] text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest shadow-lg">
                                            Twinloop Result
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            {/* Main Score - Large & Impactful */}
                                            <div className="text-center pb-3 border-b border-gray-100">
                                                <p className="text-3xl font-black text-[#164656] leading-none mb-1">
                                                    {activeCase.simulation[0].split(":")[1]?.split(",")[0] || activeCase.simulation[0]}
                                                </p>
                                                <p className="text-[10px] font-bold text-[#64748b] tracking-wider">
                                                    {activeCase.simulation[0].split(":")[0]}
                                                </p>
                                            </div>

                                            {/* Insight */}
                                            <div className="flex gap-4 items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-[#0f172a] tracking-wide mb-1">Friction point</h5>
                                                    <p className="text-sm text-[#334155] leading-relaxed">
                                                        {activeCase.simulation[1]}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Fix Action */}
                                            <div className="bg-[#f0f9ff] border border-[#236a7c]/20 p-3 rounded-xl flex gap-4 items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-[#236a7c] tracking-wide mb-1">Recommended fix</h5>
                                                    <p className="text-sm font-bold text-[#164656] leading-relaxed">
                                                        {activeCase.simulation[2]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
};

export default VennDiagramSection;
