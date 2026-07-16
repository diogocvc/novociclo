"use client";

import { useMemo } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";

type DayState = "disabled" | "today" | "active" | "empty";

interface Props {
  currentDate?: Date;
  publishedSlugs?: string[];
}

export default function WeeklyNavigation({
  currentDate,
  publishedSlugs = [],
}: Props) {
  const weekDays = useMemo(() => {
    const reference = currentDate ?? new Date();
    const weekStart = startOfWeek(reference, { weekStartsOn: 1 });
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const slug = `${y}/${m}/${d}`;
      const hasNews = publishedSlugs.includes(slug);

      let state: DayState;
      if (date.toDateString() === today.toDateString()) {
        state = "today";
      } else if (date > today) {
        state = "disabled";
      } else if (hasNews) {
        state = "active";
      } else {
        state = "empty";
      }

      return {
        label: format(date, "EEE", { locale: ptBR }).toUpperCase(),
        day: date.getDate(),
        date,
        state,
        slug: state === "active" ? `/${slug}` : undefined,
      };
    });
  }, [currentDate, publishedSlugs]);

  if (weekDays.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory lg:overflow-visible">
        {weekDays.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`
              flex-shrink-0 w-[140px] snap-start
              flex flex-col items-start gap-1 p-4 rounded-md border
              transition-colors
              ${
                day.state === "today"
                  ? "bg-green-primary text-white border-transparent"
                  : day.state === "disabled"
                  ? "bg-white text-text border-gray-light opacity-50"
                  : day.state === "active"
                  ? "bg-white text-text border-gray-light hover:bg-gray-light/50 cursor-pointer"
                  : "bg-white text-text border-gray-light"
              }
            `}
            onClick={() => {
              if (day.slug) {
                window.location.href = day.slug;
              }
            }}
          >
            <span className="text-xs uppercase tracking-wider">
              {day.label}
            </span>
            <span
              className={`font-bold font-headline ${
                day.state === "today" ? "text-2xl" : "text-lg"
              }`}
            >
              {day.day}
            </span>
            {day.state === "active" && (
              <span className="text-xs flex items-center gap-1 mt-1 uppercase tracking-wider">
                ler <ChevronRight size={12} />
              </span>
            )}
            {day.state === "empty" && (
              <span className="text-xs text-gray-medium mt-1">—</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
