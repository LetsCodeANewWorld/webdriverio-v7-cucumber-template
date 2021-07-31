import { Given, When, Then } from '@cucumber/cucumber';
import { loginPage, securePage, pages } from '../pageobjects/';

const pagers = {
    login: loginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pagers[page].open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await loginPage.login(username, password)
    
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(securePage.flashAlert).toBeExisting();
    await expect(securePage.flashAlert).toHaveTextContaining(message);
    // await expect(securePage.flashAlert)
});

