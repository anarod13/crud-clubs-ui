import type { INewCrest } from '$lib/INewCrest';
import type ITeam from '$lib/ITeam';
import TeamData from '$lib/TeamData';
import Team from '../Team';
import type IListedTeam from '../IListedTeam';
import {
	getTeam as getTeamFromAPI,
	getTeams as getTeamsFromAPI,
	deleteTeam,
	updateTeam,
	addTeamCreast
} from '../services/crudClubs';
import {
	getTeam as getTeamFromCache,
	getTeams as getTeamsFromCache,
	removeTeamFromStorage,
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
		removeTeamFromStorage(team);
	} catch (e) {
		console.error(e);
	}
}

export async function handleUpdateTeam(team: Team) {
	const teamData = new TeamData(team);
	try {
		const updatedTeam = await updateTeam(teamData);
		updateTeamData(team.id, updatedTeam);
	} catch (e) {
		console.error(e);
	}
}

export async function updateTeamData(team: number, updatedTeam: ITeam) {
	const teamData = new Team(updatedTeam);
	storeTeam(team, teamData);
}

export async function updateTeamsList() {
	try {
		const updatedTeamsList = await getTeamsFromAPI();
		storeTeamsList(updatedTeamsList);
	} catch (err) {
		console.log(JSON.stringify(err, Object.getOwnPropertyNames(Error.prototype)));
	}
}
