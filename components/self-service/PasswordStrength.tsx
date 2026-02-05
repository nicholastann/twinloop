import React from "react";
import { motion } from "framer-motion";

interface PasswordStrengthProps {
    score: number; // 0 to 4
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ score }) => {
    const getColor = (score: number) => {
        switch (score) {
            case 0: return "bg-gray-200";
            case 1: return "bg-red-500";
            case 2: return "bg-orange-500";
            case 3: return "bg-yellow-500";
            case 4: return "bg-green-500";
            default: return "bg-gray-200";
        }
    };

    const getLabel = (score: number) => {
        switch (score) {
            case 0: return "";
            case 1: return "Weak";
            case 2: return "Fair";
            case 3: return "Good";
            case 4: return "Strong";
        }
    };

    return (
        <div className="mt-2">
            <div className="flex gap-1 h-1.5 mb-1.5">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`h-full flex-1 rounded-full transition-colors duration-300 ${score >= level ? getColor(score) : "bg-gray-200"
                            }`}
                    />
                ))}
            </div>
            <p className={`text-xs text-right font-medium ${score > 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                {getLabel(score)}
            </p>
        </div>
    );
};

export default PasswordStrength;
