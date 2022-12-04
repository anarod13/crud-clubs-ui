import { vi, it, expect } from 'vitest';
import { addTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockTeam });

const SERVER_URL = process.env.VITE_SERVER_URL;

it('Should add a new team', async () => {
	const newTeam = await addTeam(mockTeam);
	expect(newTeam).toEqual(mockTeam);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/add`, {
		method: 'POST',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(mockTeam)
	});
});
