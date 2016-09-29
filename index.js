'use strict';

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

var cl = function() {
	console.log.apply(console, arguments);
}

var serializeForm = function(form) {
	var obj = {};
	var elements = form.querySelectorAll( "input, select, textarea" );
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name = element.name;
		var value = element.value;

		if( name ) {
			obj[ name ] = value;
		}
	}

	return JSON.stringify( obj );
};

var parseUrl = function(path) {
	var urlSections = path.split('/');
	urlSections = urlSections.filter(function(sectionString) {
		return sectionString.length > 0;
	});

	var urlPath = path;

	return {
		urlSections: urlSections,
		urlPath: urlPath
	}
}

// Determines if the given object contains all of the given properties.
var hasProperties = function(object, properties) {
	for(const p of properties) {
		if(!object.hasOwnProperty(p))
			return false;
	}

	return true;
}

var querySelector = function(selector) {
	var els = document.querySelectorAll(selector);
	
	if(els.length == 1) {
		els = els[0];
	}
	return els;
}

module.exports = {
	/* general */
	cl: cl,
	parseUrl: parseUrl,

	/* objects */
	hasProperties: hasProperties,

	/* dom stuff */
	e: querySelector,
	addEvent: addEvent,
	serializeForm: serializeForm
}

