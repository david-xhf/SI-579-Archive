// Monitor console warnings, errors, and logs
let consoleError;
let consoleWarning;
let consoleLog;

Cypress.on('window:before:load', (win) => {
  consoleError = cy.spy(win.console, 'error');
  consoleWarning = cy.spy(win.console, 'warn');
  consoleLog = cy.spy(win.console, 'log');
});
const DELAY = 1000;

describe('Basic Tests', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${Cypress.env('theport') || 8080}`)
  })
  it('has a title', () => {

    const boxSelector = (row, column) => `[data-row="${row}"][data-column="${column}"][tabindex]`
    const fillBoxSelector = (row, column) => `[data-row="${row}"][data-column="${column}"][tabindex].fill-black`
    const up = (selector) => cy.get(selector).type('{upArrow}', {force: true});
    const down = (selector) => cy.get(selector).type('{downArrow}', {force: true});
    const left = (selector) => cy.get(selector).type('{leftArrow}', {force: true});
    const right = (selector) => cy.get(selector).type('{rightArrow}', {force: true});

    cy.get('h1').should('include.text', 'Problem Set 2');
    cy.get('main').should('include.text', 'Click a square');

    cy.get(boxSelector(2, 2)).should('exist');
    cy.get(boxSelector(2, 2)).first().focus();
    cy.get(boxSelector(2, 2)).should('have.class', 'fill-black');
    right(boxSelector(2, 2));
    up(boxSelector(2, 3));
    cy.get('.fill-black').should('have.length', 3);
    const drawn = [[2,2], [2,3], [1,3]];
    drawn.forEach((coordinates) => {
      cy.get(`${boxSelector(...coordinates)}.fill-black`).should('exist');
    })
    // We are at the top, so no additional box should be drawn.
    cy.get(boxSelector(1, 3)).type('{upArrow}');
    cy.get('.fill-black').should('have.length', 3);
    drawn.forEach((coordinates) => {
      cy.get(`${boxSelector(...coordinates)}.fill-black`).should('exist');
    })
    cy.get(boxSelector(1, 3)).first().focus()
    for (let i = 1; i < 6; i++) {
        down(boxSelector(i, 3))
    }
    cy.get('.fill-black').should('have.length', 7);
    const moreDrawn = [...drawn, [2,3], [4,3], [5,3], [6,3]];
    moreDrawn.forEach((coordinates) => {
      cy.get(fillBoxSelector(...coordinates)).should('exist');
    })
    down(boxSelector(6, 3))
    down(boxSelector(7, 3))
    cy.get('.fill-black').should('have.length', 8);
    [...moreDrawn, [7,3]].forEach((coordinates) => {
      cy.get(fillBoxSelector(...coordinates)).should('exist');
    })
    cy.get('#enable-drawing').uncheck();
    right(boxSelector(7, 3))
    cy.get(boxSelector(7,4)).should('be.focused');
    cy.get(boxSelector(7,4)).should('not.have.class', 'fill-black');

    cy.get('.fill-black').should('have.length', 8);
    right(boxSelector(7, 4))
    cy.get(boxSelector(7,5)).should('be.focused');
    cy.get(boxSelector(7,5)).should('not.have.class', 'fill-black');
    cy.get('.fill-black').should('have.length', 8);
    cy.get('#erase').click();
    cy.get('.fill-black').should('have.length', 0);
  })
  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.
    cy.wait(DELAY).then(() => {
      /* eslint-disable no-unused-expressions */
      expect(consoleError, 'ERRORS FOUND IN YOUR CODE, CHECK THE JS CONSOLE').to.not.be.called;
      expect(consoleWarning, 'WARNINGS FOUND IN YOUR CODE, CHECK THE JS CONSOLE').to.not.be.called;
      expect(consoleLog, 'YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE').to.not.be.called;
    });
  });
})
