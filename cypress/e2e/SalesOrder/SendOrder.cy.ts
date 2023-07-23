/// <reference types="cypress" />
import { getDateNow } from "../../../src/services/getDateNow";

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
    cy.get('input[name="drawingOnTheCake"]').type("BenTô Testando App");
    cy.get('input[name="orderObservation"]').type("Sem Observação");
    cy.contains("Sim").click({ force: true });
    cy.get("li").contains("Entrega").click();
    cy.get('input[type="datetime-local"]').type(getDateNow(2));
    cy.get('input[name="nameInOrder"]').type("Meu nome Teste da Silva");
    cy.get('input[name="celInOrder"]').type("63984365196");
    cy.get('input[name="deliveryAdress"]').type("1006 Sul, Al 08, numero 20");
    cy.get('input[name="deliveryName"]').type("João Recebedor");
    cy.get('input[name="deliveryPhone"]').type("63911111111");
    cy.contains("PIX").click({ force: true });
    cy.get('input[name="awareOfWhatsApp"]').check();
    cy.get('input[name="termsAccepted"]').check();
    cy.get("form").submit();

    cy.wait(1000);
  });
});
