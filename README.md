What the heck is this?

It's not commonjs and its not AMD. It's something in between that will help you transition to either

A super simple commonjs-ish module system for brownfield projects that want a module system
but don't want to expend effort toward rewriting things properly to work with better module systems.

[Runnable Sample](http://jsbin.com/tiriz/8/edit?js,console)

Features: None! 

Ok, there's two
  * Module initializations are singletons
  * Some naive circular reference detection

## Usage

```javascript
//First define your modules
define('A', function() {
	console.log("Module A loaded"); //This runs once
	return function() { console.log("Module A return value invoked")	}  //Return the module that you want
});
define('B', function() {
	console.log("Module B loaded");
	return function() { console.log("Module B return value invoked")	}  
});
define('C', function(){
  var a = require('A'); // Use require inside your modules as you would with commonjs
  var b = require('B');
  console.log("Module C loaded");
  return function(){
	console.log("Module C return value invoked");
	a();
	b();
  }
})
define('D', function() {
  var a = require('A');
  var c = require('C');
  console.log("Module D loaded");
  return function(){
	console.log("Module D return value invoked");
	a();
    c();
  }
});

// Then require your top level one
var d = require('D');
d();

// Will detect circular references
define('Loop1', function(){
  require('Loop2');
  console.log("Loop1 loaded");
})
define('Loop2', function(){
  require('C');
  require('Loop3');
  console.log("Loop2 loaded");
})
define('Loop3', function(){
  require('Loop1');
  console.log("Loop3 loaded");
})

require('Loop1'); //Will throw a circular dependency error
```