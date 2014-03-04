// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var jshint = require("simplebuild-jshint");

	task("default", ["lint"]);

	desc("Lint the code");
	task("lint", function() {
		process.stdout.write("Linting: ");
		jshint.checkFiles({
			files: "*.js",
			options: jshintOptions(),
			globals: {}
		}, complete, fail);
	}, { async: true });

	desc("Run a local server for manual testing");
	task("run", function() {
		console.log("Server code goes here");
	});

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