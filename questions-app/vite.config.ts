import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const URL_HOST_APP = env.VITE_URL_HOST_APP;
  return {
    plugins: [
      react(),
      federation({
        name: "questionsApp",
        filename: "remoteEntry.js",
        exposes: {
          "./QuestionsApp": "./src/App.tsx",
        },
        remotes: {
          store: `${URL_HOST_APP}/assets/remoteEntry.js`,
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
