<script lang="ts">
	import {
		selectedTeam,
		isTeamModalOpen,
		editableTeam,
		newTeam,
		isAlertModalOpen,
		listedTeams
	} from '../store/store';
	import AlertModal from './AlertModal.svelte';
	import TeamModal from './TeamModal.svelte';
	import { getTeams, getTeam } from '../application/crudClubs';

	$listedTeams = getTeams();

	function handleToggleAlertModal(): void {
		$isAlertModalOpen = !$isAlertModalOpen;
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
		showTeamModal(team);
	}
	function handleUpdateTeam(team: string) {
		$editableTeam = true;
		showTeamModal(team);
		$newTeam = false;
	}

	async function handleDelete(team: string) {
		$selectedTeam = team;
		$isAlertModalOpen = true;
	}
</script>

<main>
	<h1 class="crud-clubs-title">Premiere League</h1>
	{#await $listedTeams}
		<p>Loading...</p>
	{:then teams}
		<div class="crud-clubs-team-info">
			<p>Currently you have {teams.length} teams listed</p>
			<button
				type="button"
				class="crud-clubs-add-team-btn"
				on:click={() => {
					handleAddTeam();
				}}>Add Team</button
			>
		</div>
		<table class="crud-clubs-teams-table">
			<tr class="crud-clubs-team-table-head">
				<th class="crud-clubs-team-logo-container">Team</th>
				<th class="crud-clubs-team-name">Country</th>

				<th class="crud-clubs-actions-container">Actions</th>
			</tr>
			{#each teams as team}
				<tr class="crud-clubs-team-row">
					<td class="crud-clubs-team-name">{team.name}</td>
					<td class="crud-clubs-team-name">{team.area.name}</td>
					<td class="crud-clubs-actions-container"
						><button
							type="button"
							on:click={() => {
								handleSeeTeam(team.tla);
							}}><img src="./src/assets/bx-football.png" alt="See" /></button
						><button
							type="button"
							on:click={() => {
								handleUpdateTeam(team.tla);
							}}><img src="./src/assets/bx-edit.png" alt="Edit" /></button
						><button
							type="button"
							on:click={() => {
								handleDelete(team.tla);
							}}><img src="./src/assets/bx-trash.png" alt="Delete" /></button
						>
					</td></tr
				>
			{/each}
		</table>
	{/await}
	{#if $isTeamModalOpen}
		<TeamModal />
	{/if}
	{#if $isAlertModalOpen}
		<AlertModal handleToggleAlertModal={() => handleToggleAlertModal()} />
	{/if}
</main>

<style>
	main {
		color: #f7ebe8;
		font-family: 'Montserrat' !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		width: 100%;
	}

	.crud-clubs-add-team-btn {
		border: none;
		background-color: transparent;
		font-size: 16px;
		text-decoration: underline;
		font-weight: bolder;
		border-radius: 5px;
		padding: 10px 15px;
		margin: 10px;
		color: #f7ebe8;
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

	.crud-clubs-team-logo-container {
		display: flex;
		justify-content: center;
		width: 15%;
	}
	.crud-clubs-team-name {
		width: 50%;
	}
	.crud-clubs-actions-container {
		width: 25%;
		display: flex;
		justify-content: center;
	}
	.crud-clubs-team-table-head {
		display: flex;
		justify-content: space-around;
		flex-wrap: nowrap;
		width: 100%;
		padding: 10px;
		font-weight: bolder;
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
	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
	img {
		color: aliceblue;
	}
</style>
