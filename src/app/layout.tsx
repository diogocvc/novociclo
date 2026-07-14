import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Novo Ciclo — Rumo à Copa do Mundo 2030",
  description:
    "Acompanhe diariamente a reconstrução da Seleção Brasileira rumo ao hexacampeonato mundial em 2030.",
  openGraph: {
    title: "Novo Ciclo",
    description:
      "A reconstrução da Seleção Brasileira rumo à Copa do Mundo 2030, documentada dia após dia.",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
