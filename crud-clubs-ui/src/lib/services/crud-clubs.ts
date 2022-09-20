import type { INewCrest } from '../INewCrest';
import type ITeam from '../../lib/ITeam';

const SERVER_URL = 'http://localhost:8080';

export async function getTeams(): Promise<ITeam[]> {
	const result = await fetch(`${SERVER_URL}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
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

export async function deleteTeam(team: ITeam) {
	const result = await fetch(`${SERVER_URL}/${team.id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(team)
	});
	return result.ok;
}

export async function addTeamCreast(teamCrest: INewCrest) {
	await fetch(`${SERVER_URL}/${teamCrest.id}/upload-crest`, {
		method: 'POST',
		headers: {
			enctype: 'multipart/form-data'
		},
		body: teamCrest.newCrest
	})
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}
