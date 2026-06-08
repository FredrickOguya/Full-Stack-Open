const { expect } = require("@playwright/test")

const loginWith = async (page, username, password) => {

  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()

}

const createBlog = async (page, Title, Author, url) => {
  await page.getByRole('link', {name: 'create new blog'}).click()
  await page.getByLabel('Title:').fill(Title);
  await page.getByLabel('Author:').fill(Author);
  await page.getByLabel('url:').fill(url);

  await page.getByRole('button', { name: 'save' }).click();

  await page.getByRole('link', { name: 'blogs' }).click()
  await expect(page.getByText(`${Title} ${Author}`).last()).toBeVisible()


  const blog = page.locator('.blog').filter({ hasText: Title})

  await expect(blog).toHaveCount(0)
};

module.exports = {
  loginWith,
  createBlog
}