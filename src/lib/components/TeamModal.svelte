<script lang="ts">
	import {
		isTeamModalOpen,
		editableTeam,
		selectedTeam,
		newTeam,
		isDeleteAlertModalOpen,
		alertMessage,
		isAlertModalVisible
	} from '../store/store';
	import Team from '../entities/Team';
	import {
		getTeam,
		handleUpdateTeam,
		handleUploadTeamCrest,
		handleAddTeam
	} from '../application/crudClubs';
	import type ITeamMember from '../entities/ITeamMember';
	import type IActiveCompetition from '../entities/IActiveCompetition';
	import type IAlertMessage from '../entities/IAlertMessage';

	let team: Team;

	const teamToAdd = new Team({
		id: 0,
		area: { id: 0, name: '' },
		activeCompetitions: [],
		squad: [],
		name: '',
		shortName: '',
		tla: '',
		crestUrl: '',
		address: '',
		phone: '',
		website: '',
		email: '',
		founded: null,
		clubColors: '',
		venue: '',
		lastUpdated: new Date().toLocaleDateString()
	});

	let isTeamValid: boolean;

	async function handleSaveTeam(teamData: Team) {
		try {
			$newTeam ? await handleNewTeam(teamData) : await handleUpdateTeam(teamData);
			showAlertModal($newTeam ? 'newTeamAdded' : 'teamEdited');
			team = await getTeam(teamData.tla);
			$editableTeam = false;
		} catch (e) {
			showAlertModal('error');
		}
	}

	async function handleNewTeam(teamData: Team) {
		if (isTeamValid) {
			await handleAddTeam(teamData);
			$newTeam = false;
		}
	}

	async function handleAddTeamCreast(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const teamCrest = (<HTMLInputElement>e.target).files;
		const crestFile = new FormData();
		if (teamCrest) {
			crestFile.append('crest', teamCrest[0]);
			try {
				team = await handleUploadTeamCrest(team, crestFile);
				showAlertModal('crestAdded');
			} catch (e) {
				showAlertModal('error');
			}
		}
	}

	function showAlertModal(alert: keyof IAlertMessage) {
		$alertMessage = alert;
		$isAlertModalVisible = !$isAlertModalVisible;
	}

	async function handleDelete(team: string) {
		$selectedTeam = team;
		$isDeleteAlertModalOpen = true;
	}

	async function loadTeam() {
		if ($newTeam) team = teamToAdd;
		else {
			team = await getTeam($selectedTeam);
			validateTeam();
		}
	}

	function handleAddActiveCompetition(activeCompetitions: IActiveCompetition[]) {
		const newActiveCompetition = {
			id: 0,
			area: { id: 0, name: '' },
			name: '',
			code: '',
			plan: '',
			lastUpdated: ''
		};

		if (activeCompetitions.length > 0 && !activeCompetitions[activeCompetitions.length - 1].name) {
			return;
		}
		activeCompetitions.push({ ...newActiveCompetition });
		team.activeCompetitions = activeCompetitions;
	}
	function handleAddTeamMember(teamMembers: ITeamMember[]) {
		const newTeamMember = {
			id: 0,
			name: '',
			position: '',
			dateOfBirth: '',
			countryOfBirth: '',
			nationality: '',
			shirtNumber: null,
			role: ''
		};
		if (teamMembers.length > 0 && !teamMembers[teamMembers.length - 1].name) {
			return;
		}
		teamMembers.push({ ...newTeamMember });
		team.squad = teamMembers;
	}

	function handleRemoveActiveCompetition(activeCompetitons: IActiveCompetition[]) {
		if (activeCompetitons.length > 0) activeCompetitons.pop();
		team.activeCompetitions = activeCompetitons;
	}
	function handleRemoveTeamMember(teamMembers: ITeamMember[]) {
		if (teamMembers.length > 0) teamMembers.pop();
		team.squad = teamMembers;
	}

	function validateTeam() {
		if (team.tla.length === 3 && team.name.length >= 3) isTeamValid = true;
		else {
			isTeamValid = false;
		}
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
				{#if $editableTeam}
					<label class="crub-clubs-detail-slot"
						>Name: <input
							name="tla"
							type="text"
							on:change={() => {
								validateTeam();
							}}
							bind:value={team.name}
						/></label
					>{/if}
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
						readonly={!$newTeam}
						on:change={() => {
							validateTeam();
						}}
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
		<div class="crud-clubs-team-active-competitions-container">
			<div class="crud-clubs-active-competition-title">
				Active competitions:
				{#if $editableTeam}<div class="crud-clubs-btn-container">
						<button
							type="button"
							class="crud-clubs-btn"
							on:click={() => {
								handleAddActiveCompetition(team.activeCompetitions);
							}}>+</button
						>
						<button
							type="button"
							class="crud-clubs-btn"
							disabled={!team.activeCompetitions.length}
							on:click={() => {
								handleRemoveActiveCompetition(team.activeCompetitions);
							}}>-</button
						>
					</div>
				{/if}
			</div>
			<div class="crud-clubs-active-competition-details">
				<tr>
					<th class="crud-clubs-active-competition-name">Name</th>
					<th class="crud-clubs-active-competition-country">Country</th>
					<th class="crud-clubs-active-competition-code">Code</th>
					<th class="crud-clubs-active-competition-plan">Plan</th>
				</tr>
				{#each team.activeCompetitions as activeCompetition}
					<tr>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.name} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.area.name} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.code} /></td>
						<td><input readonly={!$editableTeam} bind:value={activeCompetition.plan} /></td>
					</tr>{:else}<p>No active competitions registered</p>{/each}
			</div>
		</div>
		<div class="crud-clubs-team-squad-container">
			<div class="crud-clubs-team-squad-title">
				Squad: {#if $editableTeam}<div class="crud-clubs-btn-container">
						<button
							type="button"
							class="crud-clubs-btn"
							on:click={() => {
								handleAddTeamMember(team.squad);
							}}>+</button
						><button
							type="button"
							class="crud-clubs-btn"
							disabled={!team.squad.length}
							on:click={() => {
								handleRemoveTeamMember(team.squad);
							}}>-</button
						>
					</div>
				{/if}
			</div>
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
		<div class="crud-clubs-main-btn-container">
			<button
				type="button"
				class="crud-clubs-btn"
				disabled={$newTeam || $editableTeam}
				on:click={() => {
					$editableTeam = true;
				}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-edit.png" alt="Edit" /></button
			><button
				type="button"
				class="crud-clubs-btn"
				disabled={!isTeamValid}
				on:click={() => {
					handleSaveTeam(team);
				}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-save.png" alt="Save" /></button
			><button
				type="button"
				class="crud-clubs-btn"
				disabled={$newTeam}
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
	.crud-clubs-active-competition-title,
	.crud-clubs-team-squad-title {
		display: flex;
		width: 90%;
		justify-content: space-between;
		/* color: #b4b1b1; */
		font-weight: bolder;
		font-size: 18px;
		text-shadow: rgba(0, 0, 0, 0.687) 0.1em 0.1em 0.3em;
		align-items: center;
		margin: 15px;
	}

	.crud-clubs-btn-container {
		display: flex;
		justify-content: flex-end;
		width: 30%;
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
	.crud-clubs-main-btn-container {
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
		color: #b4b1b1;
		text-shadow: rgba(0, 0, 0, 0.687) 0.1em 0.1em 0.3em;
		font-weight: bolder;
	}
	.crud-clubs-btn-icon {
		height: 20px;
		width: 20px;
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
</style>
