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
            .appendField("D�but");
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

//Core : 

Blockly.Blocks['decodebytes'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder octets");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("octet de debut :")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "start");
        this.appendDummyInput()
            .appendField("octet de fin :     ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "end");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

/*Blockly.Blocks['decodeunsignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder unsigned integer");
        this.appendDummyInput()
            .appendField("nom : ")
            .appendField(new Blockly.FieldVariable("default"), "NAME");
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
};*/

Blockly.Blocks['decodeunsignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder entier non signe");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("        poids fort")
            .appendField("poids faible");
        this.appendDummyInput()
            .appendField("octet    ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "MSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "LSBYTE");
        this.appendDummyInput()
            .appendField("bit        ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "MSBIT")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "LSBIT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9nq9w3');
    }
};

Blockly.Blocks['decodesignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder entier signe");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("        poids fort")
            .appendField("poids faible");
        this.appendDummyInput()
            .appendField("octet    ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "MSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "LSBYTE");
        this.appendDummyInput()
            .appendField("bit        ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "MSBIT")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "LSBIT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9nq9w3');
    }
};

Blockly.Blocks['compute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Calculer : ");
        this.appendDummyInput()
            .appendField("Resultat : ")
            .appendField(new Blockly.FieldTextInput("nom", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("Expression : ")
            .appendField(new Blockly.FieldTextInput("expression", null, AutoComplete.GetVariables), "FUNCTION");
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
            .appendField("Executer ");
        this.appendDummyInput()
            .appendField("Action :")
            .appendField(new Blockly.FieldTextInput("expression", null, AutoComplete.GetVariables), "ACTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#iuhihs');
    }
};

Blockly.Blocks['switch'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Aiguillage");
        this.appendDummyInput()
            .appendField("variable :")
            .appendField(new Blockly.FieldTextInput("item", null, AutoComplete.GetVariables), "VARIABLE");
        this.appendStatementInput("STATEMENT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#z53icu');
    }
};

Blockly.Blocks['case'] = {
    init: function () {
        this.appendStatementInput("STATEMENT")
            .setCheck(null)
            .appendField("cas : ")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "value")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(9);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#x7kjuy');
    }
};

Blockly.Blocks['default'] = {
    init: function () {
        this.appendStatementInput("STATEMENT")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("par defaut faire");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

//Generics : 

Blockly.Blocks['decodeboolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder booleen :");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("octet  ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "BYTEPOS");
        this.appendDummyInput()
            .appendField("bit      ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "BITPOS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#re2b4h');
    }
};

Blockly.Blocks['check_frame_length'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Verifier longeur de la trame :");
        this.appendDummyInput()
            .appendField("taille attendue ")
            .appendField(new Blockly.FieldTextInput("12"), "SIZE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5739c7');
    }
};

//DEPRECATED
Blockly.Blocks['decodeframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder la trame :");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, AutoComplete.GetVariables), "NAME");
        this.appendDummyInput()
            .appendField("trame : ")
            .appendField(new Blockly.FieldTextInput("0", null, AutoComplete.GetVariables), "hexaValue");
        this.appendStatementInput("blocks")
            .setCheck(null)
            .appendField("decodage :");
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

