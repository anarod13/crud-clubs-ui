<script lang="ts">
	import type IAlertMessage from '../entities/IAlertMessage';
	import { handleDeleteTeam } from '../application/crudClubs';
	import { selectedTeam, isTeamModalOpen, isAlertModalVisible, alertMessage } from '../store/store';
	export let handleToggleDeleteAlertModal: () => void;

	async function handleDeleteTeamBtn(team: string) {
		try {
			await handleDeleteTeam(team);
			showAlertModal('deletedTeam');
			$isTeamModalOpen = false;
			handleToggleDeleteAlertModal();
		} catch (e) {
			showAlertModal('error');
		}
	}

	function showAlertModal(alert: keyof IAlertMessage) {
		$alertMessage = alert;
		$isAlertModalVisible = !$isAlertModalVisible;
	}
</script>

<div class="crud-clubs-delete-modal-container">
	<p>Are you sure you want to delete <strong>{$selectedTeam}</strong> from the list?</p>
	<div>
		<button
			type="button"
			class="crud-clubs-btn confirm-delete-btn"
			on:click={(e) => {
				e.preventDefault();
				handleDeleteTeamBtn($selectedTeam);
			}}>YES</button
		><button
			type="button"
			class="crud-clubs-btn cancel-delete-btn"
			on:click={() => {
				handleToggleDeleteAlertModal();
			}}>CANCEL</button
		>
	</div>
</div>

<style>
	.crud-clubs-delete-modal-container {
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
		border-radius: 8px;
		margin: 5px;
		cursor: pointer;
		font-family: 'Montserrat';
		font-size: 16px;
		padding: 7px;
	}
	button:hover {
		transition: 0.15s;
		background-color: #9b9694;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	@media (max-width: 720px) {
		.crud-clubs-delete-modal-container {
			text-align: center;
			width: 60%;
		}
	}
</style>
