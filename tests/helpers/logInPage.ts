export const logIn = async (page, email, password) => {
  await page.locator("//input[@id='email']").fill(email);
  await page.locator("//input[@id='password']").fill(password);
  await page.locator("//button[@id='submit']").click();
};
