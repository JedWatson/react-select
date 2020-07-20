const selector = require('../fixtures/selectors.json');

const viewport = ['macbook-15', 'iphone-6'];

describe('Single Select',() => {
    before(function() {
      cy.visit('http://localhost:8000/cypress-tests');
      cy.title().should('equal', 'React-Select');
      cy.get('h1').should('contain', 'Test Page for Cypress');
    });
    beforeEach(function() {
      cy.reload();
    });

    describe('Basic',() => {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        // TODO:
        // This test seems to fail when cypress tab is focused.
        // Also, manual testing does not confirm the desired behavior.
        it.skip(
          'Should not display the options menu when touched and dragged ' + view,
        () => {
            cy
              .get(selector.toggleMenuSingle)
              .click()
              .click()
              .get(selector.menuSingle)
              .should('not.be.visible')
              // to be sure it says focus and the menu is closed
              .get(selector.singleSelectSingleInput)
              .trigger('mousedown')
              .get(selector.menuSingle)
              .should('not.be.visible');
          }
        );
        it('Should display a default value ' + view,() => {
          cy
            .get(selector.singleBasicSelect)
            .find(selector.singleValue)
            .should('contain', 'Ocean');
        });

        it('Should expand the menu when expand icon is clicked ' + view,() => {
          cy
            // Menu is not yet open
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('not.exist')
            // A dropdown icon is shown
            .get(selector.singleBasicSelect)
            .find(selector.indicatorDropdown)
            .should('be.visible')
            // Click the icon to open the menu
            .click()
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('exist')
            .should('be.visible')
            .contains('Green');
        });

        it('Should close the menu after selecting an option',() => {
          cy
            .get(selector.singleBasicSelect)
            .find(selector.indicatorDropdown)
            .click()
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('contain', 'Green')
            .contains('Green')
            .click()
            // Value has updated
            .get(selector.singleBasicSelect)
            .find(selector.singleValue)
            .should('contain', 'Green')
            // Menu has closed
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('not.exist');
        });

        it('Should be disabled once disabled is checked ' + view,() => {
          cy
            // Does not start out disabled
            .get(selector.singleBasicSelect)
            // .click()
            .find('input')
            .should('exist')
            .should('not.be.disabled')
            // Disable the select component
            .get(selector.singleBasic)
            .find(selector.checkboxDisable)
            .click()
            // Now the input should be disabled
            .get(selector.singleBasicSelect)
            .click({ force: true })
            .find('input')
            .should('exist')
            .should('be.disabled');
        });

        it('Should filter options when searching ' + view,() => {
          cy
            .get(selector.singleBasicSelect)
            .click()
            .find('input')
            .type('For', { force: true })
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('contain', 'Forest')
            .find(selector.menuOption)
            .should('have.length', 1);
        });

        it('Should show "No options" if searched value is not found  ' + view,() => {
          cy
            .get(selector.singleBasicSelect)
            .click()
            .find('input')
            .type('/', { force: true })
            .get(selector.noOptionsValue)
            .should('contain', 'No options');
        });

        it('Should not clear the value when backspace is pressed ' + view,() => {
          cy
            .get(selector.singleBasicSelect)
            .click()
            .find('input')
            .type('{backspace}', { force: true })
            .get(selector.singleBasicSelect)
            .find(selector.placeholder)
            .should('not.be.visible');
        });
      });
    });

    describe('Grouped',() => {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        it('Should display a default value ' + view,() => {
          cy
            .get(selector.singleGroupedSelect)
            .find(selector.singleValue)
            .should('contain', 'Blue');
        });

        it('Should display group headings in the menu ' + view,() => {
          cy
            .get(selector.singleGroupedSelect)
            .find(selector.indicatorDropdown)
            .click()
            .get(selector.singleGroupedSelect)
            .find(selector.menu)
            .should('be.visible')
            .find(selector.groupHeading)
            .should('have.length', 2);
        });
      });
    });

    describe('Clearable',() => {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        it('Should display a default value ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .find(selector.singleValue)
            .should('contain', 'Blue');
        });

        it('Should display a clear indicator ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .find(selector.indicatorClear)
            .should('be.visible');
        });

        it('Should clear the default value when clear is clicked ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .find(selector.indicatorClear)
            .click()
            .get(selector.singleClearableSelect)
            .find(selector.placeholder)
            .should('be.visible')
            .should('contain', 'Select...');
        });

        // 'backspaceRemovesValue' is true by default
        it('Should clear the value when backspace is pressed ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .click()
            .find('input')
            .type('{backspace}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.placeholder)
            .should('be.visible')
            .should('contain', 'Select...');
        });

        // 'backspaceRemovesValue' is true by default, and delete is included
        it('Should clear the value when delete is pressed ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .click()
            .find('input')
            .type('{del}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.placeholder)
            .should('be.visible')
            .should('contain', 'Select...');
        });

        it('Should not open the menu when a value is cleared with backspace ' + view,() => {
          cy
            .get(selector.singleClearableSelect)
            .click()
            .find('input')
            // Close the menu, but leave focused
            .type('{esc}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.menu)
            .should('not.be.visible')
            // Clear the value, verify menu doesn't pop
            .get(selector.singleClearableSelect)
            .find('input')
            .type('{backspace}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.menu)
            .should('not.be.visible');
        });

        it('Should clear the value when escape is pressed if escapeClearsValue and menu is closed ' + view,() => {
          cy
            // nothing happens if escapeClearsValue is false
            .get(selector.singleClearableSelect)
            .click()
            .find('input')
            // Escape once to close the menu
            .type('{esc}', { force: true })
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('not.be.visible')
            // Escape again to verify value is not cleared
            .get(selector.singleClearableSelect)
            .find('input')
            .type('{esc}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.placeholder)
            .should('not.be.visible')
            // Enable escapeClearsValue and try again, it should clear the value
            .get(selector.singleClearable)
            .find(selector.checkboxEscapeClearsValue)
            .click()
            .get(selector.singleClearableSelect)
            .click()
            .find('input')
            // Escape once to close the menu
            .type('{esc}', { force: true })
            .get(selector.singleBasicSelect)
            .find(selector.menu)
            .should('not.be.visible')
            // Escape again to clear value
            .get(selector.singleClearableSelect)
            .find('input')
            .type('{esc}', { force: true })
            .get(selector.singleClearableSelect)
            .find(selector.placeholder)
            .should('be.visible');
        });
      });
    });
  });
