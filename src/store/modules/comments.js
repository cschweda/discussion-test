/* eslint-disable no-console */

export const namespaced = true;

export const state = {
  isCommentError: false,
  commentError: ""
};

export const mutations = {
  SET_COMMENT_ERROR(state, error) {
    state.commentError = error;
    state.isCommentError = true;
  },
  CLEAR_COMMENT_ERROR(state, error) {
    state.commentError = "";
    state.isCommentError = false;
  }
};

export const actions = {
  setCommentError({ commit }, error) {
    commit("SET_COMMENT_ERROR", error);
  },
  clearCommentError({ commit }) {
    commit("CLEAR_COMMENT_ERROR");
  }
};
