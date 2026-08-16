"use client";
import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarTabs from "./SidebarTabs";
import SidebarFooter from "./SidebarFooter";

export default function SidebarContent() {
  return (
    <div className="flex flex-col h-full min-h-screen w-full select-none overflow-y-auto no-scrollbar">
      <SidebarHeader />
      <SidebarTabs />
      <SidebarFooter />
    </div>
  );
}
