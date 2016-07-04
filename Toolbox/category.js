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

    // Rebase the categories to a empty tree
    var divFunc = document.getElementById("NewCategory");
    while (divFunc.hasChildNodes() === true) {
        var child = divFunc.childNodes[0];
        divFunc.removeChild(child);
    }

    // For each category
    for (var i = 0; i < categories[0].length; i++) {

        var newCategory = document.createElement("category");       
        newCategory.setAttribute("name", categoriesNames[i]);
        newCategory.setAttribute("colour", Math.floor(Math.random() * 360));
        
        // For each procedure in this category
        for (var j = 0; j < categoriesProcedures[i].length; j++) {
            var block = categoriesProcedures[i][j];
            var newProcedure = document.createElement("block");
            if (block.getProcedureDef()[2]) {
                newProcedure.setAttribute("type", "procedures_callreturn");
            } else {
                newProcedure.setAttribute("type", "procedures_callnoreturn");
            }
            
            var mutator = document.createElement("mutation");
            mutator.setAttribute("name", block.getProcedureDef()[0]);

            newProcedure.appendChild(mutator);
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
function TagSearch(workspace) {

    //var categories = Blockly.Procedures.allCategories(workspace);
    //var procedures = categories[1];

    var procedures = workspace.getAllDescendantBlocks();
    console.log(procedures);

    //var search = document.getElementById("search-bar").value;
    var searchWords = parseTags();

    //for each searching word 
    for (var j = 0; j < searchWords.length; j++) {
        
        // For each block is all workspaces
        for (var i = 0; i < procedures.length; i++) {
            var tags = procedures[i].getField("tags").text_;
            if (searchWords[j] == tags) {
                console.log(procedures[i].getFieldValue("NAME"));
                console.log(procedures[i].getFieldValue("category"));
            }
        }
    }


}

function parseTags() {
    var search = document.getElementById("search-bar").value;
    var tagSplit = search.split(",");
    return tagSplit;
}

