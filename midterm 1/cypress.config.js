const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  port: 61234,
  video:false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
});
