//import * as lib from 'lib';
"use strict";

Blockly.generateCodeOnServerSide = function () {
    console.log("start");
    var workspace = new Blockly.Workspace();
    $.ajax({
        url: "workspace_storage.txt",
        success: function (file_content) {
        var xml = Blockly.Xml.textToDom(file_content);
        Blockly.Xml.domToWorkspace(xml, workspace);
        var code = Blockly.CSharp.workspaceToCode(workspace, "FUNC");
            postCode(code);

        }
    });
}

Blockly.postCode = function(code) {

    $.ajax({
        url: 'Handler1.ashx',
        type: 'POST',
        data: code,
        success: function () {
            //alert("Success ");
            console.log("success");
        },
        error: function () {
            //alert("Wwoops something went wrong !");
        }
    });

    e.preventDefault();
}

generateCodeOnServerSide();
