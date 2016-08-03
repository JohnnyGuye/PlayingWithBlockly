/** Refresh the list of variables in the toolbox using the definition of defined categories
 * @param {Blockly.workspace} workspace The workspace in which you want to list the categories
 */
function RefreshVariables(workspace) {
    Blockly.Variables.allVariables(workspace);
}

function getAllOpenWindows(winData) {

    var tabs = [];
    for (var i in winData) {
        if (winData[i].focused === true) {
            var winTabs = winData[i].tabs;
            var totTabs = winTabs.length;
            for (var j = 0; j < totTabs; j++) {
                tabs.push(winTabs[j].url);
            }
        }
    }
    console.log(tabs);
}

/** Refresh the list of categories in the toolbox using the definition of defined functions.
 * @param {Blockly.workspace} workspace The workspace parent in which you will have the definitions. (or maybe in its children)
 * @param {Object} toolboxTree The DOM toolbox
 * @param {Object} an object where each property name is a category and each property has for value an array of BlockInfos
 */
function RefreshCategories(workspace, toolboxTree, catMap) {
    /* Categories tree :
     * [0][i] -> Category name
     * [1][i] -> list of procedure in this category
     * [1][i][j] -> procedure definition
     */

    ////chrome.windows.getAll({ populate: true }, getAllOpenWindows);
    ////chrome.window.getAll({ populate: true  }, getAllOpenWindows);
    ////console.log(window);
    //var categories = Blockly.Procedures.allCategories(workspace);
    //var categoriesNames = categories[0];
    //var categoriesProcedures = categories[1];

    // Categories container
    var CATEGORY_NAME = "Mes fonctions";
    var myFunctions = $("<category>");
    myFunctions.attr("name", CATEGORY_NAME);
    myFunctions.attr("colour", 0);

    // Rebase the categories to an empty tree
    var divFunc = $("#NewCategory");
    divFunc.html("");

    var block;
    if (Blockly.Blocks['procedures_defnoreturn']) {
        // <block type="procedures_defnoreturn" gap="16"></block>
        block = goog.dom.createDom('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);
        divFunc.append(block);
    }

    var previousColour = Math.random() * 360;
    // For each category
    //for (var i = 0; i < categoriesNames.length; i++) {
    var nbOfProcInThisCat;
    for (var category in catMap) {
        var cat = $("<category>");
        //cat.attr("name", categoriesNames[i]);
        cat.attr("name", category);
        var colour = Math.random() * 360;
        colour = Math.floor(colour +
            (Math.floor(previousColour / 10) === Math.floor(colour / 10) ? 20 : 0))
            % 360;
        cat.attr("colour", colour);
        previousColour = colour;

        // For each procedure in this category
        //for (var j = 0; j < categoriesProcedures[i].length; j++) {
        nbOfProcInThisCat = catMap[category].length;
        for (var j = 0; j < nbOfProcInThisCat; j++) {
            block = catMap[category][j];
            //block = categoriesProcedures[i][j];
            /*var def = block.getProcedureDef();
            var name = def[0];
            var args = def[1];
            var type = def[2];*/
            var name = block.name;
            var args = block.parameters;
            var type = null;

            var procedure = $("<block>");
            procedure.attr("type", (type ? "procedures_callreturn" : "procedures_callnoreturn"));
            procedure.attr("gap", 16);
            var mutation = $("<mutation>");
            mutation.attr("name", name);
            if (args) {               
                args = args.split(",");
                for (var k = 0; k < args.length; k++) {
                    var arg = $("<arg>");
                    arg.attr("name", args[k]);
                    mutation.append(arg);
                }

            }
            procedure.append(mutation);
            cat.append(procedure);
         }
         divFunc.append(cat);
    }

    workspace.updateToolbox(toolboxTree);
}

