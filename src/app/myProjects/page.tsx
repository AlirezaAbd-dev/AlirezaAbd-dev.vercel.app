import { Metadata } from "next";
import MainMyProject from "@/components/myProjects/MainMyProject";
import { portfolioStructuredData } from "@/constants/portfolioStructuredData";

const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";

export const metadata: Metadata = {
  title: "نمونه‌کارها و پروژه‌ها",
  description:
    "فهرست جامع پروژه‌های نرم‌افزاری و نمونه‌کارهای علیرضا عابدی شامل سیستم‌های سازمانی، میکروسرویس‌های دات‌نت، APIهای NestJS، اپلیکیشن‌های Next.js و React، و سامانه‌های بلادرنگ.",
  keywords: [
    "نمونه کارهای علیرضا عابدی",
    "پروژه های Alireza Abedi",
    "Alireza Abedi Projects",
    "پروژه های Next.js",
    "پروژه های React",
    "میکروسرویس دات نت",
    "سیستم CRM",
    "Realtor API NestJS",
    "پروژه های فول استک",
    "Clean Architecture Projects",
  ],
  alternates: {
    canonical: `${PORTFOLIO_DOMAIN}/myProjects`,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: `${PORTFOLIO_DOMAIN}/myProjects`,
    title: "Portfolio & Projects — Alireza Abedi",
    description:
      "نمونه‌کارهای مهندسی نرم‌افزار، پروژه‌های فول‌استک، میکروسرویس‌های سازمانی و سورس‌کدهای علیرضا عابدی.",
    siteName: "Alireza Abedi Portfolio",
    images: [
      {
        url: `${PORTFOLIO_DOMAIN}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Portfolio & Projects — Alireza Abedi Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Projects — Alireza Abedi",
    description:
      "فهرست جامع پروژه‌ها و نمونه‌کارهای برنامه‌نویسی علیرضا عابدی (لید تیم فرانت‌اند و فول‌استک).",
    images: [`${PORTFOLIO_DOMAIN}/opengraph-image`],
  },
};

export default function MyProjects() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }}
      />
      <MainMyProject />
    </>
  );
}
