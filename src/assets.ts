// Every Kenney asset, imported as a URL (inlined as data URIs in the single-file build).
const imgs = import.meta.glob("./assets/img/*.png", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const snds = import.meta.glob("./assets/snd/*.mp3", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export const IMG: Record<string, string> = {};
for (const [k, v] of Object.entries(imgs)) IMG[k.split("/").pop()!.replace(".png", "")] = v;
export const SND: Record<string, string> = {};
for (const [k, v] of Object.entries(snds)) SND[k.split("/").pop()!.replace(".mp3", "")] = v;

export const img = (k: string) => IMG[k] ?? IMG["star1"];

export const ENEMIES = [
  "enemy_black1", "enemy_blue2", "enemy_green3", "enemy_red4", "alien_beige",
  "enemy_black2", "enemy_blue3", "enemy_green4", "enemy_red5", "alien_blue",
  "enemy_black3", "enemy_blue4", "enemy_green5", "enemy_red1", "alien_green",
  "enemy_black4", "enemy_blue5", "enemy_green1", "enemy_red2", "alien_pink",
  "enemy_black5", "enemy_blue1", "enemy_green2", "enemy_red3", "alien_yellow",
];
