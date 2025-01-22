<script lang="ts" module>
	const key = Symbol('alert')
	const confirmKey = Symbol('confirm')
	import { getContext } from 'svelte'
	export function getAlert() {
		return getContext(key) as (msg: string) => Promise<void>
	}
</script>

<script lang="ts">
	import Confirm from './Confirm.svelte'
	import AlertHelper from './alert-helper.svelte'
</script>

<Confirm id={'alert-modal'} ctxKey={confirmKey} hideCancel title="提示框">
	<AlertHelper {key} {confirmKey}>
		<slot></slot>
	</AlertHelper>
</Confirm>
