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
          <a
            href="https://www.instagram.com/novociclo.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-primary transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
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
