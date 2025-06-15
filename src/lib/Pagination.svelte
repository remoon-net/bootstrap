<script lang="ts" module>
	export interface Pagination {
		page: number
		perPage: number
		totalItems: number
		totalPages: number
	}
	export function toPagination(a: Pagination): Pagination {
		let p: Pagination = {
			page: a.page,
			perPage: a.perPage,
			totalItems: a.totalItems,
			totalPages: Math.max(1, a.totalPages),
		}
		if (p.page === 0) {
			p.page = p.totalPages
		}
		return p
	}
	function makePages(current: number, end: number, cap: number) {
		current = Math.max(current, 1)
		end = Math.max(end, 1)
		let pages: number[] = []
		for (let index = current - cap; index < current + cap; index++) {
			pages.push(index)
		}
		pages = pages.filter((i) => i > 0).filter((i) => i <= end)
		pages = pages.sort((a, b) => {
			return Math.abs(a - current) - Math.abs(b - current)
		})
		pages = pages.slice(0, cap).sort((a, b) => -(a - b))
		return pages
	}

	export const trailingSlashKey = Symbol('trailingSlash')
</script>

<script lang="ts">
	interface Props {
		pagination: Pagination
		role?: 'query' | 'params'
		disabled?: boolean
	}
	const { pagination, role = 'params', disabled = false }: Props = $props()

	import { getContext } from 'svelte'
	import { page } from '$app/state'
	import { resolveRoute } from '$app/paths'
	import { tooltip } from './actions/tooltip.js'
	let trailingSlash = !!getContext('trailingSlashKey')
	let pageLink = $derived.by(() => {
		return (p: number) => {
			if (p === pagination.totalPages) {
				p = 0
			}
			if (role === 'query') {
				let u = new URL(page.url)
				u.searchParams.set('page', p.toString())
				u.hash = 'page-nav'
				let link = u.toString()
				return link
			}
			let params = { ...page.params }
			params.page = p.toString()
			let link = resolveRoute(page.route.id!, params)
			return link + (trailingSlash ? '/#page-nav' : '#page-nav')
		}
	})
	let pages = $derived(makePages(pagination.page, pagination.totalPages, 6))
	let prevPerPage = $derived(pages[0] + 1)
	let nextPerPage = $derived(pages.slice(-1)[0] - 1)
</script>

<nav aria-label="页面导航" class="mx-auto">
	<ul class="pagination justify-content-center">
		<li class="page-item">
			<a class="page-link" href={pageLink(0)} class:disabled use:tooltip title="最新页">«</a>
		</li>
		<li class="page-item">
			<a
				class="page-link"
				class:disabled={prevPerPage > pagination.totalPages || disabled}
				href={pageLink(prevPerPage)}
				use:tooltip={{ title: `第${prevPerPage}页` }}
			>
				‹
			</a>
		</li>
		{#each pages as p}
			<li class="page-item">
				<a
					class="page-link"
					class:disabled
					class:active={p === pagination.page}
					href={pageLink(p)}
					use:tooltip={{ title: `第${p}页` }}
				>
					{p}
				</a>
			</li>
		{/each}
		<li class="page-item">
			<a
				class="page-link"
				class:disabled={nextPerPage <= 0 || disabled}
				href={pageLink(nextPerPage)}
				use:tooltip={{ title: `第${nextPerPage}页` }}
			>
				›
			</a>
		</li>
		<li class="page-item">
			<a
				class="page-link"
				class:disabled={pagination.page == 1 || disabled}
				href={pageLink(1)}
				use:tooltip={{ title: `第1页` }}
			>
				»
			</a>
		</li>
	</ul>
</nav>
