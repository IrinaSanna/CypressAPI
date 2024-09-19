describe('Users api', () => {
  it("Should created a user", () => {
    cy.request("POST", "/user", {
      id: 12345,
      username: "Vano",
      firstName: "Ivan",
      lastName: "Petrov",
      email: "test@test.ru",
      password: "333",
      phone: "+7(999) 999-99-99",
      userStatus: 2,
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.eqls({
        code: 200,
        type: "unknown",
        message: "12345",
      });
    });
  });

  it("Should check for user existence", () => {
    cy.request("GET", `/user/${"Vano"}`).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("lastName", "Petrov");
    });
  });

  it("Should check corrected user", () => {
    cy.request("PUT", `/user/${"Vano"}`, {
      id: 12345,
      username: "Vano",
      firstName: "Ivan",
      lastName: "Petrov-Fedorov",
      email: "test@test.ru",
      password: "333",
      phone: "+7(999) 999-99-99",
      userStatus: 2,
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Should be saved user changes", () => {
    cy.request("GET", `/user/${"Vano"}`).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("lastName", "Petrov-Fedorov");
    });
  });

  it("Should delete user", () => {
    cy.request("DELETE", `/user/${"Vano"}`).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Should check if the user is deleted", () => {
    cy.request({
      url: `/user/${"Vano"}`,
      method: "GET",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(404);
    });
  });
})