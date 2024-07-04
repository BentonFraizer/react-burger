describe('constructor page testing', () => {
  beforeEach('should be available on localhost:3000 with mock data', () => {
    cy.intercept(
      'api/ingredients',
      {
        fixture: 'ingredients.json',
      },
    );
    cy.viewport(1300, 900);
    cy.visit('/');
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

  it('should open and close ingredient modal with description', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]').click();
    cy.location().should((loc) => {
      expect(loc.toString()).to.eq(
        'http://localhost:3000/ingredients/643d69a5c3f7b9001cfa093e'
      );
    });
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('Детали ингредиента');
    cy.get('[data-cy="modal"]').contains('Калории, ккал');
    cy.get('[data-cy="modal"]').contains('643');
    cy.get('[data-cy="close-modal-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should make order', () => {
    // Заполняем конструктор
    const dataTransfer = new DataTransfer();
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

    // Проверияем, что кнопка "Оформить заказ" теперь активна и кликаем по ней
    cy.get('[data-cy="make-order-btn"]').should('not.be.disabled').click();

    // Вводим данные для входа
    cy.get('[data-cy="login-email-input"]').type('superuser3000@mail.ru');
    cy.get('[data-cy="login-password-input"]').type('root001');
    cy.get('[data-cy="login-submit-btn"]').click();
    cy.intercept(
      'POST',
      'api/auth/login',
      {
        fixture: 'user.json'
      }
    );

    // Снова наживаем кнопку "Форомить заказ"
    cy.get('[data-cy="make-order-btn"]').should('not.be.disabled').click();
    cy.intercept(
      'POST',
      'api/orders',
      {
        fixture: 'order.json'
      }
    );
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('44710');
    cy.get('[data-cy="modal"]').contains('идентификатор заказа');
    cy.get('[data-cy="modal"]').contains('Ваш заказ начали готовить');
    cy.get('[data-cy="close-modal-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пустой и кнопка "Оформить заказ" не активна
    cy.get('[data-cy="empty-top-bun"]').should('exist');
    cy.get('[data-cy="empty-filling"]').should('exist');
    cy.get('[data-cy="make-order-btn"]').should('be.disabled');
  });
});
