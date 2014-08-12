window.require = function(name) {
    window.require._definedModules || (window.require._definedModules = {});
    if(!window.require._definedModules[name])
      throw Error("No such module " + name)
    var currentRequires = window.require._currentRequires || (window.require._currentRequires = []);
    if(~currentRequires.indexOf(name))
      throw Error("Circular dependency detected when requiring "+ name + ". The following modules were already required: " + currentRequires.join(', '));
    currentRequires.push(name);
	var res = window.require._definedModules[name].instance || 
            (window.require._definedModules[name].instance = window.require._definedModules[name].definition());
    if(currentRequires.pop() != name)
      throw Error("Something went wrong in dependency resolution when returning module "+name+ ". We're not sure how this happened.")
    return res;
}
window.define = function(name, definition) {
    window.require._definedModules || (window.require._definedModules = {});
	window.require._definedModules[name] = {
		instance: null,
		definition: definition
	};
}