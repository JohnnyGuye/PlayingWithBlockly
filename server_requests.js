Squid.Requests = {};

/**
 * Send a request to save in the server 
 * the blocks in xml and associated generated code
 * @param {string} code the generated C# code
 * @param {string} xml the blocks in xml
 */
Squid.Requests.SaveBlocks = function(code, xml) {
    
     /*$.ajax({
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
     });*/

    $.ajax({
        url: '/api/Decoders',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify({Xml:xml,Code:code, CategoryID:'hehe' }),
        success: function (res) {
            alert(res);
        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
        }
    });

 }

/**
 * Send a request to save the simples variables (not config, nor inventory)
 * in the server
 * @param {} map the map object containing the simple variables
 */
Squid.Requests.SaveVariables = function (map) {
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

/**
 * Retrieve the simples variables from the server
 * and update the client accordingly
 */
Squid.Requests.ReloadVariables = function () {
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

/**
 * Retrieve blocks definitions in xml format from the server
 * @param {} callback 
 * @returns {} the blocks in xml via a callback function to get them asynchonously
 */
Squid.Requests.ReloadXml = function (callback) {
    $.ajax({
        url: '/api/blocks/reload',
        type: 'POST',
        //contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: callback,
        error: function (error) {
            alert("Wwoops something went wrong !" + error);
        }
    });  
}

//UTILS

 function mapToJson(map) {
     return JSON.stringify([...map]);
 }
 function jsonToMap(jsonStr) {
     return new Map(JSON.parse(jsonStr));
 }
