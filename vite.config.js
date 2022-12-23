import { sveltekit } from '@sveltejs/kit/vite';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true
	},
	plugins: [sveltekit()],
	resolve: {},
	optimizeDeps: {
		exclude: ['svelte-navigator'],
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			},
			// Enable esbuild polyfill plugins
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true
				})
			]
		}
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			plugins: [
				// Enable rollup polyfills plugin
				// used during production bundling
				rollupNodePolyFill()
			]
		}
	}
});
