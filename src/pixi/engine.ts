import "pixi.js/unsafe-eval";
import { Application, Container, Sprite, Texture, Graphics } from "pixi.js";
import { img } from "../assets";

const texCache = new Map<string, Promise<Texture>>();
export function tex(key: string): Promise<Texture> {
  let p = texCache.get(key);
  if (!p) {
    p = new Promise<Texture>((res) => {
      const im = new Image();
      im.onload = () => res(Texture.from(im));
      im.onerror = () => res(Texture.WHITE);
      im.src = img(key);
    });
    texCache.set(key, p);
  }
  return p;
}
export async function texs(keys: string[]) {
  const out: Record<string, Texture> = {};
  await Promise.all(keys.map(async (k) => (out[k] = await tex(k))));
  return out;
}

export async function createApp(host: HTMLElement) {
  const app = new Application();
  await app.init({
    resizeTo: host,
    backgroundAlpha: 0,
    antialias: true,
    preference: "webgl",
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
  });
  host.appendChild(app.canvas);
  app.canvas.style.display = "block";
  return app;
}

// ---------- particles ----------
type P = { s: Sprite; vx: number; vy: number; life: number; max: number; spin: number; grow: number; fade: boolean; drag: number; g: number };
export class Particles {
  layer = new Container();
  list: P[] = [];
  constructor(public calm = false) {}
  burst(t: Texture, x: number, y: number, opts: { n?: number; speed?: number; tint?: number; scale?: number; life?: number; spread?: number; angle?: number; grow?: number; gravity?: number; blend?: boolean } = {}) {
    const n = this.calm ? Math.ceil((opts.n ?? 20) / 3) : opts.n ?? 20;
    for (let i = 0; i < n; i++) {
      const s = new Sprite(t);
      s.anchor.set(0.5);
      s.x = x; s.y = y;
      s.tint = opts.tint ?? 0xffffff;
      const sc = (opts.scale ?? 0.4) * (0.6 + Math.random() * 0.8);
      s.scale.set(sc);
      if (opts.blend !== false) s.blendMode = "add";
      const a = (opts.angle ?? 0) + (Math.random() - 0.5) * (opts.spread ?? Math.PI * 2);
      const sp = (opts.speed ?? 4) * (0.4 + Math.random());
      const life = (opts.life ?? 40) * (0.6 + Math.random() * 0.6);
      this.layer.addChild(s);
      this.list.push({ s, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life, max: life, spin: (Math.random() - 0.5) * 0.2, grow: opts.grow ?? -0.004, fade: true, drag: 0.96, g: opts.gravity ?? 0 });
    }
  }
  update(dt: number) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      p.life -= dt;
      p.vx *= Math.pow(p.drag, dt); p.vy = p.vy * Math.pow(p.drag, dt) + p.g * dt;
      p.s.x += p.vx * dt; p.s.y += p.vy * dt;
      p.s.rotation += p.spin * dt;
      p.s.scale.set(Math.max(0.01, p.s.scale.x + p.grow * dt));
      p.s.alpha = Math.max(0, p.life / p.max);
      if (p.life <= 0) { p.s.destroy(); this.list.splice(i, 1); }
    }
  }
}

// ---------- parallax starfield ----------
export class Starfield {
  layer = new Container();
  stars: { g: Graphics; depth: number; tw: number; by: number }[] = [];
  constructor(w: number, h: number, count = 160) {
    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      const g = new Graphics().circle(0, 0, 0.6 + depth * 1.6).fill({ color: depth > 0.85 ? 0xbfefff : 0xffffff, alpha: 1 });
      g.x = Math.random() * w;
      this.layer.addChild(g);
      this.stars.push({ g, depth, tw: Math.random() * 6, by: Math.random() * h });
    }
  }
  resize(w: number) { for (const s of this.stars) s.g.x = Math.random() * w; }
  update(dt: number, h: number, scrollY = 0, drift = 0.15) {
    for (const s of this.stars) {
      s.tw += 0.03 * dt;
      s.by += drift * (0.3 + s.depth) * dt;
      s.g.alpha = (0.25 + 0.75 * Math.abs(Math.sin(s.tw))) * (0.3 + 0.7 * s.depth);
      s.g.y = ((((s.by - scrollY * (0.05 + s.depth * 0.2)) % h) + h) % h);
    }
  }
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
