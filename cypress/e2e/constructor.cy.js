describe('constructor page testing', () => {
  beforeEach('should be available on localhost:3000 with mock data', () => {
    cy.intercept(
      'https://norma.nomoreparties.space/api/ingredients',
      {
        fixture: 'ingredients.json',
      },
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000/');
  });

  it('should render correctly', () => {
    cy.get('.burger-ingredients_subtitle__zwGyL')
      .should('have.text', 'Соберите бургер');
    cy.get('[data-cy="burger-ingredients"]')
      .should('be.visible');
    cy.get('[data-cy="burger-constructor"]')
      .should('be.visible');
  });

  it('should drag bun and not bun ingredients into constructor', () => {
    const dataTransfer = new DataTransfer();
    // Перетаскивание булки в конструктор
    cy.get('.ingredients-item_ingredient-item__9yfer')
      .first()
      .should('be.visible')
      .and('exist');
    cy.get('[data-cy="empty-top-bun"]')
      .should('be.visible')
      .and('exist');

    cy.get('.ingredients-item_ingredient-item__9yfer')
      .first()
      .trigger('dragstart', {
        dataTransfer
      });

    cy.get('[data-cy="empty-top-bun"]')
      .trigger('dragover', {
        dataTransfer
      });

    cy.get('[data-cy="empty-top-bun"]')
      .trigger('drop', {
        dataTransfer
      });

    // Перетаскивание начинки в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]')
      .should('be.visible');

    cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]')
      .first()
      .trigger('dragstart', {
        dataTransfer
      });

    cy.get('[data-cy="empty-filling"]')
      .trigger('dragover', {
        dataTransfer
      });

    cy.get('[data-cy="empty-filling"]')
      .trigger('drop', {
        dataTransfer
      });

    // Проверка на то, ожидаемые в конструкторе елементы появились в конструкторе
    cy.get('.burger-constructor_bun-top__2iC4h').contains(' (верх)');
    cy.get('.draggable-constructor-element_constructor-element__gAumO')
      .contains('Моковое филе Люминесцентного тетраодонтимформа');
  });
});
