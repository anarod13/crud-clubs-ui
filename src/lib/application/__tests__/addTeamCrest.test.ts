/**
 * @vitest-environment jsdom
 */
import { vi, it, expect } from 'vitest';
import { handleUploadTeamCrest } from '../crudClubs';
import mockUITeam from '../../../../cypress/fixtures/mockUITeam.json';
import mockTeamCrest from '../../../../cypress/fixtures/mockTeamCrest.png';

vi.spyOn(Storage.prototype, 'setItem');
vi.useFakeTimers().setSystemTime(new Date('2022-10-10T17:17:21.576Z'));

const mockFetch = vi.fn();
global.fetch = mockFetch;
mockFetch.mockResolvedValue({ text: () => 'team-crests/ARS-crest-5533.png' });

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const newCrest = new FormData();
newCrest.append('crest', mockTeamCrest);

it('Should request a list of teams', async () => {
	// global.fetch = vi.fn(() =>
	// 	Promise.resolve({
	// 		text: () => Promise.resolve('team-crests/ARS-crest-5533.png')
	// 	})
	// ) as any;
	const newTeam = await handleUploadTeamCrest(mockUITeam as any, newCrest);
	expect(newTeam.crestUrl).toEqual(`${SERVER_URL}/team-crests/ARS-crest-5533.png`);
	expect(global.fetch).toHaveBeenCalledTimes(2);
	expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}/team/${mockUITeam.tla}/upload-crest`, {
		method: 'POST',
		headers: {
			enctype: 'multipart/form-data'
		},
		body: newCrest
	});
	mockUITeam.crestUrl = `${SERVER_URL}/team-crests/ARS-crest-5533.png`;
	expect(localStorage.setItem).toHaveBeenCalledWith(mockUITeam.tla, JSON.stringify(mockUITeam));
});
