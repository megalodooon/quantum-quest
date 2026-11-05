// Saving progress: browser storage for instant reloads, plus the viewer's private
// claude.ai storage (db capability) so progress follows them across devices.
import { useSyncExternalStore } from "react";
import { Save, freshSave, getState, replaceState, setPersist } from "./game/store";

const LS_KEY = "quantum-quest-save-v1";
type Cap = any;
const claude = (window as any).claude as { use?: (n: string) => Promise<Cap | null> } | undefined;
export const inClaude = !!claude?.use;

let saveDoc: Cap | null = null; // the cloud save, once we know where it is
let docRef: Cap | null = null; // set only after that save has been read, so an unread save is never overwritten
let writing = false;
let syncing = false;
let pending: Save | null = null;
let timer: any = null;
export let cloudStatus: "local" | "connecting" | "synced" | "saving" | "offline" = "connecting";
const statusListeners = new Set<() => void>();
export const onCloudStatus = (f: () => void) => { statusListeners.add(f); return () => { statusListeners.delete(f); }; };
function setStatus(s: typeof cloudStatus) { cloudStatus = s; statusListeners.forEach((f) => f()); }
export const useCloudStatus = () => useSyncExternalStore(onCloudStatus, () => cloudStatus);

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
  let failed = false;
  setStatus("saving");
  try {
    await docRef.set({ s: JSON.stringify(s), at: s.updatedAt });
    setStatus("synced");
  } catch {
    failed = true;
    pending = pending ?? s; // keep it: the next action, or coming back to the page, tries again
    setStatus("offline");
  } finally {
    writing = false;
    if (pending && !failed) flush();
  }
}

/** When two saves differ, keep the one with more progress; XP only ever goes up. */
const keepRemote = (remote: Save, cur: Save) =>
  (remote.xp || 0) !== (cur.xp || 0) ? (remote.xp || 0) > (cur.xp || 0) : (remote.updatedAt || 0) > (cur.updatedAt || 0);

/** Read the cloud save and settle it against this browser's copy. */
async function sync() {
  if (!saveDoc || syncing) return;
  syncing = true;
  try {
    const snap = await saveDoc.get();
    let remote: Save | null = null;
    if (snap.exists) { try { remote = JSON.parse(snap.data().s); } catch { /* unreadable: this copy replaces it */ } }
    docRef = saveDoc;
    const cur = getState();
    if (remote && keepRemote(remote, cur)) {
      pending = null; clearTimeout(timer);
      replaceState(remote);
      writeLocal(getState());
    } else if (pending || (cur.updatedAt && cur.updatedAt !== remote?.updatedAt)) {
      pending = cur;
      flush();
    }
    if (!writing) setStatus("synced");
  } catch {
    setStatus("offline");
  } finally {
    syncing = false;
  }
}

export const retrySync = () => { setStatus("connecting"); sync(); };

export async function initPersistence() {
  const local = readLocal();
  replaceState(local ?? freshSave());
  setPersist((s) => {
    writeLocal(s);
    pending = s;
    clearTimeout(timer);
    timer = setTimeout(flush, 1500);
  });
  // Don't lose the last moves when the page is closed; catch up when it comes back.
  const flushNow = () => { clearTimeout(timer); flush(); };
  const catchUp = () => { if (!docRef || !pending) sync(); else flushNow(); };
  document.addEventListener("visibilitychange", () => { if (document.hidden) flushNow(); else catchUp(); });
  window.addEventListener("pagehide", flushNow);
  window.addEventListener("online", catchUp);
  try {
    if (!claude?.use) { setStatus("local"); return; }
    const give = setTimeout(() => { if (cloudStatus === "connecting") setStatus("local"); }, 10_000);
    const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
    const me = db && user ? await user.me() : null;
    if (me?.id) {
      saveDoc = db.collection("data/users/" + me.id).doc("save");
      await sync();
    } else setStatus("local");
    clearTimeout(give);
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
