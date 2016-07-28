/**
 * Create a new workspace for editing a function.
 * @param {!Blockly.Workspace} workspace The workspace on which you want to add a function.
 */
function createFunction(workspace) {
    var funcWindow = document.getElementById("functionWrapper");
    if (funcWindow.style.display === "none") {
        funcWindow.style.display = "block";
    }

    // Hide the previous workspace
    if (nbWorkspaces > 0) {
        document.getElementById(BASE_BLOCKLY_DIV + valueActivWorkspace).style.display = "none";
    }

    // Create anchor
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id", BASE_BLOCKLY_DIV + nbWorkspaces);
    newDiv.setAttribute("class", BASE_BLOCKLY_DIV);
    funcWindow.appendChild(newDiv);

    // Create the workspace
    var newWorkspace = Blockly.inject(BASE_BLOCKLY_DIV + nbWorkspaces,
    { toolbox: document.getElementById('toolboxFunction') });
    workspace.attachChildWorkspace(newWorkspace);
    activWorkspace = newWorkspace;
    valueActivWorkspace = nbWorkspaces;

    // Create the onglet
    var newOnglet = document.createElement('button');
    newOnglet.setAttribute("class", "onglet");
    newOnglet.setAttribute("name", "Nouveau");
    newOnglet.setAttribute("id", "onglet" + nbWorkspaces);
    newOnglet.setAttribute("value", nbWorkspaces);
    newOnglet.setAttribute("checked", true);
    newOnglet.setAttribute("onclick", "changeActiveWorkspace(" + nbWorkspaces + ")");
    newOnglet.textContent = "Nouveau !";
    document.getElementById("toolbar-onglet-func").appendChild(newOnglet);

    nbWorkspaces++;
}

function changeActiveWorkspace(newValueActivWorkspace) {
    document.getElementById(BASE_BLOCKLY_DIV + valueActivWorkspace).style.display = "none";
    document.getElementById(BASE_BLOCKLY_DIV + newValueActivWorkspace).style.display = "block";
    valueActivWorkspace = newValueActivWorkspace;
} 