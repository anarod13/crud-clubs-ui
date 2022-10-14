import type ITeam from './ITeam';
import type { ITeamArea } from './ITeamArea';

const SERVER_URL = 'http://localhost:8080';

export default class Team {
	id: number;
	name: string;
	country: string;
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
	constructor(team: ITeam) {
		this.id = team.id;
		this.name = team.name;
		this.country = team.area.name;
		this.shortName = team.shortName;
		this.tla = team.tla;
		this.crestUrl = `${SERVER_URL}/${team.crestUrl}`;
		this.address = team.address;
		this.phone = team.phone;
		this.website = team.website;
		this.email = team.email;
		this.founded = team.founded;
		this.clubColors = team.clubColors;
		this.venue = team.venue;
		this.lastUpdated = new Date(team.lastUpdated).toLocaleString();
	}
}
