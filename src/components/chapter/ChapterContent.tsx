import type { Chapter } from "@/types";
import { formatDate } from "@/lib/date";
import NewsCard from "./NewsCard";

interface Props {
  chapter: Chapter;
}

export default function ChapterContent({ chapter }: Props) {
  const { noticia_destaque, noticias_referencia } = chapter;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:gap-16">
        <div className="lg:w-[45%]">
          <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-4">
            {formatDate(new Date(chapter.data))}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-headline leading-[1.1] tracking-tight text-text break-words">
            {chapter.titulo}
          </h1>
          {chapter.subtitulo && (
            <p className="mt-4 text-base sm:text-lg font-semibold text-text/70 leading-snug">
              {chapter.subtitulo}
            </p>
          )}
        </div>

        <div className="lg:w-[55%] mt-8 lg:mt-0 lg:pt-4">
          {noticia_destaque && (
            <a
              href={noticia_destaque.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              {noticia_destaque.thumbnail ? (
                <div className="aspect-[16/9] rounded-md overflow-hidden bg-gray-light">
                  <img
                    src={noticia_destaque.thumbnail}
                    alt={noticia_destaque.titulo}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] rounded-md bg-gray-light" />
              )}
              <p className="mt-3 text-sm text-gray-medium flex items-center gap-1">
                <span className="font-medium text-green-primary">
                  {noticia_destaque.fonte}
                </span>
                <span className="text-xs">→</span>
              </p>
            </a>
          )}
        </div>
      </div>

      <div className="mt-10 max-w-[820px]">
        <p className="text-lg sm:text-xl leading-relaxed text-text/80">
          {chapter.resumo}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-xs uppercase tracking-widest text-gray-medium mb-6">
          NOTÍCIAS DO DIA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {noticias_referencia.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}
