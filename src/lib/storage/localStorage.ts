import type IListedTeam from '../entities/IListedTeam';
import type Team from '../entities/Team';

const STORE_TEAMS_LIST_KEY = 'STORE_TEAMS_LIST';

export function getTeam(team: string): Team {
	const teamData = localStorage.getItem(team);
	if (teamData) {
		return JSON.parse(teamData);
	} else {
		throw new Error(`No data found for ${team}`);
	}
}

export function getTeams(): IListedTeam[] {
	const teamsList = localStorage.getItem(STORE_TEAMS_LIST_KEY);
	if (teamsList) {
		return JSON.parse(teamsList);
	} else {
		throw new Error(`No list of teams found`);
	}
}

export function storeTeam(team: string, teamData: Team) {
	localStorage.setItem(team, JSON.stringify(teamData));
}

export function storeTeamsList(listedTeams: IListedTeam[]) {
	localStorage.setItem(STORE_TEAMS_LIST_KEY, JSON.stringify(listedTeams));
}

export function removeTeamFromStorage(team: string) {
	localStorage.removeItem(team);
}
