<script lang="ts">
	import TeamData from '../entities/TeamData';
	import { addTeam, addTeamCreast, updateTeam } from '../services/crudClubs';
	import {
		isTeamModalOpen,
		editableTeam,
		selectedTeam,
		newTeam,
		isAlertModalOpen
	} from '../store/store';
	import type Team from '../entities/Team';
	import { getTeam, handleUpdateTeam } from '../application/crudClubs';

	export let updateAction: (team: string) => void;
	const SERVER_URL = 'http://localhost:8080';
	let team: Team;

	async function handleSaveTeam($selectedTeam: Team) {
		try {
			// $newTeam ? await addTeam($selectedTeam) :
			await handleUpdateTeam($selectedTeam);
			$selectedTeam = await getTeam(team.tla);
			$editableTeam = false;
		} catch (e) {
			console.error(e);
		}
	}

	async function handleAddTeamCreast(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const teamCrest = (<HTMLInputElement>e.target).files;
		const crestFile = new FormData();
		if (teamCrest) {
			crestFile.append('crest', teamCrest[0]);
			await addTeamCreast({ id: team.id, newCrest: crestFile });
		}
	}
	async function handleDelete(team: string) {
		$selectedTeam = team;
		$isAlertModalOpen = true;
	}

	async function loadTeam() {
		team = await getTeam($selectedTeam);
	}
</script>

