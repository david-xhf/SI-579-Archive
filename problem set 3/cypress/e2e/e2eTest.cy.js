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


describe('Test problem set 3', function () {
  beforeEach(() => {
    cy.visit(`http://localhost:${Cypress.env('theport') || 8080}`)
    // load dog rhymes
    cy.fixture('dog.json')
      .then((json) => {
        this.dogRhymes = json.map((rhyme) => rhyme.word)
      })

    // load cat rhymes
    cy.fixture('cat.json').then((json) => {
      this.catRhymes = json.map((rhyme) => rhyme.word)
    })

  })

  it('Basic check to confirm tests are running', () => {
    cy.get('h1').should('include.text', 'DOG AND CAT MACHINE')
  })


  const testShort = [3,5,12];
  describe('number of images match #how-many and the list of rhymes is correct', () => {
    const checkImagesAndWords = (howMany, dogs) => {
      it(`Request ${howMany} ${dogs ? 'dogs' : 'cats'}`, () => {
        // stub the dog api
        let dogsIntercepted = 0
        cy.intercept('GET', 'https://dog.ceo/api/breeds/image/random', (req) => {
          req.reply({
            body: {
              status: 'success',
              'message': `https://stubbed.dog.pics.com/${dogsIntercepted}`
            },
          })
          dogsIntercepted += 1
          if (dogsIntercepted > 29) {
            dogsIntercepted = 0
          }
        }).as('dogApi')

        // stub the dog pictures -- img src
        cy.intercept('GET', 'https://stubbed.dog.pics.com/*', (req) => {
          req.reply({
            fixture: `dogpic_${req.url.slice(-2).replace('/', '')}.jpg`
          })
        }).as('imgSrcDog')

        // stub the cat api
        let catsIntercepted = 0
        cy.intercept('GET', 'https://api.thecatapi.com/v1/images/search?*', (req) => {
          req.reply({
            body: [
              {
                'breeds': [],
                'id': '',
                'url': `https://stubbed.cat.pics.com/${catsIntercepted}`,
                'width': 500,
                'height': 500,
              }
            ]
          })
          catsIntercepted += 1
          if (catsIntercepted > 29) {
            catsIntercepted = 0
          }
        }).as('catApi')

        // stub the cat pictures -- img src
        cy.intercept('GET', 'https://stubbed.cat.pics.com/*', (req) => {
          req.reply({
            fixture: `catpic_${req.url.slice(-2).replace('/', '')}.jpg`
          })
        }).as('imgSrcCat')

        // stub the dog rhymes
        cy.intercept('https://api.datamuse.com/words?rel_rhy=dog', (req) => {
          req.reply({
            fixture: 'dog.json'
          })
        }).as('rhymeDogs')

        // stub the cat rhymes
        cy.intercept('https://api.datamuse.com/words?rel_rhy=cat', (req) => {
          req.reply({
            fixture: 'cat.json'
          })
        }).as('rhymeCats')
        cy.get('#how-many')
          .clear()
          .type(howMany)
        cy.get(dogs ? '#more-dogs' : '#more-cats').click()

        cy.get(`img:nth(${howMany-1})`, {timeout: 1000*howMany})
        cy.get('#animal-grid').within(() => {
          cy.get('img').each( (item, index, list) => {
            expect(list).to.have.length(howMany,
              `Entered ${howMany} as input, there should be ${howMany}`.concat(
                dogs ? 'dog images.' : 'cat images.'
              )
            )
          })
        })

        cy.wait(dogs ? '@rhymeDogs' : '@rhymeCats')
        if (dogs) {
          let dogRhyme = this.dogRhymes.slice(0, howMany).join(', ')
          cy.get('#rhyme-box').should(($elm) => {
            expect($elm.text()).equal(dogRhyme,
              `Must use Datamuse api to get words that Rhyme with dog. These words should appear in the same order as in the api. They should also be comma separated.`)
          })
        } else {
          let catRhyme = this.catRhymes.slice(0, howMany).join(', ')
          cy.get('#rhyme-box').should(($elm) => {
            expect($elm.text()).equal(catRhyme,
              `Must use Datamuse api to get words that Rhyme with cat. These words should appear in the same order as in the api'. They should also be comma separated.`
            )
          })
        }
      })

    }
    testShort.forEach((index) => {
      // test 'dogs please'
      checkImagesAndWords(index, true)
      // test 'cats please'
      checkImagesAndWords(index, false)
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
