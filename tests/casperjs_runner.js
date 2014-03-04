// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

(function() {
	"use strict";

	var child_process = require("child_process");
	var http_server = require("http-server");

	var PORT = "5000";

	exports.runPinningTests = function(success, failure) {
		startServer(function(server) {
			runCasper(function(errCode) {
				stopServer(server, function() {
					if (errCode === 0) return success();
					else return failure("Pinning tests failed.");
				});
			});
		});
	};

	function startServer(callback) {
		var server = http_server.createServer();
	  server.listen(PORT, function() {
		  return callback(server);
	  });
	}

	function runCasper(callback) {
		var casperJsProcess = child_process.spawn("node_modules/.bin/casperjs", [ "test", "tests/pinning_tests.js" ], {
			stdio: "inherit",
			env: { "PHANTOMJS_EXECUTABLE": "./node_modules/phantomjs/lib/phantom/bin/phantomjs" }
		});
		casperJsProcess.on("exit", callback);
	}

	function stopServer(server, callback) {
		server.close(callback);
	}

}());