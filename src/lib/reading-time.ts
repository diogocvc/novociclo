const WORDS_PER_MINUTE = 180;

export function estimateReadingTime(
  text: string,
  wordsPerMinute: number = WORDS_PER_MINUTE
): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
