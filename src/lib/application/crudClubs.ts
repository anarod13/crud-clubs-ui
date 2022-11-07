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

const SERVER_URL = 'http://localhost:8080';

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

export async function handleDeleteTeam(team: string) {
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
		updateLocalTeamData(team.tla, updatedTeam);
	} catch (e) {
		console.error(e);
	}
}

export async function handleUploadTeamCrest(team: Team, newCrest: FormData): Promise<Team> {
	const newCrestUrl = await addTeamCreast({ id: team.tla, newCrest: newCrest });
	team.crestUrl = `${SERVER_URL}/${newCrestUrl}`;
	await updateLocalTeamData(team.tla, new TeamData(team));
	return team;
}

async function updateLocalTeamData(team: string, updatedTeam: ITeam) {
	const teamData = new Team(updatedTeam);
	storeTeam(team, teamData);
	await updateTeamsList();
}

export async function updateTeamsList() {
	try {
		const updatedTeamsList = await getTeamsFromAPI();
		storeTeamsList(updatedTeamsList);
	} catch (err) {
		console.log(JSON.stringify(err, Object.getOwnPropertyNames(Error.prototype)));
	}
}
