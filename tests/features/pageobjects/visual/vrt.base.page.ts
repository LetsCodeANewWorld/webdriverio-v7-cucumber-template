import { BasePage } from '../base.page';

class VisualBasePage extends BasePage{

	constructor(pageName: string ='') {
		super();
		const {page} = require('../../locators/');
	}

	openPage(url: string) {
		this.OpenURL(url);
		browser.pause(4000);
	}

	SetWindowSize(screenWidth: number, screenHeight: number) {
		browser.setWindowSize(screenWidth, screenHeight);
		browser.pause(4000);
		// @ts-ignore
		global.result = browser.getWindowSize();
	}

	CheckElement(componentName: string) {
		// expect(browser.$('').toBeDisplayed());
		// @ts-ignore
		expect(browser.checkElement(browser.$(`page.${componentName}`), componentName, {})).toEqual(0);
	}

	CheckScreen(screenName: string) {
		const screen = screenName;
		// @ts-ignore
		expect(browser.checkScreen(screen, { disableCSSAnimation: true })).toEqual(0);
	}
}

export default VisualBasePage;
