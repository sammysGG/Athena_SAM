import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ExerciseBanner from "@/app/components/layout/ExerciseBanner";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "S.A.M. // Матрица Системного Доступа",
    template: "%s | S.A.M.",
  },
  description:
    "SAM — System Access Matrix. Закрытый форум. Только для проверенных. Доступ по приглашению.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={mono.variable}>
        <Providers>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <ExerciseBanner />
        </Providers>
      </body>
    </html>
  );
}
