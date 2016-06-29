'use strict';

Blockly.CSharp.custom = {};

Blockly.CSharp['decodebytes'] = function (block) {
    var varName = block.getFieldValue('name');
    var startPos = Blockly.CSharp.valueToCode(block, 'start', Blockly.CSharp.ORDER_ATOMIC);
    var endPos = Blockly.CSharp.valueToCode(block, 'end', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.DecodeBytes("' + varName + '", ' + startPos + 'M, ' + endPos + 'M).End()\n';
    return code;
};

Blockly.CSharp['decodeunsignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var leastsignificantbit = Blockly.CSharp.valueToCode(block, 'leastSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var mostsignificantbit = Blockly.CSharp.valueToCode(block, 'mostSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.DecodeUnsignedInteger("' + varName + '", ' + leastsignificantbit + 'M, ' + mostsignificantbit + 'M).End()\n';
    return code;
};

Blockly.CSharp['decodesignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var leastsignificantbit = Blockly.CSharp.valueToCode(block, 'leastSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var mostsignificantbit = Blockly.CSharp.valueToCode(block, 'mostSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.DecodeSignedInteger("' + varName + '", ' + leastsignificantbit + 'M, ' + mostsignificantbit + 'M).End()\n';
    return code;
};

Blockly.CSharp['compute'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var expression = Blockly.CSharp.valueToCode(block, 'function', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.Compute(\n\t"' + varName + '",\n\tdecodingContextData => ' + expression + ')\n';
    return code;
};

Blockly.CSharp['execute'] = function (block) {
    var action = Blockly.CSharp.valueToCode(block, 'action', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.Execute(' + action + ').End()\n';
    return code;
};

Blockly.CSharp['decodeboolean'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var position = Blockly.CSharp.valueToCode(block, 'POSITION', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.DecodeBoolean("' + varName + '", ' + position + 'M).End()\n';
    return code;
};