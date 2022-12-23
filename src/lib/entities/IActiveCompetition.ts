import type { ITeamArea } from './ITeamArea';

export default interface IActiveCompetition {
	id: number;
	area: ITeamArea;
	name: string;
	code: string;
	plan: string;
	lastUpdated: string;
}
