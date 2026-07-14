import type { Chapter } from "@/types";
import { formatDate } from "@/lib/date";

interface Props {
  chapter: Chapter;
}

export default function ChapterContent({ chapter }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-12">
      <div className="lg:w-[45%]">
        <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-4">
          {formatDate(new Date(chapter.data))}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-headline leading-[1.0] tracking-tight text-text">
          {chapter.titulo}
        </h1>
        {chapter.subtitulo && (
          <p className="mt-4 text-base sm:text-lg font-semibold text-text/70">
            {chapter.subtitulo}
          </p>
        )}
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-text/80 italic">
          &ldquo;{chapter.resumo}&rdquo;
        </p>
        <div className="mt-8 space-y-4 text-base sm:text-lg leading-relaxed text-text/80">
          {chapter.narrativa.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wider text-green-primary hover:text-green-primary/80 transition-colors"
        >
          Leitura de {chapter.tempo_de_leitura} min →
        </a>

        {chapter.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {chapter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-gray-medium bg-white px-3 py-1 rounded-sm border border-gray-light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="lg:w-[55%] mt-8 lg:mt-0">
        <div className="aspect-[16/9] rounded-md bg-gray-light" />
      </div>
    </div>
  );
}
