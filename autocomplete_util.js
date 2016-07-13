/**
 * Constructor
 * @param {Array<String>} opt_variables the completion variables
 * @returns {} 
 */
AutoComplete= function(opt_variables, opt_categories, opt_tags) {
    AutoComplete.variables = opt_variables;
    AutoComplete.categories = opt_categories;
    AutoComplete.tags = opt_tags;
}

AutoComplete.variables = [];
AutoComplete.categories = [];
AutoComplete.tags = [];
AutoComplete.variablesWorkspace = null;
AutoComplete.categoryWorkspace = null;

AutoComplete.AddAutoCompleteVariable = function (variable) {
    AutoComplete.variables.push(variable);
}

AutoComplete.RemoveAutoCompleteVariable = function (variable) {
    var index = AutoComplete.variables.indexOf(variable);
    if (index > -1) {
        AutoComplete.variables.splice(index, 1);
    }
}

AutoComplete.UpdateVariables= function () {
    AutoComplete.variables = Blockly.Variables.allVariables(AutoComplete.variablesWorkspace);
}

AutoComplete.UpdateCategories = function () {
    AutoComplete.categories = Blockly.Procedures.allCategories(AutoComplete.categoryWorkspace)[0];
}

//get after update
AutoComplete.GetVariables = function() {
    AutoComplete.UpdateVariables();
    return AutoComplete.variables;
}

AutoComplete.GetCategories = function () {
    AutoComplete.UpdateCategories();
    return AutoComplete.categories;
}

AutoComplete.GetTags = function () {
    var procedures = AutoComplete.categoryWorkspace.getAllDescendantBlocks();
    var allTags = [];
    for (var i = 0; i < procedures.length; i++) {
        var tags = procedures[i].getField("tags").text_;
        alert("tags ="+tags);
        //tags = removeDuplicates(tags);
        //tags = tags.replace(/\s+/g, '');
        var tagsSplit = tags.split(",");
        for (var y=0; y<tagsSplit.length; y++) {
            allTags.push(tagsSplit[y]);
            //alert(tagsSplit[i]);
        }
        removeDuplicates(allTags);
    }
    AutoComplete.tags = allTags;
    return AutoComplete.tags;
}

function removeDuplicates(array) {
    var seen = {};
    return array.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function parseTags() {
    var search = document.getElementById("search-bar").value;
    //remove whitespaces
    search = search.replace(/\s+/g, '');
    var tagSplit = search.split(",");
    return tagSplit;
}