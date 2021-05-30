<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>MATH IS TRUTH</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>YOUR SCORE: {{ this.$root.score }}</span>
    </v-app-bar>
    <v-navigation-drawer
      v-model = "drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model = "group"
        >
          <v-list-item v-for="problem in probs.problems" :key="problem.id">
            <v-list-item-title @click="update(problem.id)">{{ problem.title + ` (${ problem.point }pt)` }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Main ref="main"/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';
import problems from './assets/problems.json';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    probs: problems,
    drawer: false,
    group: null,
  }),
  methods: {
    update: function(id) {
      this.$refs.main.changeId(id);
    },
  },
};
</script>
