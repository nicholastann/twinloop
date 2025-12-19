"use client";

import React, { useEffect } from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

const CountUp = ({ value, label }: { value: string; label: string }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    const prefix = value.match(/^[^\d]*/) ? value.match(/^[^\d]*/)![0] : "";

    // Check if it's a fraction like "1/10th"
    const isFraction = value.includes("/");

    const count = useSpring(0, { stiffness: 30, damping: 15 });
    const rounded = useTransform(count, (latest) => {
        if (isFraction) return value; // Don't animate complex strings like 1/10th for now, or handle specifically
        return `${Math.round(latest)}${suffix}`;
    });

    useEffect(() => {
        if (isInView && !isFraction) {
            count.set(numericValue);
        }
    }, [isInView, numericValue, count, isFraction]);

    return (
        <div ref={ref} className="text-center group cursor-default">
            <motion.div
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tighter text-white group-hover:scale-110 transition-transform duration-500 ease-out inline-block"
            >
                {isFraction ? value : <motion.span>{rounded}</motion.span>}
            </motion.div>
            <p className="text-base md:text-xl font-bold text-[#b8dce7] leading-snug max-w-[200px] mx-auto">{label}</p>
        </div>
    );
};

const StatsBanner: React.FC = () => {
    const stats = [
        { value: "1/10th", label: "Time to insight" },
        { value: "80%", label: "More affordable" },
        { value: "10x", label: "Scale of testing" },
        { value: "24/7", label: "Availability" },
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

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <CountUp key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBanner;
