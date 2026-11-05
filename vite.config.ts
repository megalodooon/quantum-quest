import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Lets the Pages site install to a phone home screen as a full-screen app.
const homeScreenTags = {
  name: "home-screen-tags",
  transformIndexHtml: () =>
    [
      ["link", { rel: "manifest", href: "./manifest.webmanifest" }],
      ["link", { rel: "apple-touch-icon", href: "./icons/apple-touch-icon.png" }],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      ["meta", { name: "mobile-web-app-capable", content: "yes" }],
      ["meta", { name: "apple-mobile-web-app-title", content: "Quantum Quest" }],
      ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],
      ["meta", { name: "theme-color", content: "#0c1330" }],
    ]
      .map(([tag, attrs]) => ({ tag: tag as string, attrs: attrs as Record<string, string>, injectTo: "head" as const }))
      // Clear the notch here; on claude.ai the artifact host already pads the page for it.
      .concat({ tag: "style", attrs: {}, children: ".app { padding-top: env(safe-area-inset-top, 0px); }", injectTo: "head" } as any),
};

// "pages" mode builds a normal multi-file site for GitHub Pages; the default
// build inlines everything into one HTML file for the claude.ai artifact.
export default defineConfig(({ mode }) => ({
  base: "./",
  publicDir: mode === "pages" ? "public" : false,
  plugins: mode === "pages" ? [react(), homeScreenTags] : [react(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    target: "es2020",
    assetsInlineLimit: mode === "pages" ? 4096 : 100_000_000,
    chunkSizeWarningLimit: 8000,
    outDir: mode === "pages" ? "dist-pages" : "dist",
  },
}));
