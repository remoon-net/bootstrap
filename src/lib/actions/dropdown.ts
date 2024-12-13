import type { Action } from 'svelte/action'
import { Dropdown } from 'bootstrap'

type Options = Partial<Dropdown.Options>

type Events = {
	'onhide.bs.dropdown': () => any
	'onhidden.bs.dropdown': () => any
	'onshow.bs.dropdown': () => any
	'onshown.bs.dropdown': () => any
}

export const dropdown: Action<HTMLElement, Options | undefined, Events> = function dropdown(
	node,
	cfg: Options = {},
) {
	let inst = Dropdown.getOrCreateInstance(node, cfg)
	return {
		update: (cfg) => {},
		destroy: () => {
			inst.dispose()
		},
	}
}
