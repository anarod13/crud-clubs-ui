import { vi, it, expect } from 'vitest';
import { getTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

it('Should request a team', async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(mockTeam)
		})
	) as any;
	const team = await getTeam('ARS');
	expect(team).toEqual(mockTeam);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/ARS`);
});
