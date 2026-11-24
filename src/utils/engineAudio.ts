// Procedural Web Audio synthesizer emulating a 2.0L FA20 Boxer-4 naturally aspirated engine.

class BoxerEngineAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscPrimary: OscillatorNode | null = null;
  private oscHarmonic2: OscillatorNode | null = null;
  private oscHarmonic4: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private intakeFilter: BiquadFilterNode | null = null;
  private exhaustFilter: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private running = false;

  public start(initialRpm = 950): boolean {
    if (this.running) return true;
    const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    if (!AudioCtx) return false;

    const ctx = new AudioCtx();
    this.ctx = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(ctx.destination);
    this.masterGain = masterGain;

    // Exhaust resonant low-pass filter
    const exhaustFilter = ctx.createBiquadFilter();
    exhaustFilter.type = 'lowpass';
    exhaustFilter.frequency.value = 340;
    exhaustFilter.Q.value = 2.4;
    exhaustFilter.connect(masterGain);
    this.exhaustFilter = exhaustFilter;

    // Boxer 4 uneven firing pulse fundamental (sawtooth)
    const oscPrimary = ctx.createOscillator();
    oscPrimary.type = 'sawtooth';
    const g1 = ctx.createGain();
    g1.gain.value = 0.45;
    oscPrimary.connect(g1);
    g1.connect(exhaustFilter);
    this.oscPrimary = oscPrimary;

    // 2nd harmonic (boxer growl)
    const oscHarmonic2 = ctx.createOscillator();
    oscHarmonic2.type = 'triangle';
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    oscHarmonic2.connect(g2);
    g2.connect(exhaustFilter);
    this.oscHarmonic2 = oscHarmonic2;

    // 4th harmonic (high-RPM NA metallic rasp)
    const oscHarmonic4 = ctx.createOscillator();
    oscHarmonic4.type = 'sawtooth';
    const g4 = ctx.createGain();
    g4.gain.value = 0.14;
    oscHarmonic4.connect(g4);
    g4.connect(exhaustFilter);
    this.oscHarmonic4 = oscHarmonic4;

    // Sub rumble
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    const gSub = ctx.createGain();
    gSub.gain.value = 0.38;
    subOsc.connect(gSub);
    gSub.connect(exhaustFilter);
    this.subOsc = subOsc;

    // Intake air induction noise (BLITZ open-element roar)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const intakeFilter = ctx.createBiquadFilter();
    intakeFilter.type = 'bandpass';
    intakeFilter.frequency.value = 600;
    intakeFilter.Q.value = 1.6;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.04;

    noiseSource.connect(intakeFilter);
    intakeFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    this.noiseSource = noiseSource;
    this.intakeFilter = intakeFilter;
    this.noiseGain = noiseGain;

    oscPrimary.start();
    oscHarmonic2.start();
    oscHarmonic4.start();
    subOsc.start();
    noiseSource.start();

    this.running = true;
    this.updateRpm(initialRpm, 0.15);
    return true;
  }

  public updateRpm(rpm: number, throttleLoad: number): void {
    if (!this.running || !this.ctx) return;
    const now = this.ctx.currentTime;
    // 4-cylinder 4-stroke firing frequency = (RPM / 60) * 2
    const firingHz = Math.max(24, (rpm / 60) * 2);

    this.oscPrimary?.frequency.setTargetAtTime(firingHz, now, 0.03);
    this.oscHarmonic2?.frequency.setTargetAtTime(firingHz * 1.5, now, 0.03);
    this.oscHarmonic4?.frequency.setTargetAtTime(firingHz * 3.0, now, 0.03);
    this.subOsc?.frequency.setTargetAtTime(firingHz * 0.5, now, 0.03);

    const normalized = Math.min(1, Math.max(0, (rpm - 900) / 6600));
    const cutoff = 240 + normalized * 1950 + throttleLoad * 650;
    this.exhaustFilter?.frequency.setTargetAtTime(cutoff, now, 0.04);

    if (this.intakeFilter && this.noiseGain) {
      this.intakeFilter.frequency.setTargetAtTime(420 + normalized * 2400, now, 0.04);
      this.noiseGain.gain.setTargetAtTime(0.02 + throttleLoad * 0.14 + normalized * 0.08, now, 0.04);
    }

    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0.14 + normalized * 0.12 + throttleLoad * 0.05, now, 0.05);
    }
  }

  public stop(): void {
    if (!this.running) return;
    try {
      this.oscPrimary?.stop();
      this.oscHarmonic2?.stop();
      this.oscHarmonic4?.stop();
      this.subOsc?.stop();
      this.noiseSource?.stop();
      this.ctx?.close();
    } catch {
      // Ignore already stopped audio nodes
    }
    this.ctx = null;
    this.running = false;
  }

  public isRunning(): boolean {
    return this.running;
  }
}

export const boxerEngineAudio = new BoxerEngineAudio();
