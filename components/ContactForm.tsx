"use client";

import React, { useState } from "react";
import ScrollFadeUp from "./ui/ScrollFadeUp"

const spendOptions = [
    "$0 - $1M",
    "$1M - $10M",
    "$10M - $50M",
    "$50M - $100M",
    "$100M+",
];

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        annualSpend: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you! We'll reach out soon.");
        setFormData({ name: "", email: "", title: "", annualSpend: "", message: "" });
    };

    return (
        <section
            id="contact"
            className="relative bg-transparent pb-16"
        >
            <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-12">
                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
                            See Twinloop <span className="text-[#236a7c]">In Action</span>
                        </h2>
                    </ScrollFadeUp>

                    <ScrollFadeUp yOffset={20} duration={0.8} delay={0.2}>
                        <p className="text-[#334155] text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
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
                        <div className="p-1 rounded-3xl bg-gradient-to-tr from-[#236a7c]/10 via-[#236a7c] to-[#236a7c]/10 shadow-lg shadow-[#236a7c]/20">
                            <form
                                onSubmit={handleSubmit}
                                className="relative bg-white p-8 md:p-12 rounded-[22px] space-y-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]"
                            >
                                {/* Inputs Grid */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Company Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>


                                <textarea
                                    name="message"
                                    placeholder="Optional message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-4 text-lg rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all h-40 resize-none shadow-sm"
                                ></textarea>


                                <button
                                    type="submit"
                                    className="cursor-pointer w-full bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] hover:from-[#1e5b6d] hover:to-[#164656] text-white text-xl font-bold rounded-xl py-5 shadow-lg transform transition-all duration-300 active:scale-[0.97]"
                                >
                                    Book Demo
                                </button>

                                <p className="text-muted-foreground text-sm mt-6 text-center font-medium opacity-80">
                                    We respect your privacy. Your information will never be shared.
                                </p>
                            </form>
                        </div>
                    </div>


                </ScrollFadeUp>
            </div>
        </section>
    );
};

export default ContactForm;
