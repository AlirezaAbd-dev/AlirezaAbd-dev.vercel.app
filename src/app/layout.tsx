"use client"
import "../assets/css/styles.css"

import AppContainer from "@/containers/AppContainer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  let pageNumberFromPathname;
  switch (pathname) {
    case "/":
      pageNumberFromPathname = 0;
      break;
    case "/about":
      pageNumberFromPathname = 1;
      break;
    case "/myProjects":
      pageNumberFromPathname = 2;
      break;
    case "/contactUs":
      pageNumberFromPathname = 3;
      break;
  }
  return (
    <html lang="fa">
      <head />
      <body dir="rtl">
        <AppContainer path={pageNumberFromPathname}>{children}</AppContainer>
      </body>
    </html>
  );
}