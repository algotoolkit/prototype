<template>
    <v-container>
        <v-alert dense type="success" v-show="show_success_alert"> 맞았습니다! </v-alert>
        <v-alert dense type="error" v-show="show_error_alert"> 틀렸습니다. </v-alert>
        <v-alert dense type="warning" v-show="show_warning_alert"> 부분점수: {{ prog }} / {{ point }} </v-alert>
        <v-row no-gutters>
        <v-card width="100%" color="primary" dark>
            <v-row no-gutters>
                <v-card-title>{{ `${this.title} (${this.point}pt)` }}</v-card-title>
                <v-spacer/>
                <v-card-actions>
                <v-btn text @click="sumbit">
                    <v-icon>
                        mdi-play
                    </v-icon>
                    Run
                </v-btn>
            </v-card-actions>
            </v-row>
        </v-card>
        </v-row>
        <v-row no-gutters>
            <v-progress-linear
                color="light-blue"
                height="25"
                striped
                ref="progress"
            >
                <span>{{ prog }} / {{ point }}</span>
            </v-progress-linear>
        </v-row>
        <v-row no-gutters>
        <v-card
            width="100%"
        >
            <v-list>
                <v-subheader>문제</v-subheader>
                <v-container class="body-1">
                    <vue-markdown ref="markdown">
                        {{ this.statement }}
                    </vue-markdown>
                </v-container>
                <v-subheader>입력</v-subheader>
                <v-container class="body-1">
                    <vue-markdown ref="markdown_input">
                        {{ this.input }}
                    </vue-markdown>
                </v-container>
                <v-subheader>출력</v-subheader>
                <v-container class="body-1">
                    <vue-markdown ref="markdown_output">
                        {{ this.output }}
                    </vue-markdown>
                </v-container>
                
            </v-list>
        </v-card>
        </v-row>
    </v-container>
</template>

<script>
import Blockly from 'blockly';
import VueMarkdown from 'vue-markdown';
import axios from 'axios';
import problems from '../assets/problems.json';

export default {
    code: "",
    name: "Statement",
    refs: ['markdown', 'markdown_input', 'markdown_output', 'progress', 'alert'],
    methods: {
        sumbit: function() {
            console.log(this.inputs);
            this.$refs.progress.value = 0;
            this.prog = 0;
            this.code = Blockly.JavaScript.workspaceToCode(this.$refs["block"]);
            for (var i = 0; i < this.index.size; i++) {
                var s = [];
                var t = this.inputs[this.id][i].replace("\n", " ").split(" ");
                t.reverse();
                eval(this.code);
                t.length;
                if (s.join("\n") == this.outputs[this.id][i]) {
                    this.prog += this.point/this.index.size;
                    this.$refs.progress.value += 100/this.index.size;
                }
            }
            this.show_success_alert = false;
            this.show_warning_alert = false;
            this.show_error_alert = false;
            if (this.prog == this.point) {
                this.show_success_alert = true;
            } else if (this.prog != 0) {
                this.show_warning_alert = true;
            } else {
                this.show_error_alert = true;
            }
            var l1 = JSON.parse(this.storage.getItem('is_accepted'));
            this.storage.setItem('score', String(Number(this.storage.getItem('score')) - l1[this.id]));
            l1[this.id] = this.prog;
            this.storage.setItem('is_accepted', JSON.stringify(l1));
            this.storage.setItem('score', String(Number(this.storage.getItem('score')) + this.prog));
        },
        update: function(id) {
            this.inputs = Array(problems.problems.length).fill([]);
            this.outputs = Array(problems.problems.length).fill([]);
            this.title = problems.problems[id].title;
            this.point = problems.problems[id].point;
            this.show_success_alert = false;
            this.show_warning_alert = false;
            this.show_error_alert = false;
            this.id = id;
            var l1 = JSON.parse(this.storage.getItem('is_accepted'));
            this.prog = l1[this.id];
            this.$refs.progress.value = 100 * (this.prog / this.point);
        axios.get(
        `/statement/${id}.md`,
        { baseURL: window.location.origin }).then(response => { this.statement = response.data; this.$refs['markdown'].sourceData = response.data; });
        axios.get(
        `/input/${id}.md`,
        { baseURL: window.location.origin }).then(response => { this.input = response.data; this.$refs['markdown_input'].sourceData = response.data; });
        axios.get(
        `/output/${id}.md`,
        { baseURL: window.location.origin }).then(response => { this.output = response.data; this.$refs['markdown_output'].sourceData = response.data; });
        axios.get(
        `/data/${id}/index.json`,
        { baseURL: window.location.origin }).then(response => { 
            this.index = response.data;
            for (var i = 1; i <= this.index.size; i++) {
                axios.get(
                `/data/${id}/input/${i}.in`,
                { baseURL: window.location.origin }).then(response => { this.inputs[id].push(String(response.data)); });
                axios.get(
                `/data/${id}/output/${i}.out`,
                { baseURL: window.location.origin }).then(response => { this.outputs[id].push(String(response.data)); });
            }
        })
        }
    },
    components: {
        VueMarkdown,
    },
    data: () => ({
        id: 0,
        allocated: false,
        storage: localStorage,
        prog: 0,
        index: {},
        inputs: Array(problems.problems.length).fill([]),
        outputs: [],
        statement: "",
        input: "",
        output: "",
        title: "",
        show_success_alert: false,
        show_warning_alert: false,
        show_error_alert: false,
        point: 0,
    }),
    mounted() {
        if (this.allocated) {
            this.update(this.id);
        }
    },
}
</script>

<style>

</style>