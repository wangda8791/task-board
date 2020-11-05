import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import { restoreState } from "./storageUtil";

Vue.use(Vuex);

const state = { ...restoreState() };

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
});
