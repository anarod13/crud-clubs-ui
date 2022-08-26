<script lang="ts">
	import type ITeam from './ITeam';
	import teamData from './teams.json';
	const listedTeams: ITeam[] = teamData;

	let selectedTeam = null;

	function openTeamModal(team: ITeam) {
		selectedTeam = team;
	}
</script>

<main>
	<p>Currently you have {listedTeams.length} teams listed!</p>
	<button>Add</button>
	<table>
		<tr>
			<th>Escudo</th>
			<th>Team</th>
			<th>Country</th>
			<th>Actions</th>
		</tr>
		{#each listedTeams as team}
			<tr>
				<td><img class="crud-clubs-team-logo" src={team.crestUrl} alt={team.tla} /></td>
				<td>{team.name}</td>
				<td>{team.area.name}</td>
				<td><button>Edit</button></td>
				<td
					><button
						on:click={() => {
							openTeamModal(team);
						}}>Delete</button
					></td
				>
			</tr>
		{/each}
	</table>
</main>

<style>
	.crud-clubs-team-logo {
		width: 90%;
		height: 90%;
		box-sizing: border-box;
	}
</style>
