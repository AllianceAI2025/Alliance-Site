import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is "/" because the site is served from the root of a custom domain
// (myalliance.ai). If you ever host at user.github.io/repo-name instead,
// change this to "/repo-name/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
