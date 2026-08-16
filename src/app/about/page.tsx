import { Metadata } from "next";
import MainAboutMe from "@/components/aboutMe/MainAboutMe";

export const metadata: Metadata = {
  title: "درباره من | بیوگرافی و سوابق کاری",
  description:
    "آشنایی با علیرضا عابدی، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک. مهارت‌ها، سوابق تحصیلی، تجربیات شرکتی و فریلنس.",
  keywords: [
    "درباره علیرضا عابدی",
    "سوابق کاری علیرضا عابدی",
    "مهارت های برنامه نویسی",
    "لید تیم فرانت اند",
    "توسعه دهنده وب",
    "تحصیلات علیرضا عابدی",
  ],
  alternates: {
    canonical: "/about",
  },
};

const About = () => {
  return <MainAboutMe />;
};

export default About;
