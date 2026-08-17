"use client";
import React from "react";
import { Mail } from "lucide-react";
import HeaderDivider from "../ui/HeaderDivider";
import ContactForm from "./ContactForm";
import EmailMe from "./EmailMe";

export default function MainContactUs() {
  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-10 pt-16 pb-8 sm:py-8 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient Background Aurora Orbs */}
      <div className="absolute top-10 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-rose-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora-reverse" />

      <div className="relative z-10">
        <HeaderDivider icon={<Mail className="w-5 h-5" />} chipAlign="right">
          ارتباط با من
        </HeaderDivider>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
          {/* Form Container */}
          <ContactForm />

          {/* Info & Map Container */}
          <EmailMe />
        </div>
      </div>
    </div>
  );
}
