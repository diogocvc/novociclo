import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 lg:px-8 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-medium text-xs">
        <div className="text-center sm:text-left">
          <p className="font-bold uppercase tracking-wider">NOVO CICLO</p>
          <p className="uppercase tracking-wider">Rumo à Copa do Mundo 2030</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/sobre" className="uppercase tracking-wider hover:text-green-primary transition-colors">
            Sobre
          </Link>
          <Link href="/creditos" className="uppercase tracking-wider hover:text-green-primary transition-colors">
            Créditos
          </Link>
          <Link href="/contato" className="uppercase tracking-wider hover:text-green-primary transition-colors">
            Contato
          </Link>
        </div>
      </div>
      <p className="text-center text-xs text-gray-medium">
        Desenvolvido por{" "}
        <a
          href="https://diogocvc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-primary transition-colors underline underline-offset-2"
        >
          Diogo Carvalho
        </a>
        . Código-fonte no{" "}
        <a
          href="https://github.com/diogocvc/novociclo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-primary transition-colors underline underline-offset-2"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
