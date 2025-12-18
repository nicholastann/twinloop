"use client";

import React, { useState } from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        annualSpend: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
        // Reset after a delay or keep as is
    };

    return (
        <section
            id="contact"
            className="relative bg-transparent pb-16"
        >
            <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-10">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
                            See Twinloop <span className="text-[#236a7c]">In Action</span>
                        </h2>
                    </ScrollFadeUp>

                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.2}>
                        <p className="text-[#334155] text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                            Book a personalized demo and discover how leading brands are making every marketing dollar count.
                        </p>
                    </ScrollFadeUp>

                </div>


                {/* Gradient Container */}
                <ScrollFadeUp yOffset={30} duration={1} delay={0.1}>
                    <div className="relative flex justify-center">
                        {/* Glow Layer */}
                        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-[#236a7c]/20 via-[#236a7c]/30 to-[#b8dce7]/40 blur-3xl animate-pulse pointer-events-none"></div>

                        {/* Gradient border container */}
                        <div className="p-1 rounded-3xl bg-gradient-to-tr from-[#236a7c]/10 via-[#236a7c] to-[#236a7c]/10 shadow-lg shadow-[#236a7c]/20 w-full">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white p-12 rounded-[22px] shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            className="w-20 h-20 bg-[#f0f9ff] rounded-full flex items-center justify-center text-[#236a7c] mb-6"
                                        >
                                            <FaCheckCircle size={40} />
                                        </motion.div>
                                        <h3 className="text-3xl font-black text-[#0f172a] mb-2">Message Sent!</h3>
                                        <p className="text-[#334155] text-lg">We'll be in touch shortly.</p>
                                        <button
                                            onClick={() => setSubmitted(false)} // Optional: allow reset
                                            className="mt-8 text-[#236a7c] font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="relative bg-white p-8 md:p-12 rounded-[22px] space-y-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]"
                                    >
                                        {/* Inputs Grid */}
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <motion.input
                                                whileFocus={{ scale: 1.02, backgroundColor: "#fff" }}
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm"
                                            />
                                            <motion.input
                                                whileFocus={{ scale: 1.02, backgroundColor: "#fff" }}
                                                type="email"
                                                name="email"
                                                placeholder="Company Email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm"
                                            />
                                        </div>


                                        <motion.textarea
                                            whileFocus={{ scale: 1.02, backgroundColor: "#fff" }}
                                            name="message"
                                            placeholder="Optional message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all h-40 resize-none shadow-sm"
                                        ></motion.textarea>


                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="cursor-pointer w-full bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] hover:from-[#1e5b6d] hover:to-[#164656] text-white text-xl font-bold rounded-xl py-4 shadow-lg active:scale-[0.97]"
                                        >
                                            Book Demo
                                        </motion.button>

                                        <p className="text-muted-foreground text-sm mt-6 text-center font-medium opacity-80">
                                            We respect your privacy. Your information will never be shared.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>


                </ScrollFadeUp>
            </div>
        </section>
    );
};

export default ContactForm;
