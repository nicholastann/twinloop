"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent text-[#0f1a1f] py-6 border-t border-gray-200/60">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">

                    {/* Left Side: Brand & Tagline */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <img src="/twinloop.png" alt="Twinloop Logo" className="h-8 w-auto opacity-90" />
                        <p className="text-center md:text-left text-[#334155] text-sm font-medium leading-relaxed max-w-md whitespace-nowrap">
                            Rapid feedback loops for smarter brand decisions.
                        </p>
                    </div>

                    {/* Right Side: Links & Copyright */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-6 md:gap-8">
                            <a href="mailto:noreply@twinloop.ai" className="text-[#236a7c] hover:text-[#1e5b6d] transition-colors font-bold text-sm">
                                Contact Us
                            </a>
                            <a href="#" className="inline-flex items-center justify-center p-2 rounded-full bg-[#236a7c]/10 text-[#236a7c] hover:bg-[#236a7c] hover:text-white transition-all duration-300">
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                        <div className="text-gray-400 text-xs font-medium">
                            &copy; {new Date().getFullYear()} Twinloop. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
