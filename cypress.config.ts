import { defineConfig } from 'cypress';

export default defineConfig({
	// setupNodeEvents can be defined in either
	// the e2e or component configuration
	e2e: {
		supportFile: false,
		setupNodeEvents(on, config) {
			// configure plugins here
		},
		baseUrl: 'http://localhost:5173',
		video: false
	},
	env: {
		SERVER_URL: 'http://localhost:8080'
	}
});
