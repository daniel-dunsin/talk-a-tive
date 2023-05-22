import React from 'react';
///<reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });
  it('Should log user in', () => {
    const loginDetails = {
      email: 'userdetails@gmail.com',
      password: '12345678',
      _id: 'userId',
      username: 'username',
      token: '12989289182812912',
    };

    // Mock request
    (cy as any).httpPost('/auth/login', {
      user: loginDetails,
      message: 'Login Successful',
    });

    // Ensure login tab is opened
    cy.contains('button', 'Login').click();

    // Fill in the inputs
    cy.get("[placeholder='Enter your email/username']").type(
      loginDetails.username
    );
    cy.get("[type='password']").type(loginDetails.password);

    // Make the request
    cy.get('button').contains('Log in').click();

    // Route should change on successful log in
    cy.location('pathname', { timeout: 100000 }).should('eq', '/');
  });
});
