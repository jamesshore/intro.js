// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

exports.toTargetElement = function(self, targetElement) {
  if (!_elementInViewport(targetElement.element)) {
	  var rect = targetElement.element.getBoundingClientRect(),
		  winHeight = _getWinSize().height,
		  top = rect.bottom - (rect.bottom - rect.top),
		  bottom = rect.bottom - winHeight;

	  if (top < 0 || targetElement.element.clientHeight > winHeight) {
	    //Scroll up
		  window.scrollBy(0, top - 30); // 30px padding from edge to look nice
	  }
	  else {
		  //Scroll down
		  window.scrollBy(0, bottom + 100); // 70px + 30px padding from edge to look nice
	  }
  }
};

/**
* Check if element is visible
* http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
*
* @api private
* @method _elementInViewport
* @param {Object} el
*/
function _elementInViewport(el) {
 var rect = el.getBoundingClientRect();

 return (
   rect.top >= 0 &&
   rect.left >= 0 &&
   (rect.bottom+80) <= window.innerHeight && // add 80 to get the text right
   rect.right <= window.innerWidth
 );
}

/**
* Provides a cross-browser way to get the screen dimensions
* via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
*
* @api private
* @method _getWinSize
* @returns {Object} width and height attributes
*/
function _getWinSize() {
 if (window.innerWidth != undefined) {
   return { width: window.innerWidth, height: window.innerHeight };
 } else {
   var D = document.documentElement;
   return { width: D.clientWidth, height: D.clientHeight };
 }
}
