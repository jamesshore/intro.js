// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var fs = require("fs");     // NOTE! This is the PhantomJS fs module, not Node's fs module

	var URL = "http://localhost:5000/example/multi-page/index.html";

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
			actualDom = JSON.stringify(actualDom);

			var expectedDom = fs.read("./tests/approvals/" + filename);
			test.assertEquals(actualDom, expectedDom, filename);

		});
	}


	function dumpDom(filename) {
		casper.then(function() {
			var dom = this.evaluate(function() {
				return document;
			});
			dom = JSON.stringify(dom);
			fs.write("./tests/approvals/" + filename, dom, "w");
		});
	}

}());