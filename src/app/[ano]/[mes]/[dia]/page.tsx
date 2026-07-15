import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";
import WeeklyNavigation from "@/components/home/WeeklyNavigation";
import WeekArchive from "@/components/home/WeekArchive";
import ChapterContent from "@/components/chapter/ChapterContent";
import NoNewsToday from "@/components/home/NoNewsToday";
import {
  getChapterBySlug,
  getAllPublishedChapters,
  getLatestChapterWithNews,
} from "@/data/mock-chapters";

interface Props {
  params: Promise<{
    ano: string;
    mes: string;
    dia: string;
  }>;
}

export default async function ChapterPage({ params }: Props) {
  const { ano, mes, dia } = await params;
  const slug = `${ano}/${mes}/${dia}`;
  const chapter = getChapterBySlug(slug);
  const chapters = getAllPublishedChapters();
  const publishedSlugs = chapters.map((c) => c.slug);

  if (!chapter) {
    notFound();
  }

  const hasNews = chapter.noticia_destaque || chapter.noticias_referencia.length > 0;
  const latestWithNews = getLatestChapterWithNews();

  return (
    <>
      <Header />
      <CountdownBanner />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        {hasNews ? (
          <ChapterContent chapter={chapter} />
        ) : latestWithNews ? (
          <NoNewsToday
            date={new Date(chapter.data)}
            latestDate={new Date(latestWithNews.data)}
            latestSlug={latestWithNews.slug}
          />
        ) : (
          <ChapterContent chapter={chapter} />
        )}
      </main>

      <WeeklyNavigation
        currentDate={new Date(chapter.data)}
        publishedSlugs={publishedSlugs}
      />
      <WeekArchive chapters={chapters} />
      <Footer />
    </>
  );
}
