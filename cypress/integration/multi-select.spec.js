const selector = require('../fixtures/selectors.json');
const baseUrl = require('../../cypress.json').baseUrl;

const setup = [
  { width: 1440, height: 900, viewport: 'macbook-15', device: 'Laptop' },
  { width: 375, height: 667, viewport: 'iphone-6', device: 'Mobile' },
  { width: 768, height: 1024, viewport: 'ipad-2', device: 'Tablet' },
];

describe('Multi Select', () => {
  before(() => {
    cy.visit(baseUrl);
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain', 'Test Page for Cypress');
  });
  beforeEach(() => {
    cy.reload();
  });

  for (let config of setup) {
    const { viewport } = config;
    it(`Should display several default values that can be removed in view: ${viewport}`, () => {
      cy.get(selector.multiSelectDefaultValues).then(function($defaultValue) {
        expect($defaultValue).to.have.length(2);
        expect($defaultValue.eq(0)).to.contain('Purple');
        expect($defaultValue.eq(1)).to.contain('Red');
      });

      cy.get(selector.firstMultiValueRemove)
        .click()
        .get(selector.multiSelectDefaultValues)
        .then(function($defaultValue) {
          expect($defaultValue).to.have.length(1);
          expect($defaultValue.eq(0)).to.contain('Red');
        })
        .get(selector.menuMulti)
        .should('not.be.visible');
    });

    it(`Should be able to remove values on keyboard actions in view: ${viewport}`, () => {
      cy.get(selector.multiSelectInput)
        .click()
        .type('{backspace}', { force: true })
        .get(selector.multiSelectDefaultValues)
        .then(function($defaultValue) {
          expect($defaultValue).to.have.length(1);
          expect($defaultValue.eq(0)).to.contain('Purple');
        })
        .get(selector.multiSelectInput)
        .type('{backspace}', { force: true })
        .get(selector.placeHolderMulti)
        .should('contain', 'Select...');
    });

    it(`Should select different options using - click and enter in view: ${viewport}`, () => {
      cy.get(selector.menuMulti)
        .should('not.exist')
        .get(selector.toggleMenuMulti)
        .click()
        .get(selector.menuMulti)
        .should('exist')
        .get(selector.menuMulti)
        .should('be.visible')
        .get(selector.menuOption)
        .contains('Orange')
        .click()
        .get(selector.toggleMenuMulti)
        .click()
        .get(selector.menuOption)
        .contains('Yellow')
        .click()
        .get(selector.multiSelectInput)
        .click({ force: true })
        .type('Slate', { force: true })
        .type('{enter}', { force: true })
        .get(selector.multiSelectDefaultValues)
        .then(function($defaultValue) {
          expect($defaultValue).to.have.length(5);
          expect($defaultValue.eq(0)).to.contain('Purple');
          expect($defaultValue.eq(1)).to.contain('Red');
          expect($defaultValue.eq(2)).to.contain('Orange');
          expect($defaultValue.eq(3)).to.contain('Yellow');
          expect($defaultValue.eq(4)).to.contain('Slate');
        });
    });
  }
});
