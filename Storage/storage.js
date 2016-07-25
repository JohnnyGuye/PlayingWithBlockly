﻿/**
 * @fileoverview A file in which are all the utility fonction for saving.
 * @author johnnyq@hotmail.fr (Johnny Guye)
 */
Squid.Storage = {};

Squid.Storage.BaseUrl = function () {
    return window.location.href.split('#')[0] + "#";
}

Squid.Storage.PrincipalStorage = "princWS";
Squid.Storage.SecondaryStorage = "secWS";
Squid.Storage.SaveLocations = Squid.Storage.BaseUrl() + "saveDictionary";
Squid.Storage.Configs = Squid.Storage.BaseUrl() + "config";

Squid.Storage.ConfigLocations = [];
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

Squid.Storage.SaveFunction = function(workspace) {
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

    backupBlocks(workspaceSec, baseUrl + Squid.Storage.SecondaryStorage);
}

/**
 * Save the configs from a workspace to a specified location 
 * @param {} workspace 
 * @param {} name 
 * @returns {} 
 */
Squid.Storage.SaveConfigs = function(workspace, name) {
    var configUrl = Squid.Storage.Configs;

    backupBlocks(workspace, configUrl + "_" + name);

    for (var i = 0; i < Squid.Storage.ConfigLocations.length; i++) {
        if (Squid.Storage.ConfigLocations[i] == name) {
            console.warn("Old value deleted");
            return;
        }
    }
    Squid.Storage.ConfigLocations.push(name);

    
}

/**
 * Restore a config from a location to a workspace
 * @param {} opt_workspace 
 * @param {} name 
 * @returns {} 
 */
Squid.Storage.RestoreConfigs = function(opt_workspace, name) {
    var configUrl = Squid.Storage.Configs;

    for (var i = 0; i < Squid.Storage.ConfigLocations.length; i++) {
        if (Squid.Storage.ConfigLocations[i] == name) {
            restoreBlocks(opt_workspace, configUrl + "_" + name);
            return;
        }
    }

    console.warn("No config set at that name.");
}

function backupBlocks (workspace, url) {
  if ('localStorage' in window) {
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
	        Refresh();
	    });
	}
};