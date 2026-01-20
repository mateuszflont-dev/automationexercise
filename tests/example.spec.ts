import { test, expect } from '@playwright/test';
import userData from '../testUserData.json';


test('Register User', async ({ page }) => {
  await page.goto('http://automationexercise.com');

  await page.waitForLoadState('networkidle');
  
  const cookiesButton = page.getByRole('button', {name: "Consent"});
  if (await cookiesButton.isVisible)
    await cookiesButton.click();

  await page.getByRole('link', {name: "Signup / Login"}).click();

  const signupLabel = page.getByRole('heading', {name: "New User Signup!"});
  await expect(signupLabel).toBeVisible();

  const myUser = userData.validUser;
  const signupForm = page.locator('.signup-form');
  const nameTextbox = signupForm.getByRole('textbox', {name: "Name"});
  await nameTextbox.fill(myUser.name);
  const emailTextbox = signupForm.getByRole('textbox', {name: "Email Address"});
  await emailTextbox.fill(myUser.email);

  const signupButton = page.getByRole('button', {name: "Signup"});
  await signupButton.click();

  //---

  const registrationForm = page.locator(".login-form");
    

    const accountInformationHeader = registrationForm.getByRole('heading', {name: "Enter Account Information"});
    await expect(accountInformationHeader).toBeVisible();

    const formGenderSection = registrationForm.locator(".clearfix");
    const formRadio = formGenderSection.getByRole('radio', {name: myUser.gender, exact: true});
    await formRadio.check();

    const formNameBox = registrationForm.getByRole('textbox', {name: "name"});
    await formNameBox.fill(myUser.name);

    //const formEmailBox = registrationForm.getByRole('textbox', {name: "Email"});

    const formPasswordBox = registrationForm.getByRole('textbox', {name: "Password"});
    await formPasswordBox.fill(myUser.password);

    const birthdaySection = registrationForm.locator(".form-group").filter({hasText: "Date of birth"});
      const daySelector = birthdaySection.getByRole('combobox', {name: "Day"});
        await daySelector.selectOption(myUser.dateOfBirth.day);
      const monthSelector = birthdaySection.getByRole('combobox', {name: "Month"});
        await monthSelector.selectOption(myUser.dateOfBirth.month);
      const yearSelector = birthdaySection.getByRole('combobox', {name: "Year"});
        await yearSelector.selectOption(myUser.dateOfBirth.year);

    const newsletterCheckbox = registrationForm.getByRole("checkbox", {name: "newsletter"});
    await newsletterCheckbox.check();

    const optinCheckbox = registrationForm.getByRole("checkbox", {name: "optin"});
    await optinCheckbox.check();

    const addressSection = registrationForm.locator(".required form-group");
      const firstNameBox = addressSection.getByRole('textbox', { name: 'First name *' });
      const lastNameBox = addressSection.getByRole('textbox', { name: 'Last name *' });
      const companyBox = addressSection.getByRole('textbox', { name: 'Company', exact: true });
      await addressSection.getByRole('textbox', { name: 'Address * (Street address, P.' });
      await addressSection.getByRole('textbox', { name: 'Address 2' });
      await addressSection.getByRole('textbox', { name: 'State *' });
      await addressSection.getByRole('textbox', { name: 'City * Zipcode *' });
      await addressSection.locator('#zipcode');
      await addressSection.getByRole('textbox', { name: 'Mobile Number *' });
      
});