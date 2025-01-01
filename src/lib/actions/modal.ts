import type { Action } from 'svelte/action'
import { Modal } from 'bootstrap'

type Options = Partial<Modal.Options>

type Events = {
	'onhide.bs.modal': () => any
	'onhidden.bs.modal': () => any
	'onhidePrevented.bs.modal': () => any
	'onshow.bs.modal': () => any
	'onshown.bs.modal': () => any
}

export const modal: Action<HTMLElement, Options | undefined, Events> = function modal(
	node,
	cfg: Options = {},
) {
	let inst = Modal.getOrCreateInstance(node, cfg)
	if ('#' + node.id === location.hash) {
		inst.show()
	}
	return {
		destroy: () => {
			inst.dispose()
		},
	}
}
