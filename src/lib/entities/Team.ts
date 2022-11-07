import type IActiveCompetition from './IActiveCompetition';
import type ITeamMember from './ITeamMember';
import type ITeam from './ITeam';

const SERVER_URL = 'http://localhost:8080';

export default class Team {
	id: number;
	name: string;
	country: string;
	activeCompetitions: IActiveCompetition[];
	squad: ITeamMember[];
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
	lastUpdated: string | null;
	constructor(team: ITeam) {
		this.id = team.id;
		this.name = team.name;
		this.activeCompetitions = team.activeCompetitions;
		this.squad = this.mapTeamSquad(team.squad);
		this.country = team.area.name;
		this.shortName = team.shortName;
		this.tla = team.tla;
		this.crestUrl = team.crestUrl && `${SERVER_URL}/${team.crestUrl}`;
		this.address = team.address;
		this.phone = team.phone;
		this.website = team.website;
		this.email = team.email;
		this.founded = team.founded;
		this.clubColors = team.clubColors;
		this.venue = team.venue;
		this.lastUpdated = new Date(team.lastUpdated).toLocaleString();
	}

	mapTeamSquad(teamSquad: ITeamMember[]) {
		teamSquad.forEach(
			(teamMember) =>
				(teamMember.dateOfBirth = new Date(teamMember.dateOfBirth).toLocaleDateString())
		);
		return teamSquad;
	}
}
