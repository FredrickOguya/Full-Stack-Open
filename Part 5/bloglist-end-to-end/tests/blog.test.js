const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "Fredrick",
        name: "Difre",
        password: "WsxfT"
      }
    })

    await page.goto('http://localhost:5173')

  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByText('blogs')).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await loginWith(page, "Fredrick", "WsxfT")

      await expect(page.getByText('Difre logged in')).toBeVisible()
    })
    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, "Fredrick", "bad")

      await expect(page.locator('.error')).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {

      await loginWith(page, 'Fredrick', 'WsxfT')
      await page.getByText('Difre logged in').waitFor()
      
    })

    test('a new blog can be created', async ({ page }) => {

      await createBlog(page, 'Hello yourself', 'Onyango Fred', 'onti.com')

      await expect(page.getByText('Hello yourself').last()).toBeVisible()
    })

    test.only('a blog can be liked', async ({ page }) => {
      
      await createBlog(page, 'Hello yourself', 'Onyango Fred', 'onti.com')

        await expect(page.getByText(`a new blog Hello yourself by Onyango Fred added`)).toBeVisible()


      await page.getByRole('button', { name: 'view'}).click()



      await page.getByRole('button', { name: 'like'}).click()
      
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })

  
})

