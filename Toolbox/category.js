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
function RefreshCategories(workspace, toolboxId) {
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
    var myFunctions = document.createElement("category");
    myFunctions.setAttribute("name", CATEGORY_NAME);
    myFunctions.setAttribute("colour", 0);

    // Rebase the categories to an empty tree
    var divFunc = document.getElementById("NewCategory");
    while (divFunc.hasChildNodes() === true) {
        var child = divFunc.childNodes[0];
        divFunc.removeChild(child);
    }

    if (Blockly.Blocks['procedures_defnoreturn']) {
        // <block type="procedures_defnoreturn" gap="16"></block>
        var block = goog.dom.createDom('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);
        divFunc.appendChild(block);
    }

    // For each category
    for (var i = 0; i < categories[0].length; i++) {

        var newCategory = document.createElement("category");       
        newCategory.setAttribute("name", categoriesNames[i]);
        newCategory.setAttribute("colour", Math.floor(Math.random() * 360));
        
        // For each procedure in this category
        for (var j = 0; j < categoriesProcedures[i].length; j++) {
            block = categoriesProcedures[i][j];            
            var def = block.getProcedureDef();
            var name = def[0];
            var args = def[1];
            var type = def[2];

            var newProcedure = document.createElement("block");
            newProcedure.setAttribute("type", (type ? "procedures_callreturn": "procedures_callnoreturn"));
            newProcedure.setAttribute("gap", 16);
            var mutation = document.createElement("mutation");
            mutation.setAttribute("name", name);
            for (var k = 0; k < args.length; k++) {
                var arg = document.createElement("arg");
                arg.setAttribute("name", args[k]);
                mutation.appendChild(arg);
            }

            newProcedure.appendChild(mutation);
            newCategory.appendChild(newProcedure);
        }

        // Fill the tree
        divFunc.appendChild(newCategory);
    }

    workspace.updateToolbox(document.getElementById(toolboxId));
}

/**
 * Searching with tags
 * @param {} workspace 
 * @param {} toolboxId 
 * @returns {} 
 */
function TagSearch(workspace, toolboxId) {
    //get all procedures defined in all existing workspaces
    var procedures = workspace.getAllDescendantBlocks();
 
    var searchWords = parseTags(document.getElementById("search-bar").value);
    var count = 0;

    // Get the results container tag and remove all the blocks it contains since the last research
    var tagCategory = document.getElementById("SearchCategory");
    while (tagCategory.firstChild) {
        tagCategory.removeChild(tagCategory.firstChild);
    }

    // For each block is all workspaces
    for (var i = 0; i < procedures.length; i++) {

        var tags = procedures[i].getField("tags").text_;
        var procedureTags = parseTags(tags);

        //for each searched word 
        for (var j = 0; j < searchWords.length; j++) {
            for (var k = 0; k < procedureTags.length; k++) {
                if (searchWords[j] === procedureTags[k]) {
                    count++;
                    var newProcedure = document.createElement("block");
                    if (procedures[i].getProcedureDef()[2]) {
                        newProcedure.setAttribute("type", "procedures_callreturn");
                    } else {
                        newProcedure.setAttribute("type", "procedures_callnoreturn");
                    }

                    var mutator = document.createElement("mutation");
                    mutator.setAttribute("name", procedures[i].getProcedureDef()[0]);

                    newProcedure.appendChild(mutator);
                    tagCategory.appendChild(newProcedure);
                }
            }
        }
    }
    // if no element has the tags requested :
    if (count === 0) {
        alert("Aucun élément ne correspond à votre recherche.");
    }
    workspace.updateToolbox(document.getElementById(toolboxId));
}


function parseTags(text) {
    //var search = document.getElementById("search-bar").value;
    var tagSplit = text.split(",");
    return tagSplit;
}

