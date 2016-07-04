/**
 * Refresh the list of categories in the toolbox using the definition of defined functions.
 * @param {} workspace The workspace parent in which you will have the definitions. (or maybe in its children)
 */
function RefreshCategories(workspace, toolboxId) {
    var categories = Blockly.Procedures.allCategories(workspace);

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
        newCategory.setAttribute("name", categories[0][i]);
        newCategory.setAttribute("colour", Math.floor(Math.random() * 360));
        
        // For each procedure in this category
        for (var j = 0; j < categories[1][i].length; j++) {
            var block = categories[1][i][j];
            
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

    var categories = Blockly.Procedures.allCategories(workspace);
    alert(categories.text);
    // For each category
    for (var i = 0; i < categories[0].length; i++) {

        // For each procedure in this category
        for (var j = 0; j < categories[1][i].length; j++) {
            //get the block
            var block = categories[1][i][j];
            //get the tags
            var fields = categories[1][i][j].getElementsByTagName("field");
            var tags = fields[3].content;
            alert(tags);


        }
    }

}