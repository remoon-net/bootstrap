import type { Action } from 'svelte/action'
import { Offcanvas } from 'bootstrap'

type Options = Partial<Offcanvas.Options>

type Events = {
	'onhide.bs.offcanvas': () => any
	'onhidden.bs.offcanvas': () => any
	'onhidePrevented.bs.offcanvas': () => any
	'onshow.bs.offcanvas': () => any
	'onshown.bs.offcanvas': () => any
}

export const offcanvas: Action<HTMLElement, Options | undefined, Events> = function offcanvas(
	node,
	cfg: Options = {},
) {
	let inst = Offcanvas.getOrCreateInstance(node, cfg)
	return {
		update: (cfg) => {},
		destroy: () => {
			inst.dispose()
		},
	}
}
