import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" because the site serves from the root of a custom domain.
// If hosting at user.github.io/repo-name instead, change to "/repo-name/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
