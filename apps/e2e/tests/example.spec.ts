import { test, expect } from '@playwright/test'
import { SearchPage } from '../pages/search'

test('has title collection', async ({ page }) => {
  const searchPage = new SearchPage(page)
  searchPage.goto()

  await expect(page.getByText('Collections')).toBeVisible()
  const collectionOne = page.getByRole('link', { name: 'Animals' })
  await collectionOne.click()
  await expect(page.getByText('Cat Toy Azure')).toBeVisible()
  const productOne = page.getByText('Cat Toy Azure')
  await productOne.click()
  await expect(page.getByText('Cat Toy Azure')).toBeVisible()
  await expect(page.url()).toBe('http://localhost:5173/product/2')
})

test('Test fill filter', async ({ page }) => {
  const searchPage = new SearchPage(page)
  await searchPage.goto()
  await searchPage.selectFilter('Animals')
  await searchPage.search('dog')

  await page.waitForResponse(
    (response) =>
      response.url().includes('/api/products') && response.status() === 200,
  )

  await page.getByText('Dog collar black').click()
  expect(page.url()).toBe('http://localhost:5173/product/23')
  await expect(page.getByText('Dog collar black')).toBeVisible()
})

test('Add a product to the cart and display the price', async ({ page }) => {
  await page.goto('http://localhost:5173/product/2')

  await page.click('button:has-text("Add to cart")')
  await page.locator('span.bg-red-600.text-white.rounded-full').waitFor()

  await page.click('button:has-text("Cart")')

  await expect(page.locator('p:text("Cat Toy Azure")')).toBeVisible()
})

test('Toggle between dark and light modes on the About page', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/about')

  // Verify initial theme
  const initialTheme = await page.evaluate(() =>
    document.documentElement.classList.contains('dark'),
  )
  expect(initialTheme).toBe(false)

  await page.click('button:has-text("🌙 Dark")')
  const darkMode = await page.evaluate(() =>
    document.documentElement.classList.contains('dark'),
  )
  expect(darkMode).toBe(true)

  await page.click('button:has-text("☀️ Light")')
  const lightMode = await page.evaluate(() =>
    document.documentElement.classList.contains('dark'),
  )
  expect(lightMode).toBe(false)
})
