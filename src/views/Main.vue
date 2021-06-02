<template>
   <v-row no-gutters class="fill-height">
    <v-col cols="8">
    <BlocklyComponent id="blockly1" :options="options" ref="block"/>
    </v-col>
    <v-col cols="4">
      <Statement ref="state"/>
    </v-col>
    </v-row>
</template>

<script>
import * as Blockly from 'blockly/core';
import BlocklyComponent from '../components/BlocklyComponent.vue'
import Statement from './Statement.vue'
import '../blocks/modulo';
import '../blocks/output';
import '../blocks/input';
import '../prompt';

///import BlocklyJS from 'blockly/javascript';

export default {
  name: 'Main',
  components: {
    BlocklyComponent,
    Statement,
  },
  refs: ['state', 'block'],
  methods: {
    changeId: function(id) {
      let workspace = Blockly.getMainWorkspace();
      var l1 = JSON.parse(this.storage.getItem('workspaces'));
      l1[this.id] = JSON.stringify(Blockly.Xml.workspaceToDom(workspace));
      this.storage.setItem('workspaces', JSON.stringify(l1));
      workspace.clear();
      if (JSON.parse(l1[id]) != null) {
        console.log(JSON.parse(l1[id]));
        Blockly.Xml.domToWorkspace(JSON.parse(l1[id]), workspace);
      }
      this.id = id;
      this.$refs.state.id = id;
      this.$refs.state.update(id);
    },
    save: function() {
      let workspace = Blockly.getMainWorkspace();
      var l1 = JSON.parse(this.storage.getItem('workspaces'));
      l1[this.id] = JSON.stringify(Blockly.Xml.workspaceToDom(workspace));
      this.storage.setItem('workspaces', JSON.stringify(l1));
    },
  },
  created() {
    let workspace = Blockly.getMainWorkspace();
    var l1 = JSON.parse(this.storage.getItem('workspaces'));
    console.log(this.id);
    if (JSON.parse(l1[this.id]) != null) {
      console.log(JSON.parse(l1[this.id]));
      Blockly.Xml.domToWorkspace(JSON.parse(l1[this.id]), workspace);
    }
    this.timer = setInterval(this.save, 5000);
  },
  data(){
    return {
      id: 0,
      timer: '',
      storage: localStorage,
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox:
        `<xml>
        <category name="논리" colour="%{BKY_LOGIC_HUE}">
      <category name="조건문">
        <block type="controls_if"></block>
        <block type="controls_if">
          <mutation else="1"></mutation>
        </block>
        <block type="controls_if">
          <mutation elseif="1" else="1"></mutation>
        </block>
      </category>
      <category name="부울구문" colour="%{BKY_LOGIC_HUE}">
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>
    </category>
    <category name="반복" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <field name="VAR">i</field>
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
        <value name="BY">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="수학" colour="%{BKY_MATH_HUE}">
      <block type="math_number">
        <field name="NUM">123</field>
      </block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_constant"></block>
      <block type="math_number_property"></block>
      <block type="math_round"></block>
      <block type="math_on_list"></block>
      <block type="math_modulo"></block>
      <block type="math_constrain">
        <value name="LOW">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="HIGH">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_float"></block>
      <block type="math_atan2"></block>
    </category>
    <category name="리스트" colour="%{BKY_LISTS_HUE}">
      <block type="lists_create_empty"></block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat">
        <value name="NUM">
          <block type="math_number">
            <field name="NUM">5</field>
          </block>
        </value>
      </block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf"></block>
      <block type="lists_getIndex"></block>
      <block type="lists_setIndex"></block>
    </category>
    <category name="문자" colour="%{BKY_TEXTS_HUE}">
      <block type="text"></block>
      <block type="text_length"></block>
      <block type="output"></block>
      <block type="input"></block>
    </category>
    <sep></sep>
    <category name="변수" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
    </category>
    <category name="함수" custom="PROCEDURE" colour="%{BKY_PROCEDURES_HUE}">
    </category>
        </xml>`
      }
    }
  },
}
</script>

<style scoped>
#blockly1 {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
