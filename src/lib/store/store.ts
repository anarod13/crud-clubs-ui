import type IListedTeam from '../entities/IListedTeam';
import type ITeamToDelete from '../entities/ITeamToDelete';
import type Team from '../entities/Team';

import { writable, type Writable } from 'svelte/store';

export const listedTeams: Writable<Promise<IListedTeam[]>> = writable();
export const selectedTeam: Writable<Team> = writable();
export const teamToDelete: Writable<ITeamToDelete> = writable();
export const isTeamModalOpen = writable(false);
export const isAlertModalOpen = writable(false);
export const editableTeam = writable(false);
export const newTeam = writable(false);
