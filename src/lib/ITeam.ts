import type IActiveCompetition from './entities/IActiveCompetition';
import type ITeamMember from './entities/ITeamMember';
import type { ITeamArea } from './ITeamArea';

export default interface ITeam {
	id: number;
	area: ITeamArea;
	activeCompetitions: IActiveCompetition[];
	squad: ITeamMember[];
	name: string;
	shortName: string;
	tla: string;
	crestUrl: string;
	address: string;
	phone: string | null;
	website: string;
	email: string | null;
	founded: number | null;
	clubColors: string;
	venue: string;
	lastUpdated: string;
}
