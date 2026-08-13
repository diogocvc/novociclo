import type { Metadata } from "next";
import WrappedPage from "@/components/wrapped/WrappedPage";

export const metadata: Metadata = {
  title: "Novo Ciclo Wrapped — 1 mês do Novo Ciclo",
  description:
    "A primeira edição do Novo Ciclo Wrapped: os números do primeiro mês do novo ciclo e as notícias que marcaram o início dessa jornada rumo à Copa do Mundo de 2030.",
  openGraph: {
    title: "Novo Ciclo Wrapped",
    description:
      "30 dias não são 30 minutos! Os números e as notícias que marcaram o primeiro mês do Novo Ciclo.",
    locale: "pt_BR",
  },
};

export default function Wrapped() {
  return <WrappedPage />;
}