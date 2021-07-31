import { setSessionValues } from '../features/support';
const baseconfig = require('./wdio.base.config');

const config = Object.assign(baseconfig.config, {
	runner: 'local',
	services: setSessionValues.addVRTServiceInConfig('local'),
	reporters: ['spec', [
		'cucumberjs-json', {
			jsonFolder: 'tests/reports/cucumberjs-json-report/json/',
		}],
		['allure', {
			outputDir: 'allure-results',
			disableWebdriverStepsReporting: false,
			disableWebdriverScreenshotsReporting: false,
			useCucumberStepReporter: true
		}]
	],
	capabilities: [
		{
			browserName: baseconfig.config.browsername,
			acceptInsecureCerts: true
		}

		// capabilities combinations

		//    ----------chrome ------------------
		// browserName: 'chrome',
		// 'goog:chromeOptions': {
		// flag to activate chrome in headless mode
		//   args: ['--headless', '--disable-gpu'],
		// }

		//    ----------firefox ------------------
		// browserName: 'firefox',
		// 'moz:firefoxOptions': {
		// flag to activate firefox in headless mode
		//   args: ['-headless']
		// }

		//    ----------safari ------------------
		// browserName: 'safari',

		//    ----------Internet explorer ------------------
		// browserName: 'internet explorer',
		// acceptUntrustedCertificates: true,
		// ignoreProtectedModeSettings: true,    //only applicable to IE browser
		// ignoreZoomSetting: true,              //only applicable to IE browser
		// ensureCleanSession: true,

	],
});
exports.config = config;
