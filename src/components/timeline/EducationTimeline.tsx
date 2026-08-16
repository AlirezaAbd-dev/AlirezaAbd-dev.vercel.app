"use client";
import React from "react";
import { GraduationCap } from "lucide-react";
import HeaderDivider from "../ui/HeaderDivider";
import education from "../../constants/education";
import EducationTimelineItem from "./EducationTimelineItem";

export default function EducationTimeline() {
  return (
    <div className="w-full mb-8">
      <HeaderDivider icon={<GraduationCap className="w-5 h-5" />} chipAlign="right">
        سوابق تحصیلی
      </HeaderDivider>

      <div className="flex flex-col mt-6 max-w-2xl mx-auto">
        {education.map((item, index) => (
          <EducationTimelineItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
