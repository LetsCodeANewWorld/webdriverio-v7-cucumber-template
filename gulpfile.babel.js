#!/usr/bin/env node
import gulp from 'gulp';
import del from 'del';
import path from 'path';
import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);

// import { argv } from 'yargs';
// import { Launcher } from '@wdio/cli';
import allure from 'allure-commandline';
import run from 'gulp-run';

import Yargs from 'yargs';
const {argv} = Yargs.options({
	browser: { type: 'string',choices: ['firefox', 'chrome', 'edge'], default: 'chrome' , demandOption: true, alias: 'b' },
	runvisualtest: { type: 'boolean', choices: [true, false], default:false , demandOption: true, alias: 'rvt' },
	runtests: {type: 'string', choices: ['ui', 'visual'], default: 'ui', demandOption: true, alias: "rt",}
});

const configFile = `${argv.config}`?? 'local';

    console.log(`run visual tests => ${argv.runvisualtest}`)
	console.log(`run tests => ${argv.runtests}`)
	console.log(`browser =>  ${configFile}`)


// Delete temp files and last run results/screenshots
gulp.task('prepare', async () => {
	await del(['tests/reports/json/*', 'tests/reports/html/*', 'tests/reports/xml/*', 'tests/reports/screenshots/*']);
	await del(['allure-report', 'allure-results']);
});

// Run wdio task to trigger execution
gulp.task('wdio', gulp.series('prepare', async () => {

	// const __dirname = path.dirname(fileURLToPath(import.meta.url));
	// const wdio = new Launcher(path.join(path.dirname(fileURLToPath(import.meta.url)), 'tests', 'config', `wdio.${configfile}.config.js`));
	 return run(`node_modules/.bin/wdio ./tests/config/wdio.${configFile}.config.ts`).exec()    // prints "Hello World\n".
		.pipe(gulp.dest('output'));      // writes "Hello World\n" to output/echo.

	// const wdio = new Launcher('./tests/config/wdio.local.Config.ts');
	// await wdio.run();
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
