import { Given, When, Then } from '@cucumber/cucumber';
import { default as VisualBasePage } from '../../pageobjects/visual/vrt.base.page';

const vrtTestData = require('../../../testdata/data')

const vrtBasePage = new VisualBasePage();
let componentName = '';

Given(/^User is on the Google (.*) page$/, (pageName: string) => {
	vrtBasePage.openPage(vrtTestData[pageName]);
});

When(/^User is on maximised screen resolution$/, () => {
	const screenWidth = 1920;
	const screenHeight = 1040;
	vrtBasePage.SetWindowSize(screenWidth, screenHeight);
});

When(/^Screen resolution is set to width (-?\d+) and height (-?\d+)$/, (width: number, height: number) => {
	vrtBasePage.SetWindowSize(width, height);
});

Then(/^([^"]*) home page should match the baseline image$/, (screenName: string) => {
	componentName = screenName;
	vrtBasePage.CheckScreen(screenName);
});

Then(/^"(.*)" component on "(.*)" should match the baseline image$/, (elementName: string, pageName: string) => {
	componentName = elementName;
	const visualBasePage = new VisualBasePage(pageName);
	visualBasePage.CheckElement(elementName);
});

export { componentName };
