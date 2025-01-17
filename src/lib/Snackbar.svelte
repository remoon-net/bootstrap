<script lang="ts" module>
	export const key = Symbol('snackbar')
	import { getContext } from 'svelte'
	import { v4 as uuidv4 } from 'uuid'

	export interface Item {
		id?: string
		msg: string
		role?: string
	}

	export function getSnackbarShow() {
		const toasts: SvelteMap<string, Item> = getContext(key)
		return (item: Item) => {
			// @ts-ignore
			let id: string = item.id
			if (!id) {
				for (const _ of [1, 2, 3]) {
					let nid = uuidv4()
					if (toasts.has(nid)) {
						continue
					}
					id = nid
				}
			}
			if (toasts.size >= 3) {
				let item = toasts.keys().next()
				toasts.delete(item.value!)
			}
			toasts.set(id, item)
		}
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte'
	import { SvelteMap } from 'svelte/reactivity'

	const toasts = new SvelteMap<string, Item>()

	setContext(key, toasts)

	import { blur, fly, scale } from 'svelte/transition'
</script>

<div class="toast-container top-0 start-50 translate-middle-x mt-5 position-fixed">
	{#each Array.from(toasts).reverse() as [k, item] (k)}
		<div
			class="toast text-center show"
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
<slot></slot>
