<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>MATH IS TRUTH</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>YOUR SCORE: {{ storage.getItem('score') }}</span>
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
            <v-list-item-title><a :href="'/judge/' + problem.id">{{ problem.title + ` (${ problem.point }pt)` }}</a></v-list-item-title>
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
import Main from './views/Main';
import problems from './assets/problems.json';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: function() {
    return {
    id: 0,
    storage: localStorage,
    probs: problems,
    drawer: false,
    group: null,
    };
  },
  methods: {
    update: function(id) {
      this.id = id;
      this.$refs.main.changeId(id);
    },
  },
  mounted() {
    this.update(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.update(to.params.id);
    next();
  }
};
</script>
