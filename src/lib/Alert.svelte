<script lang="ts" module>
	const key = Symbol('alert')
	export function getAlert() {
		return getContext(key) as (msg: string) => Promise<boolean>
	}
</script>

<script lang="ts">
	import { Modal } from 'bootstrap'
	import { modal } from './actions/modal.js'
	import { getContext, setContext } from 'svelte'
	let root = $state<HTMLElement>()
	let message = $state('')
	let confirm: (v: boolean) => void
	async function show(msg: string) {
		message = msg
		let animation = new Promise<void>((rl) => {
			Modal.getOrCreateInstance(root!).show()
			root!.addEventListener('hidden.bs.modal', () => rl(), { once: true })
		})
		let p = new Promise<boolean>((rl) => {
			confirm = rl
			animation.finally(() => rl(false))
		}).finally(() => {
			Modal.getOrCreateInstance(root!).hide()
		})
		// 等待动画完成后再返回
		return Promise.all([p, animation]).then(([v]) => v)
	}
	setContext(key, show)
</script>

<div
	class="modal"
	id="alert-modal"
	tabindex="-1"
	bind:this={root}
	use:modal
	aria-labelledby="alert-modal"
	aria-hidden="true"
	onkeydown={(e) => {
		if (e.key !== 'Enter') {
			return
		}
		confirm(true)
	}}
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">确认框</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{message}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
				<button
					type="button"
					class="btn btn-primary"
					onclick={() => {
						confirm(true)
					}}
				>
					确认
				</button>
			</div>
		</div>
	</div>
</div>
<slot></slot>

<style>
	.modal {
		z-index: 1090;
	}
</style>
