const selector = require('../fixtures/selectors.json');

const viewport = ['macbook-15', 'iphone-6'];

describe('Multi Select ',() => {

  before(function() {
    cy.visit('http://localhost:8000/cypress-tests');
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain', 'Test Page for Cypress');
  });

  viewport.forEach(view => {
    before(function() {
      cy.viewport(view);
    });
    beforeEach(function() {
      cy.reload();
    });

    it(
      'Should display several default values that can be removed ' + view,
     () => {
        cy
          .get(selector.multiSelectDefaultValues)
          .then(function($defaultValue) {
            expect($defaultValue).to.have.length(2);
            expect($defaultValue.eq(0)).to.contain('Purple');
            expect($defaultValue.eq(1)).to.contain('Red');
          });

        cy
          .get(selector.firstMultiValueRemove)
          .click()
          .get(selector.multiSelectDefaultValues)
          .then(function($defaultValue) {
            expect($defaultValue).to.have.length(1);
            expect($defaultValue.eq(0)).to.contain('Red');
          })
          .get(selector.menuMulti)
          .should('not.be.visible');
      }
    );

    it(
      'Should be able to remove values on keyboard actions ' + view,
     () => {
        cy
          .get(selector.multiSelectInput)
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
      }
    );

    it(
      'Should select different options using - click and enter ' + view,
     () => {
        cy
          .get(selector.menuMulti)
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
    });
});