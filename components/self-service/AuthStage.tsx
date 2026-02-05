import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

interface AuthStageProps {
    onNext: (email: string) => void;
}

const AuthStage: React.FC<AuthStageProps> = ({ onNext }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) return;

        setLoading(true);

        // Notify internal team
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: "New User (Self Service)",
                    email: email,
                    optionalMessage: "USER SIGNED UP via Email-only Flow."
                }),
            });
        } catch (err) {
            console.error("Failed to notify internal team", err);
        }

        setTimeout(() => {
            setLoading(false);
            onNext(email);
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6 pt-2"
        >
            <div className="text-center space-y-2 mb-4">
                <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">Try Twinloop</h3>
                <p className="text-[#64748b] font-medium text-sm">Enter your email to get started.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-bold text-lg"
                        placeholder="your@email.com"
                    />
                    <FaEnvelope className="absolute right-5 top-5 text-gray-400" />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !email.includes("@")}
                    className="cursor-pointer w-full bg-[#236a7c] hover:bg-[#1e5b6d] text-white py-4.5 rounded-2xl font-black text-xl shadow-xl shadow-[#236a7c]/20 active:scale-[0.97] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? "Heading to dashboard..." : "Get Started"}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AuthStage;
