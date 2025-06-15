<script lang="ts">
	import Pagination, { toPagination } from '$lib/Pagination.svelte'

	import { page } from '$app/state'

	function makePagination(count: number, perPage: number) {
		let p = {
			page: Number(page.params.page ?? 0),
			perPage: perPage,
			totalItems: count,
			totalPages: Math.ceil(count / perPage),
		}
		return p
	}

	let p1c = 129
	let p1 = $derived(makePagination(p1c, 12))

	let p2c = 329
	let p2 = $derived(makePagination(p2c, 12))

	let p3c = 25
	let p3 = $derived(makePagination(p3c, 12))
</script>

<div class="container my-3 text-center">
	<div class="mb-2">{p1c}</div>
	<Pagination pagination={toPagination(p1)} role="params" />
</div>

<div class="container my-3 text-center">
	<div class="mb-2">{p2c}</div>
	<Pagination pagination={toPagination(p2)} role="params" />
</div>

<div class="container my-3 text-center">
	<div class="mb-2">{p3c}</div>
	<Pagination pagination={toPagination(p3)} role="params" />
</div>
