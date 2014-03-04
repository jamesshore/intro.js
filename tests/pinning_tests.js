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
		casper.thenClick("#startButton");
		checkDom("step1.txt", test);
//		thenClickNext();        // step 2
//		checkDom("step2.txt");
//		thenClickNext();        // step 3
//		checkDom("step3.txt");
//		thenClickNextPage();    // step 4
//		checkDom("step4.txt");
//		thenClickNext();        // step 5
//		checkDom("step5.txt");
//		thenClickNextPage();    // done
//		checkDom("end.txt");

		casper.run(function() {
				test.done();
		});
	});

	function thenClickNext() {
		return thenClickSelector(".introjs-nextbutton");
	}

	function thenClickNextPage() {
		return thenClickSelector(".introjs-skipbutton");
	}

	function thenClickSelector(selector) {
		return casper.thenClick(selector)
			.wait(1000);
	}

	function checkDom(filename, test) {
		casper.then(function() {
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