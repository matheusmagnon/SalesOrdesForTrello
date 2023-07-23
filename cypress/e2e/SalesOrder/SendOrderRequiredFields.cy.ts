/// <reference types="cypress" />
import { getDateNow } from "../../../src/utils/getDateNow";

describe("SalesOder", () => {
  beforeEach(() => {
    cy.viewport(350, 800);
    cy.visit("/");
  });
  it("select flavor RED", () => {
    cy.contains("RED VELVET").click();
    cy.get('input[name="cakeColor"]').type("Cor de teste");
    cy.get('input[name="phraseOnTheCake"]').type("Frase de teste");
    cy.get('input[name="cakePhraseColor"]').type("Azul");
    cy.contains("Sim").click({ force: true });
    cy.get("li").contains("Retirada").click();
    cy.get('input[type="datetime-local"]').type(getDateNow(2));
    cy.get('input[name="nameInOrder"]').type("Meu nome Teste da Silva");
    cy.get('input[name="celInOrder"]').type("63984365196");
    cy.contains("PIX").click({ force: true });
    cy.get('input[name="awareOfWhatsApp"]').check();
    cy.get('input[name="termsAccepted"]').check();
    cy.get("form").submit();

    cy.wait(1000);
  });
});