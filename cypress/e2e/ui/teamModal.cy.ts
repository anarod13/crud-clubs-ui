/// <reference types="cypress" />
import mockListedTeams from '../../fixtures/mockListedTeams.json';
import mockTeam from '../../fixtures/mockTeam.json';
import mockEditedTeam from '../../fixtures/mockEditedTeam.json';

const SERVER_URL = Cypress.env('SERVER_URL');

describe('Teams', () => {
	beforeEach(() => {
		cy.intercept(SERVER_URL, mockListedTeams).as('ListedTeams');
		cy.intercept(`${SERVER_URL}/team/${mockTeam.tla}`, mockTeam).as('teamData');
		cy.intercept('PATCH', `${SERVER_URL}/team/${mockTeam.tla}/update`, mockEditedTeam).as(
			'updateTeam'
		);
	});
	it('Should render modal with team data not editable', () => {
		cy.visit('/');
		cy.get('.crud-clubs-btn.see-team-btn').first().click();
		cy.get('.crud-clubs-team-modal').children('div').first().contains('Loading...');
		cy.wait('@teamData');
		const inputs = [];
		cy.get('input')
			.each(($input) => inputs.push($input.attr('readonly')))
			.then(() => {
				inputs.forEach((input) => {
					expect(input).to.equal('readonly');
				});
			});
		cy.get('.crud-clubs-team-modal').children('h2').contains(mockTeam.name);
		cy.get('input[name=tla]').invoke('val').should('contain', mockTeam.tla);
		cy.get('input[name=adress]').invoke('val').should('contain', mockTeam.address);
		cy.get('input[name=phone]').invoke('val').should('contain', mockTeam.phone);
		cy.get('input[name=website]').invoke('val').should('contain', mockTeam.website);
		cy.get('input[name=email]').invoke('val').should('contain', mockTeam.email);
		cy.get('input[name=founded]').invoke('val').should('contain', mockTeam.founded);
		cy.get('input[name=club-colors]').invoke('val').should('contain', mockTeam.clubColors);
		cy.get('input[name=venue]').invoke('val').should('contain', mockTeam.venue);
		cy.get('input[name=last-updated]')
			.invoke('val')
			.should('contain', new Date(mockTeam.lastUpdated).toLocaleString());
		cy.get('.crud-clubs-active-competition-details')
			.children('tr')
			.should('have.length', mockTeam.activeCompetitions.length + 1);
		mockTeam.activeCompetitions.forEach((activeCompetition, i) => {
			cy.get('.crud-clubs-active-competition-details>tr>td>input')
				.eq(i + i * 3)
				.invoke('val')
				.should('contain', activeCompetition.name);
			cy.get('.crud-clubs-active-competition-details>tr>td>input')
				.eq(i + 1 + i * 3)
				.invoke('val')
				.should('contain', activeCompetition.area.name);
			cy.get('.crud-clubs-active-competition-details>tr>td>input')
				.eq(i + 2 + i * 3)
				.invoke('val')
				.should('contain', activeCompetition.code);
			cy.get('.crud-clubs-active-competition-details>tr>td>input')
				.eq(i + 3 + i * 3)
				.invoke('val')
				.should('contain', activeCompetition.plan);
		});
		cy.get('.crud-clubs-team-squad')
			.children('tr')
			.should('have.length', mockTeam.squad.length + 1);
		mockTeam.squad.forEach((teamMember, i) => {
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + i * 6)
				.invoke('val')
				.should('contain', teamMember.name);
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 1 + i * 6)
				.invoke('val')
				.should('contain', teamMember.position == null ? '' : teamMember.position);
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 2 + i * 6)
				.invoke('val')
				.should('contain', new Date(teamMember.dateOfBirth).toLocaleDateString());
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 3 + i * 6)
				.invoke('val')
				.should('contain', teamMember.countryOfBirth);
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 4 + i * 6)
				.invoke('val')
				.should('contain', teamMember.nationality);
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 5 + i * 6)
				.invoke('val')
				.should('contain', teamMember.shirtNumber == null ? '' : teamMember.shirtNumber);
			cy.get('.crud-clubs-team-squad>tr>td>input')
				.eq(i + 6 + i * 6)
				.invoke('val')
				.should('contain', teamMember.role);
		});
	});
	it('Should allow edition in team modal', () => {
		cy.get('.crud-clubs-btn.edit-btn').click();
		cy.get('input[name=phone]').clear().type('555');
		cy.get('input[name=website]').clear().type('555');
		cy.get('.crud-clubs-btn.save-btn').click();
		cy.get('.crud-clubs-modal-container').contains('Changes in team saved!');
		cy.wait(2500);
		cy.get('.crud-clubs-modal-container').should('not.exist');
		cy.get('input[name=phone]').invoke('val').should('contain', '555');
		cy.get('input[name=website]').invoke('val').should('contain', '555');
	});
});
