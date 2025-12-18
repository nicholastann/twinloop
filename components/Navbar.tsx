"use client";

import React from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-2 px-8 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/20 fixed top-0 z-50 shadow-sm"
    >

      {/* Logo / Brand */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        <img src="/twinloop.png" alt="Twinloop Logo" className="h-8 w-auto" />
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-[#0f1a1f] font-medium">
        <li>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] text-white font-bold rounded-lg hover:from-[#1e5b6d] hover:to-[#164656] shadow-md hover:shadow-lg transition-all"
          >
            Book Demo
          </motion.a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden px-4 py-2 rounded-lg bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] text-white font-bold shadow-md"
      >
        Book Demo
      </motion.a>

    </motion.nav>
  );
};


export default Navbar;
