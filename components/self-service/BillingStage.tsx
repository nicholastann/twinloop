import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaLock, FaCheck, FaCcVisa, FaCcMastercard, FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaCcAmex, FaCcDiscover, FaDownload, FaRocket } from "react-icons/fa";

interface BillingStageProps {
    onNext: () => void;
    email: string;
}

const BillingStage: React.FC<BillingStageProps> = ({ onNext, email }) => {
    const [credits, setCredits] = useState(5000);
    const [autoTopUp, setAutoTopUp] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState<"selection" | "payment" | "success">("selection");
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");

    // Payment Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [cardBrand, setCardBrand] = useState<"visa" | "mastercard" | "amex" | "discover" | null>(null);

    const isPaymentValid = firstName && lastName && cardNumber && expiry && cvc && address && city && zip;

    const validateLuhn = (number: string) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return (sum % 10) === 0;
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Card Number (16 digits + Luhn)
        const cleanCard = cardNumber.replace(/[^0-9]/g, "");
        if (cleanCard.length < 13 || cleanCard.length > 19) {
            newErrors.cardNumber = "Invalid card length";
        } else if (!validateLuhn(cleanCard)) {
            newErrors.cardNumber = "Invalid card number (Luhn Check failed)";
        }

        // Expiry (MM / YY, non-expired)
        const cleanExpiry = expiry.replace(/[^0-9]/g, "");
        if (cleanExpiry.length !== 4) {
            newErrors.expiry = "Inv. Date";
        } else {
            const month = parseInt(cleanExpiry.substr(0, 2));
            const year = parseInt("20" + cleanExpiry.substr(2, 2));
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;

            if (month < 1 || month > 12) {
                newErrors.expiry = "Inv. Month";
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = "Expired";
            }
        }

        // CVC (3 or 4 digits)
        const cleanCVC = cvc.replace(/\D/g, "");
        if (cleanCVC.length < 3 || cleanCVC.length > 4) {
            newErrors.cvc = "3-4 digits";
        }

        // ZIP (Simple length check for now, can be stricter if needed)
        if (zip.length < 5) {
            newErrors.zip = "Invalid ZIP";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Formatting Helpers
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\D/g, "").substr(0, 19);

        // Detect Brand
        if (v.startsWith("4")) setCardBrand("visa");
        else if (/^5[1-5]/.test(v)) setCardBrand("mastercard");
        else if (/^3[47]/.test(v)) setCardBrand("amex");
        else if (v.startsWith("6")) setCardBrand("discover");
        else setCardBrand(null);

        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substr(i, 4));
        }
        return parts.join(" ");
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "").substr(0, 4);
        if (v.length >= 2) {
            return `${v.substr(0, 2)} / ${v.substr(2)}`;
        }
        return v;
    };

    const formatCVC = (value: string) => {
        return value.replace(/\D/g, "").substr(0, 4);
    };

    const pricePerCredit = 1; // $1 per credit
    const total = credits * pricePerCredit;

    const handlePayment = () => {
        // FORCE TRUE FOR TESTING: Validation bypassed
        // if (!validateForm()) return; 

        setProcessing(true);
        setPaymentStatus("idle");

        // Simulate Stripe processing
        setTimeout(() => {
            setProcessing(false);

            // For testing: if ZIP is "error", trigger failure
            if (zip.toLowerCase() === "error") {
                setPaymentStatus("error");
            } else {
                setPaymentStatus("success");
                setStep("success");
            }
        }, 2000);
    };

    const presetAmounts = [1000, 5000, 25000];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0
        })
    };

    return (
        <div className="relative overflow-hidden min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
                {step === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-8"
                    >
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-200"
                            >
                                <FaCheckCircle className="text-6xl text-white" />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-green-400 rounded-full -z-10 blur-xl"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-[#0f172a] tracking-tight">Payment Confirmed!</h3>
                                <p className="text-gray-500 font-medium italic">
                                    Receipt sent to {email}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#236a7c]/20 to-transparent"></div>
                                <p className="text-[#334155] text-lg font-bold leading-tight mb-2">
                                    You&apos;re all set!
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Your account is active and <span className="text-[#236a7c] font-black">{credits.toLocaleString()} credits</span> have been loaded.
                                    You now have full access to Twinloop.
                                </p>
                                <button className="mt-4 flex items-center gap-1 mx-auto text-[10px] font-bold text-gray-400 hover:text-[#236a7c] transition-colors" title="Download Receipt">
                                    <FaDownload /> DOWNLOAD INVOICE
                                </button>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center px-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Paid</span>
                                <span className="text-xl font-black text-[#0f172a]">${total.toLocaleString()}</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.href = "/dashboard"}
                                className="cursor-pointer w-full bg-[#236a7c] hover:bg-[#1e5b6d] text-white py-4.5 rounded-2xl font-black text-xl shadow-xl shadow-[#236a7c]/20 active:scale-[0.97] transition-all flex items-center justify-center gap-3 group"
                            >
                                Launch Twinloop
                                <FaRocket className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                ) : step === "selection" ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1"
                    >
                        <div className="text-center mb-4">
                            <p className="text-[#0f172a] font-bold text-lg">Purchase credits</p>
                            <p className="text-sm text-gray-400">for the account: {email}</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#0f172a] mb-2 tracking-wider">Select Credit Amount</label>
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {presetAmounts.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => setCredits(amount)}
                                            className={`cursor-pointer py-2 px-2 rounded-xl text-sm font-semibold transition-all border ${credits === amount
                                                ? "border-[#236a7c] bg-[#236a7c]/5 text-[#236a7c] shadow-sm"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {amount.toLocaleString()}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1000"
                                        value={credits}
                                        onChange={(e) => setCredits(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-[calc(100%-16px)] mx-2 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236a7c] outline-none font-mono text-base pr-20 [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-6 top-2.5 text-gray-400 text-sm font-medium pointer-events-none">credits</span>
                                </div>
                                {credits < 1000 && (
                                    <p className="text-red-500 text-xs mt-1 font-medium mx-2">Min 1,000 credits ($1k) required.</p>
                                )}
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                <input
                                    type="checkbox"
                                    checked={autoTopUp}
                                    onChange={(e) => setAutoTopUp(e.target.checked)}
                                    className="cursor-pointer mt-1 rounded text-[#236a7c] focus:ring-[#236a7c] accent-[#236a7c]"
                                />
                                <div className="cursor-pointer" onClick={() => setAutoTopUp(!autoTopUp)}>
                                    <p className="font-semibold text-blue-900 text-sm">Enable Auto-Top Up</p>
                                    <p className="text-blue-700/70 text-xs leading-tight">Auto-purchase 1,000 credits when balance &lt; 100.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep("payment")}
                                disabled={credits < 1000}
                                className="cursor-pointer w-[calc(100%-16px)] mx-2 bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] hover:from-[#1e5b6d] hover:to-[#164656] text-white py-3.5 rounded-xl font-bold text-xl shadow-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue to Payment
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1"
                    >
                        <div className="flex items-center mb-4 relative">
                            <button
                                onClick={() => setStep("selection")}
                                className="absolute left-0 p-2 -ml-2 text-gray-400 hover:text-[#236a7c] transition-colors"
                            >
                                <FaArrowLeft />
                            </button>
                            <div className="w-full text-center">
                                <p className="text-[#0f172a] font-bold text-lg">Payment Details</p>
                            </div>
                        </div>

                        {paymentStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                            >
                                <FaExclamationCircle className="text-red-500 mt-0.5 text-lg shrink-0" />
                                <div className="text-left">
                                    <p className="font-bold text-red-800 text-sm">Transaction Failed</p>
                                    <p className="text-red-600 text-xs mt-0.5">We couldn't process your payment. Please check your details and try again.</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Card Details UI */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#0f172a] tracking-wider">Card Information</span>
                                <div className="flex gap-2 text-gray-300">
                                    <FaCcVisa className={`text-2xl transition-colors ${cardBrand === "visa" ? "text-blue-800" : "opacity-30"}`} />
                                    <FaCcMastercard className={`text-2xl transition-colors ${cardBrand === "mastercard" ? "text-red-600" : "opacity-30"}`} />
                                    <FaCcAmex className={`text-2xl transition-colors ${cardBrand === "amex" ? "text-blue-500" : "opacity-30"}`} />
                                    <FaCcDiscover className={`text-2xl transition-colors ${cardBrand === "discover" ? "text-orange-500" : "opacity-30"}`} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Name on Card - Split */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Jane"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-medium text-sm"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div className="relative">
                                    <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={cardNumber}
                                            onChange={(e) => {
                                                setCardNumber(formatCardNumber(e.target.value));
                                                if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });
                                            }}
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.cardNumber ? "border-red-500 bg-red-50" : "border-gray-200 bg-[#f8fafc]"} text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-mono text-sm`}
                                        />
                                        <FaCreditCard className="absolute right-4 top-3.5 text-gray-400" />
                                    </div>
                                    {errors.cardNumber && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.cardNumber}</p>}
                                </div>

                                {/* Expiry & CVC */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">Expiry</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={expiry}
                                                onChange={(e) => {
                                                    setExpiry(formatExpiry(e.target.value));
                                                    if (errors.expiry) setErrors({ ...errors, expiry: "" });
                                                }}
                                                placeholder="MM / YY"
                                                maxLength={7}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.expiry ? "border-red-500 bg-red-50" : "border-gray-200 bg-[#f8fafc]"} text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-mono text-sm`}
                                            />
                                            {errors.expiry && <p className="absolute -bottom-5 left-1 text-red-500 text-[10px] font-bold whitespace-nowrap">{errors.expiry}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">CVC</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={cvc}
                                                onChange={(e) => {
                                                    setCvc(formatCVC(e.target.value));
                                                    if (errors.cvc) setErrors({ ...errors, cvc: "" });
                                                }}
                                                placeholder="123"
                                                maxLength={4}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.cvc ? "border-red-500 bg-red-50" : "border-gray-200 bg-[#f8fafc]"} text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-mono text-sm`}
                                            />
                                            <FaLock className="absolute right-4 top-3.5 text-gray-400/70 text-xs" />
                                            {errors.cvc && <p className="absolute -bottom-5 left-1 text-red-500 text-[10px] font-bold whitespace-nowrap">{errors.cvc}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="pt-2">
                                    <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-1">Billing Address</label>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Street Address"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-medium text-sm"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="City"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8fafc] text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-medium text-sm"
                                            />
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    value={zip}
                                                    onChange={(e) => {
                                                        setZip(e.target.value);
                                                        if (errors.zip) setErrors({ ...errors, zip: "" });
                                                    }}
                                                    placeholder="ZIP / Postal"
                                                    maxLength={10}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.zip ? "border-red-500 bg-red-50" : "border-gray-200 bg-[#f8fafc]"} text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#236a7c] focus:border-transparent transition-all shadow-sm font-mono text-sm`}
                                                />
                                                {errors.zip && <p className="absolute -bottom-5 right-0 text-red-500 text-[10px] font-bold">{errors.zip}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePayment}
                                disabled={processing} // FORCED TRUE: Removed !isPaymentValid check
                                className="cursor-pointer w-[calc(100%-16px)] mx-2 bg-gradient-to-r from-[#236a7c] to-[#1e5b6d] hover:from-[#1e5b6d] hover:to-[#164656] text-white py-3.5 rounded-xl font-bold text-xl shadow-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : paymentStatus === "error" ? (
                                    <span>Try Again</span>
                                ) : (
                                    <>Pay ${total.toLocaleString()}</>
                                )}
                            </motion.button>

                            <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1 mt-3">
                                <FaLock size={8} /> 256-bit SSL Encrypted Payment
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default BillingStage;
