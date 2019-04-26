/* eslint-disable no-console */
import client from "@/services/client.js";

export const namespaced = true;

export const state = {
  client,
  isLoggedIn: false,
  appInit: false,
  jwt: localStorage.getItem("jwt") || "",
  userMeta: JSON.parse(localStorage.getItem("userMeta")) || ""
};

export const mutations = {
  INIT_APP(state) {
    state.appInit = true;
  },
  LOGIN(state) {
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.jwt = "";
    state.userMeta = "";
    client.logout();
  }
};

export const actions = {
  appInit({ commit }) {
    if (state.jwt) {
      client.authorize(state.jwt).then(res => {
        console.log(res);
        commit("LOGIN");
        commit("INIT_APP");
      });
    } else {
      commit("INIT_APP");
    }
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      client.login(user).then(
        res => {
          commit("LOGIN");

          resolve(res);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  logout({ commit }) {
    commit("LOGOUT");
  }
};
