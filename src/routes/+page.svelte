<script lang="ts">
	import Select from '$lib/Select.svelte'
	import { modal } from '$lib/actions/modal.js'
	let values = $state(['2'])
</script>

<div class="container">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
	<div class="my-3">
		<Select options={['1', '2', '3', '4']} bind:values></Select>
	</div>
	<div class="my-3">
		<Select options={['1', '2', '3', '4']} bind:values expand></Select>
	</div>
	<a href="#modal" class="btn btn-outline-primary" data-bs-toggle="modal">modal</a>
</div>

<div class="modal fade" id="modal" tabindex="-1" use:modal>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">modal title</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				modal body
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				end
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
			</div>
		</div>
	</div>
</div>
