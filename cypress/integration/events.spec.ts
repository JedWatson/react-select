import selector from '../fixtures/selectors.json';
import cypressJson from '../../cypress.json';

describe('event propagation', () => {
  before(() => {
    cy.visit(cypressJson.baseUrl);
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain', 'Test Page for Cypress');
  });

  beforeEach(() => {
    cy.reload();
  });

  it('should open select via value container after a parent prevent defaulted the event', () => {
    cy.get(selector.preventDefaultTest.valueContainer)
      .click()
      .get(selector.preventDefaultTest.menu)
      .should('exist');
  });

  it('should open select via indicator after a parent prevent defaulted the event', () => {
    cy.get(selector.preventDefaultTest.indicator)
      .click()
      .get(selector.preventDefaultTest.menu)
      .should('exist');
  });

  it('should close react calendar when interacting with the select indicator', () => {
    cy.get(selector.bubblingTest.datePickerInput)
      .click()
      .get(selector.bubblingTest.indicator)
      .click()
      .get(selector.bubblingTest.menu)
      .should('exist')
      .get(selector.bubblingTest.datePickerMenu)
      .should('not.exist');
  });

  it('should close react calendar when interacting with the select value container', () => {
    cy.get(selector.bubblingTest.datePickerInput)
      .click()
      .get(selector.bubblingTest.valueContainer)
      .click()
      .get(selector.bubblingTest.menu)
      .should('exist')
      .get(selector.bubblingTest.datePickerMenu)
      .should('not.exist');
  });
});
