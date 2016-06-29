// Append some tex with tabulation
function append(text, tab) {
    var t = "  ";
    for (var i = 0; i < tab; i++) {
        text = t + text;
    }
    return text;
}

function appendln(text, tab) {
    return append(text, tab) + "\n";
}

// Try to parse XML into a custom block
function tryParse(workspace_) {
    var firstBlock = workspace_.getAllBlocks()[0];
    var domBlock = Blockly.Xml.blockToDom(firstBlock);
    var names = domBlock.getElementsByTagName("*");

    var name = names[3].tagName;

    for (var i = 0; i < names.length; i++) {
        var item = names[i];
        switch (item.tagName) {
            case "FIELD":
                name = item.content;
                break;
            default:
                break;
        }
    }
    ////var text = Blockly.Xml.domToPrettyText(domBlock);
    ////alert(text);

    var JSCode = "Blockly.Blocks['" +
        name +
        appendln("'] = {") +
        appendln("init: function() {", 1);
    JSCode += appendln("this.appendDummyInput", 2) +
        appendln(".setAlign(Blockly.ALIGN_CENTRE)", 4) +
        appendln(".appendField('" + "');", 4);

    JSCode += appendln("}", 1) + appendln("};");

    alert(JSCode);
}


function parse() {
    var firstBlock = workspace.getAllBlocks()[0];
    var domBlock = Blockly.Xml.blockToDom(firstBlock);
    var tags = domBlock.getElementsByTagName("*");

    var JSCode = "Blockly.Blocks['" + domBlock.getAttribute("type") + "'] = {\n" + appendln("init: function() {", 1);

    for (var i = 0; i < tags.length; i++) {
        switch (tags[i].tagName) {
            case "FIELD":
                JSCode += appendln('this.appendDummyInput()', 2);
                JSCode += appendln('.appendField(' + '"' + tags[i].getAttribute("name") + '"' + ")", 3);
                JSCode += appendln("appendField(new Blockly.FieldTextInput(" + '"' + tags[i].innerHTML + '"' + "), " + '"' + tags[i].innerHTML + '"' + ");", 3);
                break;
            case "STATEMENT":
                JSCode += appendln('this.appendStatementInput("NAME")', 2);
                JSCode += appendln('.setCheck(null);', 3);
                break;
            case "BLOCK":
                break;

        }
    }

    alert(JSCode);

}