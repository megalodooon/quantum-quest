import { useEffect, useState } from "react";
import { img } from "../assets";
import { play } from "../audio";

export function go(hash: string) {
  play("tap", { volume: 0.4 });
  if (location.hash.slice(1) === hash) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else location.hash = hash;
}
export function useHash() {
  const [h, setH] = useState(() => location.hash.slice(1));
  useEffect(() => {
    const f = () => setH(location.hash.slice(1));
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return h;
}

export function Ring({ frac, size = 56, stroke = 4, color = "var(--accent)", track = "var(--line)" }: { frac: number; size?: number; stroke?: number; color?: string; track?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} opacity={0.6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${c * Math.min(1, frac)} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.9,.2,1)", filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

export const Quanta = ({ n }: { n: number | string }) => (
  <span className="price"><img src={img("powerupyellow_star")} alt="" />{typeof n === "number" ? n.toLocaleString() : n}</span>
);

export function Back({ to, label }: { to: string; label: string }) {
  return <button className="backlink" onClick={() => go(to)}>← {label}</button>;
}

const LINES = {
  idle: ["Ready when you are.", "Every expert started at 0.1.", "Small steps, big quanta.", "Your future self says thanks."],
  happy: ["Nailed it!", "That's how it's done.", "Clean!", "Coherent and correct."],
  sad: ["Close one. Let's look at why.", "Mistakes are just data.", "Tunnel through it."],
};
export function Mascot({ mood = "idle", text }: { mood?: "idle" | "happy" | "sad"; text?: string }) {
  const [line] = useState(() => LINES[mood][Math.floor(Math.random() * LINES[mood].length)]);
  const bot = mood === "sad" ? "toon_robot_hurt" : mood === "happy" ? "toon_robot_cheer0" : "toon_robot_think";
  const emote = mood === "sad" ? "emote_swirl" : mood === "happy" ? "emote_star" : "emote_idea";
  return (
    <div className="mascot">
      <img className="bot" src={img(bot)} alt="" />
      <div className="bubble"><img src={img(emote)} alt="" />{text ?? line}</div>
    </div>
  );
}

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button className={"switch" + (on ? " on" : "")} role="switch" aria-checked={on} aria-label={label} onClick={() => { play("select", { volume: 0.5 }); onChange(!on); }} />;
}
