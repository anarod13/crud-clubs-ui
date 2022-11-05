import type { ITeamArea } from './ITeamArea';

export default interface IListedTeam {
	id: number;
	area: ITeamArea;
	name: string;
	shortName: string;
	tla: string;
	crestUrl: string | null;
	address: string;
	phone: string | null;
	website: string;
	email: string | null;
	founded: number | null;
	clubColors: string;
	venue: string;
	lastUpdated: string;
}
