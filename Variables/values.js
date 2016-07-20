Squid.SimpleVariables =  new Map();

Squid.addSimpleVariable = function (name) {
    Squid.SimpleVariables.set(name, 0);
}

Squid.removeSimpleVariable = function (name) {
    Squid.SimpleVariables.delete(name);
}