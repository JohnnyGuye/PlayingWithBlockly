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
