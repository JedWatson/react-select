import selector from '../fixtures/selectors.json';
import {
  menuBottomPadding,
  menuHeight,
  minMenuHeight,
  scrollContainerHeight,
  selectHeightWithMenuOpen,
  selectHeightWithMinMenuOpen,
  viewportHeight,
} from '../../docs/menu-tests/menuHeights';

describe('Menus', { scrollBehavior: false }, () => {
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

      cy.get('html').should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
        expect($el).to.have.prop('scrollTop', 0);
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

      cy.get('html').should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight + 1}px`);
        const scrollTop = $el.prop('scrollTop');
        // Firefox has an extra pixel for an unknown reason
        const firefoxAdjustment = 1;
        expect(scrollTop).to.be.oneOf([1, 1 + firefoxAdjustment]);
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

      cy.get('html').should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
        expect($el).to.have.prop('scrollTop', 0);
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

      cy.get('html').should(($el) => {
        expect($el).to.have.css('height', `${viewportHeight}px`);
        expect($el).to.have.prop('scrollTop', 0);
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

      cy.get('html').should(($el) => {
        const spaceAbove = viewportHeight - selectHeightWithMinMenuOpen + 1;
        const scrollHeight = spaceAbove + selectHeightWithMenuOpen;
        const actualScrollHeight = $el.prop('scrollHeight');
        const scrollTop = $el.prop('scrollTop');
        // Firefox has one less pixel for an unknown reason
        const firefoxAdjustment = -1;
        expect(actualScrollHeight).to.be.oneOf([
          scrollHeight,
          scrollHeight + firefoxAdjustment,
        ]);
        expect(scrollTop).to.be.oneOf([
          scrollHeight - viewportHeight,
          scrollHeight - viewportHeight + firefoxAdjustment,
        ]);
      });
    });

    it('the menu will fit in scroll container', () => {
      cy.visit('./cypress-menu-test6');
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

      cy.get(selector.menuTestsScrollContainer).should(($el) => {
        expect($el).to.have.prop('scrollHeight', scrollContainerHeight);
        expect($el).to.have.prop('scrollTop', 0);
      });
    });

    it('the menu will fit in scroll container if scrolled', () => {
      cy.visit('./cypress-menu-test7');
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

      cy.get(selector.menuTestsScrollContainer).should(($el) => {
        const scrollHeight = $el.prop('scrollHeight');
        const scrollTop = $el.prop('scrollTop');
        // Firefox has an extra pixel for an unknown reason
        const firefoxAdjustment = 1;
        expect(scrollHeight).to.be.oneOf([
          scrollContainerHeight + 1,
          scrollContainerHeight + 1 + firefoxAdjustment,
        ]);
        expect(scrollTop).to.be.oneOf([1, 1 + firefoxAdjustment]);
      });
    });
  });
});
