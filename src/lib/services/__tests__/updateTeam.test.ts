import { vi, it, expect } from 'vitest';
import { updateTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockTeam });

const SERVER_URL = process.env.VITE_SERVER_URL;

it('Should update a team', async () => {
	const updatedTeam = await updateTeam(mockTeam);
	expect(updatedTeam).toEqual(mockTeam);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/${mockTeam.tla}/update`, {
		method: 'PATCH',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(mockTeam)
	});
});
