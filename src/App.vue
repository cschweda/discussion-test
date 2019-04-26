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

      <v-btn v-if="isLoggedIn" class="heavy" @click="logout">Logout</v-btn>
    </v-toolbar>

    <v-content>
      <v-progress-linear
        :indeterminate="true"
        v-if="isLoading"
        style="margin: 0; padding: 0; margin-top: -3px;"
      ></v-progress-linear>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import config from "@/config";
import { EventBus } from "./event-bus.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      config
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    isLoading() {
      return this.$store.state.loading.isLoading;
    }
  },
  created() {
    if (!this.$store.state.appInit) {
      this.$store.dispatch("auth/appInit");
    }
  },
  mounted() {
    EventBus.$on("isLoading", status => {
      this.$store.dispatch("loading/setLoadingStatus", status);
    });
  }
};
</script>
<style>
.heavy {
  font-weight: 700 !important;
}
</style>
