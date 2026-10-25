// @ts-check

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { fontless } from "fontless";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss(), fontless()],
	},

	integrations: [react()],
	site: "https://sachin-sankar.github.io",
});
