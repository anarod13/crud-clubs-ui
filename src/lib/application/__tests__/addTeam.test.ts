/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { handleAddTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';
import mockListedTeams from '../../../../cypress/fixtures/mockListedTeams.json';
import mockStoredTeam from '../:./../../../../cypress/fixtures/mockStoredTeam.json';
import Team from '$lib/entities/Team';
import TeamData from '$lib/entities/TeamData';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');
vi.useFakeTimers().setSystemTime(new Date('2022-10-10T17:17:21.576Z'));

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({ json: () => mockTeam });
mockFetch.mockResolvedValueOnce({ json: () => mockListedTeams });

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const mockNewTeam = new Team(mockTeam);
const mockTeamData = new TeamData(mockNewTeam);

it('Should add a new team', async () => {
	await handleAddTeam(mockNewTeam);
	expect(global.fetch).toHaveBeenCalledTimes(2);
	expect(global.fetch).toHaveBeenNthCalledWith(1, `${SERVER_URL}/add`, {
		method: 'POST',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(mockTeamData)
	});
	expect(global.fetch).toHaveBeenNthCalledWith(2, SERVER_URL);
	expect(localStorage.setItem).toHaveBeenCalledWith(mockNewTeam.tla, JSON.stringify(mockNewTeam));
});
