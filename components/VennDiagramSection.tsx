"use client";

import React, { useState, useEffect } from "react";
import {
    FaCommentDots, FaMapMarkerAlt, FaLightbulb, FaUsers,
    FaBoxOpen, FaTags, FaSignature, FaClipboardCheck, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFadeUp from "./ui/ScrollFadeUp";

const USE_CASES = [
    {
        id: 1,
        title: "Messaging & Claims",
        icon: <FaCommentDots />,
        decisions: [
            "Headline or hook",
            "Benefit claim",
            "Proof points",
            "Tone",
            "Call to action",
        ],
        customer: [
            "“I’d rate clarity an 8 out of 10 because I understand the benefit in one read.”",
            "“I’m skeptical because the claim feels strong, but you are not showing me what makes it true.”",
            "“This sounds like category language, so I’m not sure what makes you different.”",
            "“If you add one concrete proof point, I’d feel a lot more comfortable taking you seriously.”",
        ],
        simulation: [
            "Clarity scored 8.4/10, but credibility lagged at 6.1/10.",
            "Biggest drop: customers ask for proof and don't see reason to believe.",
            "Differentiation is weak; language feels interchangeable.",
            "Fix: add one concrete proof point & tighten claim.",
        ]
    },
    {
        id: 2,
        title: "Positioning & Value Prop",
        icon: <FaMapMarkerAlt />,
        decisions: [
            "Positioning statement",
            "Reasons to believe",
            "Competitive frame",
            "Category language",
            "Brand tone",
        ],
        customer: [
            "“I like the idea, but I can’t tell what your unfair advantage is.”",
            "“This feels like it’s speaking to me, but it still feels a bit broad.”",
            "“I’m not the target customer, and this doesn’t give me a reason to care.”",
            "“If I had to summarize you to a friend, I’d probably get it wrong.”",
        ],
        simulation: [
            "Relevance: 8.0/10, Differentiation: 5.2/10.",
            "Customers understand promise but struggle to explain 'why you'.",
            "Positioning feels broad; high appeal but low distinctiveness.",
            "Fix: choose one sharp pillar + specific reasons to believe.",
        ]
    },
    {
        id: 3,
        title: "Creative Concepts",
        icon: <FaLightbulb />,
        decisions: [
            "Concept direction",
            "Visual style",
            "Story arc",
            "Brand cues",
            "Channel format",
        ],
        customer: [
            "“This made me stop, I’d give it a 9 out of 10 for thumbstop.”",
            "“It looks cool, but I’m confused about what you want me to do next.”",
            "“This feels like an ad trying too hard, so I’d scroll past out of spite.”",
            "“I’d share it if the point landed faster and felt more authentic.”",
        ],
        simulation: [
            "Thumbstop: 7.9/10, Message Takeout: 6.0/10.",
            "Attracts attention early, but message isn't understood quickly.",
            "Brand fit mixed; some read tone/cues as off-brand.",
            "Fix: move benefit earlier & add clearer brand signals.",
        ]
    },
    {
        id: 4,
        title: "Audience & Segments",
        icon: <FaUsers />,
        decisions: [
            "Priority audience",
            "Segment messaging",
            "Benefit emphasis",
            "Channel mix",
            "Offer strategy",
        ],
        customer: [
            "“As a new customer, I feel like I’m missing context...”",
            "“As someone already in the category, this feels made for me...”",
            "“It’s clear enough, but not motivating enough to switch.”",
            "“Feels like it’s built for a niche audience.”",
        ],
        simulation: [
            "Sharp divergence: Segment A (8.1/10) vs Segment B (5.9/10).",
            "Non-core customers feel message isn't for them.",
            "Motivation is the bottleneck, not clarity.",
            "Fix: segment-specific lead messaging + tailored payoff.",
        ]
    },
    {
        id: 5,
        title: "Packaging",
        icon: <FaBoxOpen />,
        decisions: [
            "Benefit hierarchy",
            "Claims order",
            "Visual system",
            "PDP bullets",
            "Module order",
        ],
        customer: [
            "“I’m scanning for the one main benefit, and I’m not finding it fast.”",
            "“I’m seeing a lot of claims, and that actually makes me trust it less.”",
            "“If you added one simple proof cue, I’d feel way more confident.”",
            "“Looks premium, but harder to understand than needed.”",
        ],
        simulation: [
            "Shopper clarity: 6.1/10, Trust: 5.8/10.",
            "Hero benefit lost; claim stack creates skepticism.",
            "High cognitive load reduces purchase confidence.",
            "Fix: cleaner hierarchy (1 hero benefit, 1 proof cue).",
        ]
    },
    {
        id: 6,
        title: "Pricing & Promo Framing",
        icon: <FaTags />,
        decisions: [
            "Price and tiers",
            "Discount framing",
            "Bundle structure",
            "Subscription language",
            "Guarantee and returns",
        ],
        customer: [
            "“Deal appeal is an 8 out of 10 because the offer grabs me right away.”",
            "“The promo language makes me wonder what the catch is.”",
            "“I’d probably wait, because this feels like it will be discounted again.”",
            "“If you explained value in terms of outcomes, I’d pay full price.”",
        ],
        simulation: [
            "Deal appeal: 8.1/10, Offer trust: 5.6/10.",
            "Savings liked, but aggressive language sparks doubt.",
            "Value not anchored to outcomes; increases hesitation.",
            "Fix: simplify offer & lead with outcome-based value.",
        ]
    },
    {
        id: 7,
        title: "Brand Naming & Taglines",
        icon: <FaSignature />,
        decisions: [
            "Name options",
            "Tagline options",
            "Readability",
            "Associations",
            "Category fit",
        ],
        customer: [
            "“I’d remember the name, but I still wouldn’t know what you sell.”",
            "“It sounds premium, but it also feels a bit abstract.”",
            "“I’m not the target customer, and this doesn’t give me a reason to care.”",
            "“The tagline is doing too little work, I need it to make meaning obvious.”",
        ],
        simulation: [
            "Memorability: 7.0/10, Meaning Clarity: 5.9/10.",
            "Name is sticky but category/offer isn't clear.",
            "Pronunciation uncertainty reduces word-of-mouth.",
            "Fix: tagline must make meaning obvious instantly.",
        ]
    },
    {
        id: 8,
        title: "Campaign Readiness",
        icon: <FaClipboardCheck />,
        decisions: [
            "Final creative and copy",
            "Landing page alignment",
            "Claims support",
            "Targeting and placements",
            "Brand safety",
        ],
        customer: [
            "“I’d click, but I’m clicking to verify you are not exaggerating.”",
            "“The promise feels bigger than what the landing page seems ready to back up.”",
            "“Parts of this feel like they could be interpreted the wrong way...”",
            "“If you tightened the claim and showed proof, I’d feel comfortable.”",
        ],
        simulation: [
            "Click intent: 6.8/10, Trust: 5.7/10.",
            "Gap noticed between ad promise and LP support.",
            "Misinterpretation risks in specific contexts.",
            "Fix: tighten claim, add substantiation, align ad & LP.",
        ]
    },
];

const VennDiagramSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + USE_CASES.length) % USE_CASES.length);
    };

    // Auto-advance timer
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000); // 10 seconds per slide

        return () => clearInterval(interval);
    }, [activeIndex]);

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
            rotateY: diff * -15, // Slight 3D rotation effect
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
        <section className="py-12 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 text-center">

                {/* --- Section Header --- */}
                <ScrollFadeUp yOffset={20} duration={0.8} delay={0.2} className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-8 pt-8 max-w-4xl mx-auto">
                    Put your <span className="text-[#236a7c]">Customer in the Room</span> <br className="hidden md:block" /> For Every Brand Decision
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
                                className="absolute top-1/2 left-1/2 w-0 h-0 flex flex-col items-center justify-center cursor-pointer"
                                initial={false}
                                animate={{
                                    x: styles.x,
                                    scale: styles.scale,
                                    opacity: styles.opacity,
                                    zIndex: styles.zIndex,
                                    rotateY: styles.rotateY
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                        <h4 className="text-base font-black text-[#64748b] uppercase tracking-wider">Decisions you’re making</h4>

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
                                                <span className="bg-[#236a7c] text-white px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">Result</span>
                                            </div>

                                            <div className="border-b border-gray-100 pb-2 mb-2">
                                                <p className="text-2xl font-black text-[#164656] leading-none mb-0.5">
                                                    {activeCase.simulation[0].split(":")[1]?.split(",")[0] || activeCase.simulation[0]}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-left">
                                                <div className="flex flex-col">
                                                    <p className="text-[9px] font-black text-[#64748b] uppercase mb-1">Problem</p>
                                                    <p className="text-[10px] text-[#334155] leading-tight">{activeCase.simulation[1]}</p>
                                                </div>

                                                <div className="flex flex-col bg-[#f0f9ff] p-2 rounded-lg border border-[#236a7c]/20">
                                                    <p className="text-[9px] font-black text-[#236a7c] uppercase mb-1">Fix</p>
                                                    <p className="text-[10px] font-bold text-[#164656] leading-tight">{activeCase.simulation[3].replace("Fix:", "").trim()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>


                        <h4 className="text-base font-black text-[#236a7c] uppercase tracking-wider">How it lands with customers</h4>

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
                                        <h4 className="text-[#64748b] font-black uppercase tracking-widest text-base">Decisions<br />you’re making</h4>
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
                                        <h4 className="text-[#236a7c] font-black uppercase tracking-widest text-base">How it lands<br />with customers</h4>
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
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#236a7c] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            Twinloop Result
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            {/* Main Score - Large & Impactful */}
                                            <div className="text-center pb-3 border-b border-gray-100">
                                                <p className="text-3xl font-black text-[#164656] leading-none mb-1">
                                                    {activeCase.simulation[0].split(":")[1]?.split(",")[0] || activeCase.simulation[0]}
                                                </p>
                                                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Simulation Score</p>
                                            </div>

                                            {/* Insight */}
                                            <div className="flex gap-4 items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-[#0f172a] uppercase tracking-wide mb-1">Friction Point</h5>
                                                    <p className="text-sm text-[#334155] leading-relaxed">
                                                        {activeCase.simulation[1]}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Fix Action */}
                                            <div className="bg-[#f0f9ff] border border-[#236a7c]/20 p-3 rounded-xl flex gap-4 items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-[#236a7c] uppercase tracking-wide mb-1">Recommended Fix</h5>
                                                    <p className="text-sm font-bold text-[#164656] leading-relaxed">
                                                        {activeCase.simulation[3].replace("Fix:", "").trim()}
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
