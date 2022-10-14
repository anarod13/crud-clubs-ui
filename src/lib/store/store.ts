import type ITeam from '$lib/ITeam';
import { writable, type Writable } from 'svelte/store';

export const selectedTeam: Writable<number> = writable();
export const showTeamModal = writable(false);
export const showAlertModal = writable(false);
export const editableTeam = writable(false);
export const newTeam = writable(false);
