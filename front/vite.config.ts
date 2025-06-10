import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // https://vitejs.dev/config/
    base: "/",
    plugins: [react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
});
