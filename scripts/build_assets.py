"""Copy, resize and convert the Kenney CC0 assets the app uses.

Source: assets-src/kenney (a mirror of Kenney's CC0 packs, kenney.nl)
Output: src/assets/img/*.png, src/assets/snd/*.mp3, src/assets/font/*.ttf
"""
import pathlib, shutil, subprocess
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
K = ROOT.parent / "assets-src" / "kenney"
IMG = ROOT / "src" / "assets" / "img"
SND = ROOT / "src" / "assets" / "snd"
FNT = ROOT / "src" / "assets" / "font"
for d in (IMG, SND, FNT):
    shutil.rmtree(d, ignore_errors=True)
    d.mkdir(parents=True)

def img(src, name, max_side=160):
    p = K / src
    im = Image.open(p).convert("RGBA")
    w, h = im.size
    s = min(1.0, max_side / max(w, h))
    if s < 1:
        im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
    im.save(IMG / f"{name}.png", optimize=True)

SS = "spaceshooter/PNG"
for n in (1, 2, 3):
    for c in ("blue", "green", "orange", "red"):
        img(f"{SS}/playerShip{n}_{c}.png", f"ship{n}_{c}", 128)
for c in ("Blue", "Green", "Red", "Yellow"):
    img(f"{SS}/ufo{c}.png", f"ufo_{c.lower()}", 128)
for c in ("Black", "Blue", "Green", "Red"):
    for n in range(1, 6):
        img(f"{SS}/Enemies/enemy{c}{n}.png", f"enemy_{c.lower()}{n}", 200)
for c in ("Beige", "Blue", "Green", "Pink", "Yellow"):
    img(f"alien-ufo-pack/PNG/ship{c}_manned.png", f"alien_{c.lower()}", 200)
for f in ("laserBlue01", "laserRed01", "laserGreen11", "laserBlue08", "laserRed08", "laserGreen14"):
    img(f"{SS}/Lasers/{f}.png", f.lower(), 96)
for f in ("star1", "star2", "star3"):
    img(f"{SS}/Effects/{f}.png", f, 48)
for f in ("meteorBrown_big1", "meteorBrown_big3", "meteorGrey_big2", "meteorGrey_med1", "meteorBrown_small1", "meteorGrey_tiny1"):
    img(f"{SS}/Meteors/{f}.png", f.lower(), 120)
for f in ("powerupBlue_bolt", "powerupGreen_shield", "powerupYellow_star", "powerupRed_star", "pill_blue", "pill_green", "pill_red", "pill_yellow"):
    img(f"{SS}/Power-ups/{f}.png", f.lower(), 64)
PP = "particlePack_1.1/PNG (Transparent)"
for f in ("star_01", "star_04", "star_06", "star_07", "light_01", "light_02", "light_03", "circle_01", "circle_05",
          "spark_01", "spark_04", "spark_05", "flare_01", "magic_01", "magic_03", "magic_05", "smoke_01", "smoke_07",
          "twirl_01", "twirl_02", "trace_01", "fire_01", "scorch_02", "symbol_01", "window_01", "dirt_01", "muzzle_02",
          "slash_02", "flame_02", "scratch_01"):
    img(f"{PP}/{f}.png", "fx_" + f, 128)
for n in range(1, 10):
    img(f"kenneymedals/PNG/shaded_medal{n}.png", f"medal{n}", 96)
for tier in ("Bronze", "Silver", "Gold"):
    for n in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10):
        img(f"kenney_rankspack/PNG/Default size/{tier}/rank{n:03d}.png", f"rank_{tier.lower()}{n}", 64)
for n in range(1, 19):
    p = K / f"kenney_spaceshooterextension/PNG/Sprites/Astronauts/spaceAstronauts_{n:03d}.png"
    if p.exists():
        img(str(p.relative_to(K)), f"astro{n}", 128)
for c in ("blue", "green", "red", "yellow"):
    for pose in ("Body", "Hurt", "Jump"):
        img(f"robot-pack/PNG/Side view/robot_{c}{pose}.png", f"robot_{c}_{pose.lower()}", 128)
for n in (1, 3, 6, 9, 12, 16, 21, 25):
    p = K / f"kenney_spaceshooterextension/PNG/Sprites/Station/spaceStation_{n:03d}.png"
    if p.exists():
        img(str(p.relative_to(K)), f"station{n}", 160)
for n in (1, 2, 3, 4):
    img(f"kenney_spaceshooterextension/PNG/Sprites/Rockets/spaceRockets_{n:03d}.png", f"rocket{n}", 128)
EM = "kenney_emotespack/PNG/Vector/Style 1"
for f in ("emote_heart", "emote_star", "emote_exclamation", "emote_question", "emote_idea", "emote_laugh",
          "emote_sleep", "emote_swirl", "emote_faceHappy", "emote_faceSad", "emote_alert", "emote_music"):
    p = K / EM / f"{f}.png"
    if p.exists():
        img(f"{EM}/{f}.png", f.lower(), 64)

