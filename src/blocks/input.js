import * as Blockly from 'blockly/core';

Blockly.Blocks['input'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("입력 받기");
      this.setOutput(true, null);
      this.setColour(160);
   this.setTooltip("출력");
   this.setHelpUrl("");
    }
  };

Blockly.JavaScript['input'] = function() {
    var code = "t.pop()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}