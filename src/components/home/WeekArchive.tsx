"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface WeekData {
  id: number;
  label: string;
  dateRange: string;
  days: { label: string; date: string; slug?: string }[];
}

const MOCK_WEEKS: WeekData[] = [];

export default function WeekArchive() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (MOCK_WEEKS.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
      <h2 className="text-xs uppercase tracking-widest text-gray-medium mb-6">
        SEMANAS ANTERIORES
      </h2>
      <div className="divide-y divide-gray-light">
        {MOCK_WEEKS.map((week) => (
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
                    href={day.slug ?? "#"}
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
