// https://docs.cypress.io/api/introduction/api.html

describe("Home page launch", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Coding Task Board");
  });
});
