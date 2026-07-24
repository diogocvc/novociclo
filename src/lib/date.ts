import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const BRT_TIMEZONE = "America/Sao_Paulo";

export function getTodayBRT(): Date {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BRT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((p) => p.type === "year")?.value ?? "0";
  const month = parts.find((p) => p.type === "month")?.value ?? "0";
  const day = parts.find((p) => p.type === "day")?.value ?? "0";

  return new Date(`${year}-${month}-${day}T00:00:00`);
}

export function getHourBRT(): number {
  const now = new Date();
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: BRT_TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(now)
  );
}

export function getDayNumber(startDate: Date, currentDate: Date): number {
  const diff = currentDate.getTime() - startDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export function getTotalDuration(startDate: Date, endDate: Date): number {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getDaysElapsed(startDate: Date): number {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDaysRemaining(
  currentDate: Date,
  endDate: Date
): number {
  const diff = endDate.getTime() - currentDate.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getProgressPercentage(
  elapsed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((elapsed / total) * 100);
}

export function formatDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatDateShort(date: Date): string {
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export function formatDateRelative(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

export function getWeekNumber(
  date: Date,
  cycleStart: Date
): number {
  const diffMs = date.getTime() - cycleStart.getTime();
  const dayNumber = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return Math.ceil(dayNumber / 7);
}
