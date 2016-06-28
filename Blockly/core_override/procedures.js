/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Field');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');


/**
 * Category to separate procedure names from variables and generated functions.
 */
Blockly.Procedures.NAME_TYPE = 'PROCEDURE';

/**
* Find all user created procedure definitions in a workspace.
*     This append results in two arrays for procedures with or without return.
*     They can possibly have results results from an other workspace or more.
* /!\ BE CAREFUL IT HAS TO BE A NONE CIRCULARE REFERENCED WORKSPACE
* @param {!Blockly.Worspace} root Root workspace.
* @param {!Array.<!Array>} proceduresReturn Procedures with return variables.
* @param {!Array.<!Array>} proceduresNoReturn Procedures without return variables.  
* 
*/
function fillProcedure(workspace, proceduresReturn, proceduresNoReturn) {
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getProcedureDef) {
      var tuple = blocks[i].getProcedureDef();
      if (tuple) {
        if (tuple[2]) {
          proceduresReturn.push(tuple);
        } else {
          proceduresNoReturn.push(tuple);
        }
      }
    }
  }
  
  // Do that again for children
  var children = workspace.getLinkedWorkspace();
  for(var i = 0; i < children.length; i++) {
      fillProcedure(children[i], proceduresReturn, proceduresNoReturn);     
  } 
}

/**
 * Find all user-created procedure definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.Procedures.allProcedures = function(workspace) {
  var proceduresReturn = [];
  var proceduresNoReturn = [];    
  // If we are working on a single worspace
  if(workspace instanceof Blockly.Workspace) {  
    console.log("Working on a single area, doing much");
    fillProcedure(workspace, proceduresReturn, proceduresNoReturn);    
  }
  // If we are working on a area of workspaces
  else {
    console.log("Working on areas, doing nothin'");
    for(var i = 0; i < workspace; i++) {
      fillProcedure(workspace[i], proceduresReturn, proceduresNoReturn);
    }    
  }
  proceduresNoReturn.sort(Blockly.Procedures.procTupleComparator_);
  proceduresReturn.sort(Blockly.Procedures.procTupleComparator_);
  return [proceduresNoReturn, proceduresReturn];
};
