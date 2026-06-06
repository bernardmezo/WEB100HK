import type { Metadata } from "next";
import { IBM_Plex_Sans, Spectral } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const plex = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalkulator Penilaian R100HK — IKM PNJ",
  description:
    "Kalkulator penilaian Program Kerja dan Agenda untuk Rapat 100 Hari Kerja IKM PNJ 2025/2026. Menggunakan parameter penilaian resmi MPM Distrik TIK.",
  keywords: [
    "R100HK",
    "IKM PNJ",
    "MPM",
    "Program Kerja",
    "Agenda",
    "Penilaian",
    "Rapat 100 Hari Kerja",
  ],
  authors: [{ name: "MPM Distrik TIK — IKM PNJ" }],
  openGraph: {
    title: "Kalkulator Penilaian R100HK — IKM PNJ",
    description:
      "Kalkulator penilaian Program Kerja dan Agenda untuk Rapat 100 Hari Kerja IKM PNJ 2025/2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plex.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col gradient-mesh">
        <TooltipProvider delay={200}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
