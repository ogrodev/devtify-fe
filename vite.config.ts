import { defineConfig } from "vite";
import { VitePWA as pwa } from "vite-plugin-pwa";
import manifest from "./manifest.json";
import react from "@vitejs/plugin-react";
import { dependencies } from "./package.json";

const reactDeps = Object.keys(dependencies).filter((key) => key === "react" || key.startsWith("react-"));
const manualChunks = {
	vendor: reactDeps,
	...Object.keys(dependencies).reduce((chunks, name) => {
		if (!reactDeps.includes(name)) {
			chunks[name] = [name];
		}
		return chunks;
	}, {}),
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		pwa({
			strategies: "injectManifest",
			srcDir: "",
			filename: "service-worker.js",
			manifest,
		}),
	],
	build: {
		sourcemap: true,
		rollupOptions: {
			output: { manualChunks },
		},
	},
});
