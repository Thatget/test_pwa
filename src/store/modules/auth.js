const initialState = {
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
  shopifyDomain: '',
  locale: '',
  languages: '',
  email: '',
}
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setAuth({ commit }, isAuth) {
      commit('setAuth', isAuth);
    },
    setShopifyDomain({commit}, shopifyDomain) {
      commit('setShopifyDomain',shopifyDomain)
    },
    setLocale({commit}, locale) {
      commit('setLocale', locale)
    },
    setLanguages({commit}, languages) {
      commit('setLanguages', languages)
    },
    setEmail({commit}, email) {
      commit('setEmail', email)
    }
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token.accessToken;
      if (token.refreshToken) {
        state.refreshToken = token.refreshToken;
      }
    },
    setAuth(state, isAuth) {
      state.isAuthenticated = isAuth;
    },
    setShopifyDomain(state, shopifyDomain) {
      state.shopifyDomain = shopifyDomain;
    },
    setLocale(state, locale) {
      state.locale = locale
    },
    setLanguages(state, languages) {
      state.languages = languages
    },
    setEmail(state, email) {
      state.email = email
    }
  }
};