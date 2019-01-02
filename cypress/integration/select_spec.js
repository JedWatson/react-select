const selector = require('../fixtures/selectors.json');

const viewport = ['macbook-15', 'iphone-6'];

describe('New Select', function() {
  before(function() {
    cy.visit('http://localhost:8000/cypress-tests');
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain', 'Test Page for Cypress');
  });

  describe('Single Select', function() {
    beforeEach(function() {
      cy.reload();
    });

    viewport.forEach(view => {
      before(function() {
        cy.viewport(view);
      });

      // This test seems to fail when cypress tab is focused.
      // Also, manual testing does not confirm the desired behavior
      it.skip(
        'Should not display the options menu when touched and dragged ' + view,
        function() {
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
    });

    describe('Basic', function() {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        it('Should display a default value ' + view, function() {
          cy
            .get(selector.singleBasicSelect)
            .find(selector.singleValue)
            .should('contain', 'Ocean');
        });

        it('Should expand the menu when expand icon is clicked ' + view, function() {
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

        it('Should close the menu after selecting an option', function() {
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

        it('Should be disabled once disabled is checked ' + view, function() {
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

        it('Should filter options when searching ' + view, function() {
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

        it('Should show "No options" if searched value is not found  ' + view, function() {
          cy
            .get(selector.singleBasicSelect)
            .click()
            .find('input')
            .type('/', { force: true })
            .get(selector.noOptionsValue)
            .should('contain', 'No options');
        });

        it('Should not clear the value when backspace is pressed ' + view, function() {
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

    describe('Grouped', function() {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        it('Should display a default value ' + view, function() {
          cy
            .get(selector.singleGroupedSelect)
            .find(selector.singleValue)
            .should('contain', 'Blue');
        });

        it('Should display group headings in the menu ' + view, function() {
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

    describe('Clearable', function() {
      viewport.forEach(view => {
        before(function() {
          cy.viewport(view);
        });

        it('Should display a default value ' + view, function() {
          cy
            .get(selector.singleClearableSelect)
            .find(selector.singleValue)
            .should('contain', 'Blue');
        });

        it('Should display a clear indicator ' + view, function() {
          cy
            .get(selector.singleClearableSelect)
            .find(selector.indicatorClear)
            .should('be.visible');
        });

        it('Should clear the default value when clear is clicked ' + view, function() {
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
        it('Should clear the value when backspace is pressed ' + view, function() {
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
        it('Should clear the value when delete is pressed ' + view, function() {
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

        it('Should not open the menu when a value is cleared with backspace ' + view, function() {
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

        it('Should clear the value when escape is pressed if escapeClearsValue and menu is closed ' + view, function() {
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

  describe('Multi Select ', function() {
    viewport.forEach(view => {
      before(function() {
        cy.viewport(view);
      });
      beforeEach(function() {
        cy.reload();
      });
      it(
        'Should display several default values that can be removed ' + view,
        function() {
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
        function() {
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
        function() {
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
        }
      );
    });
  });
});
