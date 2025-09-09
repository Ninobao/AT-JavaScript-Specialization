class BaseComponent {
  constructor(page) {
    this.page = page;
  }

  async clickOn(element) {
    await element.click();
    await this.page.waitForLoadState();
  }
}

export default BaseComponent;
