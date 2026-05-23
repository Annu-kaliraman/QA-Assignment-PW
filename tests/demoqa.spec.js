import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { Login } from '../POM/login_page';
import { Book } from '../POM/book';



let loginPage;
let bookStorePage;

test.beforeEach(async ({ page }) => {
  loginPage = new Login(page);
  bookStorePage = new Book(page);

  await bookStorePage.navigateToUrl(process.env.BASE_URL);
});

test('Login, validate username and logout button', async ({ page }) => {

  await bookStorePage.getCard();
  await loginPage.login();
  await loginPage.EnterUserName(process.env.QA_USERNAME);
  // will verify that the input taken by the username inputfield is a correct username
  await expect(page.locator('#userName')).toHaveValue(process.env.QA_USERNAME);

  await loginPage.EnterPswd(process.env.QA_PASSWORD);
  await loginPage.login();

  // will verify that after login entered username is present as a username on the screen
  await expect(page.locator('#userName-value')).toHaveText(process.env.QA_USERNAME);

  let btn = await loginPage.getlogoutBtn()

  await expect(btn).toBeVisible();

  await expect(btn).toHaveText('Logout');

  await expect(btn).toBeEnabled();

  await loginPage.Logout();
  await expect(page).toHaveURL('https://demoqa.com/login');

});

test('Search and validate book', async ({ page }) => {
  await bookStorePage.getCard();

  await bookStorePage.searchField(process.env.BOOK_NAME);

  const isBookVisible = await bookStorePage.validateBook(process.env.BOOK_NAME);
  expect(isBookVisible).toBeTruthy();

  await page.pause();
});

test('Details of book', async ({ page }) => {
  await bookStorePage.getCard();

  await bookStorePage.searchField(process.env.BOOK_NAME);


  const details = await bookStorePage.getBookDetails();

  console.log('Book Details:', details);

  expect(details.title).toContain(process.env.BOOK_NAME);
  expect(details.author).not.toBe('');
  expect(details.author).toBe(process.env.BOOK_AUTHOR);
  expect(details.publisher).not.toBe('');
  expect(details.publisher).toBe(process.env.BOOK_PUBLISHER);

});

test('Click on loguot', async ({ page }) => {
  await bookStorePage.getCard();
  await loginPage.login();

  await loginPage.EnterUserName(process.env.QA_USERNAME);
  await loginPage.EnterPswd(process.env.QA_PASSWORD);

  await loginPage.login();

  await loginPage.Logout();

});
