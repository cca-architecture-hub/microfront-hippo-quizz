/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const URL_RANKING_APP = env.VITE_URL_RANKING_APP;
  const URL_QUESTIONS_APP = env.VITE_URL_QUESTIONS_APP;
  const URL_STATS_APP = env.VITE_URL_STATS_APP;
  return {
    plugins: [
      react(),
      federation({
        name: "quizHostApp",
        remotes: {
          questionsApp: URL_QUESTIONS_APP,
          rankingApp: URL_RANKING_APP,
          statsApp: URL_STATS_APP,
        },
        exposes: {
          "./store": "./src/store",
        },
        shared: ["react", "react-dom", "zustand"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
    },
  };
});