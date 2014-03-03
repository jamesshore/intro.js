// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

task("default", ["lint"]);

desc("Lint the code");
task("lint", function() {
	console.log("Lint code goes here");
});

desc("Run a local server for manual testing");
task("run", function() {
	console.log("Server code goes here");
});