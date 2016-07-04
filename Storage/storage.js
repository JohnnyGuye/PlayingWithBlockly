/**
 * @fileoverview A file in which are all the utility fonction for saving.
 * @author johnnyq@hotmail.fr (Johnny Guye)
 */
var SquidStorage = {};

SquidStorage.PrincipalStorage = "princWS";
SquidStorage.SecondaryStorage = "secWS";

/**
 * Saves a workspace in local storage. The secondary workspace are fully saved too, 
 * but they are all saved at the same place, which, you will restore only two workspaces,
 * even if you had more secondary workspaces. (No function is lost during operation)
 * @param {Blockly.Workspace} The workspace you want to save.
 */
SquidStorage.SaveWorkspace = function (workspace) {
    // Gets the current URL, not including the hash.
    var baseUrl = window.location.href.split('#')[0] + "#";

	var workspaceSec;
	var children = workspace.getLinkedWorkspace();
	console.log("Sauvegarde");
    if (children.length > 0) {
        workspaceSec = children[0];
        for (var i = 1; i < children.length; i++) {
            workspaceSec = children[i] || workspaceSec;
        }

        backupBlocks(workspaceSec, baseUrl + SquidStorage.SecondaryStorage);
        console.log(children.length);
    } else {
        console.log("No secondary workspace.");
    }

    backupBlocks(workspace, baseUrl + SquidStorage.PrincipalStorage);
};

function backupBlocks (workspace, url) {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(workspace);    
    window.localStorage.setItem(url, Blockly.Xml.domToText(xml));
  }
};

// Reload datas to a workspace
SquidStorage.ReloadWorkspace = function (workspace, secondaryWorkspace) {
	var baseUrl = window.location.href.split('#')[0] + "#";
	restoreBlocks(workspace, baseUrl + SquidStorage.PrincipalStorage);

	console.log("Rechargement");

	if(secondaryWorkspace != null) {
		restoreBlocks(secondaryWorkspace, baseUrl + SquidStorage.SecondaryStorage);
	} else {
		restoreBlocks(workspace, baseUrl + SquidStorage.SecondaryStorage);
	}
};

function restoreBlocks (opt_workspace, url) {
	if('localStorage' in window && window.localStorage[url]) {
		var workspace = opt_workspace;
		var xml = Blockly.Xml.textToDom(window.localStorage[url]);
		Blockly.Xml.domToWorkspace(xml, workspace);
	}
};

//----------------------------------- Deprecated
// Reload hard coded datas to a workspace
function hardReload(workspace_) {
    var text =
        '<xml xmlns="http://www.w3.org/1999/xhtml" display="none"> <block type="procedures_defreturn" id="dBD[wsV[avkvHT?4{6}S" x="60" y="81"> <mutation statements="false"> <arg name="VFlag"></arg> <arg name="Value"></arg> </mutation> <field name="NAME">Voltage</field> <comment pinned="false" h="80" w="160">Describe this function...</comment> <value name="RETURN"> <block type="math_arithmetic" id="eWt3cWVC~vL^O)~),qM`"> <field name="OP">ADD</field> <value name="A"> <shadow type="math_number" id="jATCh)~EF}z^(oyy]k;M"> <field name="NUM">1</field> </shadow> <block type="math_arithmetic" id="#SE]tZUN3{dER}SxJFww"> <field name="OP">DIVIDE</field> <value name="A"> <shadow type="math_number" id="RjM*T37!+Q^f(-f*%?Yq"> <field name="NUM">0</field> </shadow> <block type="variables_get" id="C02}.VSVyzOVo9eA)HZ;"> <field name="VAR">Value</field> </block> </value> <value name="B"> <shadow type="math_number" id="@8ntrFXIqK/.R:wKvt1#"> <field name="NUM">100</field> </shadow> </value> </block> </value> <value name="B"> <shadow type="math_number" id="%y).OZ0DQU79EZcfs}VJ"> <field name="NUM">1</field> </shadow> <block type="math_arithmetic" id="YaRF3-l#!MfiWM1D%N~G"> <field name="OP">ADD</field> <value name="A"> <shadow type="math_number" id="PQP#qHR[?hR`,.nnJD9Y"> <field name="NUM">1</field> </shadow> <block type="variables_get" id="Ej[7YHby0gLhD6pnKD+)"> <field name="VAR">VFlag</field> </block> </value> <value name="B"> <shadow type="math_number" id="H1HOlv!Vwue^|G(_ev-6"> <field name="NUM">2</field> </shadow> </value> </block> </value> </block> </value> </block> </xml>';

    workspace_ = workspace_ || Blockly.getMainWorkspace();
    var xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.domToWorkspace(xml, workspace_);
};