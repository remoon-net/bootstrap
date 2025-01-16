<script lang="ts">
	import { offcanvas } from '../lib/actions/offcanvas.js'
	const {} = $props()
	import LongBody from '../lib/LongBody.svelte'
</script>

<!-- <div class="header-placeholder" style="height: {56}px;"></div> -->
<header class="border-bottom">
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container">
			<a class="navbar-brand" href="#">
				<img
					src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
					alt="Logo"
					width="30"
					height="24"
					class="d-inline-block align-text-top"
				/>
				Bootstrap
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<i class="bi bi-three-dots"></i>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Features</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Pricing</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" aria-disabled="true">Disabled</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 99;
	}
</style>
