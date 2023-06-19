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


describe('Test all', function() {
  beforeEach(function() {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test.
    cy.visit(`http://localhost:${Cypress.env('theport') || 8080}`)


  })

  it('has a title so we know tests work in general', () => {
    cy.get('h1').should('include.text', 'Midterm 1')
  })

  describe('problem1', () => {
    it ('button text content goes up by one every time it is clicked', () => {
      cy.get('#click-count').should('have.text', 0);
      cy.get('#click-count').should($el => {
        expect($el.text()).to.equal(`${0}`, 'Button starts at 0');
      })
      for (let i = 1; i < 6; i++) {
        cy.get('#click-count').click();
        cy.get('#click-count').should($el => {
          expect($el.text()).to.equal(`${i}`, `Click ${i} time, button says ${i}`)
        })
      }
    })

  })

  describe('problem2',()=>{
    it('the counter starts with a ? then counts up',()=>{
      let count
      cy.get('output#counter').should(e=>{
        expect(e.text()).to.equal('?','The output should be ? at the beginning')
      })
      cy.get('button#start-counter').click()
      .then(()=>{
        cy.get('output#counter').should(e=>{
          expect(e.text()).not.equal('?','Should start counting after clicking the start counter button')
          count=parseInt(e.text(), 10)
          expect(count).to.be.a('number', 'the counter should only be displaying a numeric value')
        })
        cy.wait(1500)
        cy.get('output#counter').should(e=>{
          let now = parseInt(e.text(), 10)
          expect(now).to.be.a('number', 'the counter should only be displaying a numeric value')
          expect(now).to.gt(count,'The number should be counting up')
          expect(e.text().length).to.lt(3, `The counter should not have counted beyond a two digit number`)
        })
      })
    })

    it('displays the correct count after refreshing the page',()=>{
      let count
      cy.get('#after-refresh-count').should('have.value','')
      cy.get('button#start-counter').click()
      .then(()=>{
        cy.wait(1500)
        cy.get('output#counter').should(e=>{
          count=parseInt(e.text(), 10)
          expect(count).to.be.a('number', 'the counter should only be displaying a numeric value')
        })
        cy.reload()
      })
      .then(()=>{
        cy.get('#after-refresh-count').should(e=>{
          let refresh = parseInt(e.text(), 10)
          expect(refresh).to.be.a('number', 'the counter should only be displaying a numeric value')
          expect(refresh).to.equal(count,'After refreshing the page, should display the correct counts.')
        })
      })
    })

    it('has the counter value in local storage as item "refreshCount"',()=>{
      cy.get('button#start-counter').click()
      .then(()=>{
        cy.wait(1500)
        cy.get('output#counter').should(e=>{
          let storage = parseInt(localStorage.getItem('refreshCount'))
          let count=parseInt(e.text())
          expect(count).to.equal(storage,'should store the count to the local storage when counting')
        })
        cy.reload()
      })
      .then(()=>{
        expect(localStorage.getItem('refreshCount')).to.equal(null,'after the "refreshCount" local storage is used on pageload it should be emptied')
      })
    })
  })

    describe('problem3',()=>{
      it('check validation when form fields are empty',()=>{
        cy.get('#form-status').should(e=>{
          expect(e.text().trim()).to.equal('', 'form status should be empty at first')
        })
        cy.get('button#submit-form').click()
        .then(()=>{
          cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('All form fields are required','expect to display "All form fields are required" when there are fields not filled')
          expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when there are fields not filled')
        })
        })

      })

      it('check validation when password and confirm password do not match',()=>{
        cy.get('input#email').type('example@aa.com')
        cy.get('input#password').type('password')
        cy.get('input#password-confirm').type('confirm')
        cy.get('button#submit-form').click()
        cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('Password and password confirm do not match','expect to display "Password and password confirm do not match" when password and password confirm do not match')
          expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when password and password confirm do not match')
        })
      })

      it('check password validation',()=>{
        cy.get('input#email').type('example@aa.com')
        cy.get('input#password').type('t3')
        cy.get('input#password-confirm').type('t3')
        cy.get('button#submit-form').click()
        cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('Password must contain uppercase, lowercase and numbers','expect to display "Password must contain uppercase, lowercase and numbers" when password does not contain uppercase')
          expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when password does not contain uppercase')
        })
        cy.get('input#password').clear()
        cy.get('input#password-confirm').clear()
        cy.get('input#password').type('T3')
        cy.get('input#password-confirm').type('T3')
        cy.get('button#submit-form').click()
        cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('Password must contain uppercase, lowercase and numbers','expect to display "Password must contain uppercase, lowercase and numbers" when password does not contain lowercase')
          expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when password does not contain lowercase')
        })
        cy.get('input#password').clear()
        cy.get('input#password-confirm').clear()
        cy.get('input#password').type('tT')
        cy.get('input#password-confirm').type('tT')
        cy.get('button#submit-form').click()
        cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('Password must contain uppercase, lowercase and numbers','expect to display "Password must contain uppercase, lowercase and numbers" when password does not contain number')
          expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when password does not contain number')
        })
      })

      it('check successfully submitted',()=>{
        cy.get('button#submit-form').click()
          .then(()=>{
            cy.get('#form-status').should(e=>{
              expect(e.text()).to.contain('All form fields are required','expect to display "All form fields are required" when there are fields not filled')
              expect(e.attr('class')).to.contain('border-danger','should have "border-danger" class when there are fields not filled')
            })
          })


        cy.get('input#email').type('example@aa.com')
        cy.get('input#password').type('Tt3')
        cy.get('input#password-confirm').type('Tt3')
        cy.get('button#submit-form').click()
        cy.get('#form-status').should(e=>{
          expect(e.text()).to.contain('Your form submission is complete','expect to display "Your form submission is complete" when all the inputs pass the validation')
          expect(e.attr('class')).to.not.contain('border-danger','should no longer have "border-danger" class when all the inputs pass the validation')
          expect(e.attr('class')).to.contain('border-success','should have "border-success" class when all the inputs pass the validation')
        })
        cy.get('button#submit-form').should(e=>{
          expect(e).to.have.attr('disabled')
        })
        cy.get('input').each((div,i)=>{
          if(i<3)
            expect(div).have.attr('disabled')
        })
      })
    })

  describe('problem4', () => {
    it('adds classes that match what was typed', () => {
      cy.get('#color-box').should($el => {
        const classes = $el.attr('class').split(' ')
        expect(classes).to.deep.equal(['color-box-border'], 'color box starts with no added classes')
      });
      cy.get('#problem-4-input').type('red')
      cy.get('#color-box').should($el => {
        const classes = $el.attr('class').split(' ')
        expect(classes).to.deep.equal(['color-box-border', 'red'], 'red class added to color-box')
      });
      cy.get('#problem-4-input').clear()
      cy.get('#problem-4-input').blur()
      cy.get('#color-box').should($el => {
        const classes = $el.attr('class').split(' ')
        expect(classes).to.deep.equal(['color-box-border'], 'color box has no added classes if input empty')
      });
      cy.get('#problem-4-input').type('blue')
      cy.get('#color-box').should($el => {
        const classes = $el.attr('class').split(' ')
        expect(classes).to.deep.equal(['color-box-border', 'blue'], 'blue class added to color-box, and red is not there')
      });
    })
  });

  describe('problem5', () => {
    let response = [
      {
        body: {
          image:
            'https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif',
          answer: 'yes',
        },
      },
      {
        body: {
          image:
            'https://yesno.wtf/assets/yes/14-b57c6dc03aa15a4b18f53eb50d6197ee.gif',
          answer: 'yes',
        },
      },
      {
        body: {
          image:
            'https://yesno.wtf/assets/no/15-7446b1035f784986609f456e15d30a5b.gif',
          answer: 'no',
        },
      },
    ]
    let ele = response[Math.floor(Math.random() * response.length)]
    beforeEach(() => {
      cy.intercept('GET', 'https://yesno.wtf/api', (req) => {
        req.reply(ele)
      }).as('request')
    })

    it('should have an image and the answer showing up after clicking the button', () => {
      cy.get('#get-yes-no').click()
        .then(() => {
          cy.wait('@request').then(() => {
            cy.get('div.col.col-sm-8 > img').should((img) => {
              expect(img.attr('src')).to.equal(ele.body.image,'expect the image url should be equal to the image fron yesorno.wtf')
            })
            cy.get(' div.col.col-sm-8 > h3').should((e) => {
              expect(e.text()).to.equal(ele.body.answer,'expect the image url should be equal to the answer fron yesorno.wtf')
            })
          })
        })
    })

    it('should count yes or no after clicking the button', () => {
      let yesCount = 0
      let noCount = 0
      for (let i = 0; i < 3; i++) {
        cy.get('#get-yes-no').click()
          .then(() => {
            cy.wait('@request').then(() => {
              if (ele.body.answer === 'yes') {
                yesCount++
              } else {
                noCount++
              }
              cy.get('div.col.col-sm-4 > h3:nth-child(2)').should((e) => {
                let count = Number(e.text().replace(/\D/g, ''))
                expect(count).to.equal(yesCount)
              })
                .then(() => {
                  cy.get('div.col.col-sm-4 > h3:nth-child(3)').should((e) => {
                    let count = Number(e.text().replace(/\D/g, ''))
                    expect(count).to.equal(noCount)
                  })
                    .then(() => {
                      ele =
                        response[Math.floor(Math.random() * response.length)]
                    })
                })
            })
          })
      }
    })
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
