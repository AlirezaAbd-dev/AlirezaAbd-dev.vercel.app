import "../assets/css/styles.css";

import { ReactNode } from "react";
import AppContainer from "../containers/AppContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "علیرضا عابدی",
  viewport: "width=device-width, initial-scale=1",
  description:
    "به وبسایت شخصی علیرضا عابدی خوش آمدید. من یک توسعه دهنده فول استک هستم که علاقه ی زیادی به برنامه نویسی دارم و دارم سعی میکنم که روز به روز پیشرفت کنم.",
  authors: [
    { name: "alireza abedi", url: "https://github.com/AlirezaAbd-dev" },
  ],
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
