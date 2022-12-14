import type { INewCrest } from '../entities/INewCrest';
import type ITeam from '../entities/ITeam';
import type IListedTeam from '../entities/IListedTeam';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getTeams(): Promise<IListedTeam[]> {
	const result = await fetch(`${SERVER_URL}`);
	return result.json();
}

export async function getTeam(team: string): Promise<ITeam> {
	const result = await fetch(`${SERVER_URL}/team/${team}`);
	return result.json();
}

export async function updateTeam(team: ITeam) {
	const result = await fetch(`${SERVER_URL}/team/${team.tla}/update`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return result.json();
}

export async function addTeam(team: ITeam) {
	const result = await fetch(`${SERVER_URL}/add`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return result.json();
}

export async function deleteTeam(team: string): Promise<boolean> {
	const result = await fetch(`${SERVER_URL}/team/${team}/delete`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return result.ok;
}

export async function addTeamCreast(teamCrest: INewCrest): Promise<string> {
	const result = await fetch(`${SERVER_URL}/team/${teamCrest.id}/upload-crest`, {
		method: 'POST',
		headers: {
			enctype: 'multipart/form-data'
		},
		body: teamCrest.newCrest
	});

	return result.text();
}
