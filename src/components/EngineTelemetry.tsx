import {useEffect, useRef, useState} from 'react';
import {Volume2, VolumeX} from 'lucide-react';
import {boxerEngineAudio} from '../utils/engineAudio';

const GEAR_RATIOS: Record<number, {label: string; ratio: number; maxSpeed: number}> = {
  0: {label: 'N', ratio: 0, maxSpeed: 0},
  1: {label: '1', ratio: 3.626, maxSpeed: 62},
  2: {label: '2', ratio: 2.188, maxSpeed: 103},
  3: {label: '3', ratio: 1.541, maxSpeed: 146},
  4: {label: '4', ratio: 1.213, maxSpeed: 185},
  5: {label: '5', ratio: 1.0, maxSpeed: 218},
  6: {label: '6', ratio: 0.767, maxSpeed: 236},
};

const IDLE_RPM = 950;
const REDLINE_RPM = 7450;
const MAX_DIAL_RPM = 8000;

export function EngineTelemetry() {
  const [rpm, setRpm] = useState(IDLE_RPM);
  const [gear, setGear] = useState(1);
  const [isThrottleHeld, setIsThrottleHeld] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const throttleRef = useRef(false);
  const gearRef = useRef(1);

  useEffect(() => {
    throttleRef.current = isThrottleHeld;
  }, [isThrottleHeld]);

  useEffect(() => {
    gearRef.current = gear;
  }, [gear]);

  // Smooth physics loop for RPM acceleration & engine braking
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      setRpm((prev) => {
        const currentGear = gearRef.current;
        const holding = throttleRef.current;
        // Neutral revs fastest; higher gears have realistic load inertia
        const loadFactor = currentGear === 0 ? 1.55 : Math.max(0.32, 1.18 - currentGear * 0.14);

        let next = prev;
        if (holding) {
          next = prev + 4800 * loadFactor * dt;
          if (next >= REDLINE_RPM) {
            // Subtle rev limiter bounce near 7,450 RPM
            next = REDLINE_RPM - Math.random() * 140;
          }
        } else {
          const decayRate = currentGear === 0 ? 3100 : 1950;
          next = Math.max(IDLE_RPM, prev - decayRate * dt);
        }

        if (boxerEngineAudio.isRunning()) {
          boxerEngineAudio.updateRpm(next, holding ? 1 : 0.12);
        }
        return Math.round(next);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Stop Web Audio cleanly on unmount
  useEffect(() => {
    return () => {
      boxerEngineAudio.stop();
    };
  }, []);

  const toggleAudio = () => {
    if (audioEnabled) {
      boxerEngineAudio.stop();
      setAudioEnabled(false);
    } else {
      const started = boxerEngineAudio.start(rpm);
      setAudioEnabled(started);
    }
  };

  const handleManualRpmSlide = (val: number) => {
    setRpm(val);
    if (boxerEngineAudio.isRunning()) {
      boxerEngineAudio.updateRpm(val, val > 2500 ? 0.65 : 0.2);
    }
  };

  const shiftUp = () => {
    setGear((g) => {
      const next = Math.min(6, g + 1);
      if (g > 0 && next !== g) {
        setRpm((r) => Math.max(IDLE_RPM + 400, Math.round(r * 0.72)));
      }
      return next;
    });
  };

  const shiftDown = () => {
    setGear((g) => {
      const next = Math.max(0, g - 1);
      if (next > 0 && next !== g) {
        setRpm((r) => Math.min(REDLINE_RPM - 150, Math.round(r * 1.28)));
      }
      return next;
    });
  };

  // Compute simulated wheel speed and FA20 NA torque curve
  const gearInfo = GEAR_RATIOS[gear];
  const speedKmh =
    gear === 0
      ? 0
      : Math.round(((rpm - IDLE_RPM) / (REDLINE_RPM - IDLE_RPM)) * gearInfo.maxSpeed);

  // FA20 torque dip around 3,800-4,400 RPM then surge to 6,400 RPM
  const torqueNm = Math.round(
    145 +
      58 * Math.sin(Math.min(1, rpm / 7400) * Math.PI * 0.85) -
      (rpm > 3500 && rpm < 4600 ? 18 : 0),
  );
  const horsepowerPs = Math.round((torqueNm * rpm) / 7023);

  // SVG gauge arc math
  const progress = Math.min(1, rpm / MAX_DIAL_RPM);
  const arcAngle = progress * 240;
  const shiftLights = [
    {threshold: 4800, color: '#22C55E'},
    {threshold: 5300, color: '#22C55E'},
    {threshold: 5800, color: '#22C55E'},
    {threshold: 6200, color: '#F59E0B'},
    {threshold: 6550, color: '#F59E0B'},
    {threshold: 6900, color: '#E11D2E'},
    {threshold: 7150, color: '#E11D2E'},
    {threshold: 7350, color: '#E11D2E'},
  ];

  return (
    <section id="engine-telemetry" className="border-b border-white/10 bg-[#090A0D] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#E11D2E]">
              02 · 駕駛艙遙測與聲浪體驗
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              FA20 2.0 NA 水平對臥轉速表與換檔超轉燈
            </h2>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              開啟引擎聲浪並按住「全油門加速」，體驗水平對臥四缸從怠速 950 RPM 直上 7,450 RPM 紅線斷油的高轉氛圍與 6 速手排換檔頓挫。
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAudio}
            aria-pressed={audioEnabled}
            className={`min-h-[44px] inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] ${
              audioEnabled
                ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                : 'border-white/15 bg-[#14171F] text-[#F4F4F5] hover:border-white/35'
            }`}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                <span>引擎聲浪運作中（點擊靜音）</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" aria-hidden="true" />
                <span>開啟 FA20 水平對臥聲浪</span>
              </>
            )}
          </button>
        </div>

        {/* Cockpit Telemetry Console */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Precision Analog/Digital Tachometer */}
          <div className="flex flex-col items-center justify-between rounded-sm border border-white/12 bg-[#111318] p-6 sm:p-8 lg:col-span-7">
            {/* Sequential 8-LED Shift Light Bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                <span>超轉換檔指示燈 (SHIFT LIGHT)</span>
                <span className="font-mono-telemetry text-[#F4F4F5]">
                  {rpm >= 7150 ? 'UP SHIFT' : `${rpm} RPM`}
                </span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {shiftLights.map((led, idx) => {
                  const lit = rpm >= led.threshold;
                  return (
                    <div
                      key={idx}
                      className="h-2.5 rounded-sm transition-opacity duration-75"
                      style={{
                        backgroundColor: lit ? led.color : '#1E222D',
                        opacity: lit ? 1 : 0.45,
                        boxShadow: lit ? `0 0 10px ${led.color}` : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* SVG Circular Tachometer */}
            <div className="relative my-6 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
                {/* Background track arc */}
                <circle
                  cx="120"
                  cy="120"
                  r="96"
                  fill="none"
                  stroke="#1E222D"
                  strokeWidth="12"
                  strokeDasharray="402 603"
                  strokeLinecap="butt"
                  transform="rotate(150 120 120)"
                />
                {/* Redline zone arc (7000-8000 RPM) */}
                <circle
                  cx="120"
                  cy="120"
                  r="96"
                  fill="none"
                  stroke="#E11D2E"
                  strokeOpacity="0.32"
                  strokeWidth="12"
                  strokeDasharray="60 603"
                  transform="rotate(342 120 120)"
                />
                {/* Active RPM progress arc */}
                <circle
                  cx="120"
                  cy="120"
                  r="96"
                  fill="none"
                  stroke={rpm >= 7000 ? '#E11D2E' : rpm >= 5800 ? '#F59E0B' : '#F4F4F5'}
                  strokeWidth="12"
                  strokeDasharray={`${(arcAngle / 360) * 603} 603`}
                  transform="rotate(150 120 120)"
                />
                {/* Tick markers */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const deg = 150 + (num / 8) * 240;
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 120 + Math.cos(rad) * 76;
                  const y1 = 120 + Math.sin(rad) * 76;
                  const x2 = 120 + Math.cos(rad) * 84;
                  const y2 = 120 + Math.sin(rad) * 84;
                  const tx = 120 + Math.cos(rad) * 62;
                  const ty = 120 + Math.sin(rad) * 62;
                  return (
                    <g key={num}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={num >= 7 ? '#E11D2E' : '#71717A'}
                        strokeWidth="2"
                      />
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={num >= 7 ? '#E11D2E' : '#D4D4D8'}
                        fontSize="12"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        {num}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Center digital gear & speed readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-medium text-[#A1A1AA]">檔位 GEAR</span>
                <span className="font-display text-6xl font-bold leading-none text-[#E11D2E] mt-0.5">
                  {gearInfo.label}
                </span>
                <span className="mt-2 font-mono-telemetry text-2xl font-semibold text-[#F4F4F5]">
                  {speedKmh} <span className="text-xs font-normal text-[#A1A1AA]">km/h</span>
                </span>
              </div>
            </div>

            {/* Direct RPM fine-tune slider */}
            <div className="w-full max-w-md space-y-2 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                <label htmlFor="manual-rpm-slider">手動鎖定測試轉速</label>
                <span className="font-mono-telemetry text-[#F4F4F5]">{rpm} RPM</span>
              </div>
              <input
                id="manual-rpm-slider"
                type="range"
                min={IDLE_RPM}
                max={REDLINE_RPM}
                step={50}
                value={rpm}
                onChange={(e) => handleManualRpmSlide(Number(e.target.value))}
                className="track-slider w-full"
              />
            </div>
          </div>

          {/* Right: Interactive Pedal, Gear Shifter & Live Power Readout */}
          <div className="flex flex-col justify-between gap-6 rounded-sm border border-white/12 bg-[#111318] p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                  即時動力輸出與換檔控制
                </h3>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  支援滑鼠長按、觸控壓住或手動切換檔位模擬高轉延伸感
                </p>
              </div>

              {/* Tabular live metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-sm border border-white/10 bg-[#161922] p-4">
                  <p className="text-xs text-[#A1A1AA]">即時推估馬力</p>
                  <p className="mt-1 font-mono-telemetry text-2xl font-semibold text-[#F4F4F5]">
                    {horsepowerPs} <span className="text-xs text-[#A1A1AA]">PS</span>
                  </p>
                </div>
                <div className="rounded-sm border border-white/10 bg-[#161922] p-4">
                  <p className="text-xs text-[#A1A1AA]">即時扭力輸出</p>
                  <p className="mt-1 font-mono-telemetry text-2xl font-semibold text-[#F4F4F5]">
                    {torqueNm} <span className="text-xs text-[#A1A1AA]">Nm</span>
                  </p>
                </div>
                <div className="rounded-sm border border-white/10 bg-[#161922] p-4">
                  <p className="text-xs text-[#A1A1AA]">終傳比 / 檔位齒比</p>
                  <p className="mt-1 font-mono-telemetry text-lg font-semibold text-[#F4F4F5]">
                    4.100 / {gear === 0 ? '空檔' : gearInfo.ratio.toFixed(3)}
                  </p>
                </div>
                <div className="rounded-sm border border-white/10 bg-[#161922] p-4">
                  <p className="text-xs text-[#A1A1AA]">自然進氣特性</p>
                  <p className="mt-1 font-mono-telemetry text-lg font-semibold text-[#F59E0B]">
                    {rpm >= 5200 ? '高轉強輸出域' : rpm >= 3500 ? '中段線性銜接' : '低轉巡航域'}
                  </p>
                </div>
              </div>

              {/* 6-speed gear buttons + Shift Up / Down */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span>變速箱檔位選擇 (6MT)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={shiftDown}
                      className="min-h-[36px] px-3 py-1 text-xs font-medium text-[#D4D4D8] border border-white/12 rounded-sm hover:border-white/30 hover:text-white cursor-pointer"
                    >
                      退檔 -
                    </button>
                    <button
                      type="button"
                      onClick={shiftUp}
                      className="min-h-[36px] px-3 py-1 text-xs font-medium text-[#D4D4D8] border border-white/12 rounded-sm hover:border-white/30 hover:text-white cursor-pointer"
                    >
                      進檔 +
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGear(g)}
                      className={`min-h-[42px] font-mono-telemetry text-sm font-semibold rounded-sm border transition-colors cursor-pointer ${
                        gear === g
                          ? 'border-[#E11D2E] bg-[#E11D2E] text-white'
                          : 'border-white/10 bg-[#161922] text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {GEAR_RATIOS[g].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hold-to-rev Throttle Pedal Button */}
            <button
              type="button"
              onMouseDown={() => setIsThrottleHeld(true)}
              onMouseUp={() => setIsThrottleHeld(false)}
              onMouseLeave={() => setIsThrottleHeld(false)}
              onTouchStart={() => setIsThrottleHeld(true)}
              onTouchEnd={() => setIsThrottleHeld(false)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') setIsThrottleHeld(true);
              }}
              onKeyUp={() => setIsThrottleHeld(false)}
              className={`min-h-[56px] w-full rounded-sm border px-6 py-4 text-base font-bold tracking-wide transition-transform duration-100 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] ${
                isThrottleHeld
                  ? 'scale-[0.99] border-[#F59E0B] bg-[#BE1221] text-white'
                  : 'border-[#E11D2E] bg-[#E11D2E] text-white hover:bg-[#BE1221]'
              }`}
            >
              {isThrottleHeld ? '全油門衝刺中 — 鬆開收油' : '按住全油門拉轉 (HOLD THROTTLE)'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
