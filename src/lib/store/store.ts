import type IListedTeam from '../entities/IListedTeam';

import { writable, type Writable } from 'svelte/store';
import type IAlertMessage from '$lib/entities/IAlertMessage';

export const listedTeams: Writable<Promise<IListedTeam[]>> = writable();
export const selectedTeam: Writable<string> = writable();
export const isTeamModalOpen = writable(false);
export const isDeleteAlertModalOpen = writable(false);
export const isAlertModalVisible = writable(false);
export const alertMessage: Writable<keyof IAlertMessage> = writable();
export const editableTeam = writable(false);
export const newTeam = writable(false);
