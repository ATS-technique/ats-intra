import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // https://vitejs.dev/config/
  return {
    plugins: [react()],
    server: {
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 4000,
    },
    build: {
      outDir: "../dist",
    },
  };
});
