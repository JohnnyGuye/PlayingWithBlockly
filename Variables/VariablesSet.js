"use strict";

goog.provide("Squid.Variables");

Squid.VariablesSet = function(name, type) {
    /**
     * @type {string}
     */
    this.name_ = name;
    /**
     * @type {!Array<Array<string, number>>}
     */
    this.variables_ = new Array();
    /**
     * @type {string}
     */
    this.prefix_ = "";
    this.setPrefix_(type);
    /**
     * @type {Squid.VariablesSet.Type}
     */
    this.type_ = type;


};

Squid.VariablesSet.Types = {};
Squid.VariablesSet.Types.CONFIG = "configuration";
Squid.VariablesSet.Types.INVENTORY = "inventory";

/**
 * Get and set the prefix using the name
 * @private
 * @param {} type 
 * @returns {string} 
 */
Squid.VariablesSet.setPrefix_ = function(type) {
    switch (type) {
        case Squid.Variables.Types.INVENTORY:
            return this.prefix_ = "I_";
        case Squid.Variables.Types.CONFIG:
            return this.prefix_ = "C_";
        default:
            return this.prefix_ = "_";
    }
};

/**
 * Get the prefix of the variables
 * @returns {string} 
 */
Squid.VariablesSet.Prefix = function() {
    return this.prefix_;
};

Squid.VariablesSet.Type = function() {
    return this.type_;
};

/**
 * Get or set the count (your surely don't need to set the Count)
 * @param {number} count 
 * @returns {number} the actual count of variables 
 */
Squid.VariablesSet.Count = function () {
    return this.variables_.length;
};

/**
 * Get or set the name
 * @param {string} name 
 * @returns {string} the actual name  
 */
Squid.VariablesSet.Name = function(name) {
    return this.name_ = name || this.name_;
};

Squid.VariablesSet.Create = function (name) {
    var halvedName = name + this.Count;
    var fullName = this.prefix_ + halvedName;

    this.variables_.push([fullName, null]);

};

Squid.VariablesSet.Rename = function (oldname, newname) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == oldname) {
            this.variables_[i][0] = newname;
            return;
        }
    }
    throw "No variable " + oldname + " to rename.";
};

Squid.VariablesSet.Delete = function (name) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            variables.splice(i, 1);
            return;
        }
    }
};

Squid.VariablesSet.SetValue = function(name, value) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            variables[i][1] = value;
            return;
        }
    }
};

Squid.VariablesSet.GetValue = function (name) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            return variables[i][1];
        }
    }
    return null;
};

Squid.VariablesSet.clear = function () {
    this.variables_.length = 0;
};


