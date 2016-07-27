"use strict";

goog.provide("Squid.Variables");

Squid.VariablesSet = function(type, name) {
    /**
     * @type {string}
     */
    this.Name = name || "New set";
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

/**
 * Get the type of the variable set
 * @returns {} 
 */
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
 * Get or Set the value associated to the variable
 * @param {string} name The name of the variable 
 * @param {Object} value The value associated (could be any object)
 * @returns {Object} value
 */
Squid.VariablesSet.prototype.Value = function (name, value) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            if (value) {
                this.variables_[i][1] = value;
            }
            return this.variables_[i][1];
        }
    }
    return null;
};

/**
 * Create a new variable, it manages not to create a double in the naming
 * If not informed, value will be null, and name will be a default name.
 * @param {string} name Name of the new variable
 * @param {} value Value associated
 * @returns {} 
 */
Squid.VariablesSet.prototype.Create = function (name, value) {
    if (!name) {
        name = "variable";
    }
    var fullName = this.prefix_ + name;
    var num = 1;
    var nameTest = fullName;
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == nameTest) {
            nameTest = fullName + num++;
            i = -1;
        }
    }
    this.variables_.push([nameTest, value]);
};

/**
 * Change the name of a variable for a new one
 * @param {string} oldname 
 * @param {string} newname 
 */
Squid.VariablesSet.prototype.Rename = function (oldname, newname) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == oldname) {
            this.variables_[i][0] = newname;
            return;
        }
    }
    throw "No variable " + oldname + " to rename.";
};

/**
 * Delete a variable
 * @param {string} name 
 */
Squid.VariablesSet.prototype.Delete = function (name) {
    for (var i = 0; i < this.variables_.length; i++) {
        if (this.variables_[i][0] == name) {
            this.variables_.splice(i, 1);
            return;
        }
    }
};

/**
 * Empty the list
 * @returns {} 
 */
Squid.VariablesSet.prototype.Clear = function () {
    this.variables_.length = 0;
};

/**
 * Get a copy of the dictionary, name/value
 * @returns {} 
 */
Squid.VariablesSet.prototype.List = function (copy) {
    if (copy != false) {
        var list = [];
        for (var i = 0; i < this.variables_.length; i++) {
            list.push([this.variables_[i][0], this.variables_[i][1]]);
        }
        return list;
    } else {
        return this.variables_;
    }
};

/**
 * Get a list of names in the variable set.
 * @returns {} 
 */
Squid.VariablesSet.prototype.Names = function() {
    var names = [];
    for (var i = 0; i < this.variables_.length; i++) {
        names.push(this.variables_[i][0]);
    }
    return names;
};