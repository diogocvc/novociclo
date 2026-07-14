import type { News } from "@/types";

interface Props {
  news: News;
}

export default function NewsCard({ news }: Props) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-md border border-gray-light overflow-hidden hover:border-green-primary/30 transition-colors group"
    >
      {news.thumbnail ? (
        <div className="aspect-[16/9] bg-gray-light overflow-hidden">
          <img
            src={news.thumbnail}
            alt={news.titulo}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gray-light flex items-center justify-center">
          <span className="text-xs text-gray-medium uppercase tracking-wider">
            {news.fonte}
          </span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug text-text line-clamp-3">
          {news.titulo}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-medium font-medium">
            {news.fonte}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-green-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Abrir ↗
          </span>
        </div>
      </div>
    </a>
  );
}
