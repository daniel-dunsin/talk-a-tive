import React from 'react';
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('httpPost' as any, (route, reply) => {
  cy.intercept('POST', `http://localhost:3001/api${route}`, reply as any);
});

Cypress.Commands.add('httpGet' as any, (route, fixture) => {
  cy.intercept('GET', `http://localhost:3001/api${route}`, {
    fixture,
  });
});

Cypress.Commands.add('setStorage' as any, () => {
  const user = {
    username: 'user@gmail.com',
    email: 'adejaredaniel12@gmail.com',
    dp: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    _id: 'user-id',
    token: 'abcdefgh12345678',
  };

  cy.window().then((slug) => {
    slug.localStorage.setItem('user', JSON.stringify(user));
  });
});

Cypress.Commands.add('getByAttr' as any, (key, value) => {
  cy.get(`[${key}='${value}']`);
});

Cypress.Commands.add('getById' as any, (id) => {
  (cy as any).getByAttr('data-testid', id);
});
