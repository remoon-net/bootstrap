<script lang="ts">
	import Select from '$lib/Select.svelte'
	let values = $state(['2'])
</script>

<div class="container">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
	<Select options={['1', '2', '3', '4']} bind:values></Select>
</div>
