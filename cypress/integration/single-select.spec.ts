import selector from '../fixtures/selectors.json';
import cypressJson from '../../cypress.json';

const setup = [
  {
    width: 1440,
    height: 900,
    viewport: 'macbook-15' as const,
    device: 'Laptop',
  },
  { width: 375, height: 667, viewport: 'iphone-6' as const, device: 'Mobile' },
  { width: 768, height: 1024, viewport: 'ipad-2' as const, device: 'Tablet' },
];

describe('Single Select', () => {
  before(() => {
    cy.visit(cypressJson.baseUrl);
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain', 'Test Page for Cypress');
  });

  for (let config of setup) {
    const { viewport } = config;

    context(`Basic in view: ${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      beforeEach(() => {
        cy.reload();
      });

      // TODO:
      // This test seems to fail when cypress tab is focused.
      // Also, manual testing does not confirm the desired behavior.
      it.skip(`Should not display the options menu when touched and dragged in view: ${viewport}`, () => {
        cy.get(selector.toggleMenuSingle)
          .click()
          .click()
          .get(selector.menuSingle)
          .should('not.be.visible')
          // to be sure it says focus and the menu is closed
          .get(selector.singleSelectSingleInput)
          .trigger('mousedown')
          .get(selector.menuSingle)
          .should('not.be.visible');
      });
      it(`Should display a default value in view: ${viewport}`, () => {
        cy.get(selector.singleBasicSelect)
          .find(selector.singleValue)
          .should('contain', 'Ocean');
      });

      it(`Should expand the menu when expand icon is clicked in view: ${viewport}`, () => {
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

      it(`Should close the menu after selecting an option in view: ${viewport}`, () => {
        cy.get(selector.singleBasicSelect)
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

      it(`Should be disabled once disabled is checked in view: ${viewport}`, () => {
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

      it(`Should filter options when searching in view: ${viewport}`, () => {
        cy.get(selector.singleBasicSelect)
          .click()
          .find('input')
          .type('For', { force: true })
          .get(selector.singleBasicSelect)
          .find(selector.menu)
          .should('contain', 'Forest')
          .find(selector.menuOption)
          .should('have.length', 1);
      });

      it(`Should show "No options" if searched value is not found  in view: ${viewport}`, () => {
        cy.get(selector.singleBasicSelect)
          .click()
          .find('input')
          .type('/', { force: true })
          .get(selector.noOptionsValue)
          .should('contain', 'No options');
      });

      it(`Should not clear the value when backspace is pressed in view: ${viewport}`, () => {
        cy.get(selector.singleBasicSelect)
          .click()
          .find('input')
          .type('{backspace}', { force: true })
          .get(selector.singleBasicSelect)
          .find(selector.placeholder)
          .should('not.be.visible');
      });
    });

    context(`Grouped in view: ${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      beforeEach(() => {
        cy.reload();
      });

      it(`Should display a default value in view: ${viewport}`, () => {
        cy.get(selector.singleGroupedSelect)
          .find(selector.singleValue)
          .should('contain', 'Blue');
      });

      it(`Should display group headings in the menu in view: ${viewport}`, () => {
        cy.get(selector.singleGroupedSelect)
          .find(selector.indicatorDropdown)
          .click()
          .get(selector.singleGroupedSelect)
          .find(selector.menu)
          .should('be.visible')
          .find(selector.groupHeading)
          .should('have.length', 2);
      });

      it(`Should focus next option on down arrow key press: ${viewport}`, () => {
        cy.get(selector.singleGroupedSelect)
          .click()
          .find('input')
          .type('{downarrow}', { force: true })
          .get(selector.focusedOption)
          .should('exist');
      });
    });

    context(`Clearable in view: ${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      beforeEach(() => {
        cy.reload();
      });

      it(`Should display a default value in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
          .find(selector.singleValue)
          .should('contain', 'Blue');
      });

      it(`Should display a clear indicator in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
          .find(selector.indicatorClear)
          .should('be.visible');
      });

      it(`Should clear the default value when clear is clicked in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
          .find(selector.indicatorClear)
          .click()
          .get(selector.singleClearableSelect)
          .find(selector.placeholder)
          .should('be.visible')
          .should('contain', 'Select...');
      });

      // 'backspaceRemovesValue' is true by default
      it(`Should clear the value when backspace is pressed in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
          .click()
          .find('input')
          .type('{backspace}', { force: true })
          .get(selector.singleClearableSelect)
          .find(selector.placeholder)
          .should('be.visible')
          .should('contain', 'Select...');
      });

      // 'backspaceRemovesValue' is true by default, and delete is included
      it(`Should clear the value when delete is pressed in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
          .click()
          .find('input')
          .type('{del}', { force: true })
          .get(selector.singleClearableSelect)
          .find(selector.placeholder)
          .should('be.visible')
          .should('contain', 'Select...');
      });

      it(`Should not open the menu when a value is cleared with backspace in view: ${viewport}`, () => {
        cy.get(selector.singleClearableSelect)
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

      it(`Should clear the value when escape is pressed if escapeClearsValue and menu is closed in view: ${viewport}`, () => {
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
  }
});
