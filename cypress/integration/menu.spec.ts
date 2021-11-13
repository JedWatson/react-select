import selector from '../fixtures/selectors.json';
import {
  menuBottomPadding,
  menuHeight,
  minMenuHeight,
  selectHeightWithMenuOpen,
  selectHeightWithMinMenuOpen,
  viewportHeight,
} from '../../docs/menu-tests/menuHeights';

describe('Menus', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, viewportHeight);
    });

    it('the menu will fit', () => {
      cy.visit('./cypress-menu-test1');
      cy.get(selector.menuTestsSelect)
        .find(selector.indicatorDropdown)
        .click()
        .get(selector.menuTestsSelect)
        .find(selector.menu)
        .should('exist')
        .should('be.visible')
        .should(($el) => {
          expect($el).to.have.css('height', `${menuHeight}px`);
        });

      cy.get(selector.menuTestsContainer).should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
      });
    });

    it('the menu will fit if scrolled', () => {
      cy.visit('./cypress-menu-test2');
      cy.get(selector.menuTestsSelect)
        .find(selector.indicatorDropdown)
        .click()
        .get(selector.menuTestsSelect)
        .find(selector.menu)
        .should('exist')
        .should('be.visible')
        .should(($el) => {
          expect($el).to.have.css('height', `${menuHeight}px`);
        });

      cy.get(selector.menuTestsContainer).should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight + 1}px`);
      });
    });

    it('the menu will fit if constrained', () => {
      cy.visit('./cypress-menu-test3');
      cy.get(selector.menuTestsSelect)
        .find(selector.indicatorDropdown)
        .click()
        .get(selector.menuTestsSelect)
        .find(selector.menu)
        .should('exist')
        .should('be.visible')
        .should(($el) => {
          expect($el).to.have.css(
            'height',
            `${menuHeight - menuBottomPadding - 1}px`
          );
        });

      cy.get(selector.menuTestsContainer).should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
      });
    });

    it('the menu will fit if constrained - Case 2', () => {
      cy.visit('./cypress-menu-test4');
      cy.get(selector.menuTestsSelect)
        .find(selector.indicatorDropdown)
        .click()
        .get(selector.menuTestsSelect)
        .find(selector.menu)
        .should('exist')
        .should('be.visible')
        .should(($el) => {
          expect($el).to.have.css(
            'height',
            `${minMenuHeight - menuBottomPadding}px`
          );
        });

      cy.get(selector.menuTestsContainer).should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
      });
    });

    it('allow browser to increase scrollable area', () => {
      cy.visit('./cypress-menu-test5');
      cy.get(selector.menuTestsSelect)
        .find(selector.indicatorDropdown)
        .click()
        .get(selector.menuTestsSelect)
        .find(selector.menu)
        .should('exist')
        .should('be.visible')
        .should(($el) => {
          expect($el).to.have.css('height', `${menuHeight}px`);
        });

      cy.get(selector.menuTestsContainer).should(($el) => {
        const spaceAbove = viewportHeight - selectHeightWithMinMenuOpen + 1;
        expect($el).to.have.prop(
          'scrollHeight',
          spaceAbove + selectHeightWithMenuOpen
        );
      });
    });
  });
});
