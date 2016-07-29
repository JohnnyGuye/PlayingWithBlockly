Squid.Tabs = {};

Squid.Tabs.Open = function() {
    var cur_parameter = window.location.search.split("=")[1];
    //var cur_parameter = window.location.search[5];
    var next_parameter;

    if (cur_parameter === undefined) {
        next_parameter = child_tabs;
        child_tabs++;
    } else {
        next_parameter = cur_parameter + child_tabs;
        child_tabs++;
    }

    var url_Tab = "decoder.html?tab=" + next_parameter;
    window.open(url_Tab);


    //if (localStorage.getItem("openedTab") === null)
    //{
    //    var tab_number = 123;
    //    localStorage.setItem("openedTab", tab_number);
    //    console.log(localStorage.getItem("openedTab"));

    //    var url_Tab = "decoder.html?tab=" + tab_number++;
    //    window.open(url_Tab);

    //    localStorage.setItem("openedTab", tab_number++);
    //}
    //else {
    //    var tab_number = localStorage.getItem("openedTab");
    //    var url_Tab = "decoder.html?tab=" + tab_number++;
    //    window.open(url_Tab);

    //    localStorage.setItem("openedTab", tab_number++);
    //}
    //console.log(localStorage.getItem("openedTab"));

    //localStorage.removeItem("openedTab");
    //console.log(localStorage.getItem("openedTab"));
};