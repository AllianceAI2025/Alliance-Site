import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// base "/" because the site serves from the root of a custom domain.
// If hosting at user.github.io/repo-name instead, change to "/repo-name/".
// Multi-page build: corporate landing, product, walkthrough, and security.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        allianceOne: fileURLToPath(new URL("./allianceone/index.html", import.meta.url)),
        platform: fileURLToPath(new URL("./platform/index.html", import.meta.url)),
        company: fileURLToPath(new URL("./company/index.html", import.meta.url)),
        howItWorks: fileURLToPath(new URL("./how-it-works/index.html", import.meta.url)),
        security: fileURLToPath(new URL("./security/index.html", import.meta.url)),
      },
    },
  },
  server: {
    port: 5176,
    strictPort: true,
  },
});
