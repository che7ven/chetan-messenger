describe("Chat", () => {
  it("should render login page correctly", () => {
    cy.visit("/");
    cy.get("#textField-User\\ Name").should("exist");
    cy.get("#textField-User\\ Name").clear();
    cy.get("#textField-User\\ Name").type("chevy");
  });

  it("should render chat page correctly", () => {
    cy.visit("/");
    cy.get("#textField-User\\ Name").clear();
    cy.get("#textField-User\\ Name").type("chevy");
    cy.get(".storybook-button").click();
    cy.get("#textField-Chatroom").clear();
    cy.get("#textField-Chatroom").type("React");
    cy.get(".storybook-button").click();
    cy.get(".MuiFormControl-root").click();
    cy.get("#textField-Enter\\ message").clear();
    cy.get("#textField-Enter\\ message").type("Hi{enter}");
    cy.get("#clear > .MuiButton-label").click();
    cy.get("path").click();
    cy.get("path").click();
    cy.get("#logout > .MuiButton-label").click();
  });
});
