<script lang="ts">
	interface Props {
		key: symbol
		confirmKey: symbol
	}
	const { key, confirmKey }: Props = $props()
	import { getContext, setContext } from 'svelte'
	const confirm = getContext(confirmKey) as (msg: string) => Promise<boolean>
	async function show(msg: string) {
		return confirm(msg).then((v) => {})
	}
	setContext(key, show)
</script>

<slot></slot>
