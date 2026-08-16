"use client";
import React, { ChangeEventHandler } from "react";
import { User, Tag, MessageSquare } from "lucide-react";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import { initialFormType } from "./ContactForm";

interface FormInputsProps {
  formik: {
    touched: FormikTouched<initialFormType>;
    errors: FormikErrors<initialFormType>;
    values: FormikValues;
    handleChange: ChangeEventHandler;
  };
}

export default function FormInputs({ formik }: FormInputsProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Fullname Input */}
      <div>
        <label htmlFor="fullname" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 text-right">
          نام و نام خانوادگی
        </label>
        <div className="relative">
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="مثال: علیرضا محمدی"
            value={formik.values?.fullname || ""}
            onChange={formik.handleChange}
            className={`w-full px-4 py-3 pr-10 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 outline-none focus:ring-2 ${
              formik.touched.fullname && formik.errors.fullname
                ? "border-rose-500 focus:ring-rose-500/30"
                : "border-zinc-200 dark:border-zinc-700/80 focus:border-emerald-500 focus:ring-emerald-500/20"
            }`}
          />
          <User className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>
        {formik.touched.fullname && formik.errors.fullname && (
          <p className="text-xs text-rose-500 mt-1 font-medium text-right">
            {formik.errors.fullname}
          </p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 text-right">
          عنوان پیام
        </label>
        <div className="relative">
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="مثال: پیشنهاد همکاری برای پروژه"
            value={formik.values?.subject || ""}
            onChange={formik.handleChange}
            className={`w-full px-4 py-3 pr-10 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 outline-none focus:ring-2 ${
              formik.touched.subject && formik.errors.subject
                ? "border-rose-500 focus:ring-rose-500/30"
                : "border-zinc-200 dark:border-zinc-700/80 focus:border-emerald-500 focus:ring-emerald-500/20"
            }`}
          />
          <Tag className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>
        {formik.touched.subject && formik.errors.subject && (
          <p className="text-xs text-rose-500 mt-1 font-medium text-right">
            {formik.errors.subject}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 text-right">
          متن پیام
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="متن پیام و توضیحات شما"
            value={formik.values?.message || ""}
            onChange={formik.handleChange}
            className={`w-full px-4 py-3 pr-10 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 outline-none resize-none focus:ring-2 ${
              formik.touched.message && formik.errors.message
                ? "border-rose-500 focus:ring-rose-500/30"
                : "border-zinc-200 dark:border-zinc-700/80 focus:border-emerald-500 focus:ring-emerald-500/20"
            }`}
          />
          <MessageSquare className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>
        {formik.touched.message && formik.errors.message && (
          <p className="text-xs text-rose-500 mt-1 font-medium text-right">
            {formik.errors.message}
          </p>
        )}
      </div>
    </div>
  );
}
