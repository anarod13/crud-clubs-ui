/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { handleDeleteTeam } from '../crudClubs';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const mockTeamTla = 'ARS';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');
vi.spyOn(Storage.prototype, 'removeItem');

it('Should delete a team', async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve()
		})
	) as any;
	await handleDeleteTeam(mockTeamTla);
	expect(global.fetch).toHaveBeenCalledTimes(2);
	expect(global.fetch).toHaveBeenNthCalledWith(1, `${SERVER_URL}/team/${mockTeamTla}/delete`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
	expect(localStorage.removeItem).toHaveBeenCalledWith(mockTeamTla);
});
