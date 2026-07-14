import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-medium text-xs">
      <div className="text-center sm:text-left">
        <p className="font-bold uppercase tracking-wider">NOVO CICLO</p>
        <p className="uppercase tracking-wider">Rumo à Copa do Mundo 2030</p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="hover:text-green-primary transition-colors"
          aria-label="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href="#"
          className="hover:text-green-primary transition-colors"
          aria-label="Play"
        >
          <Play size={20} />
        </a>
      </div>
    </footer>
  );
}
