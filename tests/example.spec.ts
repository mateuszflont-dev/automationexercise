import { test, expect } from '@playwright/test';

test('Register User', async ({ page }) => {
  await page.goto('http://automationexercise.com');

  await page.waitForLoadState('networkidle');
  
  const cookiesButton = page.getByRole('button', {name: "Consent"});
  if (await cookiesButton.isVisible)
    await cookiesButton.click();

  await page.getByRole('link', {name: "Signup / Login"}).click();

  const signupLabel = page.getByRole('heading', {name: "New User Signup!"});
  await expect(signupLabel).toBeVisible();

  const signupForm = page.locator('.signup-form');
  const nameTextbox = signupForm.getByRole('textbox', {name: "Name"});
  await nameTextbox.fill("Tester");
  const emailTextbox = signupForm.getByRole('textbox', {name: "Email Address"});
  await emailTextbox.fill("varkhaim@gmail.com");

  const signupButton = page.getByRole('button', {name: "Signup"});
  await signupButton.click();
});