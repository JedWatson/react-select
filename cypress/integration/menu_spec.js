import baseSelectors from '../fixtures/selectors.json';

const selector = {
  caseDefault: '[data-cy="case-default"]',
  caseExpandDown: '[data-cy="case-expand-down"]',
  scrollContainer: '[data-cy="scroll-container"]',
};

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

describe('Menus', () => {
  before(function() {
    cy.visit('http://localhost:8000/cypress-menu-tests');
  });

  it('test page renders successfully', () => {
    cy.get('h1').should('contain', 'Test Page for React-Select Menus');
  });

  describe('Inside scroll containers', () => {
    describe('by default', () => {
      it('menu should be visible when select is clicked', () => {
        cy.get(selector.caseDefault)
          .find('.react-select__control')
          .click()
          .get(selector.caseDefault)
          .find(baseSelectors.menu)
          .should('be.visible');
      });
    });

    describe('At bottom of container', () => {
      it('menu should be visible when select is clicked and should expand container', () => {
        cy.get(selector.caseExpandDown)
          .find(selector.scrollContainer)
          .then(scrollContainer => {
            expect(scrollContainer).to.have.length(1);
            const scrollContainerElement = scrollContainer[0];
            // Start out at top
            expect(scrollContainerElement.scrollTop).to.equal(0);
            // Save height so we can tell if it grows later
            const originalHeight = scrollContainerElement.scrollHeight;

            cy.get(selector.caseExpandDown)
              .find('.react-select__control')
              .click()
              .get(selector.caseExpandDown)
              .find(baseSelectors.menu)
              .should('be.visible')
              .then(() => {
                // Make sure the container has expanded
                expect(scrollContainerElement.scrollHeight).to.be.gt(
                  originalHeight
                );
                // And that it's not scrolled to top anymore
                expect(scrollContainerElement.scrollTop).to.be.gt(0);
              });
          });
      });
    });
  });
});
