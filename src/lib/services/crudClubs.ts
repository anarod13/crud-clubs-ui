import type { INewCrest } from '../INewCrest';
import type ITeam from '../ITeam';
import type Team from '../Team';
import { mapsTeam } from '../mappers/teamMapper';
import type { IListedTeam } from '$lib/IListedTeam';

const SERVER_URL = 'http://localhost:8080';

export async function getTeams(): Promise<IListedTeam[]> {
	const result = await fetch(`${SERVER_URL}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return result.json();
}

export async function getTeam(teamId: number): Promise<Team> {
	const result = await fetch(`${SERVER_URL}/${teamId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	const teamData = await result.json();
	return mapsTeam(teamData);
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

export async function updateTeam(team: ITeam) {
	const result = await fetch(`${SERVER_URL}/${team.id}/edit`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return result.json();
}

export async function deleteTeam(teamId: number): Promise<boolean> {
	const result = await fetch(`${SERVER_URL}/${teamId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return result.ok;
}

export async function addTeamCreast(teamCrest: INewCrest): Promise<boolean> {
	const result = await fetch(`${SERVER_URL}/${teamCrest.id}/upload-crest`, {
		method: 'POST',
		headers: {
			enctype: 'multipart/form-data'
		},
		body: teamCrest.newCrest
	});

	return result.ok;
}

export async function getTeamCrest(crestUrl: string) {
	try {
		const crest = await fetch(crestUrl, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		return crest.text();
	} catch (e) {
		console.log(e);
		const crest = await fetch(`${SERVER_URL}/${crestUrl}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		return crest;
	}
}
