import type ITeam from '../entities/ITeam';
import Team from '../entities/Team';

export function mapsTeam(team: ITeam): Team {
	return new Team(team);
}
