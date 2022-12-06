const initialState = {
  faqs: [],
  settings: [],
  categories: [],
  all_categories: [],
  template_setting:[],
  all_template: [],
  all_product: [],
  faq_product: [],
  faq_messages_setting: [],
  faq_messages: [],
  faq_more_page: [],
  faq_more_page_setting: [],
  user: [],
  all_faqs: [],
  admin_account: {
    user_name: 'faqadmin',
    password: 'faq@yanet2022',
  },
  product_data: [],
  adminIsAuthenticated : true,
  rating_data: {},
  faq_more_page_setting_create:{
    home_page_visible: false,
    cms_page_visible : false,
    cart_page_visible : false, 
    collection_page_visible : false,
    product_page_visible : false,
    active_feature: false,
    active_template: true,
  },
  template_1: {
    yanet_logo_visible: true,
    category_sort_name: false,
    status : true,
    faq_sort_name: false,
    dont_category_faq: false,
    show_page_title: true,
    show_intro_text: true,
    show_footer_text : true,
    faq_page_url:'apps/faqs',
    show_page_construction: false,
    page_title_content: `[{"content":"Frequently Asked Questions","locale":"default"}]`,
    intro_text_content: `[{"content":"Check most frequently asked questions here","locale":"default"}]`,
    footer_text_content: `[{"content":"Thanks for visiting our page!","locale":"default"}]`,
    search_placehoder: `[{"content":"What can we help you with?","locale":"default"}]`,
    page_under_contruction: `[{"content":"Page is under construction","locale":"default"}]`,
    search_not_found: `[{"content":"Oops, your search did not match any FAQs","locale":"default"}]`,
    template_number: 1,
    faq_template_number: 1,
    width_faqs_accordian: 1180,
    faq_font_color: "#000000",
    faq_font_size: 20,
    faq_font_weight: "bold",
    faq_font_family: "unset",
    faq_hover_color: "",
    category_font_color: "#000000",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "unset",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#000000",
    answer_bg_color: "",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 300,
    banner_visible: true,
    banner_default:'banner-default-1.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#ffffff',
    page_title_paddingtop: 14,
    page_title_fontsize: 36,
    page_title_paddingbottom: 14,
    page_title_color: '#ffffff',
    search_input_style: 1,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    show_category_bar: true,
    intro_text_font: 'unset',
    footer_text_font: 'unset',
    search_placeholder_font: 'unset',
    page_title_font: 'unset',
    page_background_color: '#ffffff',
    micro_scope_color: '#000000',
    placeholder_color: '#000000',
    category_bar_number: 1,
    category_bar_background: "#f6f6f7",
    category_bar_color: "#000000",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false,
  },
  template_2: {
    yanet_logo_visible: true,
    category_sort_name: false,
    status : true,
    faq_sort_name: false,
    dont_category_faq: false,
    show_page_title: true,
    show_intro_text: true,
    show_footer_text : true,
    faq_page_url:'apps/faqs',
    show_page_construction: false,
    page_title_content: `[{"content":"Frequently Asked Questions","locale":"default"}]`,
    intro_text_content: `[{"content":"Check most frequently asked questions here","locale":"default"}]`,
    footer_text_content: `[{"content":"Thanks for visiting our page!","locale":"default"}]`,
    search_placehoder: `[{"content":"What can we help you with?","locale":"default"}]`,
    page_under_contruction: `[{"content":"Page is under construction","locale":"default"}]`,
    search_not_found: `[{"content":"Oops, your search did not match any FAQs","locale":"default"}]`,
    template_number: 2,
    faq_template_number: 2,
    width_faqs_accordian: 1180,
    faq_font_color: "#ffffff",
    faq_font_size: 16,
    faq_bg_color: "#0368a2",
    faq_font_weight: "normal",
    faq_font_family: "unset",
    faq_hover_color: "#02517d",
    category_font_color: "#000000",
    category_font_size: 16,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "unset",
    category_text_align: "left",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#000000",
    answer_bg_color: "#eeeeee",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 300,
    banner_visible: true,
    banner_default:'banner-default-2.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#ffffff',
    page_title_paddingtop: 14,
    page_title_fontsize: 36,
    page_title_paddingbottom: 14,
    page_title_color: '#ffffff',
    search_input_style: 1,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    show_category_bar: true,
    intro_text_font: 'unset',
    footer_text_font: 'unset',
    search_placeholder_font: 'unset',
    page_title_font: 'unset',
    page_background_color: '#ffffff',
    micro_scope_color: '#000000',
    placeholder_color: '#000000',
    category_bar_number: 1,
    category_bar_background: "#f6f6f7",
    category_bar_color: "#000000",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false,
  },
  template_3: {
    template_number: 3,
    faq_template_number: 3,
    width_faqs_accordian: 1280,
    faq_font_color: "#696969",
    faq_font_size: 20,
    faq_font_weight: "normal",
    faq_font_family: "unset",
    category_font_color: "#696969",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "uppercase",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#696969",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 300,
    banner_visible: true,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#ffffff',
    page_title_paddingtop: 14,
    page_title_fontsize: 36,
    page_title_paddingbottom: 14,
    page_title_color: '#ffffff',
    search_input_style: 1,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: true,
    page_background_color: '#ffffff',
    micro_scope_color: '#696969',
    placeholder_color: '#696969',
    category_bar_number: 1,
    category_bar_background: "#cccccc",
    category_bar_color: "#000000",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false
  },
  template_4: {
    template_number: 4,
    faq_template_number: 4,
    width_faqs_accordian: 1080,
    faq_font_color: "#195f71",
    faq_font_size: 20,
    faq_font_weight: "normal",
    faq_font_family: "unset",
    category_font_color: "#195f71",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "uppercase",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#195f71",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 300,
    banner_visible: false,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#195f71',
    page_title_paddingtop: 40,
    page_title_fontsize: 36,
    page_title_paddingbottom: 40,
    page_title_color: '#195f71',
    search_input_style: 2,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#195f71',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: true,
    page_background_color: '#ffffff',
    micro_scope_color: '#195f71',
    placeholder_color: '#195f71',
    category_bar_number: 2,
    category_bar_background: "#195f71",
    category_bar_color: "#195f71",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false
  },
  template_5: {
    template_number: 5,
    faq_template_number: 5,
    width_faqs_accordian: 1080,
    faq_font_color: "#000000",
    faq_font_size: 20,
    faq_font_weight: "normal",
    faq_font_family: "unset",
    faq_bg_color: "#ffffff",
    category_font_color: "#000000",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "uppercase",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#000000",
    answer_font_family: "unset",
    answer_bg_color: "#ffffff",
    custom_css: '',
    banner_height: 260,
    banner_visible: false,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#000000',
    page_title_paddingtop: 20,
    page_title_fontsize: 36,
    page_title_paddingbottom: 20,
    page_title_color: '#000000',
    search_input_style: 2,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: true,
    page_background_color: '#e9f3f6',
    micro_scope_color: '#000000',
    placeholder_color: '#000000',
    category_bar_number: 2,
    category_bar_background: "#ffffff",
    category_bar_color: "#000000",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false
  },
  template_6: {
    template_number: 6,
    faq_template_number: 6,
    width_faqs_accordian: 1080,
    faq_font_color: "#fe8181",
    faq_font_size: 20,
    faq_font_weight: "normal",
    faq_font_family: "unset",
    faq_hover_color: "#000000",
    category_font_color: "#fe8181",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "uppercase",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#fe8181",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 300,
    banner_visible: false,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#fe8181',
    page_title_paddingtop: 20,
    page_title_fontsize: 36,
    page_title_paddingbottom: 20,
    page_title_color: '#fe8181',
    search_input_style: 2,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#fe8181',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: true,
    page_background_color: '#ffffff',
    micro_scope_color: '#fe8181',
    placeholder_color: '#fe8181',
    category_bar_number: 2,
    category_bar_background: "#ffffff",
    category_bar_color: "#fe8181",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false
  },
  template_7: {
    template_number: 7,
    faq_template_number: 7,
    width_faqs_accordian: 1080,
    faq_font_color: "#000000",
    faq_font_size: 20,
    faq_font_weight: "bold",
    faq_font_family: "unset",
    category_font_color: "#000000",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "uppercase",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#000000",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 210,
    banner_visible: false,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#000000',
    page_title_paddingtop: 20,
    page_title_fontsize: 50,
    page_title_paddingbottom: 20,
    page_title_color: '#000000',
    search_input_style: 2,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: false,
    page_background_color: '#ffffff',
    micro_scope_color: '#000000',
    placeholder_color: '#000000',
    category_bar_number: 2,
    category_bar_background: "#ffffff",
    category_bar_color: "#000000",
    btn_top_background: "#000000",
    btn_top_hover: "#383838",
    btn_top_visible: false
  },
  template_8: {
    template_number: 8,
    faq_template_number: 8,
    width_faqs_accordian: 1080,
    faq_font_color: "#000000",
    faq_font_size: 18,
    faq_font_weight: "bold",
    faq_font_family: "unset",
    category_font_color: "#000000",
    category_font_size: 24,
    category_font_weight: "bold",
    category_font_family: "unset",
    category_text_style: "capitalize",
    category_text_align: "center",
    answer_font_size: 16,
    answer_font_weight: "normal",
    answer_font_color: "#000000",
    answer_font_family: "unset",
    custom_css: '',
    banner_height: 210,
    banner_visible: false,
    banner_default:'banner-default-3.png',
    intro_text_paddingtop: 10,
    intro_text_fontsize: 16,
    intro_text_paddingbottom: 10,
    intro_text_color: '#000000',
    page_title_paddingtop: 40,
    page_title_fontsize: 44,
    page_title_paddingbottom: 40,
    page_title_color: '#000000',
    search_input_style: 2,
    footer_text_paddingtop: 10,
    footer_text_fontsize: 16,
    footer_text_paddingbottom: 10,
    footer_text_color: '#000000',
    show_search_input: true,
    page_title_font:"unset",
    intro_text_font:"unset",
    search_placeholder_font:"unset",
    footer_text_font:"unset",
    show_category_bar: true,
    page_background_color: '#ffffff',
    micro_scope_color: '#000000',
    placeholder_color: '#000000',
    category_bar_number: 2,
    category_bar_background: "#ff8200",
    category_bar_color: "#000000",
    btn_top_background: "#ff8200",
    btn_top_hover: "#fea648",
    btn_top_visible: false
  },
}
export const data = {
  namespaced: true,
  state: initialState,
  actions: {
    setFaqsData({ commit }, faqs) {
      commit('setFaqsData', faqs)
    },
    
    setAllFaqsData({ commit }, all_faqs) {
      commit('setAllFaqsData', all_faqs)
    },

    setCategoriesData({ commit }, categories) {
      commit('setCategoriesData', categories);
    },

    setAllCategoriesData({ commit }, all_categories) {
      commit('setAllCategoriesData', all_categories);
    },

    setSettingsData({commit}, settings) {
      commit('setSettingsData',settings)
    },

    setTemplateData({commit}, template_setting) {
      commit('setTemplateData', template_setting)
    },

    setAllTemplateData({commit}, all_template) {
      commit('setAllTemplateData', all_template)
    },

    setProductsData({commit}, all_product) {
      commit('setProductsData', all_product)
    },

    setProductShopify({commit}, product_data) {
      commit('setProductShopify', product_data)
    },
    
    setFaqProductData({commit}, faq_product) {
      commit('setFaqProductData', faq_product)
    },

    setFaqMessagesData({commit}, faq_messages) {
      commit('setFaqMessagesData', faq_messages)
    },

    setFaqMessagesSetting({commit}, faq_messages_setting) {
      commit('setFaqMessagesSetting', faq_messages_setting)
    },

    setFaqMorePage({commit}, faq_more_page) {
      commit('setFaqMorePage', faq_more_page)
    },

    setFaqMorePageSetting({commit}, faq_more_page_setting) {
      commit('setFaqMorePageSetting', faq_more_page_setting)
    },

    setUserData({commit}, user) {
      commit('setUserData', user)
    },

    setTemplate1({commit}, template_1) {
      commit('setTemplate1', template_1)
    },

    setTemplate2({commit}, template_2) {
      commit('setTemplate2', template_2)
    },

    setTemplate3({commit}, template_3) {
      commit('setTemplate3', template_3)
    },

    setTemplate4({commit}, template_4) {
      commit('setTemplate4', template_4)
    },

    setTemplate5({commit}, template_5) {
      commit('setTemplate5', template_5)
    },

    setTemplate6({commit}, template_6) {
      commit('setTemplate6', template_6)
    },
    setTemplate7({commit}, template_7) {
      commit('setTemplate7', template_7)
    },
    setTemplate8({commit}, template_8) {
      commit('setTemplate7', template_8)
    },

    setRatingData({commit}, rating_data) {
      commit('setRatingData', rating_data)
    },
    setAdminAuth({commit}, adminIsAuthenticated) {
      commit('setAdminAuth', adminIsAuthenticated)
    },
  },
  mutations: {
    setFaqsData(state, faqs) {
      state.faqs = faqs;
    },
    setAllFaqsData(state, all_faqs) {
      state.all_faqs = all_faqs;
    },
    setCategoriesData(state, categories) {
      state.categories = categories;
    },
    setAllCategoriesData(state, all_categories) {
      state.all_categories = all_categories;
    },
    setSettingsData(state, settings) {
      state.settings = settings;
    },
    setTemplateData(state, template_setting) {
      state.template_setting = template_setting
    },
    setAllTemplateData(state, all_template) {
      state.all_template = all_template
    },
    setProductsData(state, all_product) {
      state.all_product = all_product
    },
    setProductShopify(state, product_data) {
      state.product_data = product_data
    },
    setFaqProductData(state, faq_product) {
      state.faq_product = faq_product
    },
    setFaqMessagesData(state, faq_messages) {
      state.faq_messages = faq_messages
    },
    setFaqMessagesSetting(state, faq_messages_setting) {
      state.faq_messages_setting = faq_messages_setting
    },
    setFaqMorePage(state, faq_more_page) {
      state.faq_more_page = faq_more_page
    },
    setFaqMorePageSetting(state, faq_more_page_setting) {
      state.faq_more_page_setting = faq_more_page_setting
    },
    setUserData(state, user) {
      state.user = user
    },
    setTemplate1(state, template_1) {
      state.template_1 = template_1
    },
    setTemplate2(state, template_2) {
      state.template_2 = template_2
    },
    setTemplate3(state, template_3) {
      state.template_3 = template_3
    },
    setTemplate4(state, template_4) {
      state.template_4 = template_4
    },
    setTemplate5(state, template_5) {
      state.template_5 = template_5
    },
    setTemplate6(state, template_6) {
      state.template_6 = template_6
    },
    setTemplate7(state, template_7) {
      state.template_7 = template_7
    },
    setTemplate8(state, template_8) {
      state.template_8 = template_8
    },
    setRatingData(state, rating_data) {
      state.rating_data = rating_data
    },
    setAdminAuth(state, adminIsAuthenticated) {
      state.adminIsAuthenticated = adminIsAuthenticated
    },
  }
};