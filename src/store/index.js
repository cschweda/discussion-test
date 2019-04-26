import Vue from "vue";
import Vuex from "vuex";

import * as auth from "@/store/modules/auth";
import * as comments from "@/store/modules/comments";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    comments
  }
});

export default store;
