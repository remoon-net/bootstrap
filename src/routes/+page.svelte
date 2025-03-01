<script lang="ts">
	import Select from '$lib/Select.svelte'
	import { modal } from '$lib/actions/modal.js'
	let values = $state(['2'])

	import { getSnackbarShow } from '$lib/Snackbar.svelte'
	const showSnackbar = getSnackbarShow()
	let count = $state(0)

	import TopHeader from './top-header.svelte'
	import LongBody from '$lib/LongBody.svelte'
	import { getAlert } from '$lib/Alert.svelte'
	import { getPrompt } from '$lib/Prompt.svelte'
	import { getConfirm } from '$lib/Confirm.svelte'
	const alert = getAlert()
	const prompt = getPrompt()
	const confirm = getConfirm()
</script>

<TopHeader></TopHeader>

{#snippet btns()}
	<button
		type="button"
		class="btn btn-outline-primary"
		onclick={() => {
			let c = count++
			let role = undefined
			if (false) {
			} else if (0 === c % 6) {
				role = 'primary'
			} else if (0 === c % 5) {
				role = 'success'
			} else if (0 === c % 4) {
				role = 'danger'
			} else if (0 === c % 3) {
				role = 'warning'
			} else if (0 === c % 2) {
				role = 'info'
			}
			// @ts-ignore
			showSnackbar({ msg: `hello world ${c}`, role: role })
		}}
	>
		show snackbar
	</button>
	<button
		type="button"
		class="btn btn-outline-primary"
		onclick={() => {
			alert('hello world')
		}}
	>
		alert
	</button>
	<button
		type="button"
		class="btn btn-outline-primary"
		onclick={() => {
			Promise.resolve(confirm('hello world')).then((c) => {
				alert(`你选择了${c}`)
			})
		}}
	>
		confirm
	</button>
	<button
		type="button"
		class="btn btn-outline-primary"
		onclick={() => {
			Promise.resolve(prompt('提示词提示词', '默认值默认值')).then((c) => {
				if (c === null) {
					return
				}
				alert(`你输入了: "${c}"`)
			})
		}}
	>
		prompt
	</button>
{/snippet}

<div class="container my-4">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
	<div class="my-3">
		<Select options={['1', '2', '3', '4']} bind:values></Select>
	</div>
	<div class="my-3">
		<Select
			options={[
				{ name: 'one', value: '1' },
				{ name: 'two', value: '2' },
				{ name: 'three', value: '3' },
				{ name: 'four', value: '4' },
			]}
			bind:values
		></Select>
	</div>
	<div class="my-3">
		<Select options={['1', '2', '3', '4']} bind:values expand></Select>
	</div>
	<a href="#modal" class="btn btn-outline-primary" data-bs-toggle="modal">modal in modal</a>
	{@render btns()}
	<div>
		<LongBody></LongBody>
	</div>
</div>

<div class="modal fade" id="modal" tabindex="-1" use:modal>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">modal title</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div>
					{@render btns()}
				</div>
				<LongBody></LongBody>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
			</div>
		</div>
	</div>
</div>
