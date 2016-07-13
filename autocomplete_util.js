/**
 * Constructor
 * @param {Array<String>} opt_variables the completion variables
 * @returns {} 
 */
AutoComplete= function(opt_variables, opt_categories, opt_tags) {
    AutoComplete.variables = opt_variables;
}

AutoComplete.variables = [];
AutoComplete.categories = [];
AutoComplete.tags = [];
AutoComplete.variablesWorkspace = null;

AutoComplete.AddAutoCompleteVariable = function (variable) {
    AutoComplete.variables.push(variable);
}

AutoComplete.RemoveAutoCompleteVariable = function (variable) {
    var index = AutoComplete.variables.indexOf(variable);
    if (index > -1) {
        AutoComplete.variables.splice(index, 1);
    }
}

AutoComplete.UpdateAutoCompleteVariables= function () {
    AutoComplete.variables = Blockly.Variables.allVariables(AutoComplete.variablesWorkspace);
}

AutoComplete.SetAutoCompleteCategories = function (categories) {
    AutoComplete.categories = categories;
}