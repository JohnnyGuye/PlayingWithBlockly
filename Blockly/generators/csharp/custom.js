﻿'use strict';

Blockly.CSharp.custom = {};

Blockly.CSharp.addMIfNeeded = function (param) {
    if (!isNaN(param)) {
            param = param + 'M';
    }
    return param;

}

Blockly.CSharp.prepareBytesAndBits = function(args) {
    if (isNaN(args[0])) {
        if (isNaN(args[1])) {
            return args[0] + ' + ' + args[1] + ' / 10M';
        } else {
            return args[0] + ' + 0.' + args[1] + 'M';
        }
    } else {
        if (isNaN(args[1])) {
            return args[0] + 'M + ' + args[1] + ' / 10M';
        } else {
            return args[0] + '.' + args[1] + 'M';
        }
    }
}

Blockly.CSharp['decodebytes'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var startPos = block.getFieldValue('start');
    var endPos = block.getFieldValue('end');
    startPos = Blockly.CSharp.addMIfNeeded(startPos);
    endPos = Blockly.CSharp.addMIfNeeded(endPos);
    //var code = '.DecodeBytes("' + varName + '", ' + startPos + 'M, ' + endPos + 'M).End()\n';
    var code = '.DecodeBytes("' + varName + '", ' + startPos + ', ' + endPos + ').End()\n';
    return code;
};


Blockly.CSharp['decodeunsignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    var ms = Blockly.CSharp.prepareBytesAndBits([ msbyte, msbit ]);
    var ls = Blockly.CSharp.prepareBytesAndBits([ lsbyte, lsbit ]);
    var code = '.DecodeUnsignedInteger("' + varName + '", ' + ls + ', ' + ms + ').End()\n';
    return code;
};

Blockly.CSharp['decodesignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    var ms = Blockly.CSharp.prepareBytesAndBits([msbyte, msbit]);
    var ls = Blockly.CSharp.prepareBytesAndBits([lsbyte, lsbit]);
    var code = '.DecodeSignedInteger("' + varName + '", ' + ls + ', ' + ms + ').End()\n';
    return code;
};

Blockly.CSharp['compute'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var expression = block.getFieldValue('FUNCTION');
    var code = '.Compute(\n\t"' + varName + '",\n\tdecodingContextData => ' + expression + ')\n';
    return code;
};

Blockly.CSharp['execute'] = function (block) {
    var action = block.getFieldValue('ACTION');
    var code = '.Execute(' + action + ').End()\n';
    return code;
};

Blockly.CSharp['decodeboolean'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var bytepos = block.getFieldValue('BYTEPOS');
    var bitpos = block.getFieldValue('BITPOS');
    var pos = Blockly.CSharp.prepareBytesAndBits([bytepos, bitpos]);
    var code = '.DecodeBoolean("' + varName + '", ' + pos + ').End()\n';
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


