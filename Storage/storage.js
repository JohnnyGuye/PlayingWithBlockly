/**
 * @fileoverview A file in which are all the utility fonction for saving.
 * @author johnnyq@hotmail.fr (Johnny Guye)
 */
Squid.Storage = {};

Squid.Storage.BaseUrl = function () {
    return window.location.href.split('#')[0] + "#";
}

Squid.Storage.PrincipalStorage  = "princWS";
Squid.Storage.SecondaryStorage  = "secWS";
Squid.Storage.SaveLocations     = Squid.Storage.BaseUrl() + "saveDictionary";
Squid.Storage.Configs = Squid.Storage.BaseUrl() + "config";
Squid.Storage.Inventorys = Squid.Storage.BaseUrl() + "inventory";

Squid.Storage.ConfigLocations = new Array();
Squid.Storage.InventoryLocations = new Array();

Squid.Storage.Init = function() {
    restoreList(Squid.Storage.ConfigLocations, Squid.Storage.Configs);
    restoreList(Squid.Storage.InventoryLocations, Squid.Storage.Inventorys);
}

Squid.Storage.init = function () {
    this.Storage.ConfigList = new Array();
    this.Storage.ConfigList.push("FirstList");

    console.log(this.Storage.ConfigList[0]);
};


/**
 * Saves a workspace in local storage. The secondary workspace are fully saved too, 
 * but they are all saved at the same place, which, you will restore only two workspaces,
 * even if you had more secondary workspaces. (No function is lost during operation)
 * @param {Blockly.Workspace} The workspace you want to save.t
 * @param {string} location The location of the save.
 */
Squid.Storage.SaveWorkspace = function (workspace, location) {
    // Gets the current URL, not including the hash.
    var baseUrl = Squid.Storage.BaseUrl();
    Squid.Storage.SaveFunction(workspace);
    backupBlocks(workspace, baseUrl + location);
};


Squid.Storage.SaveFinishedFunction = function (workspace) {
    var finishedFunction = workspace.getTopBlocks();
    if (finishedFunction.length !== 1 || !finishedFunction[0].getProcedureDef)
    {
        alert("La sauvegarde serveur a echoué. Le workspace contient plus d'un block ou votre décodeur n'est pas du type fonction.");
    }
    //console.log(finishedFunction[0].id);
    var blockId = finishedFunction[0].id;
    backupBlocks(workspace, baseUrl + blockId);
}

Squid.Storage.SaveFunction = function (workspace) {

    var baseUrl = Squid.Storage.BaseUrl();
    var workspaceSec = new Blockly.Workspace();
    var blocks;
    // We create a new workspace in which we place all the blocks from the hidden workspace
    // And then we add the new functions
    var children = workspace.getLinkedWorkspace();
    for (var i = 0; i < children.length; i++) {
        blocks = children[i].getTopBlocks();
        for (var j = 0; j < blocks.length; j++) {
            if (blocks[j].getProcedureDef) {
                workspaceSec.addTopBlock(blocks[j]);
            }
        }
    }

    blocks = workspace.getTopBlocks();
    for (var j = 0; j < blocks.length; j++) {
        if (blocks[j].getProcedureDef) {
            workspaceSec.addTopBlock(blocks[j]);
        }
    }

    //backupBlocks(workspaceSec, baseUrl + Squid.Storage.SecondaryStorage);
}


// Reload datas to a workspace
Squid.Storage.ReloadWorkspace = function (workspace, secondaryWorkspace, location) {
    var baseUrl = window.location.href.split('#')[0] + "#";
    if (workspace != null && location != null) {
        workspace.clear();
        restoreBlocks(workspace, baseUrl + location);
    }

    if (secondaryWorkspace != null) {
        secondaryWorkspace.clear();
		restoreBlocks(secondaryWorkspace, baseUrl + Squid.Storage.SecondaryStorage);
	}
};

function backupBlocks (workspace, url) {
  if ("localStorage" in window) {
      var xml = Blockly.Xml.workspaceToDom(workspace);
      //FOR TESTS add by felix
      var prettyTxt = Blockly.Xml.domToPrettyText(xml);
      var xmlTxt = Blockly.Xml.domToText(xml);
      //alert(txt);
      //var div = document.getElementById('xml1');
      //div.innerHTML = prettyTxt;
      var code = Blockly.CSharp.workspaceToCode(workspace);
      Squid.Requests.SaveBlocks(code, prettyTxt);
      //END FOR TESTS
     
     // window.localStorage.setItem(url, xmlTxt);
  }
};

// Reload datas to a workspace
Squid.Storage.ReloadWorkspace = function (workspace, secondaryWorkspace, location) {
    var baseUrl = window.location.href.split('#')[0] + "#";
    if (workspace != null && location != null) {
        workspace.clear();
        restoreBlocks(workspace, baseUrl + location);
    }

    if (secondaryWorkspace != null) {
        secondaryWorkspace.clear();
		restoreBlocks(secondaryWorkspace, baseUrl + Squid.Storage.SecondaryStorage);
	}
};


function restoreBlocks (opt_workspace, url) {
	if('localStorage' in window && window.localStorage[url]) {
		var workspace = opt_workspace;
		//var xml = Blockly.Xml.textToDom(window.localStorage[url]);
	    //Blockly.Xml.domToWorkspace(xml, workspace);

	    //callback function
        // this code is executed asynchonously, when the ajax request has responded
		Squid.Requests.ReloadXml(function (xmlText) {
	        //alert(xmlText);
	        var xml = Blockly.Xml.textToDom(xmlText);
	        Blockly.Xml.domToWorkspace(xml, workspace);
		    //TEST
		    //Refresh();
		});
	}
};

function backupList(list, url) {
    if ("localStorage" in window && window.localStorage[url]) {
        var text = "";
        for (var i = 0; i < list.length; i++) {
            text += list[i] + "\n";
        }
        window.localStorage.setItem(url, txt);
    }
}

function restoreList(opt_list, url) {
    if ("localStorage" in window && window.localStorage[url]) {
        opt_list = window.localStorage[url].split("\n");
    }
}