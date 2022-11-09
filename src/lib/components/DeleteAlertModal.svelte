<script lang="ts">
	import { handleDeleteTeam } from '../application/crudClubs';
	import { selectedTeam, isTeamModalOpen } from '../store/store';
	export let handleToggleDeleteAlertModal: () => void;

	async function handleDeleteTeamBtn(team: string) {
		await handleDeleteTeam(team);
		$isTeamModalOpen = false;
		handleToggleDeleteAlertModal();
	}
</script>

<div class="crud-clubs-modal-container">
	<p>Are you sure you want to delete <strong>{$selectedTeam}</strong> from the list?</p>
	<div>
		<button
			type="button"
			class="crud-clubs-btn"
			on:click={(e) => {
				e.preventDefault();
				handleDeleteTeamBtn($selectedTeam);
			}}>YES</button
		><button
			type="button"
			class="crud-clubs-btn"
			on:click={() => {
				handleToggleDeleteAlertModal();
			}}>CANCEL</button
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
		color: #f7ebe8;
		cursor: pointer;
		font-family: 'Montserrat';
		font-size: 16px;
		padding: 10px;
	}
</style>
