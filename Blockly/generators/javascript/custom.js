goog.provide('Blockly.Javascript.custom');

goog.require('Blockly.Javascript');

Blockly.JavaScript['decode_weft'] = function(block) {
  var angle_colour = block.getFieldValue('Colour');
  var text_size = block.getFieldValue('Size');
  var value_header = Blockly.JavaScript.valueToCode(block, 'Header', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_blocs = Blockly.JavaScript.statementToCode(block, 'Blocs');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['configurationblock'] = function(block) {
  var text_name = block.getFieldValue('Name');
  var value_beginning = Blockly.JavaScript.valueToCode(block, 'Beginning', Blockly.JavaScript.ORDER_ATOMIC);
  var value_size = Blockly.JavaScript.valueToCode(block, 'Size', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_reading = Blockly.JavaScript.statementToCode(block, 'Reading');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['simple_block'] = function(block) {
  var value_header = Blockly.JavaScript.valueToCode(block, 'Header', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_children = Blockly.JavaScript.statementToCode(block, 'Children');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};