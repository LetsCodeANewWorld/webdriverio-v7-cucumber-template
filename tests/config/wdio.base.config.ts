#!/usr/bin/env node
export{}
// require('@babel/register')({
// 	presets: [
// 		[
// 			'@babel/preset-env',
// 			{
// 				targets: {
// 					node: 'current'
// 				}
// 			}
// 		]
// 	]
// });

// const {argv} = require('yargs');
// @ts-ignore
import { setSessionValues } from "../features/support/PrepareSession"
import fs from 'fs';
import path from 'path';
import {default as allureReporter} from '@wdio/allure-reporter'


setSessionValues.getRunTimeParametersAndSetDefaultValues();


console.log(`feature file path is ${setSessionValues.featureFilePath}`)

/** Retrieve file paths from a given folder and its subfolders. */
const getStepDefsPaths = (folderPath: string) => {
	const entryPaths = fs.readdirSync(folderPath).map((entry: any) => path.join(folderPath, entry));
	const filePaths = entryPaths.filter((entryPath: any) => fs.statSync(entryPath).isFile());
	const dirPaths = entryPaths.filter((entryPath: any) => !filePaths.includes(entryPath));
	const dirFiles:any = dirPaths.reduce((prev: any[], curr: string) => prev.concat(getStepDefsPaths(curr)), []);
	return [...filePaths, ...dirFiles];
};

const executeTags = setSessionValues.executionTags === '' ? 'not @manual and not @wip and not @inprogress' : `${setSessionValues.executionTags} \
and not @manual and not @wip and not @inprogress`;

// @ts-ignore
// @ts-ignore
// @ts-ignore
const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //

    browsername: setSessionValues.webbrowser,

    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    // runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [
        setSessionValues.featureFilePath,
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'silent',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: setSessionValues.baseURL,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    //
    // ...
    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },

    },

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        requireModule: ['tsconfig-paths/register'],
        require: getStepDefsPaths('./tests/features/step-definitions/').concat(['tests/features/support/*.js']),
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        // requireModule: ['@babel/register'],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        format: ['pretty'],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: executeTags,
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config: Object, capabilities:Array<Object>) {
        setSessionValues.getRunTimeParametersAndSetDefaultValues();
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world world object containing information on pickle and test step
     */
    // beforeScenario: function (world) {
    // },
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     */
    // beforeStep: function (step, scenario) {
    // },
    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {Object}             result   results object containing scenario results
     * @param {boolean}            result.passed   true if scenario has passed
     * @param {string}             result.error    error stack if scenario failed
     * @param {number}             result.duration duration of scenario in milliseconds
     */
    // afterStep: function (step, scenario, result) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world  world object containing information on pickle and test step
     * @param {Object}                 result results object containing scenario results
     * @param {boolean}                result.passed   true if scenario has passed
     * @param {string}                 result.error    error stack if scenario failed
     * @param {number}                 result.duration duration of scenario in milliseconds
     */
    afterScenario: async function(world: any, result: any) {
        allureReporter.addArgument('timestamp', String(Date.now()));
        // if(result.passed){
        //     const tags = world.pickle.tags.map((tag: { name: any; }) => tag.name);
        //     if (process.env.runvisualtest === 'true' && tags.includes('@visual')) {
        //         // ************VISUAL Declaration Starts************************
        //         // Storing the file name
        //         const fileName = `${componentName}--${result.width}x${result.height}.png`;
        //
        //         // Resolving the path to baseline images
        //         const imgPath = `vrt-images/baseline/desktop_${baseconfig.config.browsername}/${fileName}`;
        //         const filePath = path.resolve(imgPath);
        //
        //         // Resolving the path to diff images
        //         const diffImgPath = `vrt-images/latest/diff/desktop_chrome/${fileName}`;
        //         const diffFilePath = path.resolve(diffImgPath);
        //
        //         // Check if baseline image file exists
        //         if (fs.existsSync(filePath)) {
        //             // Reading the contents of baseline image
        //             const image = fs.readFileSync(filePath);
        //             // Attach baseline image to the report
        //             allureReporter.addAttachment('Baseline Image', Buffer.from(image, 'base64'), 'image/png');
        //         }
        //         // Check if diff image file exists
        //         if (fs.existsSync(diffFilePath)) {
        //             // Reading the contents of diff image
        //             const diffImage = fs.readFileSync(diffFilePath);
        //             // Attach diff image to the report
        //             allureReporter.addAttachment('Diff Image', Buffer.from(diffImage, 'base64'), 'image/png');
        //         }
        //         // ************VISUAL Declaration Ends**************************
        //         console.log('Visual Diff image attached in report.');
        //     } else {
        //         console.log('this is before the non-visual screenshot....');
        //         // allureReporter.addAttachment('Step failed screenshot :', Buffer.from(browser.takeScreenshot(), 'base64'), 'image/png');
        //     }


        // }
    },
    // afterScenario: async function (world:undefined, result:any, scenario: any) {
    //     if(result.passed){
    //     console.log('Scenario peeseed...', io.cucumber.messages.IPick)
    //     // console.log('scenario name 1', scenario.world.pickle.name);
    //     const tags = scenario.pickle.tags.map((tag: { name: any; }) => tag.name);
    //     console.log('scenario name 2', tags);
    //       await  scenario.pickle.tags.map((tag: { name: any; }) =>{
    //             tag.name;
    //             console.log('tag name is : ', tag.name);
    //         });
    //     } else{
    //         await console.log('this is before the non-visual screenshot....');
    //         await console.log('Scenario Failed#..');
    //         // allureReporter.addAttachment('Step failed screenshot :', Buffer.from(browser.takeScreenshot(), 'base64'), 'image/png');
    //     }
    //
    //     (async function (world,result, scenario) {
    //         let isLastTag; scenario.pickle.tags.forEach(tag => { isLastTag = tag.equals("@last");
    //     });
    //
    // },


    /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result:undefined, capabilities:undefined, specs:undefined) {
    //     if (result==0){
    //         console.log('test is passed..')
    //     } else{
    //         console.log('test is failed..')
    //     }
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: async function() {
        const reportError = new Error('Could not generate Allure report')
        // @ts-ignore
        const generation = allureReporter(['generate', 'allure-results', '--clean'])

        await generation.on('exit', (exitCode: any) => {
            console.log('Generation is finished with code:', exitCode);
            if(exitCode==0)
                console.log('Allure report successfully generated')
        });
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}

    beforeSession() {
        // require('expect-webdriverio').setOptions({ wait: 5000 });
    },
    // before() {
    //     browser.setWindowSize(1280, 720);
    // },

    before: () => {
		browser.setWindowSize(1280, 800);
	},
    afterStep(
        uri: undefined,
        feature: undefined,
        scenario: { error: boolean },
    ) {
        if (scenario.error) {
            console.log('Step Failed..')
            browser.takeScreenshot();
        }
    }
}

exports.config = config;
