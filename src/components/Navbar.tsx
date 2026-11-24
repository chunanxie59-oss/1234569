interface NavbarProps {
  onJumpToCompare: () => void;
}

export function Navbar({onJumpToCompare}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090A0D]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#F4F4F5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
        >
          GT86 FUJISAWA 86
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="主導覽列"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
        >
          <a
            href="#hero-stage"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
          >
            車輛檔案
          </a>
          <a
            href="#aero-comparison"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
          >
            空力對比
          </a>
          <a
            href="#engine-telemetry"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
          >
            聲浪遙測
          </a>
          <a
            href="#circuit-dossier"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
          >
            單圈數據
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onJumpToCompare}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#E11D2E] rounded-sm transition-colors duration-150 hover:bg-[#BE1221] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] cursor-pointer"
          >
            雙車空力對照
          </button>
        </div>
      </div>
    </header>
  );
}
