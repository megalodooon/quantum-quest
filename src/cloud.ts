// Saving progress: browser storage for instant reloads, plus the viewer's private
// claude.ai storage (db capability) so progress follows them across devices.
import { Save, freshSave, getState, replaceState, setPersist } from "./game/store";

const LS_KEY = "quantum-quest-save-v1";
type Cap = any;
const claude = (window as any).claude as { use?: (n: string) => Promise<Cap | null> } | undefined;

let docRef: Cap | null = null;
let writing = false;
let pending: Save | null = null;
let timer: any = null;
export let cloudStatus: "local" | "connecting" | "synced" | "saving" | "offline" = "connecting";
const statusListeners = new Set<() => void>();
export const onCloudStatus = (f: () => void) => { statusListeners.add(f); return () => { statusListeners.delete(f); }; };
function setStatus(s: typeof cloudStatus) { cloudStatus = s; statusListeners.forEach((f) => f()); }

function readLocal(): Save | null {
  try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function writeLocal(s: Save) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
}

async function flush() {
  if (!docRef || writing || !pending) return;
  writing = true;
  const s = pending; pending = null;
  setStatus("saving");
  try {
    await docRef.set({ s: JSON.stringify(s), at: s.updatedAt });
    setStatus("synced");
  } catch {
    setStatus("offline");
  } finally {
    writing = false;
    if (pending) flush();
  }
}

export async function initPersistence() {
  const local = readLocal();
  replaceState(local ?? freshSave());
  setPersist((s) => {
    writeLocal(s);
    pending = s;
    clearTimeout(timer);
    timer = setTimeout(flush, 1500);
  });
  try {
    if (!claude?.use) { setStatus("local"); return; }
    const give = setTimeout(() => setStatus("local"), 10_000);
    const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
    if (!db || !user) { clearTimeout(give); setStatus("local"); return; }
    const me = await user.me();
    if (!me?.id) { clearTimeout(give); setStatus("local"); return; }
    docRef = db.collection("data/users/" + me.id).doc("save");
    const snap = await docRef.get();
    clearTimeout(give);
    const cur = getState();
    if (snap.exists) {
      const remote = JSON.parse(snap.data().s) as Save;
      if ((remote.updatedAt || 0) > (cur.updatedAt || 0)) replaceState(remote);
      else if ((cur.updatedAt || 0) > (remote.updatedAt || 0)) { pending = cur; flush(); }
    } else if (cur.updatedAt) { pending = cur; flush(); }
    setStatus("synced");
  } catch {
    setStatus("local");
  }
}

// ---------- backup files ----------
export async function exportBackup(): Promise<string> {
  const data = JSON.stringify(getState(), null, 1);
  const name = `quantum-quest-backup-${new Date().toISOString().slice(0, 10)}.json`;
  try {
    const dl = await claude?.use?.("downloads");
    if (dl) { await dl.save({ filename: name, data }); return "Backup saved."; }
  } catch (e: any) {
    if (e?.code === "declined" || e?.code === "cancelled") return "Backup cancelled.";
  }
  try {
    await navigator.clipboard.writeText(data);
    return "Downloads aren't available here, so the backup was copied to your clipboard.";
  } catch {
    return "Couldn't save a backup in this view.";
  }
}
export function importBackup(text: string): string {
  try {
    const s = JSON.parse(text);
    if (s?.v !== 1 || typeof s.xp !== "number") return "That file isn't a Quantum Quest backup.";
    s.updatedAt = Date.now();
    replaceState(s);
    writeLocal(s); pending = s; flush();
    return "Backup restored.";
  } catch { return "That file couldn't be read."; }
}

// ---------- the tutor (sample capability) ----------
let samplePromise: Promise<any> | null = null;
export function getSample() {
  if (!samplePromise) samplePromise = claude?.use ? claude.use("sample").catch(() => null) : Promise.resolve(null);
  return samplePromise;
}
