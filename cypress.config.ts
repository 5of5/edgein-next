import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.GRAPHQL_ENDPOINT,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
