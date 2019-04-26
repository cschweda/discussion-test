import client from "@/services/client.js";

export const namespaced = true;

export const state = {
  client,
  isLoggedIn: false,
  role: ""
};

export const mutations = {
  LOGIN(state) {
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.role = "";
    client.logout();
  },
  SET_ROLE(state, payload) {
    state.role = payload;
  }
};

export const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      client.login(user).then(
        res => {
          commit("LOGIN");
          commit("SET_ROLE", res.data.user.role.name);
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
