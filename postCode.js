 function postCode (code, xml) {
     var strCode = JSON.stringify(code);
     var strXml= JSON.stringify(xml);
    $.ajax({
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
    });

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
            alert("Success " + res);
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
            console.log(Squid.SimpleVariables);
            Squid.displaySimpleVariables();
        },
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
