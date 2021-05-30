import * as Blockly from 'blockly/core';

Blockly.Blocks['output'] = {
    init: function() {
      this.appendValueInput("text")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("다음 내용 출력");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
   this.setTooltip("출력");
   this.setHelpUrl("");
    }
  };

Blockly.JavaScript['output'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(
        block,
        "text",
        Blockly.JavaScript.ORDER_ATOMIC
      );
    var code = `s.push(${String(text)});\n`;
    return code;
}