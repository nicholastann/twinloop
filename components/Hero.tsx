"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- News Pile Data & Logic ---
interface Article {
  id: number;
  title: string;
  src: string;
  rotation: number;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
}

const ARTICLE_DATA = [
  { title: "New Coke", src: "/articles/newcoke.png", scale: 1.45 },
  { title: "Garde-Robe Campaign (Balenciaga)", src: "/articles/balenciaga-garde.png", scale: 1.4 },
  { title: "Nivea 'White is Purity' Deodorant (2017)", src: "/articles/nivea.png", scale: 1.35 },
  { title: "Heineken 'Sometimes, Lighter is Better' (2017)", src: "/articles/heineken.png", scale: 1.4 },
  { title: "Bud Light/Dylan Mulvaney (2023)", src: "/articles/budlight.png", scale: 1.45 },
  { title: "Pepsi/Kendall Jenner (2017)", src: "/articles/pepsi.png", scale: 1.35 },
  { title: "Gillette 'Best a Man Can Be'", src: "/articles/gillette.png", scale: 1.5 },
];

// Deterministic layout configuration to ensure headers are visible (cascading Y) and messy look (random-ish X/Rotation)
// Increased Y spacing to ~100px to reveal headlines.
const DETERMINISTIC_LAYOUT = [
  { x: -140, y: -220, r: -6 },
  { x: 120, y: -190, r: 4 },
  { x: -130, y: -100, r: -3 },
  { x: 140, y: -10, r: 5 },
  { x: -120, y: 80, r: -4 },
  { x: 130, y: 170, r: 3 },
  { x: -140, y: 260, r: -5 },
];

function generateDeterministicArticle(id: number, articleData: { title: string; src: string; scale?: number }, containerWidth: number, containerHeight: number): Article {
  const layout = DETERMINISTIC_LAYOUT[id % DETERMINISTIC_LAYOUT.length];

  const isMobile = containerWidth < 768;

  // Scale logic
  const mobileScale = 0.65;
  const scale = isMobile ? (articleData.scale ? articleData.scale * 0.4 : mobileScale) : (articleData.scale || 2);

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Base card width approximation for centering logic
  const cardBaseW = 300;

  // Apply responsive spacing
  // Tighter spread on mobile
  const xMult = isMobile ? 0.5 : 1.2;
  const yMult = isMobile ? 0.6 : 1.0;

  const x = centerX - (cardBaseW / 2) + (layout.x * xMult);
  const y = centerY - (isMobile ? 80 : 100) + (layout.y * yMult); // Start slightly higher than center on desktop, center on mobile

  return {
    id,
    title: articleData.title,
    src: articleData.src,
    rotation: layout.r,
    x,
    y,
    scale,
    zIndex: id,
  };
}

