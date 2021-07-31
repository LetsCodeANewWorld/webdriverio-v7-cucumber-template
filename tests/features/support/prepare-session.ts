const { join } = require('path');

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

module.exports = {
	addVRTServiceInConfig(service: string) {
		let servicesArray: any[''];

		if (service === 'local') {
			servicesArray = ['selenium-standalone'];
		} else if (service === 'browserstack') {
			servicesArray = ['browserstack'];
		}

		if (process.env.runvisualtest === 'true') {
			servicesArray.push(vrtService);
		}
		return servicesArray;
	},

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
};
