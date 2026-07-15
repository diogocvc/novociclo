import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";
import WeeklyNavigation from "@/components/home/WeeklyNavigation";
import WeekArchive from "@/components/home/WeekArchive";
import ChapterContent from "@/components/chapter/ChapterContent";
import NoNewsToday from "@/components/home/NoNewsToday";
import { getLatestChapter, getAllPublishedChapters } from "@/data/mock-chapters";

export default function Home() {
  const chapters = getAllPublishedChapters();
  const chapter = getLatestChapter();
  const publishedSlugs = chapters.map((c) => c.slug);
  const today = new Date();
  const todaySlug = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
  const hasNewsToday = publishedSlugs.includes(todaySlug);

  return (
    <>
      <Header />
      <CountdownBanner />

      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-8">
        <p className="text-base text-text/70 italic leading-relaxed text-center">
          &ldquo;Quando passa um momento assim, tem que pensar que uma derrota é o
          começo de uma nova aventura. Não é o fim, é o início de um novo
          ciclo.&rdquo;
        </p>
        <p className="mt-2 text-sm text-gray-medium text-center">
          &mdash; Carlo Ancelotti, 5 de julho de 2026
        </p>
      </div>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        {!hasNewsToday && chapters.length > 0 ? (
          <NoNewsToday
            date={today}
            latestDate={new Date(chapters[0].data)}
            latestSlug={chapters[0].slug}
          />
        ) : chapter ? (
          <ChapterContent chapter={chapter} />
        ) : (
          <p className="text-gray-medium">Nenhum capítulo publicado ainda.</p>
        )}
      </main>

      <WeeklyNavigation publishedSlugs={publishedSlugs} />
      <WeekArchive chapters={chapters} />
      <Footer />
    </>
  );
}
