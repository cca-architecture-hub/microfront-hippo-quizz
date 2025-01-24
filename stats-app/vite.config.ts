import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      federation({
        name: "questionsApp",
        filename: "remoteEntry.js",
        exposes: {
          "./StatsApp": "./src/App.tsx",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext",
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
  };
});
