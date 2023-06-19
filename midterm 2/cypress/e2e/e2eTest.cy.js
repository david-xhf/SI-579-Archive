import { airports } from "../../src/components/util/arrays";

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
  it('has a title', () => {
    cy.get('h2').first().should('include.text', 'Problem 1')
  })

  describe('Problem 1',()=>{
    it('should import required components',()=>{
      let accordion
      try{
        accordion=require('react-bootstrap/Accordion')
      }finally{
        expect(accordion!==undefined).to.equal(true,'should import accordion component from bootstrap library')
      }
    })

    it('should have accordion div',()=>{
      cy.get('section#Problem-1').then((div)=>{
        expect(div.find('.accordion').length>0).to.equal(true, 'should have one div with accordion class in the problem 1 section')
      })
    })

    it('should have two accordion items',()=>{
      cy.get('.accordion').children().should((output)=>{
        expect(output.length).to.equal(2,'should have 2 accordion items')
      })
    })

    it('should have the correct structure',()=>{
      cy.get('.accordion').children().each((element)=>{
        expect(element.find('h2').attr('class')).to.equal('accordion-header','There should be a header element')
        expect(element.find('div').attr('class')).to.include('accordion-collapse collapse','There should be a collapse')
        expect(element.find('button').attr('class')).to.include('accordion-button','There should be a button element')
        expect(element.find('div').find('div').attr('class')).to.equal('accordion-body','There should be a content div')
      })
    })

    it('should match the text',()=>{
      cy.get('.accordion button').then((header)=>{
        expect(header.eq(0)).to.contain('Vanilla JavaScript', 'should have the correct text in the header')
        expect(header.eq(1)).to.contain('React', 'should have the correct text in the header')
      })
      cy.get('.accordion-body').then((content)=>{
        expect(content.eq(0)).to.contain('BEWARE', 'should have the correct text in the content')
        expect(content.eq(1)).to.contain('I GUESS BEWARE THIS TOO' , 'should have the correct text in the content')
      })
    })

    it('should have accordion effect',()=>{
      const accordionItems = {
        'Vanilla JavaScript': {
          selector: '#Problem-1 > div > div:nth-child(1) > h2',
          collapse: '#Problem-1 > div > div:nth-child(1) > div',
          content: '☠️☠️☠️☠️☠️☠️☠️ BEWARE! ☠️☠️☠️☠️☠️☠️☠️',
        },
        'React': {
          selector: '#Problem-1 > div > div:nth-child(2) > h2',
          collapse: '#Problem-1 > div > div:nth-child(2) > div',
          content: '💀💀💀💀💀💀💀 I GUESS BEWARE THIS TOO 💀💀💀💀💀💀💀',
        },
      }

      cy.get('#Problem-1 > div > div:nth-child(1) > div').should(el=>{
        expect(el).to.contain('☠️☠️☠️☠️☠️☠️☠️ BEWARE! ☠️☠️☠️☠️☠️☠️☠️','The first accordion item should have the correct text in the content in the beginning')
      })
      cy.get('#Problem-1 > div > div:nth-child(2) > div').should('not.be.visible', 'The second accordion item should not be visible in the beginning')

      cy.get('#Problem-1 > div > div:nth-child(1) > h2').click()
      cy.get('#Problem-1 > div > div:nth-child(1) > div').should('not.be.visible', 'The first accordion item should not be visible after clicking on it')
      const checkedItems = [];
      Object.entries(accordionItems).reverse().forEach(([text, info]) => {
        cy.get(info.selector).click()
        cy.get(info.collapse)
          .should('be.visible', `The ${text} accordion item should be visible after clicking on it`)
          .should('contain.text', info.content)
        checkedItems.push(info.selector);
        cy.get(`${info.selector} > button[aria-expanded="true"]`).should('exist', `The ${text} accordion item should have aria-expanded="true" after clicking on it`)
        Object.entries(accordionItems).forEach(([text2, info2]) => {
          cy.log(`GONNA SETT IF ${info2.selector} is ${info.selector}`)
          if (!checkedItems.includes(info2.selector)) {
            cy.get(info2.collapse).should('not.be.visible', `The ${text2} accordion item should not be visible after clicking on ${text} accordion item`)
            cy.get(`${info2.selector} > button[aria-expanded="false"]`).should('exist', `The ${text2} accordion item should have aria-expanded="false" after clicking on ${text} accordion item`)
          }
        })
      })
    })
  })

  describe('Problem 2',()=>{
    it('confirm no errors when clicking button and inputting value in problem 2', () => {
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').type(10)
      cy.get('#Problem-2 > div > div.mb-1 > button:not([disabled])').click()
    })
    it('counter increases by the number input',()=>{
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').clear()
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').type(4)
      cy.get('#Problem-2 > div > div.mb-1 > button').should(el=>{
        expect(el.text()).to.equal('0','should have the intitial value 0')
      })
      cy.get('#Problem-2 > div > div.mb-1 > button').click()
      .then(()=>{
        cy.get('#Problem-2 > div > div.mb-1 > button').should(el=>{
          expect(el.text()).to.equal('4','should increase by 4')
        })
      })
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').clear()
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').type(6)
      cy.get('#Problem-2 > div > div.mb-1 > button').click()
      .then(()=>{
        cy.get('#Problem-2 > div > div.mb-1 > button').should(el=>{
          expect(el.text()).to.equal('10','should increase by 6')
        })
      })
    })

    it('should disable button when the counter is more than 100',()=>{
      cy.get('#Problem-2 > div > div.mb-1 > button:not([disabled])').click()
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').clear()
      cy.get('#Problem-2 > div > div.mb-3.col-3 > input').type(100)
      cy.get('#Problem-2 > div > div.mb-1 > button').click()
      .then(()=>{
        cy.get('#Problem-2 > div > div.mb-1 > button').should(el=>{
          expect(el.text()).to.equal('101','should increase by 100')
          expect(el.attr('disabled')).to.equal('disabled','should be disabled when the counter is more than 100')
        })
      })
    })
  })

  describe('Problem 3',()=>{
    it('confirm no errors when typing in problem 3 textarea', () => {
      cy.get('#Problem-3 > div > textarea').type('more more more more');
    })

    it('should display remaining characters and valid status when inputting less than 50 characters',()=>{
      const testInput = ['test test test test','Test what it looks like when inputting 50 characte']
      testInput.forEach(input=>{
        cy.get('#Problem-3 > div > textarea').clear()
        cy.get('#Problem-3 > div > textarea').type(input)
        cy.get('#Problem-3 > div > div').should(el=>{
          const length = Math.abs(50-input.length)
          expect(el.text()).to.contain(`${length} characters left`,`should display ${length} characters left`)
          expect(el.attr('class')).to.contain('valid-feedback','should have valid-feedback class when inputting less than or equal to 50 characters')
        })
        cy.get('#Problem-3 > div > textarea').should(el=>{
          expect(el.attr('class')).to.contain('is-valid', 'should have is-valid class', 'should have is-valid class when inputting less than or equal to 50 characters')
        })
      })
    })

    it('should display exceeding characters and invalid status when inputting more than 50 characters', ()=>{
      cy.get('#Problem-3 > div > textarea').type(' test test test test')
      cy.get('#Problem-3 > div > div').should(el=>{
        expect(el.text()).to.contain('18 characters too long','should display 18 charcters too long')
        expect(el.attr('class')).to.contain('invalid-feedback','should have invalid-feedback class when inputting more than 50 characters')
      })
      cy.get('#Problem-3 > div > textarea').should(el=>{
        expect(el.attr('class')).to.contain('is-invalid', 'should have is-invalid class when inputting more than 50 characters')
      })
    })
  })
  
  describe('Problem 4',()=>{
    it('confirm no errors when clicking problem 4 button', () => {
      cy.get('#Problem-4 > button:not([disabled])').click()
    })

    const res = [
      {
        id:0,
        styled_images:{
          group_thumb_square:"https://events.umich.edu/media/cache/group_thumb_square/media/attachments/2023/03/event_105347_original-45.jpg"
        }
      },
      {
        id:1,
        styled_images:{
          group_thumb_square:""
        }
      },
      {
        id:3,
        styled_images:{
          group_thumb_square:"https://events.umich.edu/media/cache/group_thumb_square/media/attachments/2023/03/event_105347_original-45.jpg"
        }
      },
    ]

    beforeEach(()=>{
      cy.intercept('GET', 'https://events.umich.edu/day/json?v=2', (req) => {
        req.reply({ body: res, delay: 1000 })
      }).as('request')
    })

    it('should display loading before images have been retrieved',()=>{
      cy.get('#Problem-4 > button').click()
      cy.intercept('https://events.umich.edu/day/json?v=2', () => {
        cy.get('#Problem-4 > h3').should(el=>{
          expect(el.text()).to.include('LOADING','should display loading message before images have been retrieved')
        })
      });
    })

    it('should remove loading after images have been retrieved',()=>{
      cy.get('#Problem-4 > button').click()
      .then(()=>{
        cy.wait('@request').then(()=>{
          cy.get('#Problem-4 > h3').should(el=>{
            expect(el.text()).to.not.include('LOADING','should remove loading after images have been retrieved')
          })
        })
      })
    })

    it('should display correct img src',()=>{
      cy.get('#Problem-4 > button')
        .click()
        .then(() => {
          cy.wait('@request').then(() => {
            cy.get('#Problem-4 > img').should((img) => {
              expect(img.attr('src')).to.equal(res[0].styled_images.group_thumb_square, 'should have the correct img url')
              expect(img.attr('alt')).to.equal('cool event','should have the correct alt message')
            })
          })
        })
    })

    it('should filter out responses with empty url',()=>{
      cy.get('#Problem-4 > button')
        .click()
        .then(() => {
          cy.wait('@request').then(() => {
            cy.get('#Problem-4 > h3').should(el=>{
              expect(el.text()).to.include('2 Results','should display the correct number of results')
            })
            cy.get('#Problem-4 > img').each((img) => {
              expect(img.attr('src')).to.not.equal('', 'should not have the empty url for the img')
            })
          })
        })
    })
    
    it('should remove all the images when clicking the button again',()=>{
      cy.get('#Problem-4 > button')
        .click()
        .then(() => {
          cy.wait('@request').then(() => {
            cy.get('#Problem-4 > img').should((img) => {
              expect(img.length).to.eq(2,'should display the correct number of images')
            })
            cy.get('#Problem-4 > button').click()
            cy.get('#Problem-4 > img').should((img) => {
              expect(img.length).to.eq(0,'should remove all the images when clicking the button again')
            })
          })
        })
    })
  })

  describe('Problem 5',()=>{
    it('check the number of airports',()=>{
      cy.get('#Problem-5 > div > div').should(el=>{
        expect(el.length).to.eq(airports.length,'should have the same number of airports as the array')
      })
    })

    it('check the structure and content of each airport',()=>{
      [0,1,2].forEach(n=>{
        const num = Math.floor(Math.random()*airports.length)
        cy.get('#Problem-5 > div > div').eq(num).each(el=>{
          expect(el.find('h2').text()).to.eq(airports[num].code,'should have the correct airport code within the h2 tag')
          expect(el.find('small').text()).to.eq(airports[num].name, 'should have the correct airport name within the small tag')
          expect(el.find('p').text()).to.eq(`${airports[num].city}, ${airports[num].state}`, 'should have the correct city and state within the p tag')
        })
      })
    })
    
  })


  afterEach(() => {
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
