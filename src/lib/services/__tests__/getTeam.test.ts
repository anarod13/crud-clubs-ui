import { vi, it, expect } from 'vitest';
import { getTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockTeam });

const SERVER_URL = process.env.VITE_SERVER_URL;

it('Should request a team', async () => {
	const team = await getTeam('ARS');
	expect(team).toEqual(mockTeam);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/ARS`);
});