TOON = {"Robot": "robot", "Female adventurer": "femaleAdventurer", "Male adventurer": "maleAdventurer", "Female person": "femalePerson", "Male person": "malePerson", "Zombie": "zombie"}
for folder, slug in TOON.items():
    for pose in ("idle", "cheer0", "hurt", "think", "talk", "jump"):
        img(f"kenney_tooncharacters1/{folder}/PNG/Poses/character_{slug}_{pose}.png", f"toon_{slug.lower()}_{pose}", 160)
for ch in ("adventurer", "female", "player", "soldier", "zombie"):
    folder = ch.capitalize()
    for pose in ("idle", "cheer1", "hurt"):
        img(f"kenney_platformercharacters/PNG/{folder}/Poses/{ch}_{pose}.png", f"plat_{ch}_{pose}", 128)
for ic in ("home", "star", "trophy", "shoppingCart", "singleplayer", "locked", "checkmark", "gear", "medal1", "target", "movie", "question", "warning", "audioOn", "audioOff", "zoom"):
    img(f"gameicons/PNG/White/2x/{ic}.png", f"icon_{ic.lower()}", 64)

shutil.copy(K / "kenney_fontpackage/Fonts/Kenney Future.ttf", FNT / "kenney-future.ttf")

SOUNDS = {
    "tap": "kenney_interfacesounds/Audio/click_002.ogg",
    "tick": "kenney_interfacesounds/Audio/tick_002.ogg",
    "open": "kenney_interfacesounds/Audio/open_002.ogg",
    "close": "kenney_interfacesounds/Audio/close_002.ogg",
    "correct": "kenney_interfacesounds/Audio/confirmation_002.ogg",
    "wrong": "kenney_interfacesounds/Audio/error_004.ogg",
    "flip": "kenney_interfacesounds/Audio/scroll_002.ogg",
    "select": "kenney_interfacesounds/Audio/select_002.ogg",
    "glass": "kenney_interfacesounds/Audio/glass_002.ogg",
    "pluck": "kenney_interfacesounds/Audio/pluck_001.ogg",
    "drop": "kenney_interfacesounds/Audio/drop_002.ogg",
    "laser": "kenney_digitalaudio/Audio/laser4.ogg",
    "zap": "kenney_digitalaudio/Audio/zapThreeToneUp.ogg",
    "power": "kenney_digitalaudio/Audio/powerUp7.ogg",
    "coin": "kenney_digitalaudio/Audio/pepSound2.ogg",
    "phaser": "kenney_digitalaudio/Audio/phaserUp4.ogg",
    "down": "kenney_digitalaudio/Audio/phaserDown2.ogg",
    "combo": "kenney_digitalaudio/Audio/threeTone2.ogg",
    "boom": "kenney_impactsounds/Audio/impactMetal_heavy_003.ogg",
    "hit": "kenney_impactsounds/Audio/impactPunch_heavy_001.ogg",
    "bell": "kenney_impactsounds/Audio/impactBell_heavy_001.ogg",
    "jingle_level": "kenney_musicjingles/Audio/8-bit jingles/jingles_NES09.ogg",
    "jingle_win": "kenney_musicjingles/Audio/8-bit jingles/jingles_NES13.ogg",
    "jingle_lose": "kenney_musicjingles/Audio/8-bit jingles/jingles_NES02.ogg",
    "jingle_topic": "kenney_musicjingles/Audio/Pizzicato jingles/jingles_PIZZI07.ogg",
    "jingle_box": "kenney_musicjingles/Audio/Steel jingles/jingles_STEEL09.ogg",
    "vo_level_up": "kenney_voiceoverpack/Audio/Female/level_up.ogg",
    "vo_win": "kenney_voiceoverpack/Audio/Female/you_win.ogg",
    "vo_mission": "kenney_voiceoverpack/Audio/Female/mission_completed.ogg",
    "vo_ready": "kenney_voiceoverpack/Audio/Female/ready.ogg",
    "vo_go": "kenney_voiceoverpack/Audio/Female/go.ogg",
    "vo_final": "kenney_voiceoverpack/Audio/Female/final_round.ogg",
    "vo_lose": "kenney_voiceoverpack/Audio/Female/mission_failed.ogg",
}
import glob
for name, rel in SOUNDS.items():
    src = K / rel
    if not src.exists():
        hits = glob.glob(str(K / "**" / pathlib.Path(rel).name), recursive=True)
        if not hits:
            print("missing", rel); continue
        src = pathlib.Path(hits[0])
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(src), "-ac", "1", "-b:a", "64k", str(SND / f"{name}.mp3")], check=True)

print(len(list(IMG.iterdir())), "images", len(list(SND.iterdir())), "sounds")
