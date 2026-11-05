import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { img } from "../assets";
import { buzz, play } from "../audio";
import { ACHIEVEMENTS, rankIcon, titleFor } from "../game/rules";
import { getState, onFX } from "../game/store";

type Toast = { id: number; text: string; icon?: string; tone?: string };
let seq = 0;

export function burstConfetti(power = 1) {
  if (getState().settings.calm) return;
  const colors = ["#5ee7ff", "#7aa2ff", "#ffbf5a", "#59f0a7", "#c39bff"];
  confetti({ particleCount: Math.round(70 * power), angle: 60, spread: 65, origin: { x: 0, y: 0.75 }, colors, disableForReducedMotion: true });
  confetti({ particleCount: Math.round(70 * power), angle: 120, spread: 65, origin: { x: 1, y: 0.75 }, colors, disableForReducedMotion: true });
}

/** Fly a glowing orb from a point to the XP bar. */
export function flyOrbs(from: { x: number; y: number }, count = 6) {
  if (getState().settings.calm) return;
  const target = document.querySelector(".hud .bar")?.getBoundingClientRect();
  if (!target) return;
  for (let i = 0; i < count; i++) {
    const o = document.createElement("div");
    o.className = "orb";
    document.body.appendChild(o);
    const tx = target.left + target.width * (0.3 + Math.random() * 0.5), ty = target.top + target.height / 2;
    const mx = from.x + (Math.random() - 0.5) * 160, my = from.y - 80 - Math.random() * 80;
    const anim = o.animate(
      [
        { transform: `translate(${from.x}px, ${from.y}px) scale(.4)`, opacity: 0 },
        { transform: `translate(${mx}px, ${my}px) scale(1.2)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${tx}px, ${ty}px) scale(.6)`, opacity: 0.9 },
      ],
      { duration: 650 + i * 70, easing: "cubic-bezier(.5,0,.2,1)" }
    );
    anim.onfinish = () => {
      o.remove();
      if (i === count - 1) {
        const bar = document.querySelector(".hud .bar");
        bar?.classList.remove("pulse"); void (bar as HTMLElement)?.offsetWidth; bar?.classList.add("pulse");
        play("tick", { rate: 1.4, volume: 0.4 });
      }
    };
  }
}

export function FXLayer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [level, setLevel] = useState<number | null>(null);
  const lastPoint = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const track = (e: PointerEvent) => (lastPoint.current = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointerdown", track);
    const push = (t: Omit<Toast, "id">, ms = 2600) => {
      const id = ++seq;
      setToasts((ts) => [...ts.slice(-3), { ...t, id }]);
      setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), ms);
    };
    const off = onFX((e) => {
      if (e.type === "xp") {
        flyOrbs(lastPoint.current, Math.min(10, 3 + Math.floor(e.amount / 10)));
        const f = document.createElement("div");
        f.className = "floater";
        f.textContent = `+${e.amount} XP`;
        document.body.appendChild(f);
        const { x, y } = lastPoint.current;
        f.animate([{ transform: `translate(${x - 30}px, ${y - 20}px)`, opacity: 1 }, { transform: `translate(${x - 30}px, ${y - 90}px)`, opacity: 0 }], { duration: 1000, easing: "ease-out" }).onfinish = () => f.remove();
      } else if (e.type === "quanta") {
        play("coin", { volume: 0.5 });
        document.querySelector(".chip.q")?.classList.remove("pop");
        setTimeout(() => document.querySelector(".chip.q")?.classList.add("pop"), 10);
      } else if (e.type === "level") {
        setTimeout(() => { setLevel(e.level); play("jingle_level"); setTimeout(() => play("vo_level_up"), 700); buzz([40, 60, 40, 60, 120]); burstConfetti(1.2); }, 500);
      } else if (e.type === "ach") {
        const a = ACHIEVEMENTS.find((x) => x.id === e.id);
        if (a) { setTimeout(() => { push({ text: `Badge unlocked: ${a.name}`, icon: `medal${a.medal}`, tone: "good" }, 3600); play("bell", { volume: 0.5 }); }, 900); }
      } else if (e.type === "quest") {
        setTimeout(() => { push({ text: `Quest complete: ${e.text}. Claim it on Today.`, icon: "powerupyellow_star", tone: "good" }, 3600); play("power", { volume: 0.5 }); }, 400);
      } else if (e.type === "toast") {
        push({ text: e.text, tone: e.tone });
      }
    });
    return () => { off(); window.removeEventListener("pointerdown", track); };
  }, []);

  return (
    <>
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={"toast " + (t.tone ?? "")}>{t.icon && <img src={img(t.icon)} alt="" />}<span>{t.text}</span></div>
        ))}
      </div>
      {level !== null && (
        <div className="overlay" onClick={() => setLevel(null)}>
          <div className="modal panel glow" style={{ position: "relative", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div className="rays" />
            <div className="eyebrow">Level up</div>
            <img src={img(rankIcon(level))} alt="" style={{ width: 72, height: 72 }} />
            <div className="lvlnum">{level}</div>
            <h2>{titleFor(level)}</h2>
            <p className="dim" style={{ margin: 0 }}>+40 quanta for levelling up.</p>
            <button className="btn wide" onClick={() => { play("close"); setLevel(null); }}>Keep going</button>
          </div>
        </div>
      )}
    </>
  );
}
