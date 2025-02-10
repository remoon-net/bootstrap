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
					// 修复 scss 在 vite 6.0 导入出错的问题
					if (source.endsWith('ss')) {
						return
					}
					// @ts-ignore
					if (options.ssr && !source.endsWith('.scss')) {
						return faker
					}
				},
			},
		],
	},
})
