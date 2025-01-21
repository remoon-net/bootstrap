<script lang="ts" module>
	const key = Symbol('alert')
	export function getPrompt() {
		return getContext(key) as (msg: string, _defalut?: string) => Promise<boolean>
	}
</script>

<script lang="ts">
	import { Modal } from 'bootstrap'
	import { modal } from './actions/modal.js'
	import { getContext, setContext } from 'svelte'
	let root = $state<HTMLElement>()
	let promptInput = $state<HTMLElement>()
	let message = $state('')
	let value = $state('')
	let confirm: (v: string) => void
	async function show(msg: string, _default = '') {
		message = msg
		value = _default
		let animation = new Promise<void>((rl) => {
			Modal.getOrCreateInstance(root!).show()
			root!.addEventListener('hidden.bs.modal', () => rl(), { once: true })
		})
		let p = new Promise<string | null>((rl) => {
			confirm = rl
			animation.finally(() => rl(null))
		}).finally(() => {
			Modal.getOrCreateInstance(root!).hide()
		})
		// 等待动画完成后再返回
		return Promise.all([p, animation]).then(([v]) => v)
	}
	setContext(key, show)
</script>

<form
	onsubmit={(e) => {
		e.preventDefault()
		confirm(value)
	}}
>
	<div
		class="modal"
		id="proompt-modal"
		tabindex="-1"
		bind:this={root}
		use:modal
		aria-labelledby="alert-modal"
		aria-hidden="true"
		onshown.bs.modal={() => {
			promptInput!.focus()
		}}
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">输入框</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<div class="">
						<!-- <label for="prompt-input" class="form-label">{message}</label> -->
						<input
							bind:this={promptInput}
							name="link"
							id="prompt-input"
							class="form-control"
							bind:value
						/>
						<div class="form-text">{message}</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
					<button type="submit" class="btn btn-primary">确认</button>
				</div>
			</div>
		</div>
	</div>
</form>
<slot></slot>

<style>
	.modal {
		z-index: 1090;
	}
</style>
