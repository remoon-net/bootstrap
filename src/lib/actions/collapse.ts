import type { Action } from 'svelte/action'
import { Collapse } from '@remoon.net/bootstrap-fork'

type Options = Partial<Collapse.Options>

type Events = {
	'onhide.bs.collapse': () => any
	'onhidden.bs.collapse': () => any
	'onshow.bs.collapse': () => any
	'onshown.bs.collapse': () => any
}

export const collapse: Action<HTMLElement, Options | undefined, Events> = function collapse(
	node,
	cfg: Options = {},
) {
	let inst = Collapse.getOrCreateInstance(node, cfg)
	return {
		update: (cfg) => {},
		destroy: () => {
			inst.dispose()
		},
	}
}
