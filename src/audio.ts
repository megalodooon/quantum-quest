import { SND } from "./assets";

let ctx: AudioContext | null = null;
const buffers: Record<string, AudioBuffer> = {};
let loading: Promise<void> | null = null;
let enabled = true;
let hapticsOn = true;

export function setSound(on: boolean) { enabled = on; }
export function setHaptics(on: boolean) { hapticsOn = on; }

async function dataToBuffer(url: string) {
  const res = await fetch(url);
  const ab = await res.arrayBuffer();
  return await ctx!.decodeAudioData(ab);
}

/** Must be called from a user gesture (browsers block audio before one). */
export function unlockAudio() {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    if (!loading) {
      loading = Promise.all(
        Object.entries(SND).map(async ([k, u]) => {
          try { buffers[k] = await dataToBuffer(u); } catch { /* skip a broken file */ }
        })
      ).then(() => undefined);
    }
  } catch { /* no audio available */ }
}

export function play(name: string, opts: { rate?: number; volume?: number } = {}) {
  if (!enabled || !ctx) return;
  const b = buffers[name];
  if (!b) return;
  try {
    const src = ctx.createBufferSource();
    src.buffer = b;
    src.playbackRate.value = opts.rate ?? 1;
    const g = ctx.createGain();
    g.gain.value = opts.volume ?? 0.7;
    src.connect(g).connect(ctx.destination);
    src.start();
  } catch { /* ignore */ }
}

export function buzz(pattern: number | number[]) {
  if (!hapticsOn) return;
  try { navigator.vibrate?.(pattern); } catch { /* not supported (iPhone) */ }
}
