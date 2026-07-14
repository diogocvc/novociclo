import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";
import WeeklyNavigation from "@/components/home/WeeklyNavigation";
import WeekArchive from "@/components/home/WeekArchive";

export default function Home() {
  return (
    <>
      <Header />
      <CountdownBanner />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="lg:w-[45%]">
            <p className="text-sm text-green-primary font-medium uppercase tracking-wider mb-4">
              TERÇA, 14 DE JULHO DE 2026
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-headline leading-[1.0] tracking-tight text-text">
              Pequenas escolhas, grandes mudanças
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-text/80 italic">
              &ldquo;O primeiro passo para construir o futuro é reconhecer que cada dia é uma oportunidade de recomeço.&rdquo;
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wider text-green-primary hover:text-green-primary/80 transition-colors"
            >
              Leitura de 6 min →
            </a>
          </div>

          <div className="lg:w-[55%] mt-8 lg:mt-0">
            <div className="aspect-[16/9] rounded-md bg-gray-light" />
          </div>
        </div>
      </main>

      <WeeklyNavigation />
      <WeekArchive />
      <Footer />
    </>
  );
}
