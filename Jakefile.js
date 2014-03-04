// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var jshint = require("simplebuild-jshint");
	var casperjs = require("./tests/casperjs_runner.js");

	task("default", [ "lint", "test" ]);

	desc("Lint the code");
	task("lint", function() {
		process.stdout.write("Linting: ");
		jshint.checkFiles({
			files: [ "*.js", "tests/**/*.js" ],
			options: jshintOptions(),
			globals: {}
		}, complete, fail);
	}, { async: true });

	desc("Run tests");
	task("test", function() {
		console.log("Testing:");
		casperjs.runPinningTests(complete, fail);
	}, { async: true });

	desc("Run a local server for manual testing");
	task("run", function() {
		console.log("** Navigate to the 'example' directory **");
		jake.exec("node node_modules/http-server/bin/http-server", { interactive: true });
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