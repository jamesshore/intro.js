// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var jshint = require("simplebuild-jshint");

task("default", ["lint"]);

desc("Lint the code");
task("lint", function() {
	jshint.checkFiles({
		files: "*.js",
		options: {},
		globals: {}
	}, complete, fail);
}, { async: true });

desc("Run a local server for manual testing");
task("run", function() {
	console.log("Server code goes here");
});