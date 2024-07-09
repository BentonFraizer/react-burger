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
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').as('mockBun');
    cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]').as('mockNotBun');
    cy.get('[data-cy="empty-top-bun"]').as('emptyTopBun');
    cy.get('[data-cy="empty-filling"]').as('emptyFilling');
  });

  afterEach('should clean tokens', () => {
    // Удаляем токены
    window.localStorage.removeItem('refreshToken', JSON.stringify('test-refreshToken'));
    window.localStorage.removeItem('accessToken', JSON.stringify('test-accessToken'));
  });

  it('should render correctly', () => {
    cy.get('[data-cy="page-subtitle"]')
      .should('have.text', 'Соберите бургер');
    cy.get('[data-cy="burger-ingredients"]')
      .should('be.visible');
    cy.get('[data-cy="burger-constructor"]')
      .should('be.visible');
  });

  it('should drag bun and not bun ingredients into constructor', () => {
    // Перетаскивание булки в конструктор
    cy.dragAndDrop('@mockBun', '@emptyTopBun');

    // Перетаскивание начинки в конструктор
    cy.dragAndDrop('@mockNotBun', '@emptyFilling');

    // Проверка на то, ожидаемые в конструкторе елементы появились в конструкторе
    cy.get('[data-cy="not-empty-top-bun"]').contains(' (верх)');
    cy.get('[data-cy="not-empty-filling"]')
      .contains('Моковое филе Люминесцентного тетраодонтимформа');
  });

  it('should open and close ingredient modal with description', () => {
    const MOCK_BUN_ROUTE = 'http://localhost:3000/ingredients/643d69a5c3f7b9001cfa093e';
    cy.get('@mockNotBun').click();
    cy.get('[data-cy="modal"]').as('modal');
    cy.location().should((loc) => expect(loc.toString()).to.eq(MOCK_BUN_ROUTE));
    cy.get('@modal').should('be.visible');
    cy.get('@modal').contains('Детали ингредиента');
    cy.get('@modal').contains('Калории, ккал');
    cy.get('@modal').contains('643');
    cy.get('[data-cy="close-modal-btn"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('should make order', () => {
    cy.intercept(
      'POST',
      'api/auth/login',
      {
        fixture: 'user.json'
      }
    );
    cy.intercept(
      'POST',
      'api/orders',
      {
        fixture: 'order.json'
      }
    );

    // Устанавливаем токены
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));
    cy.get('[data-cy="make-order-btn"]').as('makeOrderBtn');

    // Перетаскивание булки в конструктор
    cy.dragAndDrop('@mockBun', '@emptyTopBun');

    // Перетаскивание начинки в конструктор
    cy.dragAndDrop('@mockNotBun', '@emptyFilling');

    // Проверка на то, ожидаемые в конструкторе елементы появились в конструкторе
    cy.get('[data-cy="not-empty-top-bun"]').contains(' (верх)');
    cy.get('[data-cy="not-empty-filling"]')
      .contains('Моковое филе Люминесцентного тетраодонтимформа');

    // Проверияем, что кнопка "Оформить заказ" теперь активна и кликаем по ней
    cy.get('@makeOrderBtn').should('not.be.disabled').click();

    // Вводим данные для входа
    cy.get('[data-cy="login-email-input"]').type('superuser3000@mail.ru');
    cy.get('[data-cy="login-password-input"]').type('root001');
    cy.get('[data-cy="login-submit-btn"]').click();

    // Снова наживаем кнопку "Офромить заказ"
    cy.get('@makeOrderBtn').should('not.be.disabled').click();
    cy.get('[data-cy="modal"]').as('modal');

    cy.get('@modal').should('be.visible');
    cy.get('@modal').contains('44710');
    cy.get('@modal').contains('идентификатор заказа');
    cy.get('@modal').contains('Ваш заказ начали готовить');
    cy.get('[data-cy="close-modal-btn"]').click();
    cy.get('@modal').should('not.exist');

    // Проверяем, что конструктор пустой и кнопка "Оформить заказ" не активна
    cy.get('@emptyTopBun').should('exist');
    cy.get('@emptyFilling').should('exist');
    cy.get('@makeOrderBtn').should('be.disabled');
  });
});
