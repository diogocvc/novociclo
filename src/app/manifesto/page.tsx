import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";

export const metadata: Metadata = {
  title: "Manifesto — Novo Ciclo",
  description:
    "A filosofia, a missão e os princípios que orientam o Novo Ciclo.",
};

export default function ManifestoPage() {
  return (
    <>
      <Header />
      <CountdownBanner />
      <main className="flex-1 w-full max-w-[820px] mx-auto px-6 lg:px-8 mt-16 mb-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] tracking-tight text-text">
          Manifesto
        </h1>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Filosofia
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            O Novo Ciclo é um produto orientado por documentação. Cada decisão,
            cada linha de código e cada capítulo publicado refletem um conjunto
            de princípios que guiam o projeto desde o primeiro dia.
          </p>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            A documentação não é um complemento do software — ela faz parte do
            software. Toda evolução do sistema deve manter a consistência entre
            código, documentação e produto.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Missão
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            Registrar diariamente a caminhada da Seleção Brasileira de futebol
            rumo à Copa do Mundo de 2030.
          </p>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            O Novo Ciclo não é um agregador de manchetes. É um diário histórico
            construído automaticamente a partir de acontecimentos relevantes
            identificados em fontes confiáveis. As notícias são referências. Os
            capítulos diários são o produto final.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Princípios
          </h2>
          <ul className="space-y-3 text-lg leading-relaxed text-text/80">
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Automação</strong> — nenhuma etapa da publicação diária depende de intervenção humana.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Simplicidade</strong> — clareza acima de otimizações prematuras.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Conteúdo como código</strong> — todo conteúdo publicado existe como arquivos versionados no repositório.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Fontes confiáveis</strong> — o sistema privilegia veículos reconhecidos, evitando rumores e conteúdos sem atribuição clara.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Transparência editorial</strong> — todas as notícias são referenciadas com links para os veículos originais.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Baixo custo</strong> — toda a infraestrutura opera com serviços gratuitos ou de baixo custo.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><strong>Evolução incremental</strong> — mudanças pequenas e contínuas, sempre documentadas.</span>
            </li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-white rounded-md border border-gray-light">
          <p className="text-base text-text/70 italic leading-relaxed">
            "Quando passa um momento assim, tem que pensar que uma derrota é o
            começo de uma nova aventura. Não é o fim, é o início de um novo
            ciclo."
          </p>
          <p className="mt-3 text-sm text-gray-medium">
            — Carlo Ancelotti, 5 de julho de 2026
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
