<script lang="ts">
	import { selectedTeam } from './store/store';
	export let toggleModal: () => void;
</script>

<div class="crud-clubs-modal-container">
	<p>Are you sure you want to delete <strong>{$selectedTeam.name}</strong> from the list?</p>
	<div>
		<button class="crud-clubs-btn" on:click={() => {}}>YES</button><button
			class="crud-clubs-btn"
			on:click={toggleModal}>CANCEL</button
		>
	</div>
</div>

<style>
	.crud-clubs-modal-container {
		position: fixed;
		top: 10%;
		background-color: #444140;
		font-family: 'Montserrat';
		border-radius: 15px;
		padding: 20px;
		width: 35%;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}
	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
		font-family: 'Montserrat';
		font-size: 16px;
		padding: 10px;
	}
</style>
