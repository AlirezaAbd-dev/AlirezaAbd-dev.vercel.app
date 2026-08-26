import { Metadata } from "next";
import React from "react";
import HomeClient from "@/components/home/HomeClient";

const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";

export const metadata: Metadata = {
  title: "Portfolio & Projects — Alireza Abedi",
  description:
    "وب‌سایت و نمونه‌کارهای رسمی علیرضا عابدی (Alireza Abedi)، لید تیم فرانت‌اند و مهندس نرم‌افزار فول‌استک متخصص در Next.js، React، NestJS و دات‌نت.",
  keywords: [
    "علیرضا عابدی",
    "Alireza Abedi",
    "Alireza Abedi Portfolio",
    "لید تیم فرانت اند",
    "برنامه نویس فول استک",
    "Next.js Developer",
    "React Developer",
    "NestJS Developer",
    "ASP.NET Core",
    "Clean Architecture",
  ],
  alternates: {
    canonical: PORTFOLIO_DOMAIN,
  },
};

export default function Home() {
  return (
    <>
      {/* Semantic Server-Side Rendered Document for Crawlers, Indexers & AI Agents */}
      <section className="sr-only" aria-label="مشخصات و سوابق حرفه‌ای علیرضا عابدی">
        <h1>علیرضا عابدی | لید تیم فرانت‌اند و مهندس نرم‌افزار فول‌استک — Alireza Abedi</h1>
        
        <h2>درباره علیرضا عابدی و پیشینه شغلی</h2>
        <p>
          علیرضا عابدی (Alireza Abedi) مهندس نرم‌افزار، لید تیم فرانت‌اند و برنامه‌نویس فول‌استک با بیش از ۳.۵ سال سابقه کار حرفه‌ای در طراحی و پیاده‌سازی سیستم‌های مقیاس‌پذیر، پلتفرم‌های CRM، سامانه‌های حسابداری و نرم‌افزارهای سازمانی مدرن است. وی در حال حاضر دانشجوی کارشناسی ارشد مهندسی کامپیوتر - نرم‌افزار در دانشگاه آزاد اسلامی واحد رشت است.
        </p>

        <h2>مهارت‌ها و تخصص‌های اصلی فنی</h2>
        <p>
          تسلط عمیق بر معماری تمیز (Clean Architecture)، طراحی دامنه‌محور (DDD)، Next.js 16، React 19، TypeScript، Tailwind CSS v4، نست‌جی‌اس (NestJS)، سی‌شارپ و دات‌نت کور (C# / ASP.NET Core)، پایگاه داده PostgreSQL، پایگاه داده MongoDB، مایگریشن‌های Prisma ORM، ارتباطات بلادرنگ WebRTC و Socket.io، و کانتینرسازی Docker.
        </p>

        <h2>نمونه‌کارهای شاخص و سورس‌کدها</h2>
        <p>
          پروژه‌های شاخص شامل معماری میکروسرویس سازمانی دات‌نت (Dotnet Microservices)، پلتفرم جامع معاملات املاک NestJS Realtor API، شبکه اجتماعی مدرن بلبلر (Bolboler)، سامانه مدیریت رسانه با ASP.NET Core، سیستم تماس تصویری بلادرنگ WebRTC، چت‌بات چندحالته Gemini AI و پنل داشبورد ادمین فارسی است.
        </p>

        <h2>اطلاعات تماس، شبکه‌های اجتماعی و موقعیت</h2>
        <p>
          پست الکترونیک: alireza.abedi9310@gmail.com | تلفن: 09909310164 | تلگرام: @AlirezaAbd_Dev | گیت‌هاب: https://github.com/AlirezaAbd-dev | لینکدین: https://www.linkedin.com/in/alireza-abedi-714280235 | موقعیت مکانی: رشت، استان گیلان، ایران.
        </p>
      </section>

      {/* Interactive Visual UI Shell */}
      <HomeClient />
    </>
  );
}
