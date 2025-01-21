<script>
	import '../app.scss'
	import Snackbar from '$lib/Snackbar.svelte'
	import Alert from '$lib/Alert.svelte'
	import Prompt from '$lib/Prompt.svelte'
</script>

<Snackbar>
	<Alert>
		<Prompt>
			<slot></slot>
		</Prompt>
	</Alert>
</Snackbar>
