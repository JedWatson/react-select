const selector = require('../fixtures/selectors.json');

const viewport = ['macbook-15'/*,'ipad-2','iphone-6'*/]; // To be added soon

describe('New Select', function() {
  before(function() {
    cy.visit('http://localhost:8000');
    cy.title().should('equal', 'React-Select');
    cy.get('h1').should('contain','new-select');
  });

  describe('Single Select', function() {
    viewport.forEach((view) => {
      before(function(){
        cy.viewport(view);
      });
      beforeEach(function() {
        cy.reload();
      });
      it('Should display 2 default values ' + view, function() {
        cy
        .get(selector.singleSelectDefaultValues).should('have.length', 2)
        .each(function(element){expect(element).to.contain('Red');});
      });
      it('Should clear the default value ' + view, function() {
        cy
        .get(selector.clearValues).should('have.length', 3).click({ multiple: true })
        .each(function(element){expect(element).to.not.be.visible;}); /* eslint-disable-no-unused-expressions */
      });
      it('Should expand the menu when click on the arrow ' + view, function() {
        cy
        .get(selector.toggleMenus).should('have.length', 3)
        .get(selector.singleSelectSingleInput).should('have.attr', 'aria-expanded', 'false')
        .get(selector.toggleMenuSingle).click()
        .get(selector.singleSelectSingleInput).should('have.attr', 'aria-expanded', 'true')
        .get(selector.menuSingle).should('be.visible')
        .get(selector.menuOption).contains('Green').click()
        .get(selector.singleInputValue).should('contain','Green');
      });
      it('Should expand the menu when enter a value and filter ' + view, function() {
        cy
        .get(selector.singleSelectGroupedInput).click({ force: true }).type('Stra', { force:true })
        .type('{enter}', { force:true })
        .type('{enter}', { force:true })
        .get(selector.singleGroupedInputValue).should('contain','Strawberry');
      });
      it('Should return no options ' + view, function() {
        cy
        .get(selector.singleSelectGroupedInput).click({ force: true }).type('\/', { force:true })
        .get(selector.noOptionsValue).should('contain','No options...');
      });
      it('Should be disabled once disabled is checked ' + view, function(){
        cy
        .get(selector.disabledCheckbox).should('be.visible')
        .get(selector.disabledCheckbox).click()
        .get(selector.toggleMenuSingle).click({ force:true })
        .get(selector.singleSelectSingleInput).should('not.have.attr', 'aria-expanded', 'false')
        .get(selector.menuSingle).should('not.be.visible');
      });
      it('Should display group in the menu ' + view, function() {
        cy
        .get(selector.toggleMenuGrouped).click()
        .get(selector.menuGrouped).should('be.visible')
        .get(selector.groupColor).should('be.visible').and('have.attr', 'aria-expanded', 'true');
      });
    });
  });

  describe('Multi Select ', function(){
    viewport.forEach((view) => {
      before(function(){
        cy.viewport(view);
      });
      beforeEach(function() {
        cy.reload();
      });
      it('Should display several default values and can be cleared ' + view, function(){
        cy
        .get(selector.multiSelectDefaultValues).then(function($defaultValue){
          expect($defaultValue).to.have.length(2);
          expect($defaultValue.eq(0)).to.contain('Purple');
          expect($defaultValue.eq(1)).to.contain('Blue');
        });

        cy
        .get(selector.removeBlue).click()
        .get(selector.multiSelectDefaultValues).then(function($defaultValue){
          expect($defaultValue).to.have.length(1);
          expect($defaultValue.eq(0)).to.contain('Purple');
        })
        .get(selector.menuMulti).should('not.be.visible');
      });
      it('Should select different options using - click and enter ' + view, function(){
        cy
        .get(selector.multiSelectInput).should('have.attr', 'aria-expanded', 'false')
        .get(selector.toggleMenuMulti).click()
        .get(selector.multiSelectInput).should('have.attr', 'aria-expanded', 'true')
        .get(selector.menuMulti).should('be.visible')
        .get(selector.menuOption).contains('Green').click()
        .get(selector.toggleMenuMulti).click()
        .get(selector.menuOption).contains('Yellow').click()
        .get(selector.multiSelectInput).click({ force: true }).type('Grey', { force:true })
        .type('{enter}', { force:true })
        .get(selector.multiSelectDefaultValues)
        .then(function($defaultValue){
          expect($defaultValue).to.have.length(5);
          expect($defaultValue.eq(0)).to.contain('Purple');
          expect($defaultValue.eq(1)).to.contain('Blue');
          expect($defaultValue.eq(2)).to.contain('Green');
          expect($defaultValue.eq(3)).to.contain('Yellow');
          expect($defaultValue.eq(4)).to.contain('Grey');
        });
      });
    });
  });

});
