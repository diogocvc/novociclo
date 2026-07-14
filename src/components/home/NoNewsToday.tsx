import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  latestDate: Date;
  latestSlug: string;
}

export default function NoNewsToday({ latestDate, latestSlug }: Props) {
  return (
    <div className="max-w-[820px]">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-headline leading-[1.0] tracking-tight text-text/70">
        Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar
        com as últimas notícias do dia{" "}
        <a
          href={`/${latestSlug}`}
          className="inline-block mt-3 sm:mt-0 sm:ml-2 bg-green-primary text-white font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-md hover:bg-green-primary/90 transition-colors"
        >
          {format(latestDate, "dd/MM/yyyy", { locale: ptBR })}
        </a>
        .
      </h1>
    </div>
  );
}
