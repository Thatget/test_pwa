import { createStore } from 'vuex'

export default createStore({
  state: {
    textSearch: '',
    category: '',
    customerToken: '',
    showProductDetail: false,
    error: {
      type: '',
      message: ''
    }
  },
  mutations: {
    setTextSearch (state, text) {
      state.textSearch = text
    },
    setCategoryId (state, text) {
      state.category = text
    },
    SET_CUSTOMER_TOKEN (state, text) {
      state.customerToken = text
    },
    setError (state, error) {
      state.error = error
    },
    setShowProductDetail (state, text) {
      state.showProductDetail = text
    }
  },
  actions: {
    setCustomerToken ({ commit }, token) {
      commit('SET_CUSTOMER_TOKEN', token)
    }
  },
  modules: {
  }
})
