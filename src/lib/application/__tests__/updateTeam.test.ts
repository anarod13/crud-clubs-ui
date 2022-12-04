/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { handleUpdateTeam } from '../crudClubs';
import mockTeam from '../../../../cypress/fixtures/mockTeam.json';
import mockUITeam from '../../../../cypress/fixtures/mockUITeam.json';
import mockStoredTeam from '../:./../../../../cypress/fixtures/mockStoredTeam.json';
import mockListedTeams from '../../../../cypress/fixtures/mockListedTeams.json';
import TeamData from '$lib/entities/TeamData';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const mockTeamTla = 'ARS';

vi.spyOn(Storage.prototype, 'setItem');
vi.spyOn(Storage.prototype, 'getItem');
const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValueOnce({
	json: () => mockTeam
});
mockFetch.mockResolvedValue({ json: () => mockListedTeams });
vi.useFakeTimers().setSystemTime(new Date('2022-10-10T17:17:21.576Z'));

it('Should update a team', async () => {
	const updatedTeam = await handleUpdateTeam(mockUITeam as any);
	expect(global.fetch).toHaveBeenCalledTimes(2);
	expect(global.fetch).toHaveBeenNthCalledWith(2, `${SERVER_URL}`);

	expect(localStorage.setItem).toHaveBeenCalledWith(mockTeamTla, JSON.stringify(mockStoredTeam));
});
