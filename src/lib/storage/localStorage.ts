import type IListedTeam from '../entities/IListedTeam';
import type Team from '../entities/Team';

const STORE_TEAMS_LIST_KEY = 'STORE_TEAMS_LIST';

export function getTeam(team: number): Team {
	const teamKey = `team-${team}`;
	const teamData = localStorage.getItem(teamKey);
	if (teamData) {
		return JSON.parse(teamData);
	} else {
		throw new Error(`No data found for ${teamKey}`);
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

export function storeTeam(team: number, teamData: Team) {
	const teamKey = `team-${team}`;
	return localStorage.setItem(teamKey, JSON.stringify(teamData));
}

export function storeTeamsList(listedTeams: IListedTeam[]) {
	return localStorage.setItem(STORE_TEAMS_LIST_KEY, JSON.stringify(listedTeams));
}

export function removeTeamFromStorage(team: number) {
	const teamKey = `team-${team}`;
	return localStorage.removeItem(teamKey);
}
