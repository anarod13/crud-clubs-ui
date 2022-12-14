/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { getTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';
import mockStoredTeam from '../:./../../../../cypress/fixtures/mockStoredTeam.json';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockTeam });

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const mockTeamTla = 'ARS';

it('Should request a team', async () => {
	const team = await getTeam(mockTeamTla);
	expect(team).toEqual(mockStoredTeam);
	expect(global.fetch).toHaveBeenCalledTimes(1);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/${mockTeamTla}`);
	expect(localStorage.setItem).toHaveBeenLastCalledWith(
		mockTeamTla,
		JSON.stringify(mockStoredTeam)
	);
});

it('Should get a team from storage', async () => {
	const team = await getTeam(mockTeamTla);
	expect(team).toEqual(mockStoredTeam);
	expect(localStorage.getItem).toHaveBeenCalledTimes(2);
	expect(localStorage.getItem).toHaveBeenLastCalledWith(mockTeamTla);
});

afterAll;
