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
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(`http://localhost:${Cypress.env('theport') || 3000}`)
  })
  it('basic test to confirm tests run', () => {
    cy.get('header').first().should('include.text', 'CUP STORE')
  })

  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(DELAY).then(() => {
      /* eslint-disable no-unused-expressions */
      expect(consoleError, 'ERRORS FOUND IN YOUR CODE, CHECK THE JS CONSOLE').to.not.be.called;
      expect(consoleWarning, 'WARNINGS FOUND IN YOUR CODE, CHECK THE JS CONSOLE').to.not.be.called;
      expect(consoleLog, 'YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE').to.not.be.called;
    });
  });
})
