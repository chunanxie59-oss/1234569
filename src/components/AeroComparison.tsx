import {useState} from 'react';
import {MoveHorizontal, X} from 'lucide-react';
import {SpecStageId, VEHICLE_SPECS} from '../data/gt86Data';
import {ResilientCarImage} from './ResilientCarImage';

interface AeroComparisonProps {
  inspectedSpec: SpecStageId | null;
  onInspectSpec: (spec: SpecStageId | null) => void;
}

export function AeroComparison({inspectedSpec, onInspectSpec}: AeroComparisonProps) {
  const [splitPercent, setSplitPercent] = useState(50);

  const streetSpec = VEHICLE_SPECS.street;
  const trackSpec = VEHICLE_SPECS.track;

  return (
    <section id="aero-comparison" className="border-b border-white/10 bg-[#0D0E13] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#E11D2E]">
              01 · 空力進化實測對照
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              同一具藤澤 #86  chassis，從純粹街車到賽道下壓力的細節落差
            </h2>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              拖曳下方滑桿或點選快速比例按鈕，即可即時對比「街道競技初階式樣」與「2.0 NA 賽道空力式樣」在車頂碳纖化、前下擾流、側裙及高支架 GT 尾翼的視覺與空氣力學差異。
            </p>
          </div>

          {/* Quick split presets */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSplitPercent(100)}
              className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                splitPercent >= 95
                  ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                  : 'border-white/12 bg-[#14171F] text-[#D4D4D8] hover:border-white/30'
              }`}
            >
              式樣 01 街道 100%
            </button>
            <button
              type="button"
              onClick={() => setSplitPercent(50)}
              className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                splitPercent > 40 && splitPercent < 60
                  ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                  : 'border-white/12 bg-[#14171F] text-[#D4D4D8] hover:border-white/30'
              }`}
            >
              50 / 50 疊合對照
            </button>
            <button
              type="button"
              onClick={() => setSplitPercent(0)}
              className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                splitPercent <= 5
                  ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                  : 'border-white/12 bg-[#14171F] text-[#D4D4D8] hover:border-white/30'
              }`}
            >
              式樣 02 賽道 100%
            </button>
          </div>
        </div>

        {/* Interactive Split Comparison Viewport */}
        <div className="mt-8 overflow-hidden rounded-sm border border-white/12 bg-[#14171F]">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[540px] w-full overflow-hidden bg-[#12141A] select-none">
            {/* Base layer: Spec 02 Track Aero (postcard) */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#E5E7EB]">
              <ResilientCarImage
                src={trackSpec.imageSrc}
                alt={trackSpec.imageAlt}
                fallbackTitle={trackSpec.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Clipped top layer: Spec 01 Street */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF]"
              style={{
                clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
              }}
            >
              <ResilientCarImage
                src={streetSpec.imageSrc}
                alt={streetSpec.imageAlt}
                fallbackTitle={streetSpec.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Vertical racing divider line */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-[#E11D2E] shadow-[0_0_16px_rgba(225,29,46,0.75)]"
              style={{left: `${splitPercent}%`}}
              aria-hidden="true"
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-sm border border-white/70 bg-[#090A0D] text-white shadow-lg">
                <MoveHorizontal className="h-4 w-4 text-[#E11D2E]" />
              </div>
            </div>

            {/* Corner captions with high-contrast measured scrims */}
            <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-sm bg-black/80 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              <span className="font-mono-telemetry text-[#F59E0B]">式樣 01</span>
              <span className="mx-1.5 text-white/40">·</span>
              <span>紅頂無尾翼街道設定</span>
            </div>
            <div className="pointer-events-none absolute top-3 right-3 z-10 rounded-sm bg-black/80 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              <span className="font-mono-telemetry text-[#E11D2E]">式樣 02</span>
              <span className="mx-1.5 text-white/40">·</span>
              <span>碳纖頂 + GT 尾翼賽道設定</span>
            </div>
          </div>

          {/* Accessible comparison slider bar */}
          <div className="flex flex-col gap-3 border-t border-white/10 bg-[#111318] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor="aero-split-range"
              className="text-xs font-medium text-[#D4D4D8] whitespace-nowrap"
            >
              空力演化對照滑桿：<span className="font-mono-telemetry text-white">{splitPercent}%</span> 街道 /{' '}
              <span className="font-mono-telemetry text-[#E11D2E]">{100 - splitPercent}%</span> 賽道
            </label>
            <input
              id="aero-split-range"
              type="range"
              min={0}
              max={100}
              value={splitPercent}
              onChange={(e) => setSplitPercent(Number(e.target.value))}
              aria-label="拖曳調整街道式樣與賽道空力式樣的對比比例"
              className="track-slider w-full sm:max-w-md"
            />
          </div>
        </div>

        {/* Clean side-by-side spec delta comparison table */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {([streetSpec, trackSpec] as const).map((spec) => (
            <div
              key={spec.id}
              className="flex flex-col justify-between rounded-sm border border-white/10 bg-[#12141A] p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <p className="font-mono-telemetry text-xs font-semibold text-[#E11D2E]">
                      {spec.code}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5] mt-0.5">
                      {spec.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectSpec(spec.id)}
                    className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-[#D4D4D8] border border-white/12 rounded-sm hover:border-white/30 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    放大原圖
                  </button>
                </div>

                <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-[#A1A1AA]">車頂結構</dt>
                    <dd className="mt-0.5 font-medium text-[#F4F4F5]">{spec.roofSpec}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#A1A1AA]">前保桿 / 下擾流</dt>
                    <dd className="mt-0.5 font-medium text-[#F4F4F5]">{spec.frontLip}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#A1A1AA]">車尾空力</dt>
                    <dd className="mt-0.5 font-medium text-[#F4F4F5]">{spec.rearWing}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#A1A1AA]">空力特性</dt>
                    <dd className="mt-0.5 font-medium text-[#F4F4F5]">{spec.downforceNote}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User-triggered full-screen inspection modal (never auto-opens) */}
      {inspectedSpec && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={VEHICLE_SPECS[inspectedSpec].title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => onInspectSpec(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-white/15 bg-[#111318]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="text-sm font-semibold text-[#F4F4F5]">
                {VEHICLE_SPECS[inspectedSpec].code} · {VEHICLE_SPECS[inspectedSpec].title}
              </div>
              <button
                type="button"
                onClick={() => onInspectSpec(null)}
                aria-label="關閉檢視視窗"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/12 text-[#D4D4D8] hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex max-h-[75vh] items-center justify-center bg-[#090A0D] p-4">
              <ResilientCarImage
                src={VEHICLE_SPECS[inspectedSpec].imageSrc}
                alt={VEHICLE_SPECS[inspectedSpec].imageAlt}
                fallbackTitle={VEHICLE_SPECS[inspectedSpec].title}
                className="max-h-[68vh] w-full object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-xs text-[#A1A1AA]">
              <span>{VEHICLE_SPECS[inspectedSpec].subtitle}</span>
              <span className="font-mono-telemetry text-[#F4F4F5]">
                {VEHICLE_SPECS[inspectedSpec].plate}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
