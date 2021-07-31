import gulp from 'gulp';
import del from 'del';
import path from 'path';
import { argv } from 'yargs';
import { default as Launcher } from '@wdio/cli';

const allure = require('allure-commandline');

process.env.config = (argv.config) ? argv.config : process.env.config;
const configfile = process.env.config === 'undefined' ? 'local' : `${argv.config}`;

// Delete temp files and last run results/screenshots
gulp.task('prepare', async () => {
	await del(['tests/reports/json/*', 'tests/reports/html/*', 'tests/reports/xml/*', 'tests/reports/screenshots/*']);
	await del(['allure-report', 'allure-results']);
});

// Run wdio task to trigger execution
gulp.task('wdio', gulp.series('prepare', async () => {
	const wdio = new Launcher(path.join(__dirname, 'tests', 'config', `wdio.${configfile}.config.js`));
	await wdio.run();
}));

gulp.task('generate-allure-report', gulp.series('wdio', async (cb) => {
	const generation = allure(['generate', 'allure-results']);

	await generation.on('exit', (exitCode) => {
		console.log('Generation is finished with code:', exitCode);
	});

	return (cb);
}));

gulp.task('execute', gulp.series('generate-allure-report', async (cb) => {
	console.log('execution finished..');
	await (cb);
}));
