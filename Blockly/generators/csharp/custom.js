'use strict';

Blockly.CSharp.custom = {};

Blockly.CSharp['decodebytes'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var startPos = block.getFieldValue('start');
    var endPos = block.getFieldValue('end');
    var code = '.DecodeBytes("' + varName + '", ' + startPos + 'M, ' + endPos + 'M).End()\n';
    return code;
};

/*Blockly.CSharp['decodeunsignedinteger'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var leastsignificantbit = Blockly.CSharp.valueToCode(block, 'leastSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var mostsignificantbit = Blockly.CSharp.valueToCode(block, 'mostSignificantBit', Blockly.CSharp.ORDER_ATOMIC);
    var code = '.DecodeUnsignedInteger("' + varName + '", ' + leastsignificantbit + 'M, ' + mostsignificantbit + 'M).End()\n';
    return code;
};*/

Blockly.CSharp['decodeunsignedinteger'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    var code = '.DecodeUnsignedInteger("' + varName + '", ' + lsbyte +'.' + lsbit + 'M, ' + msbyte + '.' + msbit + 'M).End()\n';
    return code;
};

Blockly.CSharp['decodesignedinteger'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    var code = '.DecodeSignedInteger("' + varName + '", ' + lsbyte + '.' + lsbit + 'M, ' + msbyte + '.' + msbit + 'M).End()\n';
    return code;
};

Blockly.CSharp['compute'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
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
    var bytepos = block.getFieldValue('BYTEPOS');
    var bitpos = block.getFieldValue('BITPOS');
    var code = '.DecodeBoolean("' + varName + '", ' + bytepos + '.' + bitpos + 'M).End()\n';
    return code;
};

Blockly.CSharp['switch'] = function (block) {
    var varName = Blockly.CSharp.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Switch(decodingContextData => decodingContextData.' + varName + ')\n' + statement + '.EndSwitch()\n';
    return code;
};

Blockly.CSharp['case'] = function (block) {
    var value = block.getFieldValue('value');
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Case('+value+')\n'+statement;
    return code;
};

Blockly.CSharp['default'] = function (block) {
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Default()\n'+statement;
    return code;
};

Blockly.CSharp['decodeframe'] = function (block) {
    var frameName = block.getFieldValue('NAME');
    var statement = Blockly.CSharp.statementToCode(block, 'blocks');
    var code = 'public static TDecodableBlock ' + frameName + '<TDecodableBlock>(this IDecodableStep<TDecodableBlock> previousDecodableStep)' +
            '\n\twhere TDecodableBlock : IDecodableStep<TDecodableBlock>' +
            '\n{' +
            '\n\tContract.Requires<ArgumentNullException>(previousDecodableStep != null);' +
            '\n' +
            '\n\treturn' +
            '\n\t\tpreviousDecodableStep' +
            //TO DO : à modifier pour que ça s'adapte à toutes les longueurs de trames et pas juste celles de 12
            '\n\t\t.If(decodingContextData => decodingContextData.DecodedValues.FrameLength != 12)'+
            '\n\t\t\t.RaiseErrorIncorrectFrameLength()'+
            '\n\t\t.EndIf()'+
            '\n' + Blockly.CSharp.prefixLines(statement, "\t") + '}';

    //add an semicolon at the end, if needed
    if (code.lastIndexOf(';') !== code.length - 3) {
        code = code.slice(0, -2) + ';' + code.slice(-2);
    }


    //remove if needed the unecessary .End(), which means if the .End is at the end of the procedure definition
    var endPos = code.lastIndexOf('.End()');
    if (endPos !== -1) {
        var parPos = code.substring(endPos + 6).indexOf('(');
        //var computePos = code.substring(0, endPos).indexOf('.Compute(');
        if (parPos === -1) {
            code = code.slice(0, endPos) + code.slice(endPos + 6);
        }
    }
    return code;
};


