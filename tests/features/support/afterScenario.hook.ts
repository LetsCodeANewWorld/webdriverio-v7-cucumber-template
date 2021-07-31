// import {HookParams} from "@wdio/cucumber-framework/build/types";
//
// export{}
// import { After, Before } from '@cucumber/cucumber';
// import allureReporter from '@wdio/allure-reporter';
// // ************VISUAL Imports Starts************************
// import fs from 'fs';
// import path from 'path';
// import baseconfig from '../../config/wdio.base.config';
// import { componentName } from '../step-definitions/visual/visual.steps';
// // ************VISUAL Imports Ends************************
//
// Before({ tags: '@signOut' }, () => {
// 	browser.reloadSession();
// });
//
// After(async (scenario:any) => {
// 	if (scenario.result.status === 'failed') {
// 		const tags = scenario.pickle.tags.map((tag: { name: any; }) => tag.name);
//
// 		// Attach the original state
// 		if (process.env.runvisualtest === 'true' && tags.includes('@visual')) {
// 			// ************VISUAL Declaration Starts************************
// 			// Storing the file name
// 			const fileName = `${componentName}--${result.width}x${result.height}.png`;
//
// 			// Resolving the path to baseline images
// 			const imgPath = `vrt-images/baseline/desktop_${baseconfig.config.browsername}/${fileName}`;
// 			const filePath = path.resolve(imgPath);
//
// 			// Resolving the path to diff images
// 			const diffImgPath = `vrt-images/latest/diff/desktop_chrome/${fileName}`;
// 			const diffFilePath = path.resolve(diffImgPath);
//
// 			// Check if baseline image file exists
// 			if (fs.existsSync(filePath)) {
// 				// Reading the contents of baseline image
// 				const image = fs.readFileSync(filePath);
// 				// Attach baseline image to the report
// 				allureReporter.addAttachment('Baseline Image', Buffer.from(image, 'base64'), 'image/png');
// 			}
// 			// Check if diff image file exists
// 			if (fs.existsSync(diffFilePath)) {
// 				// Reading the contents of diff image
// 				const diffImage = fs.readFileSync(diffFilePath);
// 				// Attach diff image to the report
// 				allureReporter.addAttachment('Diff Image', Buffer.from(diffImage, 'base64'), 'image/png');
// 			}
// 			// ************VISUAL Declaration Ends**************************
// 			console.log('Visual Diff image attached in report.');
// 		} else {
// 			console.log('this is before the non-visual screenshot....');
// 			allureReporter.addAttachment('Step failed screenshot :', Buffer.from(browser.takeScreenshot(), 'base64'), 'image/png');
// 		}
// 	}
// 	return Promise.resolve(scenario.result.status);
// });
