 function postCode (code) {

    $.ajax({
        url: '/api/Blocks/save',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype:'json',
        data: JSON.stringify(code),
        success: function (res) {
            alert("Success " +res);
        },
        error: function (error) {
            alert("Wwoops something went wrong !"+error);
        }
    });
}
