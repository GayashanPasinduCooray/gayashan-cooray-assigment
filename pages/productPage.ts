import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly relatedProductsSection: Locator;
  readonly relatedProductItems: Locator;
  readonly relatedProductCategories: Locator;

  constructor(page: Page) {
    this.page = page;

  
    this.relatedProductsSection = page.locator('section[aria-label="Similar sponsored items"]');

    this.relatedProductItems = this.relatedProductsSection.locator('li');


    this.relatedProductCategories = this.relatedProductItems; 
  }

  async gotoProductPage() {
    await this.page.goto('https://www.ebay.com/itm/195060516753');
  }

  async relatedProductsCount(): Promise<number> {
    return await this.relatedProductItems.count();
  }

  async getRelatedProductsCategories(): Promise<string[]> {
    const count = await this.relatedProductCategories.count();
    const categories: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.relatedProductCategories.nth(i).textContent();
      categories.push(text ? text.trim() : '');
    }
    return categories;
  }
}
