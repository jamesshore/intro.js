// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/*global casper */

(function() {
	"use strict";

	var URL = "http://localhost:5000/example/multi-page/index.html";

	casper.test.setUp(function(done) {
		casper.start(URL).run(done);
	});

	casper.test.begin("Navigate through all steps using the mouse", function(test) {
		test.assertExists("#startButton");


		casper.thenClick("#startButton");
		thenClickNext();        // step 2
		thenClickNext();        // step 3
		thenClickNextPage();    // step 4
		thenClickNext();        // step 5
		thenClickNextPage();    // done
		casper.run(function() {
				casper.capture("deleteme.png");
				test.done();
		});
	});

	function thenClickNext() {
		return casper.thenClick(".introjs-nextbutton")
			.wait(1000);
	}

	function thenClickNextPage() {
		return casper.thenClick(".introjs-skipbutton")
			.wait(1000);

	}

}());