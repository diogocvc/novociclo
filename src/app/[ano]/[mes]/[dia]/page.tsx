import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";
import WeeklyNavigation from "@/components/home/WeeklyNavigation";
import WeekArchive from "@/components/home/WeekArchive";
import ChapterContent from "@/components/chapter/ChapterContent";
import { getChapterBySlug, mockChapters } from "@/data/mock-chapters";

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
  const publishedSlugs = mockChapters.map((c) => c.slug);

  if (!chapter) {
    notFound();
  }

  return (
    <>
      <Header />
      <CountdownBanner />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        <ChapterContent chapter={chapter} />
      </main>

      <WeeklyNavigation publishedSlugs={publishedSlugs} />
      <WeekArchive chapters={mockChapters} />
      <Footer />
    </>
  );
}
