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
        await firstNameBox.fill(myUser.firstName);
      const lastNameBox = addressSection.getByRole('textbox', { name: 'Last name *' });
        await lastNameBox.fill(myUser.lastName);
      const companyBox = addressSection.getByRole('textbox', { name: 'Company', exact: true });
        await companyBox.fill(myUser.company);
      const addressBox1 = addressSection.getByRole('textbox', { name: 'Address * (Street address, P.' });
        await addressBox1.fill(myUser.address1);
      const addressBox2 = addressSection.getByRole('textbox', { name: 'Address 2' });
        await addressBox2.fill(myUser.address2);
      const countryBox = addressSection.getByLabel('Country *');
        await countryBox.selectOption(myUser.country);
      const stateBox = addressSection.getByRole('textbox', { name: 'State *' });
        await stateBox.fill(myUser.state);
      const cityBox = addressSection.getByRole('textbox', { name: 'City *' });
        await cityBox.fill(myUser.city);
      const zipcodeBox = addressSection.getByRole('textbox', { name: 'Zipcode *' });
        await zipcodeBox.fill(myUser.zipcode);
      const mobileNumberBox = addressSection.getByRole('textbox', { name: 'Mobile Number *' });
        await mobileNumberBox.fill(myUser.mobileNumber);
      
    const registerButton = page.getByRole('button', { name: 'Create Account' })
      await registerButton.click();

    const accountCreatedLabel = page.getByRole('heading', {name: "Account Created!"});
      await expect(accountCreatedLabel).toBeVisible();

    const continueButton = page.getByRole('button', {name: "continue-button"});
      await continueButton.click();

    const loggedAs = page.getByRole('link', {name: `Logged in as ${myUser.name}`});
      await expect(loggedAs).toBeVisible();

    const deleteAccount = page.getByRole('link', {name: "Delete Account"});
      await deleteAccount.click();

    const accountDeletedLabel = page.getByRole('heading', {name: "ACCOUNT DELETED!"});
      await expect(accountDeletedLabel).toBeVisible();
});