import { Metadata } from "next";
import GameHub from "@/components/games/GameHub";

export const metadata: Metadata = {
  title: "اتاق بازی و چالش‌های فکری تعاملی | Cyber Arcade",
  description:
    "مجموعه مینی‌گیم‌ها و چالش‌های فکری آنلاین در پورتفولیوی علیرضا عابدی؛ شامل بازی‌های تطبیق کاشی سه‌بعدی (Tile Match)، تفکیک مایعات رنگی (Water Sort)، انفجار بلوک‌ها (Block Blast) و ۲۰۴۸ توسعه‌دهندگان، پیاده‌سازی‌شده با فرانت‌اند مدرن، رندرینگ ۶۰ فریم و صدای داینامیک.",
  keywords: [
    "بازی فکری آنلاین",
    "بازی تطبیق کاشی Tile Match",
    "بازی مرتب سازی مایعات Water Sort",
    "بازی پازل انفجار بلوک Block Blast",
    "بازی 2048 آنلاین",
    "چالش هوش و تمرکز",
    "مینی گیم تحت وب Next.js",
    "علیرضا عابدی",
  ],
  alternates: {
    canonical: "/games",
  },
};

export default function GamesPage() {
  return <GameHub />;
}
