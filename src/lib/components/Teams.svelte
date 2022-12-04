<script lang="ts">
	import {
		selectedTeam,
		isTeamModalOpen,
		editableTeam,
		newTeam,
		isDeleteAlertModalOpen,
		listedTeams
	} from '../store/store';
	import DeleteAlertModal from './DeleteAlertModal.svelte';
	import TeamModal from './TeamModal.svelte';
	import { getTeams, updateTeamsList } from '../application/crudClubs';
	import refreshIcon from '../../assets/bx-refresh.png';
	import footballIcon from '../../assets/bx-football.png';
	import editIcon from '../../assets/bx-edit.png';
	import deleteIcon from '../../assets/bx-trash.png';

	$listedTeams = getTeams();

	function handleToggleDeleteAlertModal(): void {
		$isDeleteAlertModalOpen = !$isDeleteAlertModalOpen;
		$listedTeams = getTeams();
	}
	function showTeamModal(team: string | null) {
		if (team) $selectedTeam = team;
		$isTeamModalOpen = true;
	}
	function handleAddTeam() {
		$editableTeam = true;
		$newTeam = true;
		showTeamModal(null);
	}
	function handleSeeTeam(team: string) {
		$editableTeam = false;
		$newTeam = false;
		showTeamModal(team);
	}
	function handleUpdateTeam(team: string) {
		$editableTeam = true;
		showTeamModal(team);
		$newTeam = false;
	}

	async function handleDelete(team: string) {
		$selectedTeam = team;
		$isDeleteAlertModalOpen = true;
	}

	async function handleUpdateListedTeams() {
		await updateTeamsList();
		$listedTeams = getTeams();
	}
</script>

<main>
	<h1 class="crud-clubs-title">Premier League</h1>
	{#await $listedTeams}
		<p>Loading...</p>
	{:then teams}
		<div class="crud-clubs-team-info">
			<p>Currently you have {teams.length} teams listed</p>
			<div class="crud-clubs-btn-container">
				<button
					type="button"
					class="crud-clubs-btn add-team-btn"
					on:click={() => {
						handleAddTeam();
					}}>Add Team</button
				><button
					type="button"
					class="crud-clubs-btn refresh-btn"
					on:click={() => {
						handleUpdateListedTeams();
					}}><img src={refreshIcon} alt="Refresh" /></button
				>
			</div>
		</div>
		<table class="crud-clubs-teams-table">
			<tr class="crud-clubs-team-table-head">
				<th class="crud-clubs-team-name-title">Team</th>
				<th class="crud-clubs-team-country-title">Country</th>

				<th class="crud-clubs-actions-title">Actions</th>
			</tr>
			{#each teams as team}
				<tr class="crud-clubs-team-row">
					<td class="crud-clubs-team-name">{team.name}</td>
					<td class="crud-clubs-team-country">{team.area.name}</td>
					<td class="crud-clubs-actions-container"
						><button
							type="button"
							class="crud-clubs-btn see-team-btn"
							on:click={() => {
								handleSeeTeam(team.tla);
							}}><img src={footballIcon} alt="See" /></button
						><button
							type="button"
							class="crud-clubs-btn edit-team-btn"
							on:click={() => {
								handleUpdateTeam(team.tla);
							}}><img src={editIcon} alt="Edit" /></button
						><button
							type="button"
							class="crud-clubs-btn delete-team-btn"
							on:click={() => {
								handleDelete(team.tla);
							}}><img src={deleteIcon} alt="Delete" /></button
						>
					</td></tr
				>
			{/each}
		</table>
	{/await}
	{#if $isTeamModalOpen}
		<TeamModal />
	{/if}
	{#if $isDeleteAlertModalOpen}
		<DeleteAlertModal handleToggleDeleteAlertModal={() => handleToggleDeleteAlertModal()} />
	{/if}
</main>

<style>
	main {
		color: #f7ebe8;
		font-family: 'Montserrat';
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		width: 100%;
	}
	.crud-clubs-team-info {
		display: flex;
		justify-content: space-between;
		width: 50%;
		align-items: center;
		padding: 0px 10px;
		margin: 5px;
		box-sizing: border-box;
	}
	.crud-clubs-btn-container {
		display: flex;
		width: 30%;
		justify-content: flex-end;
		align-items: center;
	}

	.crud-clubs-teams-table {
		background-color: #444140;
		font-family: 'Montserrat';
		border-radius: 15px;
		padding: 20px;
		width: 50%;
		align-items: center;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}

	.crud-clubs-team-name {
		width: 30%;
	}
	.crud-clubs-team-country {
		width: 30%;
		margin-left: 10px;
	}
	.crud-clubs-actions-container {
		width: 30%;
		display: flex;
		justify-content: center;
	}
	.crud-clubs-team-table-head {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: nowrap;
		width: 100%;
		padding: 10px;
		font-weight: bolder;
	}
	.crud-clubs-team-table-head th {
		width: 30%;
		text-align: left;
	}
	th:last-child {
		text-align: center;
	}
	.crud-clubs-team-row {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: nowrap;
		width: 100%;
		margin: 0;
		padding: 5px;
	}
	.crud-clubs-btn {
		height: 30px;
		width: 30px;
		background-color: transparent;
		border: none;
		border-radius: 4.5px;
		margin: 0px 5px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #b4b1b1;
	}

	.crud-clubs-btn:disabled {
		background-color: #9b9694;
		cursor: not-allowed;
	}
	.crud-clubs-btn:hover {
		transition: 0.15s;
		background-color: #9b9694;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	.add-team-btn {
		margin: 10px 5px;
		color: #f7ebe8;
		width: 50%;
		font-size: 16px;
	}

	img {
		color: aliceblue;
	}
</style>
