import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Sobre — Novo Ciclo",
  description:
    "Saiba como funciona o Novo Ciclo, o agregador automatizado que acompanha diariamente a Seleção Brasileira rumo à Copa do Mundo de 2030.",
};

export default function SobrePage() {
  return (
    <PageLayout>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] tracking-tight text-text">
          Sobre o Novo Ciclo
        </h1>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            O que é
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            O Novo Ciclo é um agregador automatizado de notícias que documenta
            diariamente a caminhada da Seleção Brasileira de futebol rumo à Copa
            do Mundo de 2030. Cada dia ganha um capítulo com as principais
            notícias, análises e acontecimentos relacionados ao novo ciclo da
            equipe.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Como funciona
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            Oito agentes de inteligência artificial trabalham em conjunto para
            coletar, selecionar, editar e publicar automaticamente cada capítulo
            diário. O processo começa com a coleta de notícias de fontes
            confiáveis como ge.globo.com, UOL Esporte, ESPN Brasil, CBF e FIFA,
            passa por filtros de relevância e curadoria editorial, e resulta em
            um capítulo publicado como arquivo estático.
          </p>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            Tudo isso acontece sem intervenção humana — da coleta à publicação.
            O conteúdo é gerado e armazenado como arquivos de texto versionados
            no repositório do projeto.
          </p>
          <blockquote className="mt-4 p-4 bg-white rounded-md border-l-4 border-green-primary italic text-text/70">
            Atualizado todo dia às 18h, para você jantar se atualizando sobre a
            seleção canarinho.
          </blockquote>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Jornalismo de verdade
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            O Novo Ciclo é, acima de tudo, um leitor e admirador do jornalismo
            esportivo. Não produzimos reportagens próprias nem substituímos o
            trabalho essencial dos jornalistas que cobrem a Seleção Brasileira
            diariamente.
          </p>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            Nosso papel é reunir, organizar e contextualizar as notícias
            publicadas por veículos sérios e reconhecidos. Por isso, todas as
            manchetes são acompanhadas de links diretos para os artigos
            originais. Recomendamos que você acesse as fontes para ler a
            cobertura completa e se manter atualizado.
          </p>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            Valorizamos profundamente o trabalho jornalístico — ele é a matéria-prima
            deste projeto. O Novo Ciclo existe porque existe uma imprensa
            esportiva livre, séria e dedicada.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            A origem do nome
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            O nome &quot;Novo Ciclo&quot; nasceu de uma declaração de Carlo Ancelotti. Na
            noite de 5 de julho de 2026, minutos após a eliminação do Brasil
            para a Noruega na Copa do Mundo, o técnico italiano disse:
          </p>
          <blockquote className="mt-4 p-4 bg-white rounded-md border-l-4 border-green-primary italic text-text/70">
            &quot;Não é o fim, é o início de um novo ciclo.&quot;
          </blockquote>
          <p className="text-lg leading-relaxed text-text/80 mt-4">
            Aquela frase resumia o sentimento de um país que precisava
            reconstruir sua seleção. E se tornou o nome e o propósito deste
            projeto: acompanhar, dia após dia, a reconstrução da Seleção
            Brasileira rumo ao hexacampeonato em 2030.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Tecnologia
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
            Construído com Next.js, TypeScript e Tailwind CSS. A automação é
            alimentada por agentes de IA que utilizam modelos de linguagem
            para analisar, selecionar e redigir conteúdo. Toda a
            infraestrutura roda na Vercel, com deploy automatizado via GitHub.
          </p>
        </section>
    </PageLayout>
  );
}
