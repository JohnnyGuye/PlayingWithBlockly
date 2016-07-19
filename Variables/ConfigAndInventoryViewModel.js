Squid.Variables = {};

Squid.Variables.configCount = 0;
Squid.Variables.inventoryCount = 0;

Squid.Variables.ConfigurationWorkspace = null;
Squid.Variables.InventoryWorkspace = null;

Squid.Variables.Types = {};
Squid.Variables.Types.CONFIG = "configuration";
Squid.Variables.Types.INVENTORY = "inventory";

/**
 * Initialize the workspaces for configuration and inventory. 
 * If only one workspace specified, it works for both.
 * @param {Blockly.Workspace} config 
 * @param {Blockly.Workspace} inventory 
 */
Squid.Variables.InitWorkspaces = function (config, inventory) {
    if (config === null) throw "First argument should not be null";
    Squid.Variables.ConfigurationWorkspace = config;
    Squid.Variables.InventoryWorkspace = (inventory ? inventory : config);
    Squid.Variables.configCount = 0;
    Squid.Variables.inventoryCount = 0;
}

Squid.Variables.getPrefix = function(type) {
    switch (type) {
        case Squid.Variables.Types.INVENTORY:
            return "inv_";
            break;
        case Squid.Variables.Types.CONFIG:
            return "config_";
            break;
        default:
            return "";
            break;
    }
}

Squid.Variables.getWorkspace = function(type) {
    switch(type) {
        case Squid.Variables.Types.CONFIG:
            return Squid.Variables.ConfigurationWorkspace;
            break;
        case Squid.Variables.Types.INVENTORY:
            return Squid.Variables.InventoryWorkspace;
            break;
        default:
            return null;
    }
}

Squid.Variables.getCount = function (type) {
    switch (type) {
        case Squid.Variables.Types.CONFIG:
            return Squid.Variables.configCount;
            break;
        case Squid.Variables.Types.INVENTORY:
            return Squid.Variables.inventoryCount;
            break;
        default:
            return null;
    }
}

Squid.Variables.getAnchor = function(type) {
    switch (type) {
        case Squid.Variables.Types.CONFIG:
            return "#config-table";
            break;
        case Squid.Variables.Types.INVENTORY:
            return "#inventory-table";
            break;
        default:
            return null;
    }
}

Squid.Variables.incVariable = function (type, value) {
    switch (type) {
        case Squid.Variables.Types.CONFIG:
            Squid.Variables.configCount += (value ? value : 1);
            break;
        case Squid.Variables.Types.INVENTORY:
            Squid.Variables.inventoryCount += (value ? value : 1);
            break;
        default:
            return null;
    }
}

// ------------------------------------------------------------- Configuration
/**
 * Create a new variable, 
 * @param {Squid.Variables.Type} type needs to be a valid type but can be a simple string
 */
Squid.Variables.create = function (type) {
    type = type.toLowerCase();
    var workspace = Squid.Variables.getWorkspace(type);
    var prefix = Squid.Variables.getPrefix(type);
    var count = Squid.Variables.getCount(type);
    if (workspace == null) throw "Not a valid type";

    var name = prefix + count;
    var table = $(Squid.Variables.getAnchor(type));

    workspace.newBlock("variables_get", "var");
    Blockly.Variables.renameVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME, name, workspace);

    var label = $("<input>");
    label.attr("type", "text");
    label.attr("class", "variable-name");
    label.attr("id", name + "_label");
    label.attr("name", name);
    label.attr("value", name);
    label.attr("oldValue", name);
    label.on("input",
        function () {
            Squid.Variables.rename(this, type);
        });

    var input = $("<input>");
    input.attr("type", "number");
    input.attr("id", name + "_input");
    input.attr("name", name);
    input.attr("class", "dev-block");

    var button = $("<button>");
    button.attr("class", "delete-button");
    button.attr("onclick", "Squid.Variables.delete('" + type + "', " + count + ")");
    button.html(" x ");

    var row = $("<tr>");
    row.attr("id", name + "_row");
    var cell = $("<td>");
    cell.append(label);
    row.append(cell);

    cell = $("<td>");
    cell.append(input);
    row.append(cell);

    cell = $("<td>");
    cell.append(button);
    row.append(cell);

    table.append(row);

    Squid.Variables.incVariable(type);
}

/**
 * Rename a variable using id and type
 * @param {Squid.Variables.Type} type 
 * @param {Number} variableId 
 */
Squid.Variables.rename = function (input, type) {
    var oldValue = $(input).attr("oldValue");
    var value = $(input).val();
    Blockly.Variables.renameVariable(oldValue, value, Squid.Variables.getWorkspace(type));
    $(input).attr("oldValue", value);
}

/**
 * Delete a variable using id and type.
 * @param {Squid.Variables.Type} type 
 * @param {Number} variableId 
 */
Squid.Variables.delete = function (type, variableId) {
    var workspace = Squid.Variables.getWorkspace(type);
    var fullId = Squid.Variables.getPrefix(type) + variableId;

    var elem = $("#" + fullId + "_label");
    Blockly.Variables.renameVariable(elem.val(), "undefined", workspace);

    $("#" + fullId + "_row").remove();
}