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
	import { getTeam, handleUpdateTeam, handleUploadTeamCrest } from '../application/crudClubs';

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
			team = await handleUploadTeamCrest(team, crestFile);
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
			<div class="crud-clubs-team-crest-container">
				{#if team.crestUrl}
					{#key team}
						<img class="crud-clubs-team-crest" src={team.crestUrl} alt="" />
					{/key}
				{:else}
					No crest found for this team!{/if}
				{#if $editableTeam}
					<label class="crud-clubs-add-crest-field">
						{team.crestUrl ? "Update this team's crest" : 'Add a new crest'}<input
							on:change={(e) => {
								handleAddTeamCreast(e);
							}}
							type="file"
							name="crest"
							required
						/>
					</label>
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
					>TLA: <input name="tla" type="text" readonly bind:value={team.tla} /></label
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
		<div class="crud-clubs-team-active-competitions-container">
			<div class="crud-clubs-active-competition-title">Active competitions:</div>
			<div class="crud-clubs-active-competition-details">
				<tr>
					<th class="crud-clubs-active-competition-name">Name</th>
					<th class="crud-clubs-active-competition-country">Country</th>
					<th class="crud-clubs-active-competition-code">Code</th>
					<th class="crud-clubs-active-competition-plan">Plan</th>
				</tr>{#each team.activeCompetitions as activeCompetition}
					<tr>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.name} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.area.name} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.code} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.plan} /></td>
					</tr>{:else}<p>No active competitions registered</p>{/each}
			</div>
		</div>
		<div class="crud-clubs-team-squad-container">
			<div class="crud-clubs-team-squad-title">Squad:</div>
			<div class="crud-clubs-team-squad">
				<tr>
					<th class="crud-clubs-team-member-name">Name</th>
					<th class="crud-clubs-team-member-position">Position</th>
					<th class="crud-clubs-team-member-birth-country">Date of Birth</th>
					<th class="crud-clubs-team-member-birth-country">Birth Country</th>
					<th class="crud-clubs-team-member-nationality">Nationality</th>
					<th class="crud-clubs-team-member-shirt-name">Shirt name</th>
					<th class="crud-clubs-team-member-role">Role</th></tr
				>
				{#each team.squad as teamMember}
					<tr>
						<td><input readonly={!$editableTeam} bind:value={teamMember.name} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.position} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.dateOfBirth} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.countryOfBirth} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.nationality} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.shirtNumber} /></td>
						<td><input readonly={!$editableTeam} bind:value={teamMember.role} /></td></tr
					>
				{:else}<p>No team squad registered</p>
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
		position: absolute;
		top: 10%;
		background-color: #444140;
		font-family: 'Montserrat';
		border-radius: 15px;
		padding: 20px;
		width: 75%;
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
		position: absolute;
		height: 15px;
		width: 15px;
		top: 12%;
		right: 12%;
		z-index: 4;
	}
	.crud-clubs-team-main-info-container {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		padding: 0% 7%;
	}
	.crud-clubs-team-details {
		width: 60%;
		display: flex;
		flex-direction: column;
		color: #f7ebe8;
	}

	.crud-clubs-active-competition-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 8px;
	}
	tr {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		text-align: left;
		margin-top: 5px;
	}
	.crud-clubs-active-competition-details input,
	.crud-clubs-active-competition-details th {
		width: 80%;
		height: 20px;
	}

	.crud-clubs-team-squad {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 8px;
	}
	.crud-clubs-team-squad input,
	.crud-clubs-team-squad th {
		width: 80%;
		height: 20px;
	}
	img {
		width: 80%;
		display: flex;
		justify-content: center;
		object-fit: scale-down;
	}
	.crud-clubs-team-crest-container {
		display: flex;
		width: 40%;
		flex-direction: column;
		height: 300px;
		margin: 0 10px;
	}
	.crud-clubs-team-crest {
		height: 85%;
		width: 85%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}
	.crud-clubs-add-crest-field {
		width: 65%;
		margin: 10px;
		background: none;
		color: #b4b1b1;
		text-shadow: rgba(0, 0, 0, 0.687) 0.1em 0.1em 0.3em;
		border: none;
		font-weight: bold;
		border-radius: 5px;
		height: 25px;
		padding: 3px 10px;
		font-family: 'Montserrat';
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.crud-clubs-add-crest-field:hover {
		transition: 0.15s;
		background-color: #9b96947e;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	input[type='file'] {
		display: none;
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
