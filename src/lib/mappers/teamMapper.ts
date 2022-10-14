import type ITeam from '../ITeam';
import Team from '../Team';

export function mapsTeam(team: ITeam): Team {
	return new Team(team);
}
