export default interface ITeamMember {
	id: number;
	name: string;
	position: string | null;
	dateOfBirth: string;
	countryOfBirth: string;
	nationality: string;
	shirtNumber: number | null;
	role: string;
}
