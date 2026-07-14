import { cycle } from "@/config/cycle";
import type { CountdownData } from "@/types";
import {
  getDayNumber,
  getTotalDuration,
  getDaysElapsed,
  getDaysRemaining,
  getProgressPercentage,
} from "./date";

export function getCountdownData(
  currentDate?: Date
): CountdownData {
  const now = currentDate ?? new Date();
  const totalDays = getTotalDuration(cycle.data_inicio, cycle.data_copa);
  const daysElapsed = getDaysElapsed(cycle.data_inicio);
  const daysRemaining = getDaysRemaining(now, cycle.data_copa);
  const dayNumber = getDayNumber(cycle.data_inicio, now);

  return {
    daysElapsed: dayNumber,
    daysRemaining,
    totalDays,
    progressPercentage: getProgressPercentage(daysElapsed, totalDays),
    startDate: cycle.data_inicio,
    worldCupDate: cycle.data_copa,
    currentDate: now,
  };
}
