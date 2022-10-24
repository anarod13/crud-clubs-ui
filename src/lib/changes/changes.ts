import type Team from '../../lib/Team';
import type IListedTeam from '../IListedTeam';
import {
	getTeam as getTeamFromAPI,
	getTeams as getTeamsFromAPI,
	deleteTeam
} from '../services/crudClubs';
import {
	getTeam as getTeamFromCache,
	getTeams as getTeamsFromCache,
	removeTeam,
	storeTeam,
	storeTeamsList
} from '../storage/localStorage';

export async function getTeams(): Promise<IListedTeam[]> {
	let teamsList;
	try {
		teamsList = getTeamsFromCache();
	} catch (e) {
		teamsList = await getTeamsFromAPI();
		storeTeamsList(teamsList);
	}
	return teamsList;
}
export async function getTeam(team: number): Promise<Team> {
	let teamData;
	try {
		teamData = getTeamFromCache(team);
	} catch (e) {
		teamData = await getTeamFromAPI(team);
		storeTeam(team, teamData);
	}
	return teamData;
}

export async function handleDeleteTeam(team: number) {
	try {
		await Promise.all([deleteTeam(team), updateTeamsList()]);
		removeTeam(team);
	} catch (e) {
		console.error(e);
	}
}

export async function updateTeamsList() {
	try {
		const updatedTeamsList = await getTeamsFromAPI();
		storeTeamsList(updatedTeamsList);
	} catch (err) {
		console.log(JSON.stringify(err, Object.getOwnPropertyNames(Error.prototype)));
	}
}
