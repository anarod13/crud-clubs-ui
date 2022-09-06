<script lang="ts">
	import type ITeam from './ITeam';
	import { showTeamDetails } from './store/store';

	export let team: ITeam;
</script>

<button
	class="crud-clubs-btn close-modal"
	on:click={() => {
		$showTeamDetails = false;
	}}><img class="crud-clubs-btn-icon" src="./src/assets/bx-close.png" alt="Close" /></button
>
<main>
	<h2>{team.name}</h2>
	<div class="crud-clubs-team-info-container">
		<img src={team.crestUrl} alt="" />
		<div class="crud-clubs-team-details">
			<label class="crub-clubs-detail-slot"
				>Adress: <input name="adress" type="text" placeholder={team.address} /></label
			>
			<label class="crub-clubs-detail-slot"
				>TLA: <input name="tla" type="text" placeholder={team.tla} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Phone: <input name="phone" type="text" placeholder={team.phone} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Website: <input type="text" placeholder={team.website} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Email: <input type="text" placeholder={team.email} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Founded: <input placeholder={team.founded?.toString()} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Club Colors: <input type="text" placeholder={team.clubColors} />
			</label>
			<label class="crub-clubs-detail-slot"
				>Venue: <input type="text" placeholder={team.venue} /></label
			>
			<label class="crub-clubs-detail-slot"
				>Last Updated: <input type="text" placeholder={team.lastUpdated} />
			</label>
		</div>
	</div>
	<div class="crud-clubs-btn-container">
		<button class="crud-clubs-btn" on:click={() => {}}
			><img class="crud-clubs-btn-icon" src="./src/assets/bx-save.png" alt="Save" /></button
		><button class="crud-clubs-btn" on:click={() => {}}
			><img class="crud-clubs-btn-icon" src="./src/assets/bx-trash.png" alt="Delete" /></button
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
		top: 12%;
		right: 25%;
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
		width: 20%;
		display: flex;
		justify-content: center;
	}
	.crub-clubs-detail-slot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 2px 0px;
	}
	input {
		color: #f7ebe8;
		border: none;
		border-radius: 5px;
		height: 25px;
		padding: 3px;
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
	.crud-clubs-close-modal-btn:hover,
	.crud-clubs-btn:hover {
		transition: 0.15s;
		background-color: #9b9694;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
