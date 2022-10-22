import type ITeam from '$lib/ITeam';
import type { ITeamArea } from '$lib/ITeamArea';
import type Team from '$lib/Team';
export default class TeamData implements ITeam {
	id: number;
	area: ITeamArea;
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
	constructor(team: Team) {
		this.id = team.id;
		this.area = { id: 2072, name: team.country };
		this.name = team.name;
		this.shortName = team.shortName;
		this.tla = team.tla;
		this.crestUrl = team.crestUrl;
		this.address = team.address;
		this.phone = team.phone;
		this.website = team.website;
		this.email = team.email;
		this.founded = team.founded;
		this.clubColors = team.clubColors;
		this.venue = team.venue;
		this.lastUpdated = new Date().toISOString();
	}
}
