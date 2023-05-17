import React from 'react';
///<reference types="cypress" />

describe('Register', () => {
  const userDetails = {
    email: 'userdetails@gmail.com',
    password: '123456779',
    _id: 'userId',
    username: 'username',
    token: '12989289182812912',
    dp: '',
  };

  beforeEach(() => {
    cy.visit('/auth');

    // Ensure register tab is opened
    cy.contains('button', /register/i).click();
  });

  it('Should not create user account if password is less than 8 chars', () => {
    cy.get("[name='username']").type(userDetails.username);
    cy.get("[name='email']").type(userDetails.email);
    cy.get("[name='password']").type('1234');
    cy.get("[name='confirmPassword']").type('1234');

    cy.get("button[type='submit']").click();

    cy.contains(/password is too short/i).should('be.visible');
  });

  it('Should not create user account if passwords do not match', () => {
    cy.get("[name='username']").type(userDetails.username);
    cy.get("[name='email']").type(userDetails.email);
    cy.get("[name='password']").type(userDetails.password);
    cy.get("[name='confirmPassword']").type('123456');

    cy.get("button[type='submit']").click();

    cy.contains(/passwords do not match/i).should('be.visible');
  });

  it('Should create user account', () => {
    // Mock request
    (cy as any).httpPost('/auth/login', {
      user: userDetails,
      message: 'Login Successful',
    });

    cy.get("[name='username']").type(userDetails.username);
    cy.get("[name='email']").type(userDetails.email);
    cy.get("[name='password']").type(userDetails.password);
    cy.get("[name='confirmPassword']").type(userDetails.password);

    cy.get("button[type='submit']").click();

    // Expect to route to home page
    cy.location('pathname').should('eq', '/');
  });
});
