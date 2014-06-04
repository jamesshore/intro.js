// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var jshint = require("simplebuild-jshint");
	var casperjs = require("./tests/casperjs_runner.js");
	var browserify = require("browserify");
	var fs = require("fs");
	var karma = require("./build/karma_runner.js");

	desc("Lint and unit test the code");
	task("default", [ "lint", "test" ]);

	desc("Start Karma server for testing");
	task("karma", function() {
		karma.serve("build/karma.conf.js", complete, fail);
	}, {async: true});

	desc("Lint the code");
	task("lint", function() {
		process.stdout.write("Linting: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/**/*.js", "tests/**/*.js" ],
			options: jshintOptions(),
			globals: jshintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Run unit tests");
	task("test", function() {
		karma.runTests([], complete, fail);
	}, { async: true });

	desc("Run pinning tests");
	task("pinningTest", ["fixPhantomJsPermissions", "bundle"], function() {
		console.log("Testing:");
		casperjs.runPinningTests(complete, fail);
	}, { async: true });

	desc("Run a local server for manual testing");
	task("run", ["bundle"], function() {
		console.log("** Navigate to the 'example' directory **");
		jake.exec("node node_modules/http-server/bin/http-server", { interactive: true }, complete);
	}, { async: true });

	desc("Bundle CommonJS modules into a single file");
	task("bundle", function() {
		console.log("Bundling intro.js with Browserify...");
		var b = browserify("./src/intro.js");
		b.bundle({ standalone: "introJs" }, function(err, bundle) {
			if (err) fail(err);
			fs.writeFileSync("./intro.js", bundle);
			complete();
		});
	}, { async: true });

	// When PhantomJS is installed through npm, it's installed without execute permissions.
	// Running the PhantomJS npm script fixes it, so we just run a do-nothing command here.
	task("fixPhantomJsPermissions", function() {
		process.stdout.write("Fixing PhantomJS: ");
		jake.exec("node_modules/.bin/phantomjs -v", { interactive: true }, complete);
	}, { async: true });

	function jshintOptions() {
		return {
			// Make JSHint more permissive so existing code lints (could be hiding bugs)
			smarttabs: true,
			funcscope: true,
			shadow: true,
			scripturl: true,
			loopfunc: true,
			expr: true,
			strict: false,
			"-W032": true,        // Unnecessary semicolon
			"-W041": true,        // Use '===' to compare with 'true'
			"-W086": true,        // Expected a 'break' statement before 'default'.

			// JSHint settings we really want
			globalstrict: true,   // Allow "use strict" at top level (because we're using CommonJS modules)
		};
	}

	function jshintGlobals() {
		return {
			// Browserify
			require: false,
			module: false,
			exports: false,

			// Mocha / expect.js
			describe: false,
			it: false,
			expect: false,
			dump: false,
			beforeEach: false,
			afterEach: false,

			// Browser
			window: false,
			document: false,
			setTimeout: false
		};
	}

}());