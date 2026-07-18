import type { Metadata } from "next";
import { Inter, Inter_Tight, Bungee_Shade } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const bungeeShade = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee-shade",
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
      className={`${inter.variable} ${interTight.variable} ${bungeeShade.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
