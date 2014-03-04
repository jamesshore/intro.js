// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var URL = "http://localhost:5000/example/multi-page/index.html";

	casper.test.setUp(function(done) {
		casper.start(URL).run(done);
	});

	casper.test.begin("Do-nothing test", function(test) {
		test.assertExists("#startButton");
		test.done();
	});

}());