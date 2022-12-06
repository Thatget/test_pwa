import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { data } from "./modules/data";

const store = createStore({
  modules: {
    auth,
    data
  },
});
export default store;