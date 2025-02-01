import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'

const faker = path.resolve('./faker.js')

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: 'bootstrap.lo.remoon.net',
	},
	resolve: {
		alias: [
			{
				find: 'bootstrap',
				replacement: path.resolve('./node_modules/bootstrap'),
				customResolver(source, importer, options) {
					if (options.ssr) {
						return faker
					}
				},
			},
		],
	},
})
