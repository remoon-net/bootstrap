<script lang="ts" module>
	const key = Symbol('alert')
	export function getConfirm() {
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
	interface Props {
		ctxKey?: symbol
		hideCancel?: boolean
		title?: string
		id?: string
	}
	let { ctxKey = key, hideCancel = false, title = '确认框', id = 'confirm-modal' }: Props = $props()
	setContext(ctxKey, show)

	let confirmBtn = $state<HTMLElement>()
</script>

<slot></slot>
<div
	class="modal"
	{id}
	tabindex="-1"
	bind:this={root}
	use:modal
	aria-labelledby={id}
	aria-hidden="true"
	onshown.bs.modal={() => {
		confirmBtn?.focus()
	}}
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">{title}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{message}
			</div>
			<div class="modal-footer">
				{#if !hideCancel}
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
				{/if}
				<button
					type="button"
					class="btn btn-primary confirm-btn"
					onclick={() => {
						confirm(true)
					}}
					bind:this={confirmBtn}
				>
					确认
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal {
		z-index: 1090;
		transition-duration: 0.15s;
	}
	.confirm-btn:focus {
		color: var(--bs-btn-hover-color);
		background-color: var(--bs-btn-hover-bg);
		border-color: var(--bs-btn-hover-border-color);
		outline: 0;
		box-shadow: var(--bs-btn-focus-box-shadow);
	}
</style>
