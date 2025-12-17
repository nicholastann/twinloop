"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";

interface ScrollFadeUpProps {
    children: ReactNode;
    yOffset?: number;        // how far down to start
    duration?: number;       // animation duration
    delay?: number;          // optional delay
    className?: string;      // optional wrapper class
}

const ScrollFadeUp: React.FC<ScrollFadeUpProps> = ({
    children,
    yOffset = 20,
    duration = 0.8,
    delay = 0,
    className = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const variants: Variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } },
    };

    return (
        <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={variants}
        >
        {children}
        </motion.div>
    );
};

export default ScrollFadeUp;
