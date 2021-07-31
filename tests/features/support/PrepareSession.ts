const { join } = require('path');
const {argv} = require('yargs');
const vrtService = ['image-comparison',
	{
		baselineFolder: join(process.cwd(), './vrt-images/baseline'),
		formatImageName: '{tag}-{logName}-{width}x{height}',
		screenshotPath: join(process.cwd(), './vrt-images/latest'),
		savePerInstance: true,
		autoSaveBaseline: true,
		blockOutStatusBar: true,
		blockOutToolBar: true,
		clearRuntimeFolder: true,
	},
];

class prepareSession{

	webbrowser: string | undefined
	runVisualTest: boolean | undefined
	runTests: string | undefined
	testfolder: string | undefined
	ff: string	| undefined
	executionTags: string	| undefined
	baseURL: string	| undefined
	featureFilePath: string	|	undefined




	addVRTServiceInConfig(service: string) {
		let servicesArray: any[''];

		if (service === 'local') {
			servicesArray = ['selenium-standalone'];
		} else if (service === 'browserstack') {
			servicesArray = ['browserstack'];
		}

		if (this.runVisualTest) {
			servicesArray.push(vrtService);
		}
		return servicesArray;
	}

	// getCapabilities(browser) {
	// 	switch (browsername.toLowerCase()) {
	// 	case 'chrome':
	// 		browsername = browser;
	// 		break;
	// 	case 'firefox':
	// 		browsername = browser;
	// 		break;
	// 	case 'firefox-headless':
	// 		browsername = Object.assign(browser, {
	// 			'moz:firefoxOptions': {
	// 				args: ['-headless']
	// 			}
	// 		});
	// 		break;
	// 	default:
	// 		throw new Error('browser is not mentioned in capabilities');
	// 	}
	// }


	getRunTimeParametersAndSetDefaultValues(){
		const configFile = `${process.env.npm_package_config_config}`?? 'local';
		this.webbrowser = argv.webbrowser || 'chrome';
		this.runVisualTest = argv.runvisualtest || false;
		this.runTests = argv.runtests || 'ui';
		this.ff = argv.ff || '**';
		this.featureFilePath = `tests/features/featurefiles/${this.runTests}/${this.ff}.feature`;
		console.log('new ff path is => ', this.featureFilePath)
		this.executionTags = argv.executionTags || '';
		this.baseURL = argv.baseURL || 'http://www.google.co.uk';
	}
}

export const setSessionValues =  new prepareSession();
