import type IListedTeam from '$lib/IListedTeam';
import type ITeamToDelete from '$lib/ITeamToDelete';
import type Team from '$lib/Team';

import { writable, type Writable } from 'svelte/store';

export const listedTeams: Writable<Promise<IListedTeam[]>> = writable();
export const selectedTeam: Writable<Team> = writable();
export const teamToDelete: Writable<ITeamToDelete> = writable();
export const isTeamModalOpen = writable(false);
export const isAlertModalOpen = writable(false);
export const editableTeam = writable(false);
export const newTeam = writable(false);
