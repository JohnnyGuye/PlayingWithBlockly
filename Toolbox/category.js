/** Refresh the list of variables in the toolbox using the definition of defined categories
 * @param {Blockly.workspace} The workspace in which you want to list the categories
 */
function RefreshVariables(workspace) {
    Blockly.Variables.allVariables(workspace);
}
/**
 * Refresh the list of categories in the toolbox using the definition of defined functions.
 * @param {} workspace The workspace parent in which you will have the definitions. (or maybe in its children)
 */
function RefreshCategories(workspace, toolboxTree) {
    /* Categories tree :
     * [0][i] -> Category name
     * [1][i] -> list of procedure in this category
     * [1][i][j] -> procedure definition
     */
    var categories = Blockly.Procedures.allCategories(workspace);
    var categoriesNames = categories[0];
    var categoriesProcedures = categories[1];

    // Categories container
    var CATEGORY_NAME = "Mes fonctions";
    var myFunctions = $("<category>");
    myFunctions.attr("name", CATEGORY_NAME);
    myFunctions.attr("colour", 0);

    // Rebase the categories to an empty tree
    var divFunc = $("#NewCategory");
    divFunc.html("");

    if (Blockly.Blocks['procedures_defnoreturn']) {
        // <block type="procedures_defnoreturn" gap="16"></block>
        var block = goog.dom.createDom('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);
        divFunc.append(block);
    }

    var previousColour = Math.random() * 360;
    // For each category
    for (var i = 0; i < categories[0].length; i++) {

        var cat = $("<category>");
        cat.attr("name", categoriesNames[i]);

        var colour = Math.random() * 360;
        colour = Math.floor(colour +
            (Math.floor(previousColour / 10) === Math.floor(colour / 10) ? 20 : 0))
            % 360;
        cat.attr("colour", colour);
        previousColour = colour;

        // For each procedure in this category
        for (var j = 0; j < categoriesProcedures[i].length; j++) {
            var block = categoriesProcedures[i][j];
            var def = block.getProcedureDef();
            var name = def[0];
            var args = def[1];
            var type = def[2];

            var procedure = $("<block>");
            procedure.attr("type", (type ? "procedures_callreturn" : "procedures_callnoreturn"));
            procedure.attr("gap", 16);
            var mutation = $("<mutation>");
            mutation.attr("name", name);
            for (var k = 0; k < args.length; k++) {
                var arg = $("<arg>");
                arg.attr("name", args[k]);
                mutation.append(arg);
            }

            procedure.append(mutation);
            cat.append(procedure);
        }
        divFunc.append(cat);
    }

    workspace.updateToolbox(toolboxTree);
}

