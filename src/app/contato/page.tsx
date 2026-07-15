import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";

export const metadata: Metadata = {
  title: "Contato — Novo Ciclo",
  description: "Entre em contato com o mantenedor do Novo Ciclo.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <CountdownBanner />
      <main className="flex-1 w-full max-w-[820px] mx-auto px-6 lg:px-8 mt-16 mb-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] tracking-tight text-text">
          Contato
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-text/80">
          Projeto desenvolvido por{" "}
          <a
            href="https://diogocvc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-primary underline underline-offset-2 hover:text-green-primary/80 transition-colors"
          >
            Diogo Carvalho
          </a>
          .
        </p>

        <div className="mt-10 space-y-6">
          <a
            href="https://diogocvc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-md border border-gray-light hover:border-green-primary/30 transition-colors group"
          >
            <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-1">
              Site
            </p>
            <p className="text-lg font-semibold text-text group-hover:text-green-primary transition-colors">
              diogocvc.com
            </p>
          </a>

          <a
            href="https://github.com/diogocvc/novociclo"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-md border border-gray-light hover:border-green-primary/30 transition-colors group"
          >
            <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-1">
              GitHub
            </p>
            <p className="text-lg font-semibold text-text group-hover:text-green-primary transition-colors">
              /diogocvc/novociclo
            </p>
          </a>

          <a
            href="mailto:diogocvc@gmail.com"
            className="block p-6 bg-white rounded-md border border-gray-light hover:border-green-primary/30 transition-colors group"
          >
            <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-1">
              Email
            </p>
            <p className="text-lg font-semibold text-text group-hover:text-green-primary transition-colors">
              diogocvc@gmail.com
            </p>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
