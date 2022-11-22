import { vi, it, expect } from 'vitest';
import { deleteTeam } from '../crudClubs';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

it('Should delete a team', async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve()
		})
	) as any;
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
