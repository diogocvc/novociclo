import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  latestDate: Date;
  latestSlug: string;
}

export default function NoNewsToday({ latestDate, latestSlug }: Props) {
  return (
    <div className="max-w-[820px]">
      <p className="text-lg sm:text-xl font-headline leading-relaxed text-text/70">
        Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar
        com as últimas notícias do dia{" "}
        <a
          href={`/${latestSlug}`}
          className="inline-block mt-2 sm:mt-0 sm:ml-2 bg-green-primary text-white font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-md hover:bg-green-primary/90 transition-colors"
        >
          {format(latestDate, "dd/MM/yyyy", { locale: ptBR })}
        </a>
        .
      </p>
    </div>
  );
}
