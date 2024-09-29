import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [ TanStackRouterVite(), react() ],
	server: {
		port: 3000,
		open: false,
	},
	resolve: {
		alias: {
			"@": path.resolve( __dirname, "./src" ),
		},
	},
} )
