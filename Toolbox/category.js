
function addCategory() {
    var firstBlock = workspace.getAllBlocks()[0];
    var domBlock = Blockly.Xml.blockToDom(firstBlock);
    var names = domBlock.getElementsByTagName("field");
    var catName = names[2].innerHTML; // tagname : category 

    var existingCategories = document.getElementsByTagName("category");

    var i;
    for (i = 0; i < existingCategories.length; i++) {
        if (existingCategories[i].getAttribute("name") == catName) {
            if (catName == "Variables" || catName == "Functions") {
                alert("La modification des catégories 'Variables' et 'Functions' est interdite. \nVeuillez modifier le nom de la catégorie.");
                break;
            } else {
                alert(existingCategories[i].getAttribute("name"));
                var newblock = document.createElement("block");
                var typeAtt = document.createAttribute("type");
                typeAtt.value = domBlock.getAttribute("type");
                newblock.setAttributeNode(typeAtt);
                existingCategories[i].appendChild(newblock);
                workspace.updateToolbox(document.getElementById("toolbox"));
                break;
            }
        }
    }

    if (i == existingCategories.length) {

        var newCategory = document.createElement("category");
        var nameAtt = document.createAttribute("name");
        nameAtt.value = catName;
        newCategory.setAttributeNode(nameAtt);
        var colourAtt = document.createAttribute("colour");
        colourAtt.value = 220;
        newCategory.setAttributeNode(colourAtt);

        var newblock1 = document.createElement("block");
        var typeAtt1 = document.createAttribute("type");
        typeAtt1.value = domBlock.getAttribute("type");
        newblock1.setAttributeNode(typeAtt1);

        var idAtt1 = document.createAttribute("id");
        idAtt1.value = domBlock.getAttribute("id");
        newblock1.setAttributeNode(idAtt1);
        newCategory.appendChild(newblock1);

        document.getElementById("toolbox").appendChild(newCategory);
        workspace.updateToolbox(document.getElementById("toolbox"));

    }

}

/**
 * Refresh the list of categories in the toolbox using the definition of defined functions.
 * @param {} workspace The workspace parent in which you will have the definitions. (or maybe in its children)
 */
function RefreshCategories(workspace) {
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

    workspace.updateToolbox(document.getElementById("toolbox"));
}


/*function EditCategoryName() {
    var w = window.open('', '', 'width=400,height=400,resizeable,scrollbars');
    w.document.write("modifier la catégorie");
    var form = w.document.createElement("form");

    form.innerHTML = "nom de la catégorie :";
    var category1 = w.document.createElement("input");
    category1.type = "text";
    category1.name = "category1";
    form.appendChild(category1);

    form.innerHTML = "nouveau nom :";
    var category2 = w.document.createElement("input");
    category2.type = "text";
    category2.name = "category1";
    form.appendChild(category2);

    w.document.getElementsByTagName("body").appendChild(form);

}*/