const { chromium } = require('playwright');
const authorization = require('./user');

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  await page.goto('https://netology.ru/');

  await page.evaluate(() => {
    page.querySelector('h1');
  });
  await page.waitForNavigation();

  // Click text=Войти
  await page.locator('text=Войти').click();
  // assert.equal(page.url(), 'https://netology.ru/?modal=sign_in');

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(authorization.validEmail);

  // Click [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').click();

  // Fill [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').fill('12345');

  // Click [data-testid="login-submit-btn"]
  await page.locator('[data-testid="login-submit-btn"]').click();
  // Click [data-testid="login-error-hint"]
  await page.locator('[data-testid="login-error-hint"]').click();
  await page.screenshot({ path: `${Date.now()}screenshot3.png` });

  await page.pause();

  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(
    'Вы ввели неправильно логин или пароль',
  );

  // ---------------------
  await context.close();
  await browser.close();
})();
