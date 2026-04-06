import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthStage from "./AuthStage";

const SelfServiceLayout: React.FC = () => {

    const url = "https://deveric.dpy1vx4jrggh1.amplifyapp.com/signup"

    const handleAuthComplete = (userEmail: string, userName: string) => {
        // Redirecting with email and name (if provided) as query parameters
        const emailParam = `email=${encodeURIComponent(userEmail)}`;
        const nameParam = userName ? `&name=${encodeURIComponent(userName)}` : "";
        window.location.href = `${process.env.NEXT_PUBLIC_PXSTUDIO_URL || url}?${emailParam}${nameParam}`;
    };

    const renderStage = () => {
        return <AuthStage key="auth" onNext={handleAuthComplete} />;
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-[22px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {renderStage()}
            </AnimatePresence>
        </div>
    );
};

export default SelfServiceLayout;
