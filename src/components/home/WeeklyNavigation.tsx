"use client";

import { useEffect, useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";

interface DayCard {
  label: string;
  day: number;
  date: Date;
  isToday: boolean;
  isFuture: boolean;
  slug?: string;
}

interface Props {
  publishedSlugs?: string[];
}

export default function WeeklyNavigation({ publishedSlugs = [] }: Props) {
  const [weekDays, setWeekDays] = useState<DayCard[]>([]);

  useEffect(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const days: DayCard[] = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const slug = `${y}/${m}/${d}`;
      return {
        label: format(date, "EEE", { locale: ptBR }).toUpperCase(),
        day: date.getDate(),
        date,
        isToday: date.toDateString() === today.toDateString(),
        isFuture: date > today,
        slug: publishedSlugs.includes(slug) ? `/${slug}` : undefined,
      };
    });
    setWeekDays(days);
  }, [publishedSlugs]);

  if (weekDays.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory lg:overflow-visible">
        {weekDays.map((day) => (
          <a
            key={day.date.toISOString()}
            href={day.slug ?? "#"}
            className={`
              flex-shrink-0 w-[140px] snap-start
              flex flex-col items-start gap-1 p-4 rounded-md border
              transition-colors
              ${
                day.isToday
                  ? "bg-green-primary text-white border-transparent"
                  : day.isFuture
                  ? "bg-white text-text border-gray-light opacity-50 cursor-default"
                  : "bg-white text-text border-gray-light hover:bg-gray-light/50"
              }
            `}
          >
            <span className="text-xs uppercase tracking-wider">{day.label}</span>
            <span
              className={`font-bold font-headline ${
                day.isToday ? "text-2xl" : "text-lg"
              }`}
            >
              {day.day}
            </span>
            {!day.isFuture && (
              <span className="text-xs flex items-center gap-1 mt-1 uppercase tracking-wider">
                ler <ChevronRight size={12} />
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
