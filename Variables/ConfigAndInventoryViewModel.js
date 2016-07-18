Squid.Variables = {};

Squid.Variables.configCount = 0;
Squid.Variables.inventoryCount = 0;

Squid.Variables.ConfigurationWorkspace = null;
Squid.Variables.InventoryWorkspace = null;

Squid.Variables.Types = {};
Squid.Variables.Types.CONFIG = "configuration";
Squid.Variables.Types.INVENTORY = "inventory";

Squid.Variables.InitWorkspaces = function (config, inventory) {
    if (config === null) throw "Argument should not be null";
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
    var workspace   = Squid.Variables.getWorkspace(type);
    var prefix      = Squid.Variables.getPrefix(type);
    var count       = Squid.Variables.getCount(type);
    if (workspace == null) throw "Not a valid type";
 
    var name = prefix + count;
    var table = $(Squid.Variables.getAnchor(type)).get()[0];
    
    workspace.newBlock("variables_get", "var");
    Blockly.Variables.renameVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME, name, workspace);

    var label = document.createElement("input");
    label.setAttribute("type", "text");
    label.setAttribute("class", "variable-name");
    label.setAttribute("id", name + "_label");
    label.setAttribute("name", name + "l");
    label.setAttribute("value", name);
    label.setAttribute("onclick", "Squid.Variables.rename(" + type + "," + count + ")");

    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", name + "_input");
    input.setAttribute("name", name);
    input.setAttribute("class", "dev-block");

    var button = document.createElement("button");
    button.setAttribute("class", "delete-button");
    button.setAttribute("onclick", "Squid.Variables.delete('" + type + "', " + count + ")");
    button.innerHTML = " x ";

    var row = document.createElement("tr");
    row.setAttribute("id", name + "_row");
    var cell = document.createElement("td");
    cell.appendChild(label);
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.appendChild(input);
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(document.createElement("td").appendChild(button));

    table.appendChild(row);

    Squid.Variables.incVariable(type);
}

//TODO
/**
 * Rename a variable using id and type
 * @param {Squid.Variables.Type} type 
 * @param {Number} variableId 
 */
Squid.Variables.rename = function (type, variableId) {
    var prefix = Squid.Variables.getPrefix(type);
    var fullId = prefix + variableId;

    var label = $("#" + fullId + "_label");
    var oldName = label.attr("value");

    var newName = document.getElementById(fullId + "_label").getAttribute("value");
    Blockly.Variables.renameVariable(oldName, newName, workspace);
}

/**
 * Delete a variable using id and type.
 * @param {Squid.Variables.Type} type 
 * @param {Number} variableId 
 */
Squid.Variables.delete = function (type, variableId) {
    var workspace = Squid.Variables.getWorkspace(type);
    var prefix = Squid.Variables.getPrefix(type);
    if (prefix === "") throw "Not a valid type";

    var elem = document.getElementById(prefix + variableId + "_label");
    var name = elem.getAttribute("value");
    Blockly.Variables.renameVariable(name, "undefined", workspace);

    $("#" + prefix + variableId + "_row").remove();
}