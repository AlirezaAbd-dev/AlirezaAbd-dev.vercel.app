import { Metadata } from "next";
import MainContactUs from "@/components/contact/MainContactUs";

export const metadata: Metadata = {
  title: "ارتباط با من | تماس و همکاری",
  description:
    "راه‌های ارتباطی با علیرضا عابدی جهت مشاوره فنی، طراحی و توسعه پروژه‌های وب، همکاری تیمی و استخدام.",
  keywords: [
    "تماس با علیرضا عابدی",
    "همکاری با علیرضا عابدی",
    "استخدام برنامه نویس فرانت اند",
    "مشاوره فنی وب",
    "ایمیل علیرضا عابدی",
  ],
  alternates: {
    canonical: "/contactUs",
  },
};

const Contact = () => {
  return <MainContactUs />;
};

export default Contact;
