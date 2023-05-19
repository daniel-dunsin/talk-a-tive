import React from 'react';

/**
 * Navbar has a lot of functionalities oo
 * @test1 Displaying the user details
 * @test2 Logout
 * @test3 Fetching the users and creating a new chat
 */

describe('Navbar', () => {
  beforeEach(() => {
    (cy as any).setStorage();
    cy.visit('/');
  });

  it('Should display user details', () => {
    const slug = cy.window().then((slug) => {
      const user = JSON.parse(slug.localStorage.getItem('user') as string);

      // Open the tab
      (cy as any).getById('profile-container').click();
      // From the tab open the modal
      cy.contains(/my profile/i).click();

      // Verify the user details
      cy.contains(user?.username).should('be.visible');
      cy.contains(user?.email).should('be.visible');
      (cy as any).getByAttr('src', user?.dp).should('be.visible');
    });
  });

  it('Logout functionality', () => {
    (cy as any).getById('profile-container').click();

    cy.contains(/log out/i).click();

    cy.location('pathname').should('eq', '/auth');
  });

  it('Should search user', () => {
    (cy as any).httpGet('/auth/users?search=ab', 'users.json');

    // Open the sidebar and search for the user
    (cy as any).getById('sidebar-controller').click();

    // Fill in the inputs and submit
    cy.get('input').type('ab');
    cy.contains('button', /go/i).click();

    (cy as any).getById('users-containers').should('have.length', 2);
  });
});
