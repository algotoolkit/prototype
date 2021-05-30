import * as Blockly from 'blockly/core';

Blockly.Blocks['arithmetic_remainder'] = {
    init: function() {
      this.appendValueInput("a")
          .setCheck("Number");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField("%");
      this.appendValueInput("b")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(230);
   this.setTooltip("나머지 연산");
   this.setHelpUrl("");
    }
};

Blockly.JavaScript['arithmetic_remainder'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(
        block,
        "a",
        Blockly.JavaScript.ORDER_ATOMIC
      );
    var b = Blockly.JavaScript.valueToCode(
        block,
        "b",
        Blockly.JavaScript.ORDER_ATOMIC
      );
    var code = `${a} % ${b}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};