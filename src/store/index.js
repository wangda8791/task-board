import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { restoreState } from "./storageUtil";

Vue.use(Vuex);

const state = { ...restoreState() };

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
});
