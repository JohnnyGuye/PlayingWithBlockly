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
Squid.VariablesSet.prototype.setPrefix_ = function(type) {
    switch (type) {
        case Squid.VariablesSet.Types.INVENTORY:
            return this.prefix_ = "I_";
        case Squid.VariablesSet.Types.CONFIG:
            return this.prefix_ = "C_";
        default:
            return this.prefix_ = "_";
    }
};

/**
 * Get the prefix of the variables
 * @returns {string} 
 */
Squid.VariablesSet.prototype.Prefix = function() {
    return this.prefix_;
};

Squid.VariablesSet.prototype.Type = function() {
    return this.type_;
};

/**
 * Get or set the count (your surely don't need to set the Count)
 * @param {number} count 
 * @returns {number} the actual count of variables 
 */
Squid.VariablesSet.prototype.Count = function () {
    return this.variables_.length;
};

/**
 * Get or set the name
 * @param {string} name 
 * @returns {string} the actual name  
 */
Squid.VariablesSet.prototype.Name = function(name) {
    return this.name_ = name || this.name_;
};

Squid.VariablesSet.prototype.Create = function (name, value) {
    var fullName = this.prefix_ + name;

    this.variables_.push([fullName, value]);

};

Squid.VariablesSet.prototype.Rename = function (oldname, newname) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == oldname) {
            this.variables_[i][0] = newname;
            return;
        }
    }
    throw "No variable " + oldname + " to rename.";
};

Squid.VariablesSet.prototype.Delete = function (name) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            variables.splice(i, 1);
            return;
        }
    }
};

Squid.VariablesSet.prototype.SetValue = function (name, value) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            variables[i][1] = value;
            return;
        }
    }
};

Squid.VariablesSet.prototype.GetValue = function (name) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            return variables[i][1];
        }
    }
    return null;
};

Squid.VariablesSet.prototype.Clear = function () {
    this.variables_.length = 0;
};

Squid.VariablesSet.prototype.List = function() {
    return this.variables_;
};