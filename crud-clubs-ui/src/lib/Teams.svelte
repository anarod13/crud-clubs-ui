<script lang="ts">
	import type ITeam from './ITeam';
	import teamData from './teams.json';
	import { selectedTeam, showTeamModal, showAlertModal, editableTeam } from './store/store';
	import AlertModal from './AlertModal.svelte';
	import TeamModal from './TeamModal.svelte';
	const listedTeams: ITeam[] = teamData;
	const newTeam: ITeam = {
		id: 0,
		area: {
			id: 0,
			name: ''
		},
		name: '',
		shortName: '',
		tla: '',
		crestUrl: '',
		address: '',
		phone: '',
		website: '',
		email: '',
		founded: 0,
		clubColors: '',
		venue: '',
		lastUpdated: ''
	};
	function handleSeeTeam(team: ITeam) {
		$selectedTeam = team;
		$editableTeam = false;
		$showTeamModal = true;
	}
	function handleEditTeam(team: ITeam) {
		$selectedTeam = team;
		$editableTeam = true;
		$showTeamModal = true;
	}

	function toggleAlertModal() {
		$showAlertModal = !$showAlertModal;
		console.log($showAlertModal);
	}

	function handleDelete(team: ITeam) {
		toggleAlertModal();
		$selectedTeam = team;
	}
</script>

<main>
	<h1 class="crud-clubs-title">English Clubs</h1>
	<div class="crud-clubs-team-info">
		<p>Currently you have {listedTeams.length} teams listed!</p>
		<button
			class="crud-clubs-add-team-btn"
			on:click={() => {
				handleEditTeam(newTeam);
			}}>Add Team</button
		>
	</div>
	<table class="crud-clubs-teams-table">
		<tr class="crud-clubs-team-table-head">
			<th class="crud-clubs-team-logo-container">Escudo</th>
			<th class="crud-clubs-team-name">Team</th>

			<th class="crud-clubs-actions-container">Actions</th>
		</tr>
		{#each listedTeams as team}
			<tr class="crud-clubs-team-row">
				<td class="crud-clubs-team-logo-container"
					><img class="crud-clubs-team-logo" src={team.crestUrl} alt={team.tla} /></td
				>
				<td class="crud-clubs-team-name">{team.name}</td>
				<td class="crud-clubs-actions-container"
					><button
						on:click={() => {
							handleSeeTeam(team);
						}}><img src="./src/assets/bx-football.png" alt="See" /></button
					><button
						on:click={() => {
							handleEditTeam(team);
						}}><img src="./src/assets/bx-edit.png" alt="Edit" /></button
					><button
						on:click={() => {
							handleDelete(team);
						}}><img src="./src/assets/bx-trash.png" alt="Delete" /></button
					>
				</td></tr
			>
		{/each}
	</table>
	{#if $showTeamModal}
		<TeamModal
			team={$selectedTeam}
			deleteAction={() => {
				handleDelete($selectedTeam);
			}}
			editAction={() => {
				handleEditTeam($selectedTeam);
			}}
		/>
	{/if}
	{#if $showAlertModal}
		<AlertModal toggleModal={() => toggleAlertModal()} />
	{/if}
</main>

<style>
	.crud-clubs-team-logo {
		height: 35px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		object-fit: scale-down;
	}
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
