import App from "../../src/App";
describe('component tests', () => {
  it('has what you would expect from default create react app', () => {
    cy.mount(<App />);
  })
})
