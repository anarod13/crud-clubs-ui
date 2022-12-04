import { vi, it, expect } from 'vitest';
import { addTeamCreast } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';
import mockTeamCrest from '../../../../cypress/fixtures/mockTeamCrest.png';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const newTeamCrest = {
	id: 'ARS',
	newCrest: new FormData()
};
newTeamCrest.newCrest.append('crest', mockTeamCrest);

it('Should request a list of teams', async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			text: () => Promise.resolve('team-crests/ARS-crest-5533.png')
		})
	) as any;
	await addTeamCreast(newTeamCrest);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/${newTeamCrest.id}/upload-crest`, {
		method: 'POST',
		headers: {
			enctype: 'multipart/form-data'
		},
		body: newTeamCrest.newCrest
	});
});
