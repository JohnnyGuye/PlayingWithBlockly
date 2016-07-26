app.component("variablesSet",
    {
        templateUrl: "Variables/variables_set.view.html",
        controller: function () {

            this.variablesSet = new Squid.VariablesSet("Configuration", Squid.VariablesSet.Types.CONFIG);
            this.variablesSet.Create("Test 1", "2");
            this.variablesSet.Create("Test 7", "789");
            ////    Squid.Variables.InitWorkspaces(BASE_BLOCKLY_DIV + "Configuration", BASE_BLOCKLY_DIV + "Inventory");
            ////    AutoComplete.variablesWorkspace = Squid.Variables.getWorkspace(Squid.Variables.Types.CONFIG);
        }
    });


/* ====================== OLD Squid.Variables ============================ */


////Squid.Variables = {};

////Squid.Variables.configCount = 0;
////Squid.Variables.inventoryCount = 0;

////Squid.Variables.ConfigurationWorkspace = null;
////Squid.Variables.InventoryWorkspace = null;

////Squid.Variables.Types = {};
////Squid.Variables.Types.CONFIG = "configuration";
////Squid.Variables.Types.INVENTORY = "inventory";

////Squid.Variables.configName = "Set défaut";
////Squid.Variables.inventoryName = "Set défaut";

/////**
//// * Initialize the workspaces for configuration and inventory. 
//// * If only one workspace specified, it works for both.
//// * @param {Blockly.Workspace} config 
//// * @param {Blockly.Workspace} inventory 
//// */
////Squid.Variables.InitWorkspaces = function (configLocation, inventoryLocation) {
////    if (configLocation === null || inventoryLocation === null) throw "Argument should not be null";

////    var cw = Blockly.inject(configLocation);
////    cw.attachChildWorkspace(workspace);
////    cw.newBlock("variables_get", "var");
////    Blockly.Variables.renameVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME, "undefined", cw);

////    var iw = Blockly.inject(inventoryLocation);
////    iw.attachChildWorkspace(workspace);
////    iw.newBlock("variables_get", "var");
////    Blockly.Variables.renameVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME, "undefined", iw);

////    Squid.Variables.ConfigurationWorkspace = cw;
////    Squid.Variables.InventoryWorkspace = iw;
////    Squid.Variables.configCount = 0;
////    Squid.Variables.inventoryCount = 0;

    
////}

////Squid.Variables.getNameSet = function (type) {
////    switch (type) {
////        case Squid.Variables.Types.INVENTORY:
////            return Squid.Variables.inventoryName;
////            break;
////        case Squid.Variables.Types.CONFIG:
////            return Squid.Variables.configName;
////            break;
////        default:
////            return "";
////            break;
////    }
////}

////Squid.Variables.setNameSet = function (type, name) {
////    switch (type) {
////        case Squid.Variables.Types.INVENTORY:
////            Squid.Variables.inventoryName = name;
////            break;
////        case Squid.Variables.Types.CONFIG:
////            Squid.Variables.configName = name;
////            break;
////        default:
////            break;
////    }
////}

////Squid.Variables.getPrefix = function(type) {
////    switch (type) {
////        case Squid.Variables.Types.INVENTORY:
////            return "I_";
////            break;
////        case Squid.Variables.Types.CONFIG:
////            return "C_";
////            break;
////        default:
////            return "";
////            break;
////    }
////}

////Squid.Variables.getWorkspace = function(type) {
////    switch(type) {
////        case Squid.Variables.Types.CONFIG:
////            return Squid.Variables.ConfigurationWorkspace;
////            break;
////        case Squid.Variables.Types.INVENTORY:
////            return Squid.Variables.InventoryWorkspace;
////            break;
////        default:
////            return null;
////    }
////}

////Squid.Variables.getCount = function (type) {
////    switch (type) {
////        case Squid.Variables.Types.CONFIG:
////            return Squid.Variables.configCount;
////            break;
////        case Squid.Variables.Types.INVENTORY:
////            return Squid.Variables.inventoryCount;
////            break;
////        default:
////            return null;
////    }
////}

