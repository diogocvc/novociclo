export default function Header() {
  return (
    <header className="w-full h-[88px] flex items-center justify-between px-6 lg:px-8 bg-white border-b border-gray-light">
      <a href="/" className="text-xl font-bold uppercase tracking-tight leading-none">
        NOVO<br />CICLO
      </a>

      <button
        className="lg:hidden w-12 h-12 rounded-full bg-green-primary flex items-center justify-center"
        aria-label="Menu"
      >
        <span className="text-white text-xs font-bold uppercase tracking-wider">+</span>
      </button>
    </header>
  );
}
