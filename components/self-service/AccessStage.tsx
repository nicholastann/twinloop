import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaArrowRight } from "react-icons/fa";

const AccessStage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
        >
            <div className="w-24 h-24 bg-gradient-to-tr from-[#236a7c] to-[#b8dce7] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#236a7c]/20">
                <FaRocket className="text-white text-4xl ml-1" />
            </div>

            <h3 className="text-3xl font-black text-[#0f172a] mb-4">You're all set!</h3>
            <p className="text-[#334155] text-lg max-w-md mx-auto mb-8">
                Your account is active and your credits have been loaded. You now have full access to Twinloop.
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/dashboard"} // Assuming dashboard route
                className="inline-flex items-center gap-2 bg-[#236a7c] text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-[#1e5b6d] transition-all"
            >
                Launch Twinloop <FaArrowRight />
            </motion.button>
        </motion.div>
    );
};

export default AccessStage;
