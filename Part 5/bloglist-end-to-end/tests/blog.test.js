const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "Fredrick",
        name: "Difre",
        password: "WsxfT"
      }
    })

  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByText('blogs')).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, "Fredrick", "WsxfT")

      await expect(page.getByText('Difre logged in')).toBeVisible()
    })
    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, "Fredrick", "bad")

      await expect(page.locator('.error')).toContainText('wrong username or password')
    })
  })
  
})