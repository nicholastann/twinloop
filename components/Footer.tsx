"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent text-[#0f1a1f] py-16">
            <div className="container mx-auto px-6 lg:px-8 flex flex-col items-center space-y-8">
                {/* Logo */}
                <img src="/twinloop.png" alt="Twinloop Logo" className="h-10 w-auto opacity-90" />

                {/* Tagline */}
                <p className="text-center text-[#334155] text-lg max-w-lg font-medium leading-relaxed">
                    Make every brand dollar count with customer digital twins. Rapid feedback loops for smarter brand decisions.
                </p>

                {/* Links stacked vertically */}
                <div className="flex flex-col items-center space-y-4 pt-4">
                    <a href="#" className="flex items-center space-x-2 text-[#236a7c] hover:text-[#1e5b6d] transition-colors font-bold">
                        <FaLinkedin size={24} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="mailto:noreply@twinloop.ai" className="text-[#236a7c] hover:text-[#1e5b6d] transition-colors font-bold">
                        noreply@twinloop.ai
                    </a>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-16 text-center text-gray-400 text-sm font-medium">
                &copy; {new Date().getFullYear()} Twinloop. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
