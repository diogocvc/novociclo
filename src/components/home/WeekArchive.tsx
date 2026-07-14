"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { format, startOfWeek, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Chapter } from "@/types";
import { cycle } from "@/config/cycle";
import { getWeekNumber } from "@/lib/date";

interface WeekData {
  id: string;
  label: string;
  dateRange: string;
  days: { label: string; date: string; slug: string }[];
}

interface Props {
  chapters?: Chapter[];
}

function buildWeeks(chapters: Chapter[]): WeekData[] {
  const weeks: WeekData[] = [];
  const seen = new Set<string>();

  for (const chapter of chapters) {
    const date = new Date(chapter.data);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, "yyyy-MM-dd");

    if (seen.has(weekKey)) continue;
    seen.add(weekKey);

    const weekEnd = addDays(weekStart, 6);
    const weekChapters = chapters.filter((c) => {
      const d = new Date(c.data);
      const start = startOfWeek(d, { weekStartsOn: 1 });
      return format(start, "yyyy-MM-dd") === weekKey;
    });

    const weekNumber = getWeekNumber(weekStart, cycle.data_inicio);

    weeks.push({
      id: weekKey,
      label: String(weekNumber),
      dateRange: `${format(weekStart, "dd MMM", { locale: ptBR })} — ${format(weekEnd, "dd MMM", { locale: ptBR })}`.toUpperCase(),
      days: weekChapters.map((c) => ({
        label: format(new Date(c.data), "EEE", { locale: ptBR }).toUpperCase(),
        date: c.data,
        slug: `/${c.slug}`,
      })),
    });
  }

  return weeks;
}

export default function WeekArchive({ chapters = [] }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const weeks = useMemo(() => buildWeeks(chapters), [chapters]);

  if (weeks.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
      <h2 className="text-xs uppercase tracking-widest text-gray-medium mb-6">
        SEMANAS ANTERIORES
      </h2>
      <div className="divide-y divide-gray-light">
        {weeks.map((week) => (
          <div key={week.id}>
            <button
              className="w-full flex items-center justify-between py-4 text-left"
              onClick={() =>
                setExpandedId(expandedId === week.id ? null : week.id)
              }
            >
              <div>
                <span className="text-sm font-semibold">Semana {week.label}</span>
                <span className="text-xs text-gray-medium ml-3">
                  {week.dateRange}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  expandedId === week.id ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedId === week.id && (
              <div className="pb-4 pl-2 space-y-1">
                {week.days.map((day) => (
                  <a
                    key={day.date}
                    href={day.slug}
                    className="block text-sm text-text/70 hover:text-green-primary transition-colors py-1"
                  >
                    <span className="uppercase text-xs text-gray-medium mr-2">
                      {day.label}
                    </span>
                    {day.date}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
