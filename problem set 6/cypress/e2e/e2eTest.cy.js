import {defaultTasks} from "../../src/fixtures/defaultTasks";

// Monitor console warnings, errors, and logs
let consoleError;
let consoleWarning;
let consoleLog;

const description = '#root > main > section > div > input.form-control.w-25[placeholder="Task Description"][type="text"]';
const date = '#root > main > section > div > input[type="date"].form-control:nth-child(2)';
const time = '#root > main > section > div > input[type="time"].form-control:nth-child(3)';

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
  it('has a title', () => {
    cy.get('h1').first().should('include.text', 'PS6')
  })

  describe('Expected default state', () => {
    it ('has the expected default tasks', () => {
      defaultTasks.forEach((task, index) => {
        cy.get(`#root > main > ul > li:nth-child(${index + 1})`).should(($li) => {
          expect($li.html()).to.equal(`${task.task}<span class="px-2">${task.date} ${task.time}</span><button class="btn btn-sm btn-danger done" type="button">Done</button>`)
        })
      });
    })
    const inputs = [
      {
        test: 'description input',
        selector: '#root > main > section > div > input.form-control.w-25[placeholder="Task Description"][type="text"]',
      },
      {
        test: 'date input',
        selector: '#root > main > section > div > input[type="date"].form-control:nth-child(2)',
      },
      {
        test: 'time input',
        selector: '#root > main > section > div > input[type="time"].form-control:nth-child(3)',
      }
    ];
    inputs.forEach((testCase) => {
      it(`${testCase.test} exists with expected markup, and defaults to empty`, () => {
        cy.get(testCase.selector).should($input => {
          expect($input.val()).to.equal('', `${testCase.test} is empty`)
        })
      })
    });
    it('local storage tasks are null by default', () => {
      expect(localStorage.getItem('my-todo-items')).to.be.null;
    })
    it('has a disabled button to begin with', () => {
      cy.get('#root > main > section > div > button').should('be.disabled');
    })
    it('has 13 "done" buttons', () => {
      cy.get('button.btn.btn-sm.btn-danger.done').should('have.length', 13);
    })
  })

  describe('remove item from defaults', () => {
    it ('remove items after clicking done and updates localstorage', () => {
      const tasksCopy = defaultTasks.filter((task) => task.task !== 'Purchase apple');
      expect(tasksCopy.length).to.equal(defaultTasks.length - 1)
      cy.get('#root > main > ul > li:nth-child(3) > button').click();
      tasksCopy.forEach((task, index) => {
        cy.get(`#root > main > ul > li:nth-child(${index + 1})`).should(($li) => {
          expect($li.html()).to.equal(`${task.task}<span class="px-2">${task.date} ${task.time}</span><button class="btn btn-sm btn-danger done" type="button">Done</button>`)
        })
      });
      it('local storage knows an item was removed', () => {
        expect(localStorage.getItem('my-todo-items')).to.deep.equal(tasksCopy);
      })
    })
  })

  describe('add item with description and date', () => {
    it ('can add an item with description and date', () => {
      cy.get(description).type('another task i have added');
      cy.get(date).type('2023-03-30');
      cy.get('#root > main > section > div > button').should('not.be.disabled');
      cy.get('#root > main > section > div > button').click();
      const withAddedTask = [{task: 'another task i have added', date: '2023-03-30', 'time': 'ASAP' },...defaultTasks];
      expect(withAddedTask.length).to.equal(defaultTasks.length + 1)
      let tries = 0;
      cy.get('#root > main > ul > li').should('have.length', 14)
      withAddedTask.forEach((task, index) => {
        cy.get(`#root > main > ul > li:nth-child(${index + 1})`).should(($li) => {
          expect($li.html()).to.equal(`${task.task}<span class="px-2">${task.date} ${task.time}</span><button class="btn btn-sm btn-danger done" type="button">Done</button>`)
        })
      });

      cy.window().then(
        window => {
          const stored = JSON.parse(localStorage.getItem('my-todo-items')).map(task => ({task: task.task, date: task.date, time: task.time}));
          const filtered = withAddedTask.map(task => ({task: task.task, date: task.date, time: task.time}))
          expect(stored).to.deep.equal(filtered, 'local storage sees the new item.')
        }
      );
    })
    it ('can add an item with description, date, and time', () => {
      cy.get(description).type('another task with time');
      cy.get(date).type('2023-06-30');
      cy.get(time).type('10:13:00');

      cy.get('#root > main > section > div > button').should('not.be.disabled');
      cy.get('#root > main > section > div > button').click();
      const withAddedTask = [{task: 'another task with time', date: '2023-06-30', 'time': '10:13:00' },...defaultTasks];
      expect(withAddedTask.length).to.equal(defaultTasks.length + 1)
      let tries = 0;
      cy.get('#root > main > ul > li').should('have.length', 14)
      withAddedTask.forEach((task, index) => {
        cy.get(`#root > main > ul > li:nth-child(${index + 1})`).should(($li) => {
          expect($li.html()).to.equal(`${task.task}<span class="px-2">${task.date} ${task.time}</span><button class="btn btn-sm btn-danger done" type="button">Done</button>`)
        })
      });

      cy.window().then(
        window => {
          const stored = JSON.parse(localStorage.getItem('my-todo-items')).map(task => ({task: task.task, date: task.date, time: task.time}));
          const filtered = withAddedTask.map(task => ({task: task.task, date: task.date, time: task.time}))
          expect(stored).to.deep.equal(filtered, 'local storage sees the new item.')
        }
      );
    })
  })

  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.

      // Confirm there are no console log/warning/errors after every test iteration.
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(DELAY).then(() => {
        if(consoleLog.called) {
          throw new Error('YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE \n'.repeat(100))
        }
        if(consoleError.called) {
          throw new Error('ERRORS FOUND IN YOUR CODE, CHECK THE JS CONSOLE. THOSE NEED TO BE FIXED BEFORE TESTS WILL WORK. \n'.repeat(100))
        }
        if(consoleWarning.called) {
          throw new Error('WARNINGS FOUND IN YOUR CODE, CHECK THE JS CONSOLE YOU NEED TO FIX THOSE FOR TESTS TO PASS \n'.repeat(100))
        }
      });
  });
})
