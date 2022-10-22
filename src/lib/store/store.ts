import type ITeam from '$lib/ITeam';
import type Team from '$lib/Team';
import { writable, type Writable } from 'svelte/store';

export const selectedTeam: Writable<Team> = writable();
export const isTeamModalOpen = writable(false);
export const showAlertModal = writable(false);
export const editableTeam = writable(false);
export const newTeam = writable(false);
