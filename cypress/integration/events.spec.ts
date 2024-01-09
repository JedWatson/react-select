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

  it('should open a select that had a click event in the capture phase default prevented', () => {
    cy.get(selector.preventDefaultTest.valueContainer)
      .click()
      .get(selector.preventDefaultTest.menu)
      .should('exist');
  });
});
