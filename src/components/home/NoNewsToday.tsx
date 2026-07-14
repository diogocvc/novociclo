import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  latestDate: Date;
  latestSlug: string;
}

export default function NoNewsToday({ latestDate, latestSlug }: Props) {
  return (
    <div className="max-w-[820px]">
      <p className="text-lg sm:text-xl leading-relaxed text-text/80">
        Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar
        com as últimas notícias do dia{" "}
        <a
          href={`/${latestSlug}`}
          className="text-green-primary font-medium underline underline-offset-2 hover:text-green-primary/80 transition-colors"
        >
          {format(latestDate, "dd/MM/yyyy", { locale: ptBR })}
        </a>
        .
      </p>
    </div>
  );
}
