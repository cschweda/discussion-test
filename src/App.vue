<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title
        class="headline text-uppercase"
        style="font-weight: 700;"
      >
        <span>{{ config.meta.title }}</span
        >&nbsp;
        <span class="font-weight-light">{{ config.meta.subtitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="heavy">Home</v-btn>
      <v-btn to="/about" class="heavy">About</v-btn>
      <v-btn to="/contact" class="heavy">Contact</v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import config from "@/config";
export default {
  name: "App",
  components: {},
  data() {
    return {
      config
    };
  }
};
</script>
<style>
.heavy {
  font-weight: 700 !important;
}
</style>
