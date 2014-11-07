What the heck is this?

**It's a tiny and very very simple javascript module system that you can use to help you improve brownfield code.**

It's not commonjs and its not AMD. It's something in between that will help you transition to either.

This project is [MIT licensed](http://opensource.org/licenses/MIT).

## When to (not) use SimpleModules

Do not use this if Browerify, RequireJs, Webpack, ES6 Modules, or something better is available to you. Do not use this on a new project, on a new project pick one of the above.

Use this when you have a project with lots of messy javascript that you just need to clean up already. Use it to bring sanity to the madness. By bad code we're talking [stuff like this](https://gist.github.com/togakangaroo/a6d527ab1225736e2fc7).

Ok, here's the thing. Javascript modules are the single most important thing you can do to organize your code. Modules allow you to isolate bits of code, name them, and explicitly define dependencies. Poor separation of concerns and dependency managemnt is a major source of bugs in js.

And all those libraries listed above are fine solutions to the problem. But alot of existing projects can't easily shim these in. 
  * Browserify and Webpack require a node-based build step which is already a dealbreaker for many projects. Additionally it requires dependencies to be clearly defined in order to create a bundle. Look at that bad code above. [Look at it](https://gist.github.com/togakangaroo/a6d527ab1225736e2fc7). Can you pick out granual modules much less the dependencies?
  * RequrieJs also requires knowing your dependencies. Plus the asynchronous loading nature of Require makes it very difficult to refactor existing projects slowly to it. Many times you hit dependency chains where the only recourse is to move them to modules all at once.

So we have SimpleModules. SimpleModules is

* Tiny, so it is easy to include on every page of your project - just put it in the head
* Synchronous, so it can be easily implemented piecemeal. Loading is let entirely up to the project. Load your scripts the same way you normally do, SimpleModules wills tay out of your way.
* Requires no serverside processing, so it is equally useful with .Net, Php, Ruby, static pages, or any other project.
* Similar in syntax to other module systems. After you refactor fully to SimpleModules it will be a relatively short jump to start using Browserfy or Require.

## Usage

SimpleModules gives you two global functions

    define('nameOfModule', function() {
       return yourModule;
    });
    
    var m = require('nameOfModule');
    
And that's it! [Here's a runnable sample](http://jsbin.com/tiriz/watch?js,console)

## Features

None! 

Ok, there's two
  * Modules aren't initialized until they're invoked for the first time. Once they are, the returned instance is cached and the same isntance is returned on additional invocations.
  * Contains some naive dection of circular references

## Samples

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
```

## Refactoring

* [Refactoring to SimpleModules (Part 1)](http://togakangaroo.github.io/2014/10/31/use-simple-modules-1.html)
