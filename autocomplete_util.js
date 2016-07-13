/**
 * Constructor
 * @param {Array<String>} opt_data the completion data
 * @returns {} 
 */
AutoComplete= function(opt_data) {
    AutoComplete.data = opt_data;
}

AutoComplete.data=[];

AutoComplete.AddAutoCompleteVariable = function (variable) {
    AutoComplete.data.push(variable);
}

AutoComplete.RemoveAutoCompleteVariable = function (variable) {
    var index = AutoComplete.data.indexOf(variable);
    if (index > -1) {
        AutoComplete.data.splice(index, 1);
    }
}