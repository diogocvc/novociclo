import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownBanner from "@/components/layout/CountdownBanner";

export default function PageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <CountdownBanner />
      <main className="flex-1 w-full max-w-[820px] mx-auto px-6 lg:px-8 mt-16 mb-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
