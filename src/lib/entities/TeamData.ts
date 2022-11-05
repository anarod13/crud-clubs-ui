import type ITeam from './ITeam';
import type { ITeamArea } from './ITeamArea';
import type Team from './Team';
import type IActiveCompetition from './IActiveCompetition';
import type ITeamMember from './ITeamMember';

const SERVER_URL = 'http://localhost:8080';
export default class TeamData implements ITeam {
	id: number;
	area: ITeamArea;
	activeCompetitions: IActiveCompetition[];
	squad: ITeamMember[];
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
	constructor(team: Team) {
		this.id = team.id;
		this.area = { id: 2072, name: team.country };
		this.name = team.name;
		this.activeCompetitions = team.activeCompetitions;
		this.squad = team.squad;
		this.shortName = team.shortName;
		this.tla = team.tla;
		this.crestUrl = team.crestUrl && this.getTeamCrestUrl(team.crestUrl);
		this.address = team.address;
		this.phone = team.phone;
		this.website = team.website;
		this.email = team.email;
		this.founded = team.founded;
		this.clubColors = team.clubColors;
		this.venue = team.venue;
		this.lastUpdated = new Date().toISOString();
	}

	getTeamCrestUrl(crestUrl: string) {
		return crestUrl.replace(`${SERVER_URL}/`, '');
	}
}
