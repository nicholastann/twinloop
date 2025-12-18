import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import UseCases from "../components/UseCases"
import VennDiagramSection from "../components/VennDiagramSection";
import HowItWorks from "../components/HowItWorks";
import ValidationSection from "../components/ValidationSection";
import WhyTwinloop from "../components/WhyTwinloop";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="font-sans relative min-h-screen">
      <Navbar />

      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fcfd] via-[#f0f9fb] to-[#e6f6f9]" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-[#236a7c]/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-0 w-[30rem] h-[30rem] bg-[#b8dce7]/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-[40rem] h-[40rem] bg-[#236a7c]/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <UseCases />
        <VennDiagramSection />
      </div>

      <WhyTwinloop />
      <div className="relative z-10">
        <ValidationSection />
        <ContactForm />
        <Footer />
      </div>

    </div>
  );
};

export default Home;
