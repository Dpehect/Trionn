type SoundName =
  | "hover"
  | "menu"
  | "transition"
  | "engage"
  | "success";

class AudioManager {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private enabled = false;

  async initialize() {
    if (typeof window === "undefined") return;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0.16;
      this.master.connect(this.context.destination);
    }

    if (this.context.state === "suspended") {
      await this.context.resume();
    }

    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    if (this.master && this.context) {
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.setTargetAtTime(0, this.context.currentTime, 0.04);
    }
  }

  enable() {
    this.enabled = true;
    if (this.master && this.context) {
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.setTargetAtTime(0.16, this.context.currentTime, 0.04);
    }
  }

  play(name: SoundName) {
    if (!this.enabled || !this.context || !this.master) return;

    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    const frequencies: Record<SoundName, number> = {
      hover: 420,
      menu: 220,
      transition: 160,
      engage: 90,
      success: 620,
    };

    oscillator.frequency.value = frequencies[name];
    oscillator.type = name === "engage" ? "sawtooth" : "sine";

    gain.gain.setValueAtTime(0.0001, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      name === "engage" ? 0.08 : 0.035,
      this.context.currentTime + 0.01
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      this.context.currentTime + (name === "engage" ? 0.35 : 0.12)
    );

    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start();
    oscillator.stop(this.context.currentTime + (name === "engage" ? 0.4 : 0.15));
  }
}

export const audioManager = new AudioManager();
