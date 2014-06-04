// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var scroll = require("./scroll.js");

describe("scrollToTargetElement", function() {

	var target;
	var spacer;

	beforeEach(function() {
		target = document.createElement("div");
		target.style = "position: absolute; top: 0px; height: 100px; border: solid red 1px;";
		target.innerHTML = "target";
		document.body.appendChild(target);

		spacer = document.createElement("div");
		spacer.style = "position: absolute; top: 11000px; height: 200px; border: solid red 1px;";
		spacer.innerHTML = "spacer";
		document.body.appendChild(spacer);
	});

	afterEach(function() {
		document.body.removeChild(target);
		document.body.removeChild(spacer);
	});

	it("scrolls down to put element in viewport", function() {
		target.style.top = "10000px";

		scroll.toDomElement(null, target);
		expect(window.pageYOffset).to.equal(9956);
	});

	it("scrolls up to put element in viewport", function() {
		target.style.top = "1000px";

		window.scroll(0, 10000);
		scroll.toDomElement(null, target);
		expect(window.pageYOffset).to.equal(970);
	});


});