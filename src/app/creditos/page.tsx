import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Créditos — Novo Ciclo",
  description:
    "Tecnologias, fontes de dados e pessoas por trás do Novo Ciclo.",
};

export default function CreditosPage() {
  return (
    <PageLayout>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] tracking-tight text-text">
          Créditos
        </h1>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Desenvolvimento
          </h2>
          <p className="text-lg leading-relaxed text-text/80">
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
          <p className="text-lg leading-relaxed text-text/80 mt-2">
            Código-fonte disponível no{" "}
            <a
              href="https://github.com/diogocvc/novociclo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-primary underline underline-offset-2 hover:text-green-primary/80 transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Tecnologias
          </h2>
          <ul className="space-y-3 text-lg leading-relaxed text-text/80">
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-green-primary underline underline-offset-2 hover:text-green-primary/80">Next.js</a> — framework web</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="text-green-primary underline underline-offset-2 hover:text-green-primary/80">TypeScript</a> — linguagem</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-green-primary underline underline-offset-2 hover:text-green-primary/80">Tailwind CSS</a> — estilos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-green-primary underline underline-offset-2 hover:text-green-primary/80">Vercel</a> — deploy e infraestrutura</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-primary font-bold mt-1">→</span>
              <span><a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="text-green-primary underline underline-offset-2 hover:text-green-primary/80">Groq</a> — inferência de IA</span>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-green-primary uppercase tracking-wider mb-4">
            Fontes de dados
          </h2>
          <p className="text-lg leading-relaxed text-text/80 mb-4">
            As notícias veiculadas no Novo Ciclo são coletadas a partir de
            fontes públicas e confiáveis:
          </p>
          <ul className="space-y-2 text-lg leading-relaxed text-text/80">
            {[
              { nome: "ge.globo.com", url: "https://ge.globo.com" },
              { nome: "UOL Esporte", url: "https://www.uol.com.br/esporte/" },
              { nome: "ESPN Brasil", url: "https://www.espn.com.br/futebol/selecao-brasileira" },
              { nome: "CBF", url: "https://www.cbf.com.br/selecao-brasileira" },
              { nome: "FIFA", url: "https://www.fifa.com" },
              { nome: "Folha de S.Paulo", url: "https://www.folha.uol.com.br/esporte/" },
              { nome: "Estadão", url: "https://www.estadao.com.br/esportes/" },
              { nome: "BBC News Brasil", url: "https://www.bbc.com/portuguese" },
            ].map((fonte) => (
              <li key={fonte.nome} className="flex items-start gap-3">
                <span className="text-green-primary font-bold mt-1">→</span>
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-primary underline underline-offset-2 hover:text-green-primary/80 transition-colors"
                >
                  {fonte.nome}
                </a>
              </li>
            ))}
          </ul>
        </section>
    </PageLayout>
  );
}
