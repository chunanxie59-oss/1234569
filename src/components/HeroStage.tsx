import {Maximize2} from 'lucide-react';
import {HERO_TELEMETRY_STRIP, SpecStageId, VEHICLE_SPECS} from '../data/gt86Data';
import {ResilientCarImage} from './ResilientCarImage';

interface HeroStageProps {
  activeSpec: SpecStageId;
  onSelectSpec: (spec: SpecStageId) => void;
  onInspectImage: (spec: SpecStageId) => void;
  onJumpToEngine: () => void;
}

export function HeroStage({
  activeSpec,
  onSelectSpec,
  onInspectImage,
  onJumpToEngine,
}: HeroStageProps) {
  const current = VEHICLE_SPECS[activeSpec];

  return (
    <section
      id="hero-stage"
      className="relative overflow-hidden border-b border-white/10 bg-[#090A0D] asphalt-grid"
    >
      {/* Subtle racing curb strip at very top of stage */}
      <div className="curb-stripe h-1 w-full opacity-90" aria-hidden="true" />

      {/* Subtle directional speed streaks (compositor transform/opacity only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-speed-streak absolute top-[22%] left-0 h-[1px] w-72 bg-gradient-to-r from-transparent via-[#E11D2E]/50 to-transparent" />
        <div className="animate-speed-streak-delayed absolute top-[68%] left-0 h-[1px] w-96 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
        {/* 2-column balanced split with items-stretch */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left column: Narrative & interactive stage switcher */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider text-[#A1A1AA]">
                <span className="text-[#E11D2E] font-semibold">TOYOTA ZN6</span>
                <span aria-hidden="true">·</span>
                <span>藤沢 386 な 9-101</span>
                <span aria-hidden="true">·</span>
                <span>#86 BLITZ SPEC</span>
              </div>

              <h1
                className="font-display font-bold italic tracking-tight text-[#F4F4F5]"
                style={{
                  fontSize: 'clamp(2.5rem, 4.4vw, 4rem)',
                  lineHeight: 1.05,
                  textWrap: 'balance',
                }}
              >
                自然進氣的純粹本色
                <span className="block text-[#E11D2E] not-italic mt-1">2.0 NA GT86 雙階演化</span>
              </h1>

              <p className="max-w-xl text-[15px] leading-relaxed text-[#D4D4D8]">
                從保留 Fastback 純淨車尾線條的「街道競技初階式樣」，進階至搭載消光碳纖維車頂、雙層前下擾流與大型 GT 尾翼的「賽道空力式樣」。在同一具 #86 競技靈魂之下，完整見證空力下壓力的實戰進化。
              </p>

              {/* Segmented spec control (functional buttons, zero static pills) */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-medium text-[#A1A1AA]">切換預覽車輛式樣</p>
                <div
                  role="tablist"
                  aria-label="車輛式樣切換"
                  className="inline-flex w-full sm:w-auto rounded-sm border border-white/12 bg-[#12141A] p-1 gap-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSpec === 'street'}
                    onClick={() => onSelectSpec('street')}
                    className={`flex-1 sm:flex-initial min-h-[40px] px-4 py-2 text-xs font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] ${
                      activeSpec === 'street'
                        ? 'bg-[#E11D2E] text-white'
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                    }`}
                  >
                    式樣 01 · 街道純粹
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSpec === 'track'}
                    onClick={() => onSelectSpec('track')}
                    className={`flex-1 sm:flex-initial min-h-[40px] px-4 py-2 text-xs font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] ${
                      activeSpec === 'track'
                        ? 'bg-[#E11D2E] text-white'
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                    }`}
                  >
                    式樣 02 · 賽道空力
                  </button>
                </div>
              </div>
            </div>

            {/* Active spec highlight list & single primary CTA */}
            <div className="space-y-6 border-t border-white/10 pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span>{current.code} · {current.title}</span>
                  <span className="font-mono-telemetry text-[#F4F4F5]">{current.weightKg}</span>
                </div>
                <ul className="grid grid-cols-1 gap-1.5 text-sm text-[#D4D4D8] sm:grid-cols-2">
                  {current.highlights.map((item) => (
                    <li key={item} className="truncate" title={item}>
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onJumpToEngine}
                  className="min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[#E11D2E] rounded-sm transition-colors duration-150 hover:bg-[#BE1221] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  啟動 FA20 轉速聲浪模擬
                </button>
                <a
                  href="#aero-comparison"
                  className="min-h-[44px] inline-flex items-center px-3 py-2.5 text-sm font-medium text-[#D4D4D8] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-[#E11D2E] whitespace-nowrap shrink-0"
                >
                  拖曳對比雙車差異
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Dominant Pit-Garage Showcase Frame */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-sm border border-white/12 bg-[#12141A]">
              {/* Top pit-wall technical bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs">
                <div className="flex items-center gap-2 text-[#D4D4D8]">
                  <span className="font-mono-telemetry font-semibold text-[#E11D2E]">
                    {current.code}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span className="font-medium">{current.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectImage(activeSpec)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#D4D4D8] rounded-sm border border-white/12 bg-[#191C24] transition-colors hover:border-white/30 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>原圖檢視</span>
                </button>
              </div>

              {/* Image stage: studio-lit framing tailored to each source image */}
              <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0E1015] min-h-[300px] sm:min-h-[380px]">
                {/* Ambient pit-garage radial spotlight */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      activeSpec === 'street'
                        ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(14,16,21,0.96) 80%)'
                        : 'radial-gradient(circle at 50% 45%, rgba(225,29,46,0.16) 0%, rgba(14,16,21,0.95) 78%)',
                  }}
                  aria-hidden="true"
                />

                {/* Crossfade images */}
                <div
                  className={`relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 transition-opacity duration-200 ${
                    activeSpec === 'street' ? 'bg-[#F8F8FA]' : 'bg-[#111318]'
                  }`}
                >
                  <ResilientCarImage
                    src={current.imageSrc}
                    alt={current.imageAlt}
                    fallbackTitle={current.title}
                    className="max-h-[400px] w-full object-contain select-none"
                  />
                </div>

                {/* Measured scrim at bottom for contrast */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pt-10 pb-4"
                >
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#D4D4D8]">{current.surfaceNote}</p>
                      <p className="text-sm font-medium text-white mt-0.5">{current.subtitle}</p>
                    </div>
                    <p className="font-mono-telemetry text-xs text-[#F59E0B]">
                      {current.downforceNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column telemetry strip below hero split */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_TELEMETRY_STRIP.map((item) => (
            <div key={item.label} className="bg-[#111318] px-5 py-4">
              <p className="text-xs text-[#A1A1AA]">{item.label}</p>
              <p className="mt-1 font-mono-telemetry text-sm font-semibold text-[#F4F4F5]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
