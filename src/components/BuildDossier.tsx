import {useState} from 'react';
import {CIRCUIT_PROFILES, DOSSIER_ITEMS} from '../data/gt86Data';

export function BuildDossier() {
  const [activeCircuitId, setActiveCircuitId] = useState<string>(CIRCUIT_PROFILES[0].id);

  const activeCircuit =
    CIRCUIT_PROFILES.find((c) => c.id === activeCircuitId) ?? CIRCUIT_PROFILES[0];

  return (
    <section id="circuit-dossier" className="bg-[#0D0E13] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 space-y-16">
        {/* Part 1: Asymmetric Technical Dossier (01 - 04) */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#E11D2E]">
              03 · 車輛細節與改裝履歷
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              從外觀塗裝到空氣力學的逐項解析
            </h2>
          </div>

          {/* Asymmetric bento layout (col-span-7 / col-span-5 alternating) with hairline borders */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {DOSSIER_ITEMS.map((item, idx) => {
              const isWide = idx === 0 || idx === 3;
              return (
                <article
                  key={item.index}
                  className={`flex flex-col justify-between rounded-sm border border-white/10 bg-[#12141A] p-6 sm:p-7 ${
                    isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                      <span>{item.category}</span>
                      <span className="font-mono-telemetry font-semibold text-[#E11D2E]">
                        {item.index}.
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                      {item.index}. {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#D4D4D8]">{item.summary}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
                    <span className="text-[#A1A1AA]">{item.specDetail}</span>
                    <span className="font-mono-telemetry font-semibold text-[#F4F4F5]">
                      {item.metricLabel} · {item.metricValue}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Part 2: Interactive Circuit Lap Comparison Board */}
        <div className="space-y-8 border-t border-white/10 pt-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#E11D2E]">
                04 · 雙車單圈與橫向G值推估對照
              </p>
              <h2
                className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
                style={{textWrap: 'balance'}}
              >
                賽道實戰空力效益模擬看板
              </h2>
              <p className="text-sm leading-relaxed text-[#A1A1AA]">
                切換不同特徵的日本經典賽道與山道，比較無尾翼「街道式樣 01」與全套空力「賽道式樣 02」的單圈落差與高速彎表現。
              </p>
            </div>

            {/* Circuit selector tabs */}
            <div
              role="tablist"
              aria-label="賽道選擇"
              className="inline-flex flex-wrap gap-1.5 rounded-sm border border-white/12 bg-[#12141A] p-1"
            >
              {CIRCUIT_PROFILES.map((circuit) => (
                <button
                  key={circuit.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCircuit.id === circuit.id}
                  onClick={() => setActiveCircuitId(circuit.id)}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCircuit.id === circuit.id
                      ? 'bg-[#E11D2E] text-white'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                  }`}
                >
                  {circuit.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Circuit Data Card */}
          <div className="rounded-sm border border-white/12 bg-[#12141A] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#F4F4F5] sm:text-3xl">
                  {activeCircuit.name}
                </h3>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  {activeCircuit.region} · 單圈全長 {activeCircuit.lengthKm} · {activeCircuit.corners} 處彎道
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#A1A1AA]">空力進化單圈差距</p>
                <p className="font-mono-telemetry text-2xl font-bold text-[#22C55E]">
                  {activeCircuit.deltaSeconds}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs text-[#A1A1AA]">式樣 01（街道純粹）單圈</p>
                <p className="font-mono-telemetry text-2xl font-semibold text-[#D4D4D8]">
                  {activeCircuit.spec01Lap}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#A1A1AA]">式樣 02（賽道空力）單圈</p>
                <p className="font-mono-telemetry text-2xl font-semibold text-[#E11D2E]">
                  {activeCircuit.spec02Lap}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#A1A1AA]">尾速表現</p>
                <p className="font-mono-telemetry text-2xl font-semibold text-[#F4F4F5]">
                  {activeCircuit.topSpeedKmh}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#A1A1AA]">高速彎峰值橫向G值</p>
                <p className="font-mono-telemetry text-2xl font-semibold text-[#F59E0B]">
                  {activeCircuit.peakLateralG}
                </p>
              </div>
            </div>

            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#D4D4D8]">
              賽道攻略簡評：{activeCircuit.notes}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
