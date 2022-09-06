import type ITeam from '$lib/ITeam';
import { writable, type Writable } from 'svelte/store';

export const selectedTeam: Writable<ITeam> = writable();
export const showTeamDetails = writable(false);
