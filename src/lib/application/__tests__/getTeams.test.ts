/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { getTeams } from '../crudClubs';
import mockListedTeams from '../../../../cypress/fixtures/mockListedTeams.json';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockListedTeams });

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

it('Should request a list of teams', async () => {
	const listedTeams = await getTeams();
	expect(listedTeams).toEqual(mockListedTeams);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}`);
	expect(localStorage.setItem).toHaveBeenCalledTimes(1);
	expect(localStorage.setItem).toHaveBeenLastCalledWith(
		'STORE_TEAMS_LIST',
		JSON.stringify(mockListedTeams)
	);
});

it('Should get a list of teams from storage', async () => {
	const listedTeams = await getTeams();
	expect(listedTeams).toEqual(mockListedTeams);
	expect(localStorage.getItem).toHaveBeenCalledTimes(2);
	expect(localStorage.getItem).toHaveBeenLastCalledWith('STORE_TEAMS_LIST');
});
