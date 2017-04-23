### Tobit JavaScript (ES5) Style Guide
This styleguide is a guideline for a uniform design of our JavaScript files.

## Content
1. <a href="Modules">Modules</a>
2. <a href="Variables">Variables</a>
3. <a href="Functions">Functions</a>
4. <a href="Miscellaneous">Miscellaneous</a>

## Modules
* Modules are enclosed parts of the JavaScript
* All dependencies are provided as parameters
* A public init()-method initializes the module
* Name are written in camelCase
* The module contains an export variable named by the module

### Example
```JavaScript
(function (tappProject, chayns, window, undefined) {
    'use strict';
    tappProject.init = function init(data) {
        // start
    };
    // content
})((window.tappProject = {}), chayns, window);
```
(window.tappProject = {}) would overwrite an existing module. To extend an existing module you can simply use (window.tappProject = window.tappProject || {}).

### Extend modules
```JavaScript
(function (tappProject, chayns, window, undefined) {
 
    'use strict';
 
    var newFeature = {};
 
    tappProject.awesomeFeature = newFeature;
 
})((window.tappProject), chayns, window);
```

### Alternatives
Modules can be created in the following ways as well
```JavaScript
var tappProject = (function (chayns, window, undefined) {
    'use strict'; 
    var tappProject;
    tappProject.init = function init(data) {
        // start
    }; 
    // content 
    return tappProject; 
})(chayns, window);
```
```JavaScript
var tappProject = (function (chayns, window, undefined) { 
    'use strict'; 
    function init(data) {
        // start
    };
    // content
    return {
        init: init
    };
})(chayns, window);
```

## Variables
* Only declared at the beginning of a file
* Explicit declaration to prevent global variables
* Should be available only in their specific modules
* Use camelCase for namings
* DOM element variables start with a leading $

### Example
```JavaScript
(function (tappProject, chayns, $, window, undefined) { 
	// external variables
	tappProject.debug = false; 
	// internal variables
	var $contentBox, $introBox;
	var userData; 
})((window.tappProject = {}), chayns, jQuery, window);
```

## Functions
* Prevent public functions
* Add events in the init()-function
* Namings in camelCase

### Example
```JavaScript
(function (tappProject, chayns, $, window, undefined) {
 
	// external functions
	tappProject.openPage = function openPage(url) {
 
	};
 
	// internal functions
	function doSomething(data) {
 
	}
 
})((window.tappProject = {}), chayns, jQuery, window);
```

## Miscellaneous

### Language
Consequent usage of english language 

### Use Strict
By using 'use strict'; some errors JavaScript usually would not throw an exception for, become normal erros. This helps in preventing errors early on.

### Strings
Strings are declared in single quotes.
```JavaScript
// good
var text = 'string';
// bad
var text = "string";
```

### Comparisons
Prefer type secure comparisons.
```JavaScript
'0' == 0; // true
 0  == 0; // true
'0' === 0; // false
 0  === 0; // true
 
'0' != 0; // false
'0' !== 0; // true
 
null == undefined; // true
null === undefined; // false
```

### Indents
Every level is indented using tabs. In the IDE's any developer decide for himself how to display the tab indents.

### Braces
No breaks before opening curled braces.
```JavaScript
if(true) {
 
} else {
 
}
 
function name(param) {
 
}
```

### Semicolons
Use a semicolon behind allocations and directly called functions.
```JavaScript
var x = 'content';
 
var fn = function() {
	// do stuff	
};
 
(function(data) {
 
})('data');
```