////Squid.Variables.getAnchor = function(type) {
////    switch (type) {
////        case Squid.Variables.Types.CONFIG:
////            return "#config";
////            break;
////        case Squid.Variables.Types.INVENTORY:
////            return "#inventory";
////            break;
////        default:
////            return null;
////    }
////}

////Squid.Variables.incVariable = function (type, value) {
////    switch (type) {
////        case Squid.Variables.Types.CONFIG:
////            Squid.Variables.configCount += (value ? value : 1);
////            break;
////        case Squid.Variables.Types.INVENTORY:
////            Squid.Variables.inventoryCount += (value ? value : 1);
////            break;
////        default:
////            return null;
////    }
////}

////Squid.Variables.reset = function(type) {
////   Squid.Variables.incVariable(type, - Squid.Variables.getCount(type));
////}
////// ------------------------------------------------------------- Configuration
/////**
//// * Create a new variable, 
//// * @param {Squid.Variables.Type} type needs to be a valid type but can be a simple string
//// */
////Squid.Variables.create = function (type, name) {
////    type = type.toLowerCase();
////    var workspace = Squid.Variables.getWorkspace(type);
////    var prefix = Squid.Variables.getPrefix(type);
////    var count = Squid.Variables.getCount(type);
////    if (workspace == null) throw "Not a valid type";

////    var baseId = prefix + count;
////    if(name == null) 
////        name = "Variable" + count;
////    var fullName = prefix + name;
////    var table = $(Squid.Variables.getAnchor(type) + "-table");

////    workspace.newBlock("variables_get", "var");
////    Blockly.Variables.renameVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME, fullName, workspace);

////    var label = $("<input>");
////    label.attr("type", "text");
////    label.attr("class", "variable-name");
////    label.attr("id", baseId + "_label");
////    label.attr("name", baseId);
////    label.attr("value", name);
////    label.attr("oldValue", fullName);
////    label.on("input",
////        function () {
////            Squid.Variables.rename(this, type);
////        });

////    var input = $("<input>");
////    input.attr("type", "number");
////    input.attr("id", baseId + "_input");
////    input.attr("name", baseId);
////    input.attr("class", "dev-block");

////    var button = $("<button>");
////    button.attr("class", "delete-button");
////    button.attr("onclick", "Squid.Variables.delete('" + type + "', " + count + ")");
////    button.html(" x ");

////    var row = $("<tr>");
////    row.attr("id", baseId + "_row");
////    var cell = $("<td>");
////    cell.append(label);
////    row.append(cell);

////    cell = $("<td>");
////    cell.append(input);
////    row.append(cell);

////    cell = $("<td>");
////    cell.append(button);
////    row.append(cell);

////    table.append(row);

////    Squid.Variables.incVariable(type);
////}

/////**
//// * Rename a variable using id and type
//// * @param {Squid.Variables.Type} type 
//// * @param {Number} variableId 
//// */
////Squid.Variables.rename = function (input, type) {
////    var prefix = Squid.Variables.getPrefix(type);
////    var oldValue = $(input).attr("oldValue");
////    var value = $(input).val();
////    Blockly.Variables.renameVariable(oldValue, 
////        prefix + value, 
////        Squid.Variables.getWorkspace(type));
////    $(input).attr("oldValue", prefix + value);
////}

/////**
//// * Delete a variable using id and type.
//// * @param {Squid.Variables.Type} type 
//// * @param {Number} variableId 
//// */
////Squid.Variables.delete = function (type, variableId) {
////    var workspace = Squid.Variables.getWorkspace(type);
////    var prefix = Squid.Variables.getPrefix(type);
////    var baseId = prefix + variableId;

////    var elem = $("#" + baseId + "_label");
////    Blockly.Variables.renameVariable(prefix + elem.val(), "undefined", workspace);

////    $("#" + baseId + "_row").remove();
////}

////Squid.Variables.deleteAll = function(type) {
////    var workspace = Squid.Variables.getWorkspace(type);
////    workspace.clear();

////    Squid.Variables.reset(type);

////    $(Squid.Variables.getAnchor(type) + "-table").html("");
////}