describe("Chat", () => {
  it("should render chat page correctly", () => {
    cy.visit("/");
    cy.get("#textField-User\\ Name").should("exist");
    cy.get("#textField-User\\ Name").clear();
    cy.get("#textField-User\\ Name").type("chevy");
    cy.get("#textField-Room").clear();
    cy.get("#textField-Room").type("123");
    cy.get("#joinRoom").click();
    cy.get("#textField-Enter\\ message").clear();
    cy.get("#textField-Enter\\ message").type("Hello");
    cy.get("#send").click();
    cy.get("#textField-Enter\\ message").clear();
    cy.get("#textField-Enter\\ message").type("Hi{enter}");
    cy.get("#clear").click();
  });
});
