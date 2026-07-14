import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
