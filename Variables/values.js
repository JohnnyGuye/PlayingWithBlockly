//goog.provide("Squid.SimpleVariable");

Squid.SimpleVariables = new Map();
Squid.SimpleVariablesNames = [];

Squid.addSimpleVariable = function (name) {
    Squid.SimpleVariables.set(name, 0);
    Squid.SimpleVariablesNames = Array.from(Squid.SimpleVariables.keys());
}

Squid.removeSimpleVariable = function (name) {
    Squid.SimpleVariables.delete(name);
}

  function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        item.setAttribute("class", "list-group-item");

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }
    list.setAttribute("id", "values_list");
    list.setAttribute("class", "list-group");
    // Finally, return the constructed list:
    return list;
}

Squid.displaySimpleVariables = function () {
    var oldValues = document.getElementById('values_list');
    if (oldValues) {
        var values = document.getElementById('Values').replaceChild(makeUL(Squid.SimpleVariablesNames), oldValues);
    } else {
        var values = document.getElementById('Values').appendChild(makeUL(Squid.SimpleVariablesNames));
    }  
}