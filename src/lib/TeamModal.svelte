<script lang="ts">
	import type ITeam from './ITeam';
	import TeamData from './TeamData';
	import { addTeam, addTeamCreast, deleteTeam, updateTeam } from './services/crud-clubs';
	import {
		isTeamModalOpen,
		editableTeam,
		selectedTeam,
		newTeam,
		showAlertModal
	} from './store/store';
	import type Team from './Team';

	export let editAction: (id: number) => void;
	export let deleteAction: (id: number) => void;
	const SERVER_URL = 'http://localhost:8080';
	let team: Team;

	// interface HTMLInputEvent extends Event {
	// 	target: HTMLInputElement & EventTarget;
	// }
	interface Event<T = EventTarget> {
		target: T;
		// ...
	}

	async function handleSaveTeam($selectedTeam: Team) {
		const teamData = new TeamData($selectedTeam);
		try {
			$selectedTeam = $newTeam ? await addTeam(teamData) : await updateTeam(teamData);
		} catch (e) {
			console.error(e);
		}
	}

	async function handleAddTeamCreast(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const teamCrest = (<HTMLInputElement>e.target).files;
		const crestFile = new FormData();
		if (teamCrest) {
			crestFile.append('crest', teamCrest[0]);
			await addTeamCreast({ id: $selectedTeam.id, newCrest: crestFile });
		}
	}
	let hi: string;
</script>

<button
	class="crud-clubs-btn close-modal"
	on:click={() => {
		$isTeamModalOpen = false;
	}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-close.png" alt="Close" /></button
>
<main>
	<h2>{$selectedTeam.name}</h2>
	<div class="crud-clubs-team-info-container">
		<div class="crud-clubs-team-logo-container">
			{#if $selectedTeam.crestUrl}
				<img class="crud-clubs-team-logo" src={$selectedTeam.crestUrl} alt="" />{/if}
			{#if $editableTeam}
				<input
					on:change={(e) => {
						handleAddTeamCreast(e);
					}}
					class="crud-clubs-add-logo-input form-control-file"
					type="file"
					name="crest"
					required
					placeholder={$selectedTeam.crestUrl ? "Update this team's logo" : 'Add a new logo'}
				/>
			{/if}
		</div>
		<div class="crud-clubs-team-details">
			<label class="crub-clubs-detail-slot"
				>Adress: <input
					name="adress"
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.address}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>TLA: <input
					name="tla"
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.tla}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>Phone: <input
					name="phone"
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.phone}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>Website: <input
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.website}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>Email: <input
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.email}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>Founded: <input readonly={!$editableTeam} bind:value={$selectedTeam.founded} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Club Colors: <input
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.clubColors}
				/>
			</label>
			<label class="crub-clubs-detail-slot"
				>Venue: <input
					type="text"
					readonly={!$editableTeam}
					bind:value={$selectedTeam.venue}
				/></label
			>
			<label class="crub-clubs-detail-slot"
				>Last Updated: <input
					type="text"
					readonly={!$editableTeam}
					value={$selectedTeam.lastUpdated}
				/>
			</label>
		</div>
	</div>
	<div class="crud-clubs-btn-container">
		<button
			class="crud-clubs-btn"
			on:click={() => {
				editAction($selectedTeam.id);
			}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-edit.png" alt="Edit" /></button
		><button
			class="crud-clubs-btn"
			on:click={() => {
				handleSaveTeam($selectedTeam);
			}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-save.png" alt="Save" /></button
		><button
			class="crud-clubs-btn"
			on:click={() => {
				deleteAction($selectedTeam.id);
			}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-trash.png" alt="Delete" /></button
		>
	</div>
</main>

<style>
	main {
		position: fixed;
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
	.crud-clubs-team-info-container {
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
