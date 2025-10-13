import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

class CustomWorld extends World {
  async init() {
    this.baseURL = 'https://practicesoftwaretesting.com';
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }
}

setWorldConstructor(CustomWorld);
