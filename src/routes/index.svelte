<script>
	import AlertModal from '$lib/components/AlertModal.svelte';
	import Teams from '../lib/components/Teams.svelte';
</script>

<main>
	<Teams />
	<AlertModal />
</main>

<style>
	main {
		background-color: #1e1e24;
		margin: 0px;
		display: flex;
		justify-content: center;
	}
</style>
