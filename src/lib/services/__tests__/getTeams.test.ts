import { vi, it, expect } from 'vitest';
import { getTeams } from '../crudClubs';
import mockListedTeams from '../../../../cypress/fixtures/mockListedTeams.json';

const SERVER_URL = process.env.VITE_SERVER_URL;

it('Should request a list of teams', async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(mockListedTeams)
		})
	) as any;
	const listedTeams = await getTeams();
	expect(listedTeams).toEqual(mockListedTeams);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}`);
});
