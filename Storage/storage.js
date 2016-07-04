/**
 * @fileoverview A file in which are all the utility fonction for saving.
 * @author johnnyq@hotmail.fr (Johnny Guye)
 */
var SquidStorage = {};

SquidStorage.PrincipalStorage = "princWS";
SquidStorage.SecondaryStorage = "secWS";
SquidStorage.BaseUrl = function() {
    return window.location.href.split('#')[0] + "#";
}

/**
 * Saves a workspace in local storage. The secondary workspace are fully saved too, 
 * but they are all saved at the same place, which, you will restore only two workspaces,
 * even if you had more secondary workspaces. (No function is lost during operation)
 * @param {Blockly.Workspace} The workspace you want to save.t
 * @param {string} location The location of the save.
 */
SquidStorage.SaveWorkspace = function (workspace, location) {
    // Gets the current URL, not including the hash.
    var baseUrl = SquidStorage.BaseUrl();

    SquidStorage.SaveFunction(workspace);

    backupBlocks(workspace, baseUrl + location);
};

SquidStorage.SaveFunction = function(workspace) {
    var baseUrl = SquidStorage.BaseUrl();
    var workspaceSec = new Blockly.Workspace();

    // We create a new workspace in which we place all the blocks from the hidden workspace
    // And then we add the new functions
    var children = workspace.getLinkedWorkspace();
    for (var i = 0; i < children.length; i++) {
        var blocks = children[i].getTopBlocks();
        for (var j = 0; j < blocks.length; j++) {
            workspaceSec.addTopBlock(blocks[j]);
        }
    }

    backupBlocks(workspaceSec, baseUrl + SquidStorage.SecondaryStorage);
}

function backupBlocks (workspace, url) {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(workspace);    
    window.localStorage.setItem(url, Blockly.Xml.domToText(xml));
  }
};

// Reload datas to a workspace
SquidStorage.ReloadWorkspace = function (workspace, secondaryWorkspace, location) {
    var baseUrl = window.location.href.split('#')[0] + "#";
    if (workspace != null && location != null) {
        workspace.clear();
        restoreBlocks(workspace, baseUrl + location);
    }

    if (secondaryWorkspace != null) {
        secondaryWorkspace.clear();
		restoreBlocks(secondaryWorkspace, baseUrl + SquidStorage.SecondaryStorage);
	}
};


function restoreBlocks (opt_workspace, url) {
	if('localStorage' in window && window.localStorage[url]) {
		var workspace = opt_workspace;

		var xml = Blockly.Xml.textToDom(window.localStorage[url]);
		Blockly.Xml.domToWorkspace(xml, workspace);
	}
};