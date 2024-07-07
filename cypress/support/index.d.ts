/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    dragAndDrop(source: string, target: string): Chainable<void>;
  }
}
