import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";
import { createApp, Particles, Starfield, texs } from "./engine";

type Shot = { s: Sprite; vy: number; target: "boss" | "player"; crit: boolean };

export class BossScene {
  app!: Application;
  stars!: Starfield;
  fx = new Particles();
  boss!: Sprite;
  ship!: Sprite;
  shieldG = new Graphics();
  shots: Shot[] = [];
  t = 0;
  shake = 0;
  bossFlash = 0;
  bossDead = false;
  destroyed = false;
  tx: Record<string, Texture> = {};
  root = new Container();
  onHit?: (target: "boss" | "player") => void;

  constructor(private host: HTMLElement, private bossKey: string, private shipKey: string, private color: number, private calm: boolean) {}

  async init() {
    this.app = await createApp(this.host);
    if (this.destroyed) { this.app.destroy(true); return; }
    this.tx = await texs([this.bossKey, this.shipKey, "laserblue01", "laserred01", "laserblue08", "laserred08", "fx_light_01", "fx_spark_04", "fx_star_06",
      "fx_smoke_01", "fx_fire_01", "fx_circle_05", "fx_magic_05", "fx_flare_01", "fx_twirl_02", "fx_scorch_02"]);
    if (this.destroyed) return;
    const { width: w, height: h } = this.app.screen;
    this.stars = new Starfield(w, h, this.calm ? 60 : 140);
    this.app.stage.addChild(this.stars.layer, this.root);
    const aura = new Sprite(this.tx["fx_twirl_02"]);
    aura.anchor.set(0.5); aura.tint = this.color; aura.alpha = 0.35; aura.blendMode = "add"; aura.scale.set(0.9);
    aura.label = "aura";
    this.boss = new Sprite(this.tx[this.bossKey]);
    this.boss.anchor.set(0.5);
    this.boss.scale.set(Math.min(1.25, (w * 0.42) / 200));
    this.boss.rotation = Math.PI; // enemies face down
    if (this.bossKey.startsWith("alien")) this.boss.rotation = 0;
    this.boss.position.set(w / 2, h * 0.28);
    aura.position.copyFrom(this.boss.position);
    this.ship = new Sprite(this.tx[this.shipKey]);
    this.ship.anchor.set(0.5);
    this.ship.scale.set(0.6);
    this.ship.position.set(w / 2, h * 0.82);
    this.root.addChild(aura, this.boss, this.ship, this.shieldG, this.fx.layer);
    // entrance
    this.boss.y = -120;
    this.app.ticker.add((tk) => this.tick(tk.deltaTime));
  }

