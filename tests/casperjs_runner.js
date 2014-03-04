// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var child_process = require("child_process");

exports.runPinningTests = function(success, fail) {
	var casperJsProcess = child_process.spawn("node_modules/.bin/casperjs", [ "test", "tests/pinning_tests.js" ], {
		stdio: "inherit",
		env: { "PHANTOMJS_EXECUTABLE": "./node_modules/phantomjs/lib/phantom/bin/phantomjs" }
	});
	casperJsProcess.on("exit", function(code) {
		if (code === 0) return success();
		else return fail("Pinning tests failed.");
	});
};