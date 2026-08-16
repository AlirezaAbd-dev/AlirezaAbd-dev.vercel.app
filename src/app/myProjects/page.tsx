import { Metadata } from "next";
import MainMyProject from "@/components/myProjects/MainMyProject";

export const metadata: Metadata = {
  title: "نمونه‌کارها و پروژه‌ها",
  description:
    "مشاهده پروژه‌ها و نمونه‌کارهای اجرا شده توسط علیرضا عابدی شامل سیستم‌های سازمانی CRM، حسابداری، پلتفرم‌های آموزشی و اپلیکیشن‌های وب مدرن.",
  keywords: [
    "نمونه کارهای علیرضا عابدی",
    "پروژه های Next.js",
    "پروژه های React",
    "سیستم CRM",
    "پنل مدیریت حسابداری",
    "پروژه های فول استک",
  ],
  alternates: {
    canonical: "/myProjects",
  },
};

const MyProjects = () => {
  return <MainMyProject />;
};

export default MyProjects;
