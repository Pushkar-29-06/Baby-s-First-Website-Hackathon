/**
 * Web Audio "Level Up" Synth Utility
 * - Creates an AudioContext
 * - Uses an oscillator set to a square wave rapidly ramping 200Hz -> 1200Hz over 0.5s
 * - Layered with a second oscillator playing a major chord arpeggio
 * - Bypasses global mute for the Archmage Overdrive Easter Egg
 */
export function playLevelUpSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    masterGain.connect(ctx.destination);

    // Oscillator 1: Square wave sweep 200Hz -> 1200Hz over 0.5s
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.5);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + 0.55);

    // Oscillator 2: Major chord arpeggio (C5 -> E5 -> G5 -> C6)
    const chordFrequencies = [523.25, 659.25, 783.99, 1046.5];
    chordFrequencies.forEach((freq, idx) => {
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteStart = now + idx * 0.12;
      const noteEnd = noteStart + 0.2;

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq, noteStart);

      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, noteEnd);

      osc2.connect(noteGain);
      noteGain.connect(masterGain);

      osc2.start(noteStart);
      osc2.stop(noteEnd);
    });
  } catch (err) {
    console.warn("Could not play level up synth:", err);
  }
}
