"use client";

import React from "react";
import { FaBullhorn, FaLightbulb, FaBoxOpen, FaRocket, FaChartBar, FaUsers } from "react-icons/fa";

const useCases = [
    { title: "Messaging, Value Prop, & Claims Testing", icon: <FaBullhorn size={24} /> },
    { title: "Brand Strategy & Positioning", icon: <FaLightbulb size={24} /> },
    { title: "Creative & Campaign Concept Testing", icon: <FaBoxOpen size={24} /> },
    { title: "Packaging & Naming", icon: <FaBoxOpen size={24} /> },
    { title: "New Product or Brand Launch Validation", icon: <FaRocket size={24} /> },
    { title: "Influencer & Social Creative Optimization", icon: <FaUsers size={24} /> },
    { title: "Predictive Forecasting for Interest or Conversion", icon: <FaChartBar size={24} /> },
];

const twinTypes = [
    { title: "Demographic & Psychographic Clusters", icon: <FaUsers size={24} /> },
    { title: "Behavioral Cohorts (Price-Sensitive, Early Adopters, etc.)", icon: <FaChartBar size={24} /> },
    { title: "Channel-Specific Twins (TikTok Shoppers, D2C Buyers)", icon: <FaBullhorn size={24} /> },
];

const UseCasesSection: React.FC = () => {
    return (
        <section id="use-cases" className="py-20 bg-background">
            <div className="container mx-auto px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Use Cases & Digital Twin Types
                    </h2>
                    <p className="text-foreground text-lg md:text-xl">
                        Discover how digital twins are applied in real brand work.
                    </p>
                </div>

                {/* Use Cases Grid */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-primary mb-6">Use Cases</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card border-2 border-primary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                            >
                                <div className="mb-4 text-primary">{useCase.icon}</div>
                                <h4 className="font-semibold text-lg text-foreground">{useCase.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Digital Twin Types Grid */}
                <div>
                    <h3 className="text-2xl font-semibold text-primary mb-6">Digital Twin Types</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {twinTypes.map((twin, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card border-2 border-primary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                            >
                                <div className="mb-4 text-primary">{twin.icon}</div>
                                <h4 className="font-semibold text-foreground">{twin.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
