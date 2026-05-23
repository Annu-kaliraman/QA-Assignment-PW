import { test, expect } from '@playwright/test';
import { BasePage } from './base';

export class Login extends BasePage {
  constructor(page) {
    super(page)
    this.page = page;
    this.loginBtn = '#login';
    this.userName = '#userName';
    this.pswd = '#password';
    this.logout = '//div[@class="ms-auto text-end col-md-4 col-sm-12"]/button';

  }
  async navigateToBookStore() {
    await this.navigate();
  }
  async login() {
    await this.click(this.loginBtn);
  }
  async EnterUserName(name) {
    await this.type(this.userName, name);
  }
  async EnterPswd(password) {
    await this.type(this.pswd, password);
  }
  async getlogoutBtn() {
    return await this.getLocator(this.logout);
  }
  async Logout() {
    await this.click(this.logout);
  }

}
