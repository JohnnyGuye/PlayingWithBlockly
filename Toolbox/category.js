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