import type { Num } from "../content";

const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };
const PREFIX: Record<string, number> = { f: 1e-15, p: 1e-12, n: 1e-9, "µ": 1e-6, "μ": 1e-6, u: 1e-6, m: 1e-3, c: 1e-2, k: 1e3, M: 1e6, G: 1e9, T: 1e12 };

export type Parsed = { value: number; unit: string } | null;

/** Read a learner's typed number: 2.43e-12, 2.43×10^-12, 3·10⁹, 5/6, 1,462,727, −4 and an optional unit. */
export function parseInput(raw: string): Parsed {
  let s = raw.trim().replace(/[−–—]/g, "-").replace(/ |\s+/g, " ");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => "^" + m.split("").map((c) => SUP[c]).join(""));
  s = s.replace(/^(about|approx\.?|approximately|roughly|~|≈)\s*/i, "");
  // "x = 7" and "(−1)(−1) = 1" give their final value; "- 8" and "(−8)" are just −8.
  s = (s.split("=").pop() as string).trim().replace(/^\(([^()]*)\)$/, "$1").replace(/^([-+])\s+/, "$1");
  const m = s.match(/^([-+]?(?:\d{1,3}(?:,\d{3})+|\d*)(?:\.\d+)?)\s*(?:(?:[eE]\s*([-+]?\d+))|(?:\s*[x×*·]\s*10\s*\^?\s*\(?\s*([-+]?\d+)\s*\)?))?\s*(?:\/\s*(\d+(?:\.\d+)?))?\s*(.*)$/);
  // a bare power of ten like 10^-3
  const p = s.match(/^10\s*\^\s*\(?\s*([-+]?\d+)\s*\)?\s*(.*)$/);
  if (p) return { value: Math.pow(10, +p[1]), unit: p[2].trim() };
  if (!m || m[1] === "" || m[1] === "-" || m[1] === "+") return null;
  let v = parseFloat(m[1].replace(/,/g, ""));
  if (Number.isNaN(v)) return null;
  const exp = m[2] ?? m[3];
  if (exp !== undefined) v *= Math.pow(10, parseInt(exp, 10));
  if (m[4]) { const d = parseFloat(m[4]); if (!d) return null; v /= d; }
  return { value: v, unit: (m[5] || "").trim() };
}

function unitScale(from: string, to: string): number | null {
  if (!from || !to || from === to) return 1;
  // same base unit with a different SI prefix, e.g. "m" vs "pm", "MeV" vs "GeV"
  const strip = (u: string) => (u.length > 1 && PREFIX[u[0]] !== undefined ? [PREFIX[u[0]], u.slice(1)] : [1, u]) as [number, string];
  const [pf, bf] = strip(from);
  const [pt, bt] = strip(to);
  if (bf === bt) return pf / pt;
  if (bf === to) return 1 / pt;
  if (from === bt) return pf;
  return null;
}

export type Verdict = { ok: boolean; close: boolean; reason?: string; notNumber?: boolean };

export function gradeNumeric(raw: string, num: Num): Verdict {
  const p = parseInput(raw);
  if (!p) return { ok: false, close: false, notNumber: true, reason: "That doesn't look like a number. Try something like 2.4e-12 or 3/4." };
  let v = p.value;
  const scale = p.unit ? unitScale(p.unit, num.unit) : 1;
  if (scale !== null) v *= scale;
  const target = num.value;
  const exactInt = !num.approx && Number.isInteger(target) && Math.abs(target) < 1e6;
  const tol = exactInt ? 1e-9 : Math.max(num.tol, 0.005);
  const err = target === 0 ? Math.abs(v) : Math.abs(v - target) / Math.abs(target);
  if (err <= tol || (target === 0 && Math.abs(v) < 1e-9)) return { ok: true, close: false };
  // common slip detection
  if (target !== 0) {
    const r = v / target;
    if (Math.abs(Math.log10(Math.abs(r)) - Math.round(Math.log10(Math.abs(r)))) < 0.02 && Math.abs(r) > 1.5)
      return { ok: false, close: true, reason: `Right digits, wrong power of ten (off by about 10^${Math.round(Math.log10(Math.abs(r)))}). Check your unit prefixes.` };
    if (Math.abs(r + 1) < 0.01) return { ok: false, close: true, reason: "Right size, wrong sign." };
    if (Math.abs(r - 2 * Math.PI) < 0.05 || Math.abs(r - 1 / (2 * Math.PI)) < 0.01) return { ok: false, close: true, reason: "Off by a factor of 2π. Did you mix up h and ħ, or f and ω?" };
    if (Math.abs(r - 2) < 0.02 || Math.abs(r - 0.5) < 0.01) return { ok: false, close: true, reason: "Off by a factor of 2. Check for a missing ½ or a doubled term." };
    if (!exactInt && err < tol * 4) return { ok: false, close: true, reason: "Very close. Check your rounding or a constant." };
  }
  if (scale === null && p.unit) return { ok: false, close: false, reason: `Give the answer in ${num.unit}.` };
  return { ok: false, close: false };
}
