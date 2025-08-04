import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  trailingSlash: "always",
  output: "static",
  site: "https://one-hundread-destination.pages.dev",
  integrations: [sitemap()],
});