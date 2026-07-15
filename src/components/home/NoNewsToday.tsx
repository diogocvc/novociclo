import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  date?: Date;
  latestDate: Date;
  latestSlug: string;
}

export default function NoNewsToday({ date, latestDate, latestSlug }: Props) {
  const isToday = date && isSameDay(date, new Date());

  return (
    <div className="max-w-[820px]">
      <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.8rem] font-bold font-headline leading-[1.0] tracking-tight text-text/70">
        {isToday
          ? "Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar com as últimas notícias do dia:"
          : "Não houve notícias do Novo Ciclo neste dia. Veja o capítulo mais recente com notícias:"}
      </h1>
      <a
        href={`/${latestSlug}`}
        className="mt-6 inline-flex items-center justify-center min-h-[2.4rem] sm:min-h-[3rem] lg:min-h-[3.6rem] xl:min-h-[4.8rem] bg-green-primary text-white font-bold text-xs sm:text-sm lg:text-base uppercase tracking-wider px-4 sm:px-5 lg:px-6 rounded-md hover:bg-green-primary/90 transition-colors"
      >
        {format(latestDate, "dd/MM/yyyy", { locale: ptBR })}
      </a>
    </div>
  );
}
