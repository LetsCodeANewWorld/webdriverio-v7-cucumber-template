export{}
const { argv } = require('yargs');
const preparesession = require('../features/support/PrepareSession');
const baseconfig = require('./wdio.base.config');
require('dotenv').config({ path: './.env' });

process.env.browserstacklocal = (argv.browserstacklocal) ? argv.browserstacklocal : process.env.browserstacklocal;
const browserstacklocal = process.env.browserstacklocal === 'undefined' ? false : argv.browserstacklocal;

const config = Object.assign(baseconfig.config, {
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_KEY,
    services: preparesession.addVRTServiceInConfig('browserstack'),

    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true,
        }],
    ],

    capabilities: [

        {
            os: 'Windows',
            os_version: '10',
            browserName: 'Chrome',
            browser_version: '74.0',
            'browserstack.local': browserstacklocal,
            'browserstack.debug': 'true',
        },

        {
            os: 'OS X',
            os_version: 'Mojave',
            browserName: 'Safari',
            browser_version: '12.0',
            'browserstack.local': browserstacklocal,
            'browserstack.debug': 'true',
            'browserstack.safari.enablePopups': 'true'
        },
    ],
});
exports.config = config;