<button
	type="button"
	class="crud-clubs-btn close-modal"
	on:click={() => {
		$isTeamModalOpen = false;
	}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-close.png" alt="Close" /></button
>

<main>
	{#await loadTeam()}
		<div>Loading...</div>
	{:then}
		<h2>{team.name}</h2>
		<div class="crud-clubs-team-main-info-container">
			<div class="crud-clubs-team-logo-container">
				{#if team.crestUrl}
					<img class="crud-clubs-team-logo" src={team.crestUrl} alt="" />{/if}
				{#if $editableTeam}
					<input
						on:change={(e) => {
							handleAddTeamCreast(e);
						}}
						class="crud-clubs-add-logo-input form-control-file"
						type="file"
						name="crest"
						required
						placeholder={team.crestUrl ? "Update this team's logo" : 'Add a new logo'}
					/>
				{/if}
			</div>
			<div class="crud-clubs-team-details">
				<label class="crub-clubs-detail-slot"
					>Adress: <input
						name="adress"
						type="text"
						readonly={!$editableTeam}
						bind:value={team.address}
					/></label
				>
				<label class="crub-clubs-detail-slot"
					>TLA: <input
						name="tla"
						type="text"
						readonly={!$editableTeam}
						bind:value={team.tla}
					/></label
				>
				<label class="crub-clubs-detail-slot"
					>Phone: <input
						name="phone"
						type="text"
						readonly={!$editableTeam}
						bind:value={team.phone}
					/></label
				>
				<label class="crub-clubs-detail-slot"
					>Website: <input type="text" readonly={!$editableTeam} bind:value={team.website} /></label
				>
				<label class="crub-clubs-detail-slot"
					>Email: <input type="text" readonly={!$editableTeam} bind:value={team.email} /></label
				>
				<label class="crub-clubs-detail-slot"
					>Founded: <input readonly={!$editableTeam} bind:value={team.founded} /></label
				>
				<label class="crub-clubs-detail-slot"
					>Club Colors: <input type="text" readonly={!$editableTeam} bind:value={team.clubColors} />
				</label>
				<label class="crub-clubs-detail-slot"
					>Venue: <input type="text" readonly={!$editableTeam} bind:value={team.venue} /></label
				>
				<label class="crub-clubs-detail-slot"
					>Last Updated: <input type="text" readonly value={team.lastUpdated} />
				</label>
			</div>
		</div>
		<div class="crud-clubs-team-active-competitions container">
			<div>Active competitions:</div>
			<div class="cru-clubs-active-competition-details">
				<th class="crud-clubs-active-competition-name">Name</th>
				<th class="crud-clubs-active-competition-country">Country</th>
				<th class="crud-clubs-active-competition-code">Code</th>
				<th class="crud-clubs-active-competition-plan">Plan</th>
				{#each team.activeCompetitions as activeCompetition}
					<tr>{activeCompetition.name}</tr>
					<tr>{activeCompetition.area.name}</tr>
					<tr>{activeCompetition.code}</tr>
					<tr>{activeCompetition.plan}</tr>{:else}<p>No active competitions registered</p>{/each}
			</div>
		</div>
		<div class="crud-clubs-team-squad">
			<div class="crud-clubs-team-squad-title">Squad:</div>
			<div class="crud-clubs-team-squad">
				<th class="crud-clubs-team-member-name">Name</th>
				<th class="crud-clubs-team-member-position">Position</th>
				<th class="crud-clubs-team-member-birth-country">Birth Country</th>
				<th class="crud-clubs-team-member-nationality">Nationality</th>
				<th class="crud-clubs-team-member-shirt-name">Shirt name</th>
				<th class="crud-clubs-team-member-role">Role</th>
				{#each team.squad as teamMember}
					<tr>{teamMember.name}</tr>
					<tr>{teamMember.position}</tr>
					<tr>{teamMember.dateOfBirth}</tr>
					<tr>{teamMember.countryOfBirth}</tr>
					<tr>{teamMember.nationality}</tr>
					<tr>{teamMember.shirtNumber}</tr>
					<tr>{teamMember.role}</tr>
				{/each}
			</div>
		</div>
		<div class="crud-clubs-btn-container">
			<button
				type="button"
				class="crud-clubs-btn"
				on:click={() => {
					updateAction(team.tla);
				}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-edit.png" alt="Edit" /></button
			><button
				type="button"
				class="crud-clubs-btn"
				on:click={() => {
					handleSaveTeam(team);
				}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-save.png" alt="Save" /></button
			><button
				type="button"
				class="crud-clubs-btn"
				on:click={() => {
					handleDelete(team.tla);
				}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-trash.png" alt="Delete" /></button
			>
		</div>
	{/await}
</main>

<style>
	main {
		/* position: fixed; */
		top: 10%;
		background-color: #444140;
		font-family: 'Montserrat';
		border-radius: 15px;
		padding: 20px;
		width: 50%;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	h2 {
		text-align: center;
	}
	.close-modal {
		position: fixed;
		height: 15px;
		width: 15px;
		top: 15%;
		right: 24%;
		z-index: 4;
	}
	.crud-clubs-team-main-info-container {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 0% 7%;
	}
	.crud-clubs-team-details {
		width: 60%;
		display: flex;
		flex-direction: column;
		color: #f7ebe8;
	}
	img {
		width: 80%;
		display: flex;
		justify-content: center;
		object-fit: scale-down;
	}
	.crud-clubs-team-logo-container {
		display: flex;
		flex-direction: column;
		height: 300px;
		margin: 0 10px;
	}
	.crud-clubs-team-logo {
		height: 85%;
		width: 85%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.crud-clubs-team-logo-form {
		height: 15%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
	}
	.crud-clubs-add-logo-input {
		width: 65%;
		margin: 10px;
	}
	.crud-clubs-add-logo-btn {
		background-color: #444140;
		font-family: 'Montserrat';
		border: none;
		border-radius: 10px;
		height: 30px;
		padding: 10px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		justify-items: center;
		align-items: center;
	}
	.crub-clubs-detail-slot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 2px 0px;
	}
	input {
		background-color: #716c6a;
		color: #f7ebe8;
		border: none;
		border-radius: 5px;
		height: 25px;
		padding: 3px 10px;
		font-family: 'Montserrat';
	}
	.crud-clubs-btn-container {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
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
	}
	.crud-clubs-btn-icon {
		height: 20px;
		width: 20px;
	}
	.crud-clubs-btn:hover {
		transition: 0.15s;
		background-color: #9b9694;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
