"use client";
import React, { ReactNode } from "react";

export default function DevInfo({
  label,
  value,
  children,
}: {
  label?: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 shadow-sm transition hover:border-cyan-500/40">
      {label && value ? (
        <>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}:</span>
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 font-mono" dir="ltr">{value}</span>
        </>
      ) : (
        <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 w-full text-right">
          {children}
        </span>
      )}
    </div>
  );
}
