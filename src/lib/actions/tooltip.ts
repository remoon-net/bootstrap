import type { Action } from 'svelte/action'
import { Tooltip } from '@remoon.net/bootstrap-fork'

type Options = Partial<Tooltip.Options>

export const tooltip: Action<HTMLElement, Options | undefined> = function tooltip(
	node,
	cfg: Options = {},
) {
	let inst = Tooltip.getOrCreateInstance(node, cfg)
	return {
		update: (cfg) => {
			// @ts-ignore
			inst.setContent({ '.tooltip-inner': cfg!.title })
		},
		destroy: () => {
			inst.dispose()
		},
	}
}
