goog.require('Blockly.Blocks');

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
