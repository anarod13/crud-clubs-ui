/// <reference types="cypress" />
import mockListedTeams from '../../fixtures/mockListedTeams.json';

const SERVER_URL = Cypress.env('SERVER_URL');

describe('Teams', () => {
	beforeEach(() => {
		cy.intercept(SERVER_URL, mockListedTeams).as('ListedTeams');
		cy.intercept('DELETE', `${SERVER_URL}/team/ARS/delete`, { statusCode: 200 }).as('deleteTeam');
	});
	it('Should render a list of teams ', () => {
		cy.visit('/');
		cy.wait('@ListedTeams');
		cy.get('.crud-clubs-title').contains('Premier League');
		cy.get('.crud-clubs-team-info').children('p').contains('Currently you have 8 teams listed');
		cy.get('.crud-clubs-add-team-btn').contains('Add Team');
		cy.get('.crud-clubs-team-name-title').contains('Team');
		cy.get('.crud-clubs-team-country-title').contains('Country');
		cy.get('.crud-clubs-actions-title').contains('Actions');
		cy.get('.crud-clubs-team-name').should('have.length', mockListedTeams.length);
		cy.get('.crud-clubs-team-country').should('have.length', mockListedTeams.length);
		mockListedTeams.forEach((listedTeam) => {
			cy.get('.crud-clubs-team-name').contains(listedTeam.name);
			cy.get('.crud-clubs-team-country').contains(listedTeam.area.name);
		});
	});
	it('Should render a pop up to add a team', () => {
		cy.get('.crud-clubs-add-team-btn').click();
		cy.get('.crud-clubs-team-main-info-container').should('be.visible');
		cy.get('input[name=name]').should('be.empty');
		cy.get('input[name=tla]').should('be.empty');
		cy.get('input[name=adress]').should('be.empty');
		cy.get('input[name=phone]').should('be.empty');
		cy.get('input[name=website]').should('be.empty');
		cy.get('input[name=email]').should('be.empty');
		cy.get('input[name=founded]').should('be.empty');
		cy.get('input[name=club-colors]').should('be.empty');
		cy.get('input[name=venue]').should('be.empty');
		cy.get('.crud-clubs-active-competition-details')
			.children('p')
			.contains('No active competitions registered');
		cy.get('.crud-clubs-team-squad').children('p').contains('No team squad registered');
		cy.get('.crud-clubs-edit-btn').first().should('be.disabled');
		cy.get('.crud-clubs-btn.close-modal').click();
	});
	it('Should delete a team', () => {
		cy.get('.crud-clubs-delete-team-btn').first().click();
		cy.get('.crud-clubs-delete-modal-container').should('be.visible');
		cy.get('.crud-clubs-delete-modal-container')
			.children('p')
			.contains('Are you sure you want to delete ARS from the list?');
		cy.get('.crud-clubs-btn').last().contains('CANCEL');
		cy.get('.crud-clubs-btn').first().click();
		cy.wait('@deleteTeam');
		cy.get('.crud-clubs-modal-container').contains('Team successfully deleted!');
		cy.get('.crud-clubs-delete-modal-container').should('not.exist');
		cy.wait(2500);
		cy.get('.crud-clubs-modal-container').should('not.exist');
	});
});
