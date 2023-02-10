import AppContainer from "@/containers/AppContainer";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <head />
      <body dir="rtl">
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
