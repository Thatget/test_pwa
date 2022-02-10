import { createStore } from 'vuex'

export default createStore({
  state: {
    textSearch: '',
    category: '',
    showProductDetail: false
  },
  mutations: {
    setTextSearch (state, text) {
      state.textSearch = text
    },
    setCategoryId (state, text) {
      state.category = text
    },
    setShowProductDetail (state, text) {
      state.showProductDetail = text
    }
  },
  actions: {
  },
  modules: {
  }
})
