Squid.Requests = {};

/**
 * Send a request to save in the server the decoder
 * @param {string} code the generated C# code
 * @param {string} xml the decoder definition in xml
 */
Squid.Requests.SaveDecoder = function(code, xml) {
    
    $.ajax({
        url: '/api/Decoders',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify({Id:TabId, Xml:xml, Code:code}),
        success: function (res) {

            if (res.id) {
                if (!TabId) {
                    TabId = res.id;
                    document.location += "#" + res.id;
                    //FOOOOR THE TESTS !!!!!
                    //Squid.Requests.GetDecoderDef(res.id);
                }
                alert(res.id);
            } else {
                alert(res.error);
            }
           
        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
        }
    });

}

/**
 * 
 * @param {} id l'id du décodeur à récup
 * @returns {string} la définition du block en xml
 */
Squid.Requests.GetDecoderDef = function (id) {

    $.ajax({
        url: '/api/Decoders/decoderdef',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //datatype: 'json',
        data: JSON.stringify({ Id: id }),
        success: function (res) {
            //alert(res);
            if (res.xml) {
                return res.xml;
            } else {
                alert(res.error);
            }

        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
        }
    });

}

Squid.Requests.GetCategories = function(workspace, toolbox, callback) {
    $.ajax({
        url: '/api/Decoders/categories',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (mapstr) {
            //alert(map);
            //var map = jsonToStrMap(mapstr);
            callback(workspace, toolbox, JSON.parse(mapstr));
        },
        error: function (error) {
            alert("Erreur lors du chargement" + error);
        }
    });

}

Squid.Requests.FindUsages = function (id) {

    $.ajax({
        url: '/api/Decoders/findusages',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //datatype: 'json',
        data: JSON.stringify({ Id: id }),
        success: function (res) {
            if (res.error) {
                //an error occured
                alert(res.error);
            } else {
                if (res.length > 0) {
                    alert(res);
                    var msgBody = res.join('\n- ');
                    var confMsg =
                        "Les fonctions suivantes utlisent la fonction à supprimer (ou une de même nom) :\n- " +
                            msgBody +
                            "\n Etes-vous sûr de vouloir continuer ?";
                    var retVal = confirm(confMsg);
                    if (retVal === true) {
                        //delete function
                        alert("fonction supprimée !");
                    }
                } else {
                    var retVal = confirm("La fonction à supprimer n'est utilisé nulle part.");
                    if (retVal === true) {
                        //delete function
                    }
                }

            }
            
            /*if (res.xml) {
                return res.xml;
            } else {
                alert(res.error);
            }*/

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

 function jsonToStrMap(jsonStr) {
     return objToStrMap(JSON.parse(jsonStr));
 }

 function objToStrMap(obj) {
     var strMap = new Map();
     for (var category in obj) {
         if (obj.hasOwnProperty(category)) {
             strMap.set(category, obj[category]);
         }       
     }
     return strMap;
 }
