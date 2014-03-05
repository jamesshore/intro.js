// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var fs = require("fs");     // NOTE! This is the PhantomJS fs module, not Node's fs module
	var diff = require("big-object-diff");

	var URL = "http://localhost:5000/example/multi-page/index.html";
	var RESET_APPROVALS = false;      // change this to 'true' to re-create the 'known good' approvals

	casper.test.setUp(function(done) {
		casper.start(URL).run(done);
	});

	casper.test.begin("Navigate through all steps using the mouse", function(test) {
		test.assertExists("#startButton");

		checkDom("start.txt", test);
		thenClickStart("step1.txt", test);
		thenClickNext("step2.txt", test);
		thenClickNext("step3.txt", test);
		thenClickNextPage("step4.txt", test);
		thenClickNext("step5.txt", test);
		thenClickNextPage("end.txt", test);

		casper.run(function() {
				test.done();
		});
	});

	function thenClickStart(postClickApproval, test) {
		return thenClickSelector("#startButton", postClickApproval, test);
	}

	function thenClickNext(postClickApproval, test) {
		return thenClickSelector(".introjs-nextbutton", postClickApproval, test);
	}

	function thenClickNextPage(postClickApproval, test) {
		return thenClickSelector(".introjs-skipbutton", postClickApproval, test);
	}

	function thenClickSelector(selector, postClickApproval, test) {
		casper.thenClick(selector)
			.wait(1000);

		checkDom(postClickApproval, test);
	}

	function checkDom(filename, test) {
		casper.then(function() {
			casper.capture("./generated/" + filename + ".png");

			var actualDom = this.evaluate(function() {
				return document;
			});

			if (RESET_APPROVALS) resetApproval();
			else checkApproval();

			function checkApproval() {
				var expectedDom = JSON.parse(fs.read("./tests/approvals/" + filename));

				var renderedDiff = diff.renderDiff(expectedDom, actualDom);
				if (renderedDiff !== "") {
					console.log(renderedDiff);
					test.fail(filename);
				}
				else {
					test.assert(true, filename);
				}
			}

			function resetApproval() {
				fs.write("./tests/approvals/" + filename, JSON.stringify(actualDom), "w");
				test.fail("Re-created approval: " + filename);
			}
		});
	}

}());