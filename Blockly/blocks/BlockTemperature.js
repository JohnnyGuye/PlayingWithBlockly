Blockly.Blocks['temperature'] = {
    init: function () {
        this.setColour(65);
        this.appendValueInput("if")
            .setCheck(null)
            .appendField("if")
            .appendField(new Blockly.FieldVariable("TFlag"), "tflag");
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField("then");
        this.appendStatementInput("else")
            .setCheck(null)
            .appendField("else");
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['container_block'] = {
    init: function () {
        this.appendValueInput("input1")
            .setCheck(null)
            .appendField("input1");
        this.appendValueInput("input2")
            .setCheck(null)
            .appendField("input2");
        this.appendValueInput("input3")
            .setCheck(null)
            .appendField("input3");
        this.appendStatementInput("statement1")
            .setCheck(null)
            .appendField("statement1");
        this.appendStatementInput("statement2")
            .setCheck(null)
            .appendField("statement2");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['function'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("function :")
            .appendField(new Blockly.FieldTextInput("function name"), "func");
        this.appendDummyInput()
            .appendField("Version")
            .appendField(new Blockly.FieldTextInput("version"), "version");
        this.appendDummyInput()
            .appendField("Category")
            .appendField(new Blockly.FieldTextInput("Category name"), "cat");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.appendValueInput("return")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("return");
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#otdbh4');
    }
};


//allow new category on the dropdown field
Blockly.Blocks['function_with_tags'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("function : ")
            .appendField(new Blockly.FieldTextInput("name.."), "name");
        this.appendDummyInput()
            .appendField("Version")
            .appendField(new Blockly.FieldTextInput("version"), "v");
        this.appendDummyInput()
            .appendField("Category")
            .appendField(new Blockly.FieldDropdown([["cat1", "OPTIONNAME"], ["cat2", "OPTIONNAME"], ["cat3", "OPTIONNAME"]]), "c");
        this.appendDummyInput()
            .appendField("tags")
            .appendField(new Blockly.FieldTextInput("tag1,tag2..."), "tag");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.appendValueInput("NAME")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("return");
        this.setInputsInline(false);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#skr8oy');
    }
};