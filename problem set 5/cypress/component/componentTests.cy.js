import App from '../../src/App';
import AddToCart from '../../src/components/AddToCart';
import CupChoice from '../../src/components/CupChoice'
import CupDetails from '../../src/components/CupDetails';
import { cupChoices } from "../../src/util/cupselections";


describe('PS 5 tests', () => {
  describe('Component tests', () => {
    const testUrl = 'www.abc.com'
    const testName = 'cup 1'
    const testIndex = 'test expected elements'
    const testDesciption = 'cup one best'

    it('pass props to AddToCart correctly', () => {
      const setMessageSpy = cy.spy().as('setMessageSpy')

      cy.mount(<AddToCart setMessage={setMessageSpy} name={testName} />)
      cy.get('button').click()
      cy.get('@setMessageSpy').should('have.been.calledWith', `Added "${testName}" to cart`)
    })

    it('pass props to CupChoice correctly', () => {
      const setChosenCupSpy = cy.spy().as('cupChoiceSpy')

      cy.mount(<CupChoice imageUrl={testUrl} name={testName} description={testDesciption} setChosenCup={setChosenCupSpy} index={testIndex} />)
      cy.get('div img').should(($elm) => {
        expect($elm.length).to.equal(1, 'FAIL: CupChoice must contain 1 img tag within a div tag')
        expect($elm.attr('src')).to.equal(testUrl, 'CupChoice must have the attributes src= the input url')
        expect($elm.attr('alt')).to.equal(testName, 'CupChoice must have the attributes alt= the input url')
      })
      cy.get('div h6').should(($elm) => {
        expect($elm.length).to.equal(1, 'FAIL: CupChoice must contain 1 h6 tag within a div tag, and it must have text= the input name')
        expect($elm.text()).to.equal(testName, 'CupChoice must have text= the input name')
      })
      cy.get('div img').click()
      cy.get('@cupChoiceSpy').should('have.been.calledWith', testIndex)
    })

    it('pass props to CupDetails correctly', () => {
      cy.mount(<CupDetails imageUrl={testUrl} name={testName} description={testDesciption} />)
      cy.get('h2').should(($elm) => {
        expect($elm.length).to.equal(1, 'FAIL: CupDetails must contain 1 h2 tag')
        expect($elm.text()).to.equal(testName, 'CupDetails should contain one h2 tag with the text inside being equal to the name input')
      })
      cy.get('img').should(($elm) => {
        expect($elm.length).to.equal(1, 'FAIL: CupDetails must contain 1 img tag and it must have the attribute src= the input url')
        expect($elm.attr('src')).to.equal(testUrl, 'FAIL: CupDetails must have the attribute src= the input url')
      })
      cy.get('p').should(($elm) => {
        expect($elm.length).to.equal(1, 'FAIL: CupDetails must contain one p tag with the text inside being the input description')
        expect($elm.text()).to.equal(testDesciption, 'CupDetails must contain a p with the text inside equal to the input description.')
      })
    })
  })

  describe('Functional tests', () => {
    const cupNames = ['Clear skies', 'Lovely lawn', 'Blank cup for cowards', 'Slimer baby']
    beforeEach(() => {
      cy.mount(<App />)
    })

    it('test renderCupOptions renders all CupChoices', () => {
      cy.get('div[class="col col-3"]').should(($elm) => {
        expect($elm.length).to.equal(cupChoices.length, 'FAIL: CupChoice must contain a div tag with the classes "col col-3"')
      })
      cupChoices.forEach((cup, index) => {
        cy.get('div[class="col col-3"]').should(($elm) => {
          expect($elm.length).to.be.greaterThan(1, 'FAIL: CupChoice must contain a div tag with the classes "col col-3"')
        })
        cy.get('div img').eq(index).should(e => {
          expect(e.attr('src')).to.equal(cup.imageUrl, `expect the src of image equal to ${cup.imageUrl}`)
          expect(e.attr('alt')).to.equal(cup.name, `expect the alt of image equal to ${cup.name}`)
        })
        cy.get(`div[class="col col-3"]:nth-child(${index + 1}) h6`).should(($elm) => {
          expect($elm.length).to.equal(1, `FAIL: CupChoice must contain a h6 tag within a div tag, and it must have text=${cup.name} (the input name)`)
        })
        cy.get(`div[class="col col-3"]:nth-child(${index + 1}) h6`).invoke('text').then((text) => {
          expect(text).to.equal(cup.name, `CupChoice must contain a h6 tag with the text inside equal to ${cup.name} (the input name).`)
        })
      })
    })

    it('test CupPicker renderCupDetails on no chosenCup ', () => {
      cy.get('.col-5 strong').should(($elm) => {
        expect($elm.length).to.not.equal(0, 'FAIL: On no cup chosen, a strong tag should exist with a message inside')
        expect($elm.text()).to.equal('Please Choose A Cup', '"Please Choose A Cup" should be the message inside the strong tag')
      })
      cy.get('.col-5 h2').should(($elm) => {
        expect($elm.length).to.equal(0, 'FAIL: On no cup chosen, CupDetails should not be rendered')
      })
      cy.get('.col-5 button').should(($elm) => {
        expect($elm.length).to.equal(0, 'On no cup chosen, AddToCart should not be rendered')
      })
    })

    const cups = [0, 2, 7, 11]
    cups.forEach((cup) => {
      it(`Cup "${cupChoices[cup].name}": Click and confirm details display and can be added to cart`, () => {
        cy.get(`img[src="${cupChoices[cup].imageUrl}"][alt="${cupChoices[cup].name}"]`).click()
          .then(() => {
            // then check that the correct CupDetails and AddToCart are rendered
            // cupDetails
            cy.get('div[class="col col-5"] h2').should(($elm) => {
              expect($elm.length).to.equal(1, 'FAIL: after a cup is chosen, CupDetails must be rendered with correct inputs')
            })
            cy.get('div[class="col col-5"] h2').should('exist').invoke('text').then((text) => {
              expect(text).to.equal(cupChoices[cup].name, `After a cup is chosen, the CupDetails should be rendered and should contain one h2 tag with the text inside being equal to ${cupChoices[cup].name} (the name input). This should all be located within the div with className="col col-5"`)
            })
            cy.get('div[class="col col-5"] img').should(($elm) => {
              expect($elm.length).to.equal(1, 'FAIL: after a cup is chosen, CupDetails must contain 1 img tag')
              expect($elm.attr('src')).to.equal(cupChoices[cup].imageUrl, `After a cup is chosen, the src attribute of img must be ${cupChoices[cup].imageUrl}`)
            })
            cy.get('div[class="col col-5"] p').should(($elm) => {
              expect($elm.length).to.equal(1, `FAIL: after a cup is chosen, CupDetails must contain one p tag with the text inside being ${cupChoices[cup].description} (the input description)`)
              expect($elm.text()).to.equal(cupChoices[cup].description, `After a cup is chosen, CupDetails must contain a p with the text inside equal to ${cupChoices[cup].description} (the input description).`)
            })
            // AddToCart
            cy.get('button').should(($elm) => {
              expect($elm.length).to.equal(1, 'FAIL: after a cup is chosen, AddToCart must contain 1 button tag')
              expect($elm.text()).to.equal('Add To Cart', 'The text inside the button of AddToCart must equal "Add To Cart"')
            })
          })
      })
    })

    it('test CupPicker renderMessage/AddtoCart onclick does not create alert message until "message" is set', () => {
      cupNames.forEach((name) => {
        cy.get(`img[alt="${name}"]`).click().then(() => {
          cy.get('p[class="alert alert-success"]').should(($elm) => {
            // alert alert-success p tag should not exist before adding to cart
            expect($elm.length).to.equal(0, 'the p tag with classes "alert alert-success" should not be displayed until item is added to cart')
          }).then(() => {
            cy.get('p[class="alert alert-success"]').should('not.exist')
          })
        })
      })
    })

    // it('test AddToCart onClick creates alert message with correct cup', () => {
    cupNames.forEach((name) => {
      it(`${name}: test AddToCart onClick creates alert message mentioning ${name}`, () => {

        cy.get(`img[alt="${name}"]`).click().then(() => {
          cy.get('button').click().then(() => {
            cy.get('p[class="alert alert-success"]').should(($elm) => {
              expect($elm.length).to.not.equal(0, 'FAIL: when the add to cart button is clicked for a cup, we expect an alert--a p tag with specific classes--to be displayed ')
            })
            // alert alert-success p tag should equal Added "name" to cart
            cy.get('p[class="alert alert-success"]').should('exist').invoke('text').then((text) => {
              expect(text).to.equal(`Added "${name}" to cart`, `p tag with class alert-alert-success should be created with text equal to "Added "${name}" to cart`)
            })
          })
        })
      })
    })
    // })
  })

})