  fireAtBoss(crit: boolean) {
    if (!this.ship || this.destroyed) return;
    const n = crit ? 3 : 1;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        if (this.destroyed) return;
        const s = new Sprite(this.tx["laserblue01"]);
        s.anchor.set(0.5); s.scale.set(crit ? 0.9 : 0.75); s.blendMode = "add";
        s.position.set(this.ship.x + (i - (n - 1) / 2) * 18, this.ship.y - 30);
        this.root.addChild(s);
        this.shots.push({ s, vy: -22, target: "boss", crit });
        this.fx.burst(this.tx["fx_spark_04"], s.x, s.y, { n: 6, speed: 3, angle: -Math.PI / 2, spread: 1.2, tint: 0x5ee7ff, scale: 0.15, life: 14 });
      }, i * 90);
    }
  }
  bossFires() {
    if (!this.boss || this.destroyed) return;
    for (let i = -1; i <= 1; i++) {
      const s = new Sprite(this.tx["laserred01"]);
      s.anchor.set(0.5); s.scale.set(0.8); s.blendMode = "add"; s.rotation = Math.PI;
      s.position.set(this.boss.x + i * 26, this.boss.y + 50);
      this.root.addChild(s);
      this.shots.push({ s, vy: 14, target: "player", crit: false });
    }
  }
  explodeAt(x: number, y: number, big: boolean, tint = 0xffb547) {
    this.fx.burst(this.tx["fx_fire_01"], x, y, { n: big ? 26 : 12, speed: big ? 7 : 4, tint, scale: big ? 0.5 : 0.3, life: big ? 46 : 26 });
    this.fx.burst(this.tx["fx_spark_04"], x, y, { n: big ? 40 : 14, speed: big ? 11 : 6, tint: 0xffffff, scale: 0.18, life: 30 });
    this.fx.burst(this.tx["fx_circle_05"], x, y, { n: 1, speed: 0, tint, scale: big ? 0.6 : 0.3, life: 22, grow: big ? 0.05 : 0.03 });
    this.shake = Math.max(this.shake, big ? 16 : 6);
  }
  bossDies() {
    if (!this.boss) return;
    this.bossDead = true;
    for (let i = 0; i < 6; i++) setTimeout(() => {
      if (this.destroyed) return;
      this.explodeAt(this.boss.x + (Math.random() - 0.5) * 160, this.boss.y + (Math.random() - 0.5) * 120, i === 5, i % 2 ? this.color : 0xffb547);
    }, i * 160);
    setTimeout(() => { if (!this.destroyed) this.boss.visible = false; }, 900);
  }
  playerDies() {
    if (!this.ship) return;
    this.explodeAt(this.ship.x, this.ship.y, true, 0xff6b8b);
    setTimeout(() => { if (!this.destroyed) this.ship.visible = false; }, 300);
  }
  shieldPulse(shields: number) {
    if (!this.ship || this.destroyed) return;
    const g = this.shieldG;
    g.clear();
    for (let i = 0; i < shields; i++) g.circle(this.ship.x, this.ship.y, 46 + i * 7).stroke({ color: 0x5ee7ff, width: 1.5, alpha: 0.5 - i * 0.12 });
  }

  tick(dt: number) {
    if (this.destroyed) return;
    this.t += dt;
    const { width: w, height: h } = this.app.screen;
    this.stars.update(dt, h, 0, 1.4);
    const aura = this.root.getChildByLabel("aura") as Sprite | null;
    if (!this.bossDead) {
      const ty = h * 0.28;
      this.boss.y += (ty - this.boss.y) * 0.06 * dt;
      this.boss.x = w / 2 + Math.sin(this.t * 0.025) * w * 0.18;
      this.boss.y += Math.sin(this.t * 0.05) * 0.6;
    }
    if (aura) { aura.position.copyFrom(this.boss.position); aura.rotation += 0.01 * dt; aura.visible = this.boss.visible; }
    this.ship.x += (w / 2 + Math.sin(this.t * 0.02 + 1) * w * 0.12 - this.ship.x) * 0.05 * dt;
    this.ship.y = h * 0.82 + Math.sin(this.t * 0.07) * 4;
    if (this.bossFlash > 0) { this.bossFlash -= dt; this.boss.tint = this.bossFlash > 0 ? 0xff8080 : 0xffffff; }
    if (!this.calm && Math.random() < 0.6 * dt) this.fx.burst(this.tx["fx_spark_04"], this.ship.x, this.ship.y + 34, { n: 1, speed: 2, angle: Math.PI / 2, spread: 0.5, tint: 0x5ee7ff, scale: 0.12, life: 18 });
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const sh = this.shots[i];
      sh.s.y += sh.vy * dt;
      if (sh.target === "boss" && sh.s.y <= this.boss.y + 30) {
        this.explodeAt(sh.s.x, this.boss.y + 20, sh.crit, sh.crit ? 0x5ee7ff : 0xffb547);
        this.bossFlash = 8;
        sh.s.destroy(); this.shots.splice(i, 1);
        this.onHit?.("boss");
      } else if (sh.target === "player" && sh.s.y >= this.ship.y - 20) {
        this.explodeAt(sh.s.x, this.ship.y - 20, false, 0xff6b8b);
        sh.s.destroy(); this.shots.splice(i, 1);
        this.onHit?.("player");
      }
    }
    this.fx.update(dt);
    if (this.shake > 0) {
      this.shake *= Math.pow(0.86, dt);
      this.root.x = (Math.random() - 0.5) * this.shake;
      this.root.y = (Math.random() - 0.5) * this.shake;
      if (this.shake < 0.3) { this.shake = 0; this.root.position.set(0, 0); }
    }
  }

  destroy() {
    this.destroyed = true;
    try { this.app?.destroy(true, { children: true }); } catch { /* ignore */ }
  }
}
