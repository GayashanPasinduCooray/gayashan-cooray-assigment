import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage';

test.describe('Related Products Feature Tests', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.gotoProductPage();
  });

  test('Verify related products section displays on main product page', async () => {
    await expect(productPage.relatedProductsSection).toBeVisible({ timeout: 10000 });
  });

  test('Verify maximum six related products displayed', async () => {
    const count = await productPage.relatedProductsCount();
    expect(count).toBeLessThanOrEqual(6);
  });

  test('Verify related products are in the same category', async () => {
    const categories = await productPage.getRelatedProductsCategories();
    for (const category of categories) {
      expect(category.toLowerCase()).toContain('wallet'); 
    }
  });

  test('Negative - API fails to return related products (simulate)', async ({ page }) => {
    await page.route('**/related-products-api-endpoint', route => {
      console.log('API request intercepted and aborted.');
      return route.abort();
    });

    const negativeProductPage = new ProductPage(page);
    await negativeProductPage.gotoProductPage();

    await expect(negativeProductPage.relatedProductsSection).not.toBeVisible();
  });
});

