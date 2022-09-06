describe('Проверяем события drag-n-drop', () => {
  before('Проверяем запущено ли приложение', () => {
    cy.viewport(1280, 900);
    cy.visit('http://localhost:3000/react-burger');
  });

  it('Берём ингредиенты и бросаем на конструктор бургера', () => {
    cy.get('[class^=Ingredient_ingredient__]').first().as('bun');
    cy.get('[class^=Ingredient_ingredient__]').last().as('filling');
    cy.get('[class^=BurgerConstructor_burger__]').as('constructor');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('dragenter').trigger('drop');

    cy.get('@filling').trigger('dragstart');
    cy.get('@constructor').trigger('dragenter').trigger('drop');

    cy.get('[class^=counter_counter__]').as('counter');
    cy.get('@counter').first().should('contain', '2');
    cy.get('@counter').last().should('contain', '1');
  });
});

describe('Проверяем оформление заказа', () => {
  before('Проверяем запущено ли приложение', () => {
    cy.viewport(1280, 900);
    cy.visit('http://localhost:3000/react-burger');
  });

  beforeEach('Выполняем псевдоавторизацию и псевдозапросы', () => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.window().its('store').invoke('dispatch', { type: 'LOGGED_IN' });
  });

  it('Добавляем ингредиенты и оформляем заказ', () => {
    cy.get('[class^=Ingredient_ingredient__]').first().as('bun');
    cy.get('[class^=Ingredient_ingredient__]').last().as('filling');
    cy.get('[class^=BurgerConstructor_burger__]').as('constructor');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('dragenter').trigger('drop');

    cy.get('@filling').trigger('dragstart');
    cy.get('@constructor').trigger('dragenter').trigger('drop');

    cy.get('@constructor').contains('Оформить заказ').click();
    cy.get('[class^=Modal_modal__]').should('exist').contains('123123');
    cy.get('[class^=Modal_modal__cover__]').click();
    cy.get('body').should('not.have.descendants', '[class^=Modal_modal__]');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.window().its('store').invoke('dispatch', { type: 'LOGGED_OUT' });
  });
});

describe('Проверяем модальное окно ингредиента', () => {
  before('Проверяем запущено ли приложение', () => {
    cy.viewport(1280, 900);
    cy.visit('http://localhost:3000/react-burger');
  });

  it('Проверяем модальное окно ингредиента', () => {
    cy.get('[class^=Ingredient_ingredient__]').first().click();
    cy.get('[class^=Modal_modal__]')
      .should('exist')
      .contains('Детали ингредиента');
    cy.get('[class^=Modal_modal__cover__]').click();
    cy.get('body').should('not.have.descendants', '[class^=Modal_modal__]');
  });
});
