import { isSameDay } from "date-fns";
import type { News } from "@/types";
import NewsCard from "@/components/chapter/NewsCard";

interface Props {
  date?: Date;
  latestNews: News[];
}

export default function NoNewsToday({ date, latestNews }: Props) {
  const isToday = date && isSameDay(date, new Date());
  const beforeUpdate = isToday && new Date().getHours() < 18;

  let message: string;
  if (beforeUpdate) {
    message = "Até agora não temos novidades para hoje. Nosso site é atualizado diariamente, às 18h. Até lá, confira as notícias mais recentes:";
  } else if (isToday) {
    message = "Não há nenhuma novidade do Novo Ciclo hoje, mas você pode se atualizar com as últimas notícias do dia:";
  } else {
    message = "Não houve notícias do Novo Ciclo neste dia. Veja o capítulo mais recente com notícias:";
  }

  return (
    <div>
      <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.8rem] font-bold font-headline leading-[1.0] tracking-tight text-text/70 max-w-[820px]">
        {message}
      </h1>
      {latestNews.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestNews.slice(0, 3).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}
