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
    // await request.post('http://localhost:3003/api/users', {
    //   data: {
    //     username: "1st_user",
    //     name: "Onyi",
    //     password: "password_1"
    //   }
    // })
    // await request.post('http://localhost:3003/api/users', {
    //   data: {
    //     username: "2nd_user",
    //     name: "Mzii",
    //     password: "password_2"
    //   }
    // })

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
      await page.getByRole('button', { name: 'login' }).click()

      await loginWith(page, 'Fredrick', 'WsxfT')
      await page.getByText('Difre logged in').waitFor()
      
    })

    test('a new blog can be created', async ({ page }) => {

      await createBlog(page, 'Hello yourself', 'Onyango Fred', 'onti.com')
    })

    test('a blog can be liked', async ({ page }) => {
      
      await createBlog(page, 'Hello yourself', 'Onyango Fred', 'onti.com')

        await expect(page.getByText(`a new blog Hello yourself by Onyango Fred added`)).toBeVisible()


      await page.getByRole('button', { name: 'view'}).click()



      await page.getByRole('button', { name: 'like'}).click()
      
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by the user who created it', async ({ page }) => {
      await createBlog(page, 'testing the deleting if it is working', 'Testing onyi', 'http://delete.com')


      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())

      await page.getByRole('button', { name: 'delete'}).click()

      const blog = page.locator('.blog').filter({
        hasText: 'testing the deleting if it is working'
      })
      
      await expect(blog).toHaveCount(0)
    })

    test.only('blogs are sorted by likes in descending order', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click();
      await createBlog(page, 'Real Things', 'Kenneth Maribe', 'me.com');
      await createBlog(page, 'The second thing', 'Lennar Omika', 'you.com');
      await createBlog(page, 'Third stuff', 'Me Myself', 'three.com');

      const blog1 = page.locator('.blog').filter({ hasText: 'Real Things' });
      const blog2 = page.locator('.blog').filter({ hasText: 'The second thing' });
      const blog3 = page.locator('.blog').filter({ hasText: 'Third stuff' });

      await blog1.getByRole('button', { name: 'view' }).click();
      await blog2.getByRole('button', { name: 'view' }).click();
      await blog3.getByRole('button', { name: 'view' }).click();

      const likeBtn3 = blog3.getByRole('button', { name: 'like' });
      await likeBtn3.click();
      await expect(page.getByText('likes 1').first()).toBeVisible();
      await likeBtn3.click();
      await expect(page.getByText('likes 2').first()).toBeVisible();

      const likeBtn1 = blog1.getByRole('button', { name: 'like' });
      await likeBtn1.click();
      await expect(page.getByText('likes 1').first()).toBeVisible();


      await page.waitForTimeout(500); 

      const blogLocators = page.locator('.blog');

      await expect(blogLocators.nth(0)).toContainText('Third stuff');
      await expect(blogLocators.nth(1)).toContainText('Real Things');
      await expect(blogLocators.nth(2)).toContainText('The second thing');
    });
  })

  test('only the user who created a blog can see the delete button', async ({ page }) => {
    await loginWith(page, '1st_user', 'password_1')
    await createBlog(page, 'Security Test Blog', 'Author A', 'http://Author 1')

    await page.getByRole('button', { name: 'Log Out'}).click()

    await loginWith(page, '2nd_user', 'password_2')

    const blogElement = page.locator('.blog').filter({ hasText: 'Security Test Blog' })


    await expect(blogElement.getByRole('button', { name: 'delete' })).not.toBeVisible()
  })


  
})

