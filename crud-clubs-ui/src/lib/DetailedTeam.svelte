<script lang="ts">
	import type ITeam from './ITeam';

	export let team: ITeam;
</script>

<main>
	<h2>{team.name}</h2>
	<img src={team.crestUrl} />
	<div><label>Adress: </label><input type="text" placeholder={team.address} /></div>
	<div><label>TLA: </label><input type="text" placeholder={team.tla} /></div>
	<div><label>Phone: </label><input type="text" placeholder={team.phone} /></div>
	<div><label>Website: </label><input type="text" placeholder={team.website} /></div>
	<div><label>Email: </label><input type="text" placeholder={team.email} /></div>
	<div><label>Founded: </label><input placeholder={team.founded} /></div>
	<div><label>Club Colors: </label><input type="text" placeholder={team.clubColors} /></div>
	<div><label>Venue: </label><input type="text" placeholder={team.venue} /></div>
	<div><label>Last Updated: </label><input type="text" placeholder={team.lastUpdated} /></div>
</main>

<style>
	main {
		background-color: blue;
	}
</style>
