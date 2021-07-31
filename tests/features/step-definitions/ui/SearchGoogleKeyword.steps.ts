import {Given, When, Then} from '@cucumber/cucumber';
import { searchKeyword } from '../../pageobjects';


Given('that user start a new google search journey', async () => {
    await browser.url('/')

})

When(/^he search for a keyword (.*) on google$/,
    (keyword: string) => {
    searchKeyword.searchForKeyword(keyword);
})
