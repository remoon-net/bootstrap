<script lang="ts">
	import { dropdown } from './index.js'

	const {
		options,
		values = $bindable([]),
		class: className = 'form-control',
		expand = false,
	}: {
		options: ({ value: string; name: string } | string)[]
		values?: string[]
		class?: string
		expand?: boolean
	} = $props()
	let names = $derived.by(() => {
		return options.reduce(
			(t, item) => {
				if (typeof item === 'string') {
					t[item] = item
				} else {
					t[item.value] = item.name
				}
				return t
			},
			{} as { [k: string]: string },
		)
	})
	let displayOptions = $derived.by(() => {
		return options.map((opt) => {
			let value = typeof opt === 'string' ? opt : opt.value
			let name = names[value]
			let selected = values.indexOf(value)
			return {
				name,
				value,
				selected,
			}
		})
	})
</script>

{#snippet menu()}
	<ul class="dropdown-menu w-100" class:expand>
		{#each displayOptions as opt}
			{@const selected = opt.selected !== -1}
			<li>
				<button
					class="dropdown-item"
					class:active={selected}
					onclick={() => {
						if (opt.selected !== -1) {
							values.splice(opt.selected, 1)
						} else {
							values.push(opt.value)
						}
					}}
				>
					{opt.value}
					{#if selected}
						<i class="bi bi-check float-end"></i>
					{/if}
				</button>
			</li>
		{/each}
	</ul>
{/snippet}

{#if expand}
	{@render menu()}
{:else}
	<div class="dropdown">
		<div class={className} data-bs-toggle="dropdown" use:dropdown={{ autoClose: 'outside' }}>
			{#if values.length === 0}
				<button class="btn btn-sm my-1 me-1 btn-outline-secondary"> 请选择 </button>
			{:else}
				{#each values as v}
					<button class="btn btn-sm my-1 me-1 btn-outline-secondary">
						{names[v]}
					</button>
				{/each}
			{/if}
		</div>
		{@render menu()}
	</div>
{/if}

<style>
	.expand {
		position: static;
		display: block;
	}
</style>
