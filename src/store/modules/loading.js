/* eslint-disable no-console */

export const namespaced = true;

export const state = {
  isLoading: false
};

export const mutations = {
  SET_LOADING_STATUS(state, status) {
    state.isLoading = status;
  }
};

export const actions = {
  setLoadingStatus({ commit }, status) {
    commit("SET_LOADING_STATUS", status);
  }
};
