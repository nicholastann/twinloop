import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthStage from "./AuthStage";

const SelfServiceLayout: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleAuthComplete = (userEmail: string) => {
        setEmail(userEmail);
        // Redirecting with email as a query parameter
        window.location.href = `https://app.twinloop.ai?email=${encodeURIComponent(userEmail)}`;
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
