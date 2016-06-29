goog.require('Blockly.Blocks');

//blocks for testing
Blockly.Blocks['decode_weft'] = {
    /*
    * This represents a weft with a size in bytes, a header,
    * and blocs for decoding.
    */
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Trame");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Couleur")
            .appendField(new Blockly.FieldAngle(0), "Colour");
        this.appendDummyInput()
            .appendField("Taille")
            .appendField(new Blockly.FieldTextInput("12"), "Size");
        this.appendValueInput("Header")
            .setCheck("Decode.Header")
            .appendField("Header");
        this.appendStatementInput("Blocs")
            .setCheck(null)
            .appendField("Blocs");
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['configurationblock'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Configuration standard");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Nom")
            .appendField(new Blockly.FieldTextInput("Bloc"), "Name");
        this.appendValueInput("Beginning")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Début");
        this.appendValueInput("Size")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Taille");
        this.appendStatementInput("Reading")
            .setCheck(null)
            .appendField("Lecture");
        this.setInputsInline(false);
        this.setOutput(true, "Decode.Bloc");
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['simple_block'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Bloc");
        this.appendValueInput("Header")
            .setCheck("Decode.Bloc")
            .appendField("Configuration");
        this.appendStatementInput("Children")
            .setCheck("Block")
            .appendField("Childrens");
        this.setInputsInline(false);
        this.setPreviousStatement(true, ["Decode.Weft", "Block"]);
        this.setNextStatement(true, ["Decode.Weft", "Block"]);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

//Generic : 

Blockly.Blocks['decodebytes'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("DecodeBytes");
        this.appendDummyInput()
            .appendField("name :")
            .appendField(new Blockly.FieldTextInput("default"), "name");
        this.appendValueInput("start")
            .setCheck(null)
            .appendField("start byte position : ");
        this.appendValueInput("end")
            .setCheck(null)
            .appendField("end byte position : ");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e3vsv5');
    }
};

Blockly.Blocks['decodeunsignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decode unsigned integer");
        this.appendDummyInput()
            .appendField("name : ")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendValueInput("leastSignificantBit")
            .setCheck(null)
            .appendField("least significant bit position");
        this.appendValueInput("mostSignificantBit")
            .setCheck(null)
            .appendField("most significant bit position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4d9g5v');
    }
};

Blockly.Blocks['decodesignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decode signed integer");
        this.appendDummyInput()
            .appendField("name : ")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendValueInput("leastSignificantBit")
            .setCheck(null)
            .appendField("least significant bit position :");
        this.appendValueInput("mostSignificantBit")
            .setCheck(null)
            .appendField("most significant bit position :");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yc64so');
    }
};

Blockly.Blocks['compute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Compute : ");
        this.appendDummyInput()
            .appendField("name : ")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendValueInput("function")
            .setCheck(null)
            .appendField("function :");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#skwmiv');
    }
};

Blockly.Blocks['execute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Execute ");
        this.appendValueInput("action")
            .setCheck(null)
            .appendField("Action : ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#iuhihs');
    }
};

Blockly.Blocks['switch'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("switch");
        this.appendDummyInput()
            .appendField("variable :")
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("case :")
            .appendField(new Blockly.FieldTextInput("default"), "NAME")
            .appendField("then :");
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("case :")
            .appendField(new Blockly.FieldTextInput("default"), "NAME")
            .appendField("then :");
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("case :")
            .appendField(new Blockly.FieldTextInput("default"), "NAME")
            .appendField("then :");
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("case :")
            .appendField(new Blockly.FieldTextInput("default"), "NAME")
            .appendField("then :");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dsnuad');
    }
};

//Core : 

Blockly.Blocks['decodeboolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decode boolean :");
        this.appendDummyInput()
            .appendField("name :")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.appendValueInput("POSITION")
            .setCheck(null)
            .appendField("position :");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#re2b4h');
    }
};