import type ITeam from '../../lib/ITeam';

const SERVER_URL = 'http://localhost:8080/';

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

export async function saveTeam(team: ITeam) {
	const result = await fetch(`${SERVER_URL}/${team.id}`, {
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
	const result = await fetch(`${SERVER_URL}/${team.id}`, {
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
