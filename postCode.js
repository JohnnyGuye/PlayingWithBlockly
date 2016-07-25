 function postCode (code, xml) {
     var strCode = JSON.stringify(code);
     var strXml= JSON.stringify(xml);
    /*$.ajax({
        url: '/api/Blocks/savecode',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype:'json',
        data:  strCode,
        success: function (res) {
            alert("Success " +res);
        },
        error: function (error) {
            alert("Wwoops something went wrong !"+error);
        }
    });
    
    $.ajax({
        url: '/api/Blocks/savexml',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data:  strXml,
        success: function (res) {
            alert("Success " + res);
        },
        error: function (error) {
            alert("Wwoops something went wrong !" + error);
        }
    });*/

     $.ajax({
         url: '/api/Blocks/savexml',
         type: 'POST',
         contentType: 'application/json; charset=utf-8',
         datatype: 'json',
         data: JSON.stringify({Code:code, Xml:xml}),
         success: function (res) {
             alert(res);
         },
         error: function (error) {
             alert("Erreur lors de la sauvegarde" + error);
         }
     });

 }

saveAllOnServer = function(xml, code) {
    var strCode = JSON.stringify(code);
    var strXml = JSON.stringify(xml);
}

 saveVariables = function (map) {
     console.log(map);
     var variables = mapToJson(map);
     var StrVariables = JSON.stringify(variables);
     //console.log(jsonToMap(variables));
     console.log(variables);
    $.ajax({
        url: '/api/variables/save',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: StrVariables,
        //traditional: true,
        success: function (res) {
            //alert("Success " + res);
        },
        error: function (error) {
            alert("Wwoops something went wrong !" + error);
        }
    });
 }

reloadVariables = function() {
    $.ajax({
        url: '/api/variables/reload',
        type: 'POST',
        //contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        //traditional: true,
        success: function (res) {
            //alert("Success " + res);
            Squid.restoreSimpleVariables(jsonToMap(res));
            //console.log(Squid.SimpleVariables);
            Squid.displaySimpleVariables();
        },
        error: function (error) {
            alert("Wwoops something went wrong !" + error);
        }
    });
}

reloadXml = function (callback) {
    $.ajax({
        url: '/api/blocks/reload',
        type: 'POST',
        //contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        //traditional: true,
        /*success: function (xmlText) {
            //alert(xmlText);
            alert(workspace);
            var xml = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.domToWorkspace(xml, workspace);
        },*/
        success: callback,
        error: function (error) {
            alert("Wwoops something went wrong !" + error);
        }
    });  
}



 function mapToJson(map) {
     return JSON.stringify([...map]);
 }
 function jsonToMap(jsonStr) {
     return new Map(JSON.parse(jsonStr));
 }