const Hero: React.FC = () => {
  // 0: Title, 1: Pile, 2: Title Addon, 3: Subtitle, 4: CTA, 5: Trusted By -> 6: Unlocked
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [pileIndex, setPileIndex] = useState(0);

  // Ref to track if we are currently manually scrolling to debounce or throttle
  const lastScrollTime = useRef(0);

  // --- Check Session Storage for Refresh Logic ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix: If user is scrolled down (e.g. refresh), skip animation and don't lock
      if (window.scrollY > 50) {
        setStep(6);
        setPileIndex(ARTICLE_DATA.length);
        sessionStorage.setItem("twinloop_hero_seen", "true");
        return;
      }

      const hasSeen = sessionStorage.getItem("twinloop_hero_seen");
      if (hasSeen) {
        setStep(6);
        setPileIndex(ARTICLE_DATA.length);
      } else {
        sessionStorage.setItem("twinloop_hero_seen", "true");
      }
    }
  }, []);

  // --- Animation Sequence Timers ---
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      // Auto-start pile after title
      timer = setTimeout(() => setStep(1), 650);
    }
    else if (step === 1) {
      // Pile logic handled separately via pileIndex
    }
    else if (step === 2) {
      // Showing Title Addon ("Derisk It In Minutes") -> Wait then show Subtitle + CTA + Trusted By
      timer = setTimeout(() => setStep(3), 1500);
    }
    else if (step === 3) {
      // Everything visible -> Fully unlock after a beat
      timer = setTimeout(() => setStep(6), 500);
    }
    // Steps 4 and 5 are merged into 3

    return () => clearTimeout(timer);
  }, [step]);


  // --- Pile Auto-Advance ---
  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setPileIndex(prev => {
          if (prev >= articles.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400); // Speed per card
      return () => clearInterval(interval);
    }
  }, [step, articles.length, pileIndex]);

  // Sync Pile Index to Visible Articles
  useEffect(() => {
    if (pileIndex > 0 && articles.length > 0) {
      // Add articles up to current index
      if (pileIndex <= articles.length) {
        setVisibleArticles(articles.slice(0, pileIndex));
      }
      if (pileIndex >= articles.length) {
        // Pile finished
        setTimeout(() => setStep(2), 500);
      }
    }
  }, [pileIndex, articles]);


  // --- Layout Generation ---
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const all = ARTICLE_DATA.map((d, i) => generateDeterministicArticle(i, d, width, height));
      setArticles(all);
    };

    // Run initially and on resize
    updateLayout();
    window.addEventListener("resize", updateLayout);

    // Also run after a short delay to ensure layout is settled (fixes mobile hydration issues)
    const timer = setTimeout(updateLayout, 100);

    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timer);
    };
  }, []);

  // --- Scroll Locking & Interaction ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (step >= 6) return; // Allow normal scroll

      e.preventDefault();

      const now = Date.now();
      // Simple throttle for step changes
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;

      // Logic: Scroll acts as a "Fast Forward" button
      if (e.deltaY > 0) { // Scrolling DOWN
        if (step === 1) {
          // Speed up pile: add next card immediately
          setPileIndex(prev => Math.min(prev + 1, articles.length));
        } else if (step === 2) {
          setStep(3);
        } else if (step === 3) {
          setStep(6);
        }
      }
    };

    // Mobile Touch Logic
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (step >= 6) return;
      e.preventDefault(); // Lock scroll

      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;

      if (diff > 10) { // Swipe UP (scroll down)
        const now = Date.now();
        if (now - lastScrollTime.current < 150) return;
        lastScrollTime.current = now;

        if (step === 1) {
          setPileIndex(prev => Math.min(prev + 1, articles.length));
        } else if (step < 6) {
          // Jump to next logical block
          if (step === 2) setStep(3);
          else if (step === 3) setStep(6);
          else setStep(prev => prev + 1);
        }
      }
    };

    // Lock body scroll logic
    // Lock body scroll logic
    const isMobile = window.innerWidth < 768;
    // Safety: If already scrolled down, do not lock (fixes refresh issue)
    const isScrolled = window.scrollY > 50;

    if (step < 6 && !isMobile && !isScrolled) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [step, articles.length]);


  return (
    <section className="relative w-full h-screen flex items-start bg-transparent text-[#0f1a1f] pt-20 md:pt-20 lg:pt-24 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-24 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-0 lg:gap-0 items-center h-full">

        {/* Left Column: Text & CTA */}
        <div className="flex flex-col h-auto lg:h-full z-20 relative px-4 md:px-0 pb-0 md:pb-8 justify-center">

          {/* Top Content (Headline + CTA) */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-0 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-black mb-0 whitespace-normal 2xl:whitespace-nowrap"


            >
              Brand spend is high stakes.

              {step >= 2 && (
                <motion.span initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="block text-[#236a7c] text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap"
                >
                  Derisk it in minutes.
                </motion.span>
              )}
            </motion.h1>

            {/* Subtitle & CTA Wrapper */}
            <div className="flex flex-col gap-2 md:gap-6 w-full mt-4 lg:mt-12">
              <div className="h-16 md:h-20 relative flex items-start">
                {step >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium text-[#334155] whitespace-normal 2xl:whitespace-nowrap leading-snug tracking-tight max-w-[90%] md:max-w-none"


                  >
                    Test any brand decision against <br className="block md:hidden" />your customers before launch.
                  </motion.p>
                )}
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col gap-6 transition-opacity duration-1000 ${step < 3 ? "pointer-events-none" : ""}`}
                style={{ opacity: step >= 3 ? 1 : 0 }}
              >
                <div>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] hover:from-[#1e5b6d] hover:to-[#164656] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <span className="md:hidden">Book Demo</span>
                    <span className="hidden md:inline">Book a demo to see how</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted By Section (Desktop: Bottom of Left Col) */}
          <div
            className="hidden lg:block pt-4 border-t border-border w-full max-w-xl transition-opacity duration-1000 mt-8 mb-4"
            style={{ opacity: step >= 3 ? 1 : 0 }}
          >
            <p className="text-[#334155]/80 text-xs font-bold uppercase tracking-widest mb-4">
              Trusted by leading brands & agencies
            </p>

            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,black_70%,transparent)]">
              <div className="animate-marquee whitespace-nowrap flex gap-12 items-center w-max">
                {["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"]
                  .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                  .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                  .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                  .map((src, index) => {
                    const isLarge = src.includes("gbk");
                    return (
                      <img
                        key={index}
                        src={src}
                        alt="Brand Logo"
                        className={`${isLarge ? "h-20 md:h-24" : "h-10 md:h-12"} object-contain inline-block shrink-0`}
                      />
                    );
                  })}
              </div>
            </div>
            <style jsx>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  display: flex;
                  animation: marquee 30s linear infinite;
                }
              `}</style>
          </div>

        </div>

        {/* Right Column: Pile Animation */}
        <div className="relative h-[320px] md:h-[500px] lg:h-full lg:min-h-[80vh] w-full flex items-center justify-center lg:justify-end overflow-visible order-2 lg:order-last pointer-events-none">
          <div ref={containerRef} className="relative w-full h-full lg:w-[120%] lg:-mr-[20%]">
            <AnimatePresence>
              {visibleArticles.map((article) => {
                if (!article) return null;
                return (
                  <motion.div
                    key={article.id}
                    initial={{ scale: 0, opacity: 0, y: 50, x: article.x }}
                    animate={{
                      scale: article.scale,
                      opacity: 1,
                      y: 0,
                      rotate: article.rotation,
                      x: article.x,
                      top: article.y
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18
                    }}
                    className="absolute shadow-2xl rounded-lg overflow-hidden bg-white border border-border"
                    style={{
                      width: '300px',
                      zIndex: article.zIndex,
                    }}
                  >
                    <img src={article.src} alt={article.title} className="w-full h-auto object-cover" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Trusted By Section (Mobile: After News Stack) */}
        <div
          className="block lg:hidden pt-4 border-t border-border w-full max-w-xl transition-opacity duration-1000 mb-4 order-3 px-4 md:px-0 mt-32"
          style={{ opacity: step >= 3 ? 1 : 0 }}
        >
          <p className="text-[#334155]/80 text-xs font-bold uppercase tracking-widest mb-4">
            Trusted by top brand teams
          </p>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,black_70%,transparent)]">
            <div className="animate-marquee whitespace-nowrap flex gap-12 items-center w-max">
              {["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"]
                .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                .concat(["/companyLogos/nysom.png", "/companyLogos/rootLabs.png", "/companyLogos/gbk.png", "/companyLogos/celestialLights.png"])
                .map((src, index) => {
                  const isLarge = src.includes("gbk");
                  return (
                    <img
                      key={index}
                      src={src}
                      alt="Brand Logo"
                      className={`${isLarge ? "h-20 md:h-24" : "h-10 md:h-12"} object-contain inline-block shrink-0`}
                    />
                  );
                })}
            </div>
          </div>
          <style jsx>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  display: flex;
                  animation: marquee 30s linear infinite;
                }
              `}</style>
        </div>

      </div>
    </section>
  );
};

export default Hero;
