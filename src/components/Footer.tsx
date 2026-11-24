export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090A0D]">
      <div className="curb-stripe h-1 w-full opacity-75" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
            GT86 FUJISAWA 86 · 2.0 NA
          </p>
          <p className="text-xs text-[#A1A1AA]">
            ZN6 自然進氣雙階演化影像檔案 · 藤沢 386 な 9-101
          </p>
        </div>

        <nav aria-label="頁尾導覽" className="flex flex-wrap items-center gap-6 text-xs text-[#A1A1AA]">
          <a href="#hero-stage" className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap">
            車輛檔案
          </a>
          <a href="#aero-comparison" className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap">
            空力對比
          </a>
          <a href="#engine-telemetry" className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap">
            聲浪遙測
          </a>
          <a href="#circuit-dossier" className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap">
            單圈數據
          </a>
        </nav>
      </div>
    </footer>
  );
}
