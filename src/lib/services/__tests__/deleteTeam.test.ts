import { vi, it, expect } from 'vitest';
import { deleteTeam } from '../crudClubs';

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({});

const SERVER_URL = process.env.VITE_SERVER_URL;

it('Should delete a team', async () => {
	await deleteTeam('ARS');
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/ARS/delete`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
});
