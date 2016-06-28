// Saves a workspace 
function save(workspace_) {
    var elem = document.getElementById('saveContent');
    elem.textContent = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));

    BlocklyStorage.backupBlocks_(workspace_);
};

// Reload datas to a workspace
function reload(workspace_) {
    BlocklyStorage.restoreBlocks(workspace_);
};

// Reload hard coded datas to a workspace
function hardReload(workspace_) {
    var text =
        '<xml xmlns="http://www.w3.org/1999/xhtml" display="none"> <block type="procedures_defreturn" id="dBD[wsV[avkvHT?4{6}S" x="60" y="81"> <mutation statements="false"> <arg name="VFlag"></arg> <arg name="Value"></arg> </mutation> <field name="NAME">Voltage</field> <comment pinned="false" h="80" w="160">Describe this function...</comment> <value name="RETURN"> <block type="math_arithmetic" id="eWt3cWVC~vL^O)~),qM`"> <field name="OP">ADD</field> <value name="A"> <shadow type="math_number" id="jATCh)~EF}z^(oyy]k;M"> <field name="NUM">1</field> </shadow> <block type="math_arithmetic" id="#SE]tZUN3{dER}SxJFww"> <field name="OP">DIVIDE</field> <value name="A"> <shadow type="math_number" id="RjM*T37!+Q^f(-f*%?Yq"> <field name="NUM">0</field> </shadow> <block type="variables_get" id="C02}.VSVyzOVo9eA)HZ;"> <field name="VAR">Value</field> </block> </value> <value name="B"> <shadow type="math_number" id="@8ntrFXIqK/.R:wKvt1#"> <field name="NUM">100</field> </shadow> </value> </block> </value> <value name="B"> <shadow type="math_number" id="%y).OZ0DQU79EZcfs}VJ"> <field name="NUM">1</field> </shadow> <block type="math_arithmetic" id="YaRF3-l#!MfiWM1D%N~G"> <field name="OP">ADD</field> <value name="A"> <shadow type="math_number" id="PQP#qHR[?hR`,.nnJD9Y"> <field name="NUM">1</field> </shadow> <block type="variables_get" id="Ej[7YHby0gLhD6pnKD+)"> <field name="VAR">VFlag</field> </block> </value> <value name="B"> <shadow type="math_number" id="H1HOlv!Vwue^|G(_ev-6"> <field name="NUM">2</field> </shadow> </value> </block> </value> </block> </value> </block> </xml>';
    var url = window.location.href.split('#')[0];

    workspace = workspace || Blockly.getMainWorkspace();
    var xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.domToWorkspace(xml, workspace_);
};

function createFunction(workspace) {
    var workspace_ = Blockly.inject('blocklyDiv2',
    { toolbox: document.getElementById('toolbox') });

    workspace.addWorkspace(workspace_);
}