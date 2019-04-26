import Vue from "vue";
import Vuex from "vuex";

import * as auth from "@/store/modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth
  }
});

export default store;
