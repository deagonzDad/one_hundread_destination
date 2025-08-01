import { defineConfig } from "astro/config";
// import { transitions } from "astro:transitions";

export default defineConfig({
  trailingSlash: "always",
  base: "/anell",
  output: "static",
  site: "https://one-hundread-destination.pages.dev",
  // integrations: [transitions()],
});
