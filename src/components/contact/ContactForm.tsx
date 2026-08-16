"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { contactValidationSchema } from "../../validations/contactValidation";
import FormInputs from "./FormInputs";
import FormReCAPTCHA from "./FormReCAPTCHA";

export interface initialFormType {
  fullname: string;
  subject: string;
  message: string;
  recaptcha: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik<initialFormType>({
    initialValues: {
      fullname: "",
      subject: "",
      message: "",
      recaptcha: "valid",
    },
    validate: (values) => {
      const result = contactValidationSchema.safeParse(values);
      if (!result.success) {
        const errors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0];
          if (field && typeof field === "string") {
            errors[field] = issue.message;
          }
        }
        return errors;
      }
      return {};
    },
    onSubmit: (values, { resetForm }) => {
      window.location.assign(
        `mailto:alireza.abedi9310@gmail.com?subject=${encodeURIComponent(
          `${values.fullname} - ${values.subject}`
        )}&body=${encodeURIComponent(values.message)}`
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      resetForm();
    },
  });

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <h3 className="text-base md:text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>فرم ارسال پیام مستقیم</span>
        </h3>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          پاسخگویی سریع
        </span>
      </div>

      {submitted && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold animate-slide-up">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>پیام شما آماده ارسال شد و در برنامه ایمیل باز گردید!</span>
        </div>
      )}

      {/* Form Inputs */}
      <FormInputs formik={formik} />

      {/* Optional ReCAPTCHA if site key exists */}
      <FormReCAPTCHA formik={formik} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-600 text-white font-black text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer shimmer-effect"
      >
        <Send className="w-4 h-4 animate-bounce" />
        <span>ارسال پیام</span>
      </button>
    </form>
  );
}
