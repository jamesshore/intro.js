// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var jshint = require("simplebuild-jshint");
	var casperjs = require("./tests/casperjs_runner.js");
	var browserify = require("browserify");
	var fs = require("fs");

	task("default", [ "lint", "test" ]);

	desc("Lint the code");
	task("lint", function() {
		process.stdout.write("Linting: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/**/*.js", "tests/**/*.js" ],
			options: jshintOptions(),
			globals: {}
		}, complete, fail);
	}, { async: true });

	desc("Run pinning tests");
	task("test", ["fixPhantomJsPermissions", "bundle"], function() {
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
		var b = browserify();
		b.require("./src/intro.js", { expose: "introJs" } );
		b.bundle({ }, function(err, bundle) {
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
			"-W032": true,        // Unnecessary semicolon
			"-W041": true,        // Use '===' to compare with 'true'
			"-W086": true         // Expected a 'break' statement before 'default'.
		};
	}
}());