import { BasePage } from "./base";

export class Book extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.bookStoreCard = "Book Store Application";
    this.bookStore = '#gotoStore';
    this.search = '#searchBox';
    this.bookTitle = '//tbody/tr/td[2]//a';
    this.bookAuthor = '//tbody/tr/td[3]';
    this.bookPublisher = '//tbody/tr/td[4]';

  }
  async navigateToUrl(url) {
    await this.navigate(url);
  }
  async getCard() {
    await this.page.getByText(this.bookStoreCard).scrollIntoViewIfNeeded()
    await this.page.getByText(this.bookStoreCard).click()
  }
  async BookStoreBtn() {
    await this.click(this.bookStore);
  }
  async searchField(text) {
    await this.click(this.search)
    await this.type(this.search, text)
  }

  async validateBook(bookName) {
    return await this.page.locator(`text=${bookName}`).isVisible()
  }

  async getBookDetails() {
    const title = await this.page.locator(this.bookTitle).textContent();
    const author = await this.page.locator(this.bookAuthor).textContent();
    const publisher = await this.page.locator(this.bookPublisher).textContent();

    return {
      title: title,
      author: author,
      publisher: publisher
    };
  }

}