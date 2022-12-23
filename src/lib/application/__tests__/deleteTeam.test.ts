/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { handleDeleteTeam } from '../crudClubs';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');
vi.spyOn(Storage.prototype, 'removeItem');

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValue({});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const mockTeamTla = 'ARS';

it('Should delete a team', async () => {
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
