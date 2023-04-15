const BASE_URL = "http://localhost:3000";

describe("/ - Todos Feed", () => {
  it("when load, renders the page", () => {
    // Trailing Slash
    cy.visit(BASE_URL);
  });
  it("when create a new todo, it must appears in the screen", () => {
    // 0 - Interceptações/Intertecptação
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "70905d7e-c969-45b1-99f0-1aa155477204",
            date: "2023-04-15T19:46:51.109Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo");

    // 1 - Abrir a página
    cy.visit(BASE_URL);
    // 2 e 3 - Selecionar o input de criar nova todo e Digitar no input de criar nova todo
    const inputAddTodo = "input[name='add-todo']";
    cy.get(inputAddTodo).type("Test todo");
    // 4 - Clicar no botão
    const buttonAddTodo = "[aria-label='Adicionar novo item']";
    cy.get(buttonAddTodo).click();

    // 5 - Checar se na página surgiu um novo elemento
    cy.get("table > tbody").contains("Test todo");

    // Criar validações a partir de valores
    expect("texto").to.be.equal("texto");
  });
});
