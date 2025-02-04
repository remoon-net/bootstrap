<script lang="ts" module>
	export const key = Symbol('snackbar')
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'

	export interface Item {
		id?: string
		msg: string
		role?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
	}

	export function getSnackbarShow(): (item: Item) => void {
		return getContext(key)
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte'
	import { SvelteMap } from 'svelte/reactivity'

	const toasts = new SvelteMap<string, Item>()

	function showSnackbar(item: Item) {
		let id: string = item.id || uuidv4()
		while (toasts.has(id)) {
			id = uuidv4()
		}
		if (toasts.size >= 3) {
			let item = toasts.keys().next()
			toasts.delete(item.value!)
		}
		toasts.set(id, item)
	}
	setContext(key, showSnackbar)

	import { blur, fly, scale } from 'svelte/transition'
</script>

<slot></slot>
<div class="toast-container top-0 start-50 translate-middle-x mt-5 position-fixed">
	{#each Array.from(toasts).reverse() as [k, item] (k)}
		<div
			class="toast text-center show"
			class:text-bg-primary={item.role === 'primary'}
			class:text-bg-success={item.role === 'success'}
			class:text-bg-danger={item.role === 'danger'}
			class:text-bg-warning={item.role === 'warning'}
			class:text-bg-info={item.role === 'info'}
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			in:blur
			out:fly={{ y: 50 }}
			onintroend={() => setTimeout(() => toasts.delete(k), 2000)}
		>
			<div class="toast-body">{item.msg}</div>
		</div>
	{/each}
</div>
