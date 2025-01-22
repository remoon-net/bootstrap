<script lang="ts">
	import Snackbar from '$lib/Snackbar.svelte'
	import Alert from '$lib/Alert.svelte'
	import Prompt from '$lib/Prompt.svelte'
	import Confirm from '$lib/Confirm.svelte'
</script>

<Snackbar>
	<Confirm>
		<Alert>
			<Prompt>
				<slot></slot>
			</Prompt>
		</Alert>
	</Confirm>
</Snackbar>
