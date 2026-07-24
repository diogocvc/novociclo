import { isSameDay, format } from "date-fns";
import type { News } from "@/types";
import NewsCard from "@/components/chapter/NewsCard";
import { getTodayBRT, getHourBRT } from "@/lib/date";

interface Props {
  date?: Date;
  latestNews: News[];
}

export default function NoNewsToday({ date, latestNews }: Props) {
  const isToday = date && isSameDay(date, getTodayBRT());
  const hourBRT = getHourBRT();
  const beforeUpdate = isToday && hourBRT < 18;

  let message: string;
  if (beforeUpdate) {
    message = "Até agora não temos novidades para hoje. Nosso site é atualizado diariamente, às 18h. Mas por enquanto você pode conferir as últimas notícias:";
  } else if (isToday) {
    message = "Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar com as últimas notícias:";
  } else {
    message = "Não houve notícias do Novo Ciclo neste dia. Veja o capítulo mais recente com notícias:";
  }

  return (
    <div>
      <h1 className="text-[1.92rem] sm:text-[2.4rem] lg:text-[2.88rem] xl:text-[3.84rem] font-bold font-headline leading-[1.0] tracking-tight text-text/70 max-w-[820px]">
        {message}
      </h1>
      {latestNews.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestNews.slice(0, 3).map((news) => (
            <div key={news.id}>
              <NewsCard news={news} />
              <p className="mt-1 text-xs text-gray-medium">
                Notícia publicada em {format(new Date(news.data_publicacao), "dd/MM/yy")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
