/**
 * Procedural Web Audio API Sound Synthesizer
 * Zero external audio assets required. Ultra-lightweight and instantaneous.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("cyber_arcade_muted");
      this.isMuted = savedMute === "true";
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("cyber_arcade_muted", String(this.isMuted));
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("cyber_arcade_muted", String(this.isMuted));
    }
  }

  /**
   * Play a clean sine/triangle/square tone
   */
  public playTone(
    frequency: number = 440,
    type: OscillatorType = "sine",
    duration: number = 0.15,
    gainLevel: number = 0.1
  ) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or restricted
    }
  }

  /**
   * Sequence note for Matrix game (frequency depends on tile index)
   */
  public playSequenceNote(index: number, total: number = 9) {
    if (this.isMuted) return;
    const baseFreq = 220;
    const freq = baseFreq * Math.pow(1.15, index % total);
    this.playTone(freq, "sine", 0.18, 0.12);
  }

  /**
   * Click / Tap feedback sound
   */
  public playClick() {
    if (this.isMuted) return;
    this.playTone(800, "triangle", 0.04, 0.05);
  }

  /**
   * Rotate mechanical node sound
   */
  public playRotate() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  /**
   * Laser shoot / Pulse sound
   */
  public playLaserPulse() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  }

  /**
   * Merge chord sound (2048)
   */
  public playMerge(tier: number = 2) {
    if (this.isMuted) return;
    const baseFreq = 260 + Math.min(tier * 30, 800);
    this.playTone(baseFreq, "sine", 0.15, 0.08);
    setTimeout(() => {
      this.playTone(baseFreq * 1.25, "sine", 0.15, 0.06);
    }, 40);
  }

  /**
   * Level victory / Success chime
   */
  public playSuccess() {
    if (this.isMuted) return;
    const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.2, 0.08);
      }, i * 65);
    });
  }

  /**
   * Glitch / Error buzz
   */
  public playError() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {}
  }

  /**
   * Tile Pick sound (Tile Family)
   */
  public playTilePick() {
    if (this.isMuted) return;
    this.playTone(600, "sine", 0.08, 0.09);
    setTimeout(() => {
      this.playTone(900, "sine", 0.06, 0.07);
    }, 30);
  }

  /**
   * Triple Match POP! (Tile Family)
   */
  public playTileMatch() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.12, 0.1);
      }, i * 40);
    });
  }

  /**
   * Shuffle board sound
   */
  public playShuffle() {
    if (this.isMuted) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.playTone(300 + i * 80, "sawtooth", 0.05, 0.04);
      }, i * 30);
    }
  }

  /**
   * Warning / Overflow danger sound
   */
  public playWarning() {
    if (this.isMuted) return;
    this.playTone(280, "sawtooth", 0.12, 0.08);
  }

  /**
   * Liquid Pour bubbling sound (Water/Liquid Sort)
   */
  public playPour() {
    if (this.isMuted) return;
    const pitches = [400, 520, 680, 550, 480];
    pitches.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "sine", 0.06, 0.07);
      }, i * 35);
    });
  }

  /**
   * Tube complete radiant flare chime
   */
  public playTubeComplete() {
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.15, 0.09);
      }, i * 50);
    });
  }

  /**
   * Block placement thud (Block Blast)
   */
  public playPlace() {
    if (this.isMuted) return;
    this.playTone(320, "sine", 0.09, 0.08);
  }

  /**
   * Block line clear laser sweep (Block Blast)
   */
  public playLineClear(combo = 1) {
    if (this.isMuted) return;
    const baseFreq = 440 * Math.pow(1.12, Math.min(combo, 6));
    const chord = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
    chord.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.16, 0.12);
      }, i * 35);
    });
  }

  /**
   * Massive combo explosion
   */
  public playCombo() {
    if (this.isMuted) return;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "square", 0.12, 0.15);
      }, i * 45);
    });
  }
}

export const sound = new SoundSynthesizer();
