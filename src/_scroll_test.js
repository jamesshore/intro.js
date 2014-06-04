// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var scroll = require("./scroll.js");

describe("scrollToTargetElement", function() {

	var div;

	beforeEach(function() {
		div = document.createElement("div");
		div.style = "position: absolute; top: 0px; height: 100px; border: solid red 1px;";
		div.innerHTML = "hi";
		document.body.appendChild(div);
	});

	afterEach(function() {
		document.body.removeChild(div);
	});

	it("scrolls down to put element in viewport", function() {
		div.style.top = "10000px";
		div.style.paddingBottom = "200px";

		scroll.toDomElement(null, div);

		expect(window.pageYOffset).to.equal(10000 - 30);    // 30 pixels of padding
	});

});