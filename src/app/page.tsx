import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";
import WeeklyNavigation from "@/components/home/WeeklyNavigation";
import WeekArchive from "@/components/home/WeekArchive";
import ChapterContent from "@/components/chapter/ChapterContent";
import { getLatestChapter, getAllPublishedChapters } from "@/data/mock-chapters";

export default function Home() {
  const chapters = getAllPublishedChapters();
  const chapter = getLatestChapter();
  const publishedSlugs = chapters.map((c) => c.slug);

  return (
    <>
      <Header />
      <CountdownBanner />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        {chapter ? (
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
