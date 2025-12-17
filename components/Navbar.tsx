"use client";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/20 fixed top-0 z-50 transition-all duration-300">

      {/* Logo / Brand */}
      <img src="/twinloop.png" alt="Twinloop Logo" className="h-10 w-auto" />

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-[#0f1a1f] font-medium">
        <li>
          <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] text-white font-bold rounded-lg hover:from-[#1e5b6d] hover:to-[#164656] transition-all shadow-md hover:shadow-lg">Book Demo</a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden px-4 py-2 rounded-lg bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] text-white font-bold hover:from-[#1e5b6d] hover:to-[#164656] transition shadow-md">
        Menu
      </button>

    </nav>
  );
};

export default Navbar;
