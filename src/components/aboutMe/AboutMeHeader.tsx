"use client";
import React from "react";
import { Code2 } from "lucide-react";
import HeaderDivider from "../ui/HeaderDivider";
import AboutMeContent from "./AboutMeContent";
import AboutMeMobile from "./AboutMeMobile";

export default function AboutMeHeader() {
  return (
    <div className="w-full mb-8">
      <HeaderDivider icon={<Code2 className="w-5 h-5 text-emerald-500" />} chipAlign="right">
        لید تیم فرانت‌اند & توسعه‌دهنده فول‌استک
      </HeaderDivider>

      {/* RTL Layout: Image on the Right, Info Cards on the Left on Desktop */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
        <AboutMeMobile />
        <div className="w-full md:w-2/3">
          <AboutMeContent />
        </div>
      </div>
    </div>
  );
}
