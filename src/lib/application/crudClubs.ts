import type { INewCrest } from '../entities/INewCrest';
import type ITeam from '../entities/ITeam';
import TeamData from '../entities/TeamData';
import Team from '../entities/Team';
import type IListedTeam from '../entities/IListedTeam';
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
export async function getTeam(team: string): Promise<Team> {
	let teamData;
	try {
		teamData = getTeamFromCache(team);
	} catch (e) {
		teamData = new Team(await getTeamFromAPI(team));
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
