import { Application, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { PARTS, STAGES, stageColor } from "../content";
import { createApp, Particles, Starfield, texs } from "./engine";

export type PlanetInfo = { part: number; unlocked: boolean; frac: number; boss: boolean; current: boolean };

const GAP = 200;
const TOP = 150;

export class MapScene {
  app!: Application;
  world = new Container();
  planets: { c: Container; ring: Graphics; glow: Sprite; info: PlanetInfo; x: number; y: number; body: Container }[] = [];
  stars!: Starfield;
  fx = new Particles();
  ship!: Sprite;
  scroll = 0;
  vel = 0;
  dragging = false;
  lastY = 0;
  moved = 0;
  height = 0;
  t = 0;
  destroyed = false;
  meteors: { s: Sprite; vx: number; vy: number; vr: number }[] = [];
  textures: Record<string, Texture> = {};
  pathG = new Graphics();
  pulseG = new Graphics();

  constructor(private host: HTMLElement, private onPick: (part: number) => void, private calm: boolean) {}

  posFor(p: number) {
    const w = this.app.screen.width;
    const amp = Math.min(w * 0.28, 150);
    const x = w / 2 + Math.sin(p * 1.15) * amp;
    const y = TOP + (PARTS.length - 1 - p) * GAP;
    return { x, y };
  }

  async init(info: PlanetInfo[], shipKey: string) {
    this.app = await createApp(this.host);
    if (this.destroyed) { this.app.destroy(true); return; }
    this.textures = await texs(["fx_light_01", "fx_light_02", "fx_smoke_01", "fx_smoke_07", "fx_star_04", "fx_spark_04", "fx_circle_05", "fx_magic_03", shipKey,
      "meteorbrown_big1", "meteorgrey_big2", "meteorbrown_small1", "meteorgrey_med1", "station1", "station6", "station12", "station21", "rocket2"]);
    if (this.destroyed) return;
    const { width: w, height: h } = this.app.screen;
    this.stars = new Starfield(w, h, this.calm ? 80 : 170);
    this.app.stage.addChild(this.stars.layer);
    this.app.stage.addChild(this.world);
    this.height = TOP * 2 + (PARTS.length - 1) * GAP;

    // nebulae per stage
    for (const st of STAGES) {
      const ps = st.parts.map((p) => this.posFor(p).y);
      const cy = (Math.min(...ps) + Math.max(...ps)) / 2;
      for (let k = 0; k < 2; k++) {
        const n = new Sprite(this.textures[k ? "fx_smoke_07" : "fx_smoke_01"]);
        n.anchor.set(0.5);
        n.tint = stageColor(st.id);
        n.alpha = 0.16;
        n.blendMode = "add";
        n.scale.set((Math.max(...ps) - Math.min(...ps) + 300) / 512 * (k ? 1.1 : 1.4));
        n.x = w / 2 + (k ? -1 : 1) * w * 0.2;
        n.y = cy + (k ? 60 : -40);
        n.rotation = k * 1.7;
        this.world.addChild(n);
      }
      const top = Math.min(...ps) - 95;
      const label = new Text({ text: st.name.toUpperCase(), style: { fontFamily: "Kenney Future, sans-serif", fontSize: 14, fill: stageColor(st.id), letterSpacing: 3 } });
      label.anchor.set(0.5);
      label.alpha = 0.9;
      label.position.set(w / 2, top);
      const sub = new Text({ text: `STAGE ${st.id} · ${st.blurb}`, style: { fontFamily: "Atkinson Hyperlegible, sans-serif", fontSize: 12, fill: 0x8d9bc4 } });
      sub.anchor.set(0.5);
      sub.position.set(w / 2, top + 18);
      this.world.addChild(label, sub);
    }
    this.world.addChild(this.pathG, this.pulseG);
    this.drawPath(info);

    // decorations: stations near some planets
    const deco: [number, string, number][] = [[2, "station1", -1], [7, "station6", 1], [12, "station12", -1], [16, "station21", 1], [21, "rocket2", -1]];
    for (const [p, k, side] of deco) {
      const { x, y } = this.posFor(p);
      const s = new Sprite(this.textures[k]);
      s.anchor.set(0.5); s.scale.set(0.55); s.alpha = 0.75;
      s.position.set(Math.max(40, Math.min(w - 40, x + side * 110)), y + 40);
      (s as any).bob = Math.random() * 6;
      this.world.addChild(s);
      this.meteors.push({ s, vx: 0, vy: 0, vr: 0.002 * side });
    }
    // drifting meteors
    for (let i = 0; i < (this.calm ? 4 : 10); i++) {
      const k = ["meteorbrown_big1", "meteorgrey_big2", "meteorbrown_small1", "meteorgrey_med1"][i % 4];
      const s = new Sprite(this.textures[k]);
      s.anchor.set(0.5); s.scale.set(0.25 + Math.random() * 0.35); s.alpha = 0.55;
      s.position.set(Math.random() * w, Math.random() * this.height);
      this.world.addChild(s);
      this.meteors.push({ s, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.2, vr: (Math.random() - 0.5) * 0.01 });
    }

    for (const pi of info) this.addPlanet(pi);
    this.world.addChild(this.fx.layer);

    // ship next to current planet
    const cur = info.find((i) => i.current) ?? info[0];
    this.ship = new Sprite(this.textures[shipKey]);
    this.ship.anchor.set(0.5);
    this.ship.scale.set(0.42);
    const cp = this.posFor(cur.part);
    this.ship.position.set(cp.x + 62, cp.y - 46);
    this.world.addChild(this.ship);

    this.scroll = Math.max(0, Math.min(this.maxScroll(), cp.y - h * 0.55));
    this.bindInput();
    this.app.ticker.add((tk) => this.tick(tk.deltaTime));
  }

  maxScroll() { return Math.max(0, this.height - this.app.screen.height); }

  drawPath(info: PlanetInfo[]) {
    const g = this.pathG;
    g.clear();
    for (let p = 0; p < PARTS.length - 1; p++) {
      const a = this.posFor(p), b = this.posFor(p + 1);
      const lit = info[p + 1]?.unlocked;
      const steps = 14;
      for (let i = 3; i < steps - 2; i++) {
        const t = i / steps;
        const x = a.x + (b.x - a.x) * t + Math.sin(t * Math.PI) * 18 * (p % 2 ? 1 : -1);
        const y = a.y + (b.y - a.y) * t;
        g.circle(x, y, lit ? 2.6 : 1.8).fill({ color: lit ? stageColor(PARTS[p + 1].stage) : 0x3a4770, alpha: lit ? 0.85 : 0.6 });
      }
    }
  }

  addPlanet(info: PlanetInfo) {
    const part = PARTS[info.part];
    const { x, y } = this.posFor(info.part);
    const col = stageColor(part.stage);
    const c = new Container();
    c.position.set(x, y);
    const glow = new Sprite(this.textures["fx_light_01"]);
    glow.anchor.set(0.5); glow.tint = col; glow.blendMode = "add";
    glow.scale.set(info.unlocked ? 0.62 : 0.4); glow.alpha = info.unlocked ? 0.8 : 0.25;
    const body = new Container();
    const r = 30 + (part.topics.length > 40 ? 8 : part.topics.length > 30 ? 4 : 0);
    const g = new Graphics();
    g.circle(0, 0, r).fill({ color: info.unlocked ? col : 0x2a3558 });
    g.circle(-r * 0.25, -r * 0.3, r * 0.75).fill({ color: 0xffffff, alpha: info.unlocked ? 0.18 : 0.05 });
    g.circle(r * 0.2, r * 0.25, r * 0.55).fill({ color: 0x0b1020, alpha: 0.28 });
    // craters/bands
    for (let i = 0; i < 3; i++) g.circle(Math.cos(i * 2.1 + info.part) * r * 0.5, Math.sin(i * 2.1 + info.part) * r * 0.45, r * 0.12).fill({ color: 0x0b1020, alpha: 0.18 });
    if (info.part % 3 === 1) g.ellipse(0, 0, r * 1.55, r * 0.32).stroke({ color: col, width: 2, alpha: info.unlocked ? 0.6 : 0.2 });
    body.addChild(g);
    const ring = new Graphics();
    this.drawRing(ring, r + 9, info.frac, info.boss, info.unlocked, col);
    const num = new Text({ text: String(info.part), style: { fontFamily: "JetBrains Mono, monospace", fontWeight: "700", fontSize: 20, fill: info.unlocked ? 0x0b1020 : 0x8d9bc4 } });
    num.anchor.set(0.5);
    const name = new Text({ text: part.name, style: { fontFamily: "Atkinson Hyperlegible, sans-serif", fontWeight: "700", fontSize: 14, fill: info.unlocked ? 0xe9eefc : 0x6b789f, align: "center" } });
    name.anchor.set(0.5, 0); name.y = r + 18;
    const pct = new Text({ text: info.unlocked ? (info.boss ? "Boss defeated" : `${Math.round(info.frac * 100)}%`) : "Locked", style: { fontFamily: "JetBrains Mono, monospace", fontSize: 11, fill: info.boss ? 0xffbf5a : 0x8d9bc4 } });
    pct.anchor.set(0.5, 0); pct.y = r + 36;
    c.addChild(glow, ring, body, num, name, pct);
    c.eventMode = "static";
    c.cursor = "pointer";
    c.hitArea = { contains: (px: number, py: number) => px * px + py * py < (r + 30) * (r + 30) || (Math.abs(px) < 70 && py > 0 && py < r + 56) } as any;
    c.on("pointertap", () => { if (this.moved < 8) this.onPick(info.part); });
    this.world.addChild(c);
    this.planets.push({ c, ring, glow, info, x, y, body });
  }

  drawRing(g: Graphics, r: number, frac: number, boss: boolean, unlocked: boolean, col: number) {
    g.clear();
    g.circle(0, 0, r).stroke({ color: 0xffffff, width: 3, alpha: unlocked ? 0.12 : 0.05 });
    if (frac > 0) {
      g.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac).stroke({ color: boss ? 0xffbf5a : col, width: 4, cap: "round" });
    }
    if (boss) g.circle(0, 0, r + 6).stroke({ color: 0xffbf5a, width: 1.5, alpha: 0.7 });
  }

  bindInput() {
    const v = this.app.canvas;
    v.style.touchAction = "none";
    v.addEventListener("pointerdown", (e) => { this.dragging = true; this.lastY = e.clientY; this.vel = 0; this.moved = 0; });
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    v.addEventListener("wheel", (e) => { e.preventDefault(); this.vel = e.deltaY * 0.12; }, { passive: false });
  }
  onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dy = e.clientY - this.lastY;
    this.lastY = e.clientY;
    this.moved += Math.abs(dy);
    this.scroll -= dy;
    this.vel = -dy;
  };
  onUp = () => { this.dragging = false; };

  focus(part: number) {
    const { y } = this.posFor(part);
    this.targetScroll = Math.max(0, Math.min(this.maxScroll(), y - this.app.screen.height * 0.5));
  }
  targetScroll: number | null = null;

  tick(dt: number) {
    if (this.destroyed) return;
    this.t += dt;
    const h = this.app.screen.height;
    if (!this.dragging) {
      if (this.targetScroll !== null) {
        this.scroll += (this.targetScroll - this.scroll) * 0.12 * dt;
        if (Math.abs(this.targetScroll - this.scroll) < 0.5) this.targetScroll = null;
      } else {
        this.scroll += this.vel * dt;
        this.vel *= Math.pow(0.92, dt);
      }
    }
    const max = this.maxScroll();
    if (this.scroll < 0) { this.scroll += (0 - this.scroll) * 0.25; this.vel = 0; }
    if (this.scroll > max) { this.scroll += (max - this.scroll) * 0.25; this.vel = 0; }
    this.world.y = -this.scroll;
    this.stars.update(dt, h, this.scroll);
    for (const pl of this.planets) {
      const k = Math.sin(this.t * 0.03 + pl.info.part) * 0.04;
      pl.glow.scale.set((pl.info.unlocked ? 0.62 : 0.4) + k);
      pl.body.rotation = Math.sin(this.t * 0.01 + pl.info.part) * 0.06;
      if (pl.info.current) pl.c.scale.set(1 + Math.sin(this.t * 0.08) * 0.03);
    }
    for (const m of this.meteors) {
      m.s.x += m.vx * dt; m.s.y += m.vy * dt; m.s.rotation += m.vr * dt;
      const b = (m.s as any).bob; if (b !== undefined) m.s.y += Math.sin(this.t * 0.03 + b) * 0.15;
      if (m.s.x < -60) m.s.x = this.app.screen.width + 60; if (m.s.x > this.app.screen.width + 60) m.s.x = -60;
    }
    if (this.ship) {
      this.ship.y += Math.sin(this.t * 0.06) * 0.35;
      this.ship.rotation = Math.sin(this.t * 0.04) * 0.08;
      if (!this.calm && Math.random() < 0.35 * dt) this.fx.burst(this.textures["fx_spark_04"], this.ship.x, this.ship.y + 26, { n: 1, speed: 1.2, angle: Math.PI / 2, spread: 0.6, tint: 0x5ee7ff, scale: 0.12, life: 26 });
    }
    // twinkles on unlocked planets
    if (!this.calm && Math.random() < 0.08 * dt) {
      const ul = this.planets.filter((p) => p.info.unlocked);
      const pl = ul[Math.floor(Math.random() * ul.length)];
      if (pl) this.fx.burst(this.textures["fx_star_04"], pl.x + (Math.random() - 0.5) * 70, pl.y + (Math.random() - 0.5) * 70, { n: 1, speed: 0.2, tint: stageColor(PARTS[pl.info.part].stage), scale: 0.18, life: 50, grow: 0.002 });
    }
    // pulse along the lit path
    this.pulseG.clear();
    const lit = this.planets.filter((p) => p.info.unlocked).length;
    for (let p = 0; p < Math.max(0, lit - 1); p++) {
      const a = this.posFor(p), b = this.posFor(p + 1);
      const t = 0.22 + ((this.t * 0.006 + p * 0.37) % 1) * 0.6;
      const x = a.x + (b.x - a.x) * t + Math.sin(t * Math.PI) * 18 * (p % 2 ? 1 : -1);
      const y = a.y + (b.y - a.y) * t;
      this.pulseG.circle(x, y, 4).fill({ color: 0xffffff, alpha: 0.9 });
    }
    this.fx.update(dt);
  }

  destroy() {
    this.destroyed = true;
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    try { this.app?.destroy(true, { children: true }); } catch { /* ignore */ }
  }
}
