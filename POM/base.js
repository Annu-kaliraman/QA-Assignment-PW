
export class BasePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/books'
  }
  async click(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
  async type(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }
  async navigate(url) {
    await this.page.goto(url);
  }
  async isVisible(selector) {
    await this.page.waitForSelector(selector);
    return await this.page.isVisible(selector);
  }
  async getLocator(selector) {
    await this.page.waitForSelector(selector);
    return await this.page.locator(selector);
  }
  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
  async hover(selector) {
    await this.page.hover(selector);
  }
  async getText(selector) {
    await this.page.waitForSelector(selector);
    return await this.page.textContent(selector);
  }

}
