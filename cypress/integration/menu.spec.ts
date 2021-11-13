import selector from '../fixtures/selectors.json';
import {
  menuBottomPadding,
  menuHeight,
  viewportHeight,
} from '../../docs/menu-tests/menuHeights';

describe('Menus', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, viewportHeight);
    });

    it('1: the menu will fit, do nothing', () => {
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

      cy.document()
        .then((document) => document.documentElement.scrollHeight)
        .then((offsetHeight) => expect(offsetHeight).to.equal(viewportHeight));
    });

    it('2: the menu will fit, if scrolled', () => {
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

      cy.document()
        .then((document) => document.documentElement.scrollHeight)
        .then((offsetHeight) =>
          expect(offsetHeight).to.equal(viewportHeight + 1)
        );
    });

    it('3: the menu will fit, if constrained', () => {
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

      cy.document()
        .then((document) => document.documentElement.scrollHeight)
        .then((offsetHeight) => expect(offsetHeight).to.equal(viewportHeight));
    });
  });
});
