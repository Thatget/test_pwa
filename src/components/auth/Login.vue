<template>
  <div>
    <div style="height: 100vh; width: 100vw" class="d-flex align-items-center justify-content-center flex-column">
      <div>
        <img src="./../../../public/Logo-App.png" style="height: 50px" class="mb-2">
      </div>
      <div>
        <h2 class="text-color-primary" style="font-weight:800">Professional FAQ</h2>
      </div>
      <div class="loader-login mt-3"></div>
    </div>
  </div>
</template>

<script>
import router from '../../router';
import { useRoute } from 'vue-router';
import UserDataService from "./../../services/UserDataService"
import { ref } from '@vue/reactivity'
import CategoryDataService from "./../../services/CategoryDataService";
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';
import store from "../../store";
import SettingDataService from "./../../services/SettingDataService";
import FaqMorePageSettingDataService from "./../../services/FaqMorePageSettingDataService";
import TemplateSettingDataService from "../../services/TemplateSettingDataService";

export default {
  setup() {
    const backendLink = process.env.VUE_APP_BACKEND_LINK
    const route = useRoute()
    const accessToken = ref() 
    const refreshToken = ref()
    const isAuthenticated = ref()
    const user = ref([])
    const locales = ref([])
    const locale = ref()
    const categories = ref([])
    const shopDomain = ref()
    const message = ref()
    const shopifyDomain = ref()
    const showLoadding = ref(false)
    const localeDefault = ref('default')
    const waitLogin = ref()
    const checkEmbededApp = ref()
    const allProduct = ref([])
    const faqMorePage = ref([])
    const faqMorePageSetting = ref()
    if (isShopifyEmbedded()) {
      checkEmbededApp.value = true
      console.log('aaa')
    } else {
      console.log('bbb')
      checkEmbededApp.value = false
    }
    const faqs_bu = ref([])
    const allFaqs = ref([])
    const categories_bu = ref([])
    const allCategory = ref([])
    const categoriesShow = ref([])

    const retrieveAllDataUser = async function() {
      if(route.query.accessToken) {
        accessToken.value = route.query.accessToken
        refreshToken.value = route.query.refreshToken
        store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
        await UserDataService.getAllDataUser(localeDefault.value)
        .then(async response => {
          if(response.data.data.user){
            await retrieveUser(response.data.data.user)

            if(response.data.data.setting.length > 0){
              store.dispatch('data/setSettingsData', response.data.data.setting[0]);
            }
            else{
              await createUserSettings()
            }

            if(response.data.data.category.length > 0){
              store.dispatch('data/setCategoriesData', response.data.data.category)
            }
            else{
              await retrieveCategory();
            }

            if(response.data.data.allCategory.length > 0){
              store.dispatch('data/setAllCategoriesData', response.data.data.allCategory)
            }

            if(response.data.data.faq.length > 0){
              faqs_bu.value = response.data.data.faq
              store.dispatch('data/setFaqsData', response.data.data.faq);
            }
            else{
              store.dispatch('data/setFaqsData', []);
            }

            if(response.data.data.allFaq.length > 0){
              allFaqs.value = response.data.data.allFaq
              store.dispatch('data/setAllFaqsData', response.data.data.allFaq);
              setFaqLocale()
            }
            else{
              store.dispatch('data/setAllFaqsData', []);
            }

            if(response.data.data.product.length > 0){
              allProduct.value = response.data.data.product
              store.dispatch('data/setProductsData', response.data.data.product)
            }
            else{
              store.dispatch('data/setProductsData', [])
            }

            if(response.data.data.faqMorePage.length > 0){
              faqMorePage.value = response.data.data.faqMorePage
              store.dispatch('data/setFaqMorePage', response.data.data.faqMorePage)
            }
            else{
              store.dispatch('data/setFaqMorePage', [])
            }

            if(response.data.data.faqMorePageSetting.length > 0){
              faqMorePageSetting.value = response.data.data.faqMorePageSetting[0]
              if((faqMorePage.value.length !== 0 || allProduct.value.length !== 0) && faqMorePageSetting.value.active_feature !== true){
                faqMorePageSetting.value.active_feature = true
                store.dispatch('data/setFaqMorePageSetting', faqMorePageSetting.value)
                await FaqMorePageSettingDataService.update(faqMorePageSetting.value.id, faqMorePageSetting.value)
                .then(response => {
                  const responseData = ref()
                  responseData.value = response.data
                })
                .catch(e => {
                  console.log(e)
                })
              }
              if(store.state.data.settings.faq_template_number !== 1){
                faqMorePageSetting.value.active_template = true
                store.dispatch('data/setFaqMorePageSetting', faqMorePageSetting.value)
                await FaqMorePageSettingDataService.update(faqMorePageSetting.value.id, faqMorePageSetting.value)
                .then(response => {
                  const responseData = ref()
                  responseData.value = response.data
                })
                .catch(e => {
                  console.log(e)
                })
              }
              store.dispatch('data/setFaqMorePageSetting', faqMorePageSetting.value)
            }
            else{            
              await retrieveFaqMorePageSetting();
            }

            if(response.data.data.rating){
              store.dispatch('data/setRatingData', response.data.data.rating)
            }
            else{
              store.dispatch('data/setRatingData', [])
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
        if(!accessToken.value){
          isAuthenticated.value = 'false'
          store.dispatch('auth/setAuth', false)
          return
        } 
        else {
          isAuthenticated.value = 'true'
          store.dispatch('auth/setAuth', true)
          showLoadding.value = true
          router.push({
            path: "/storeFAQs",
          })
        }     
      }
      else if(store.state.auth.accessToken){
        router.push({
          path: "/storeFAQs",
        })
      }
    }

    const retrieveUser = async function(user_data) {
      waitLogin.value = true
      if(accessToken.value) {
        user.value = user_data;
        store.dispatch('data/setUserData', user.value)
        shopDomain.value = user.value.shopify_domain
        store.dispatch('auth/setShopifyDomain', shopDomain.value)
        store.dispatch('auth/setEmail', user.value.email)
        locales.value = JSON.parse(user.value.shopLocales).shopLocales
        for(let i = 0; i < locales.value.length; i++) {
          if(!locales.value[i].language){
            const language = ref()
            language.value = new Intl.DisplayNames([locales.value[i].locale], { type: 'language' })
            locales.value[i]['language'] = await language.value.of([locales.value[i].locale])
          }
          if(locales.value[i].primary === true){
            locale.value = locales.value[i].locale
            store.dispatch('auth/setLocale', locale.value);
          }
        }
        store.dispatch('auth/setLanguages', JSON.stringify(locales.value));      }
      else {
        return
      }
    };

    const createUserSettings = async function() {
      const template_1 = store.state.data.template_1
      const template_2 = store.state.data.template_2
      const template_3 = store.state.data.template_3
      const template_4 = store.state.data.template_4
      const template_5 = store.state.data.template_5
      const template_6 = store.state.data.template_6
      const template_7 = store.state.data.template_7
      const template_8 = store.state.data.template_8
      await SettingDataService.create(template_1)
        .then(async response => {
          const id = ref()
          id.value = response
          await SettingDataService.update(template_3)
          .then(async response => {
            const id = ref()
            id.value = response
            await SettingDataService.update(template_4)
            .then(async response => {
              const id = ref()
              id.value = response
              await SettingDataService.update(template_5)
              .then(async response => {
                const id = ref()
                id.value = response
                await SettingDataService.update(template_6)
                .then(async response => {
                  const id = ref()
                  id.value = response
                  await SettingDataService.update(template_7)
                  .then(async response => {
                    const id = ref()
                    id.value = response
                    await SettingDataService.update(template_8)
                    .then(async response => {
                      const id = ref()
                      id.value = response
                      await SettingDataService.update(template_2)
                      .then(async response => {
                        const id = ref()
                        id.value = response
                        await retrieveSetting()
                      })
                      .catch(e => {
                        const id = ref()
                        id.value = e
                      });
                    })
                    .catch(e => {
                      const id = ref()
                      id.value = e
                    });
                  })
                  .catch(e => {
                    const id = ref()
                    id.value = e
                  });
                })
                .catch(e => {
                  const id = ref()
                  id.value = e
                });
              })
              .catch(e => {
                const id = ref()
                id.value = e
              });
            })
            .catch(e => {
              const id = ref()
              id.value = e
            });
          })
          .catch(e => {
            const id = ref()
            id.value = e  
          });
        })
        .catch(e => {
          const id = ref()
          id.value = e
        });
    };

    const setFaqLocale = function(){
      const listLocale = ref([])
      const localesInfo = ref([])
      if(faqs_bu.value.length > 0){
        for(let i = 0; i < faqs_bu.value.length; i++){
          listLocale.value = []
          allFaqs.value.forEach(element => {
            if(faqs_bu.value[i].identify === element.identify && faqs_bu.value[i].category_identify === element.category_identify){
              if(!listLocale.value.some(item => { return item === element.locale })){
                listLocale.value.push(element.locale)
              }
            }
          })
          localesInfo.value = []
          // locales.value = JSON.parse(store.state.auth.languages)
          locales.value.forEach(element => {
            if(listLocale.value.some(item => { return element.locale === item })){
              localesInfo.value.push({
                locale: element.locale,
                added: true,
                language: element.language
              })
            }
            else{
              localesInfo.value.push({
                locale: element.locale,
                added: false,
                language: element.language
              })
            }
          })
          faqs_bu.value[i].locale_info = localesInfo.value
        }
      }
      store.dispatch('data/setFaqsData', faqs_bu.value);
    }

    const retrieveSetting = async function() {
      await SettingDataService.get()
      .then(response => {
        store.dispatch('data/setSettingsData', response.data);
      })
      .catch(async e => {
        await createUserSettings()
        console.log(e);
      });
    }

    const login = function() {
      if(shopifyDomain.value === '' || shopifyDomain.value === undefined){
        message.value = 'Please enter shop name !'
        return
      }
      waitLogin.value = true
      showLoadding.value = true
      location.href = backendLink+"?shop="+shopifyDomain.value+".myshopify.com"
    }

    const changeStore = function(){
      message.value = ''
      if(shopifyDomain.value === '' || shopifyDomain.value === undefined){
        message.value = 'Please enter shop name !'
      }
    }

    const retrieveCategory = async () => {
      const data = {
        locale: localeDefault.value,
        identify: 'Uncategorized1',
        title: "Uncategorized",
        description: "FAQs Uncategorized",
        is_visible: true,
        feature_category: false
      }
      categories.value.push(data)
      await CategoryDataService.create(data)
      .then(response => {
        const id = ref()
        id.value = response
        store.dispatch('data/setCategoriesData', categories.value)
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    }

    const retrieveFaqMorePageSetting = async function(){
      const data = store.state.data.faq_more_page_setting_create
      await FaqMorePageSettingDataService.create(data)
      .then(async response => {
        const id = ref()
        id.value = response
        store.dispatch('data/setFaqMorePageSetting', data)
      })
      .catch(e => {
        console.log(e)
      })
    }

    const setCategoryLocale = function(){
      categories_bu.value = store.state.data.categories
      allCategory.value = store.state.data.all_categories
      const listLocale = ref([])
      const localesInfo = ref([])
      if(categories_bu.value){
        for(let i = 0; i < categories_bu.value.length; i++){
          listLocale.value = []
          allCategory.value.forEach(element => {
            if(categories_bu.value[i].identify === element.identify){
              if(!listLocale.value.some(item => { return item === element.locale })){
                listLocale.value.push(element.locale)
              }
            }
          })
          const countFaqs = ref()
          countFaqs.value = faqs_bu.value.filter(item => {
            return item.category_identify === categories_bu.value[i].identify
          }).length
          
          localesInfo.value = []
          locales.value.forEach(element => {
            if(listLocale.value.some(item => { return element.locale === item })){
              localesInfo.value.push({
                locale: element.locale,
                added: true,
                language: element.language
              })
            }
            else{
              localesInfo.value.push({
                locale: element.locale,
                added: false,
                language: element.language
              })
            }
          })
          categories_bu.value[i].locale_info = localesInfo.value
          categories_bu.value[i].count_faqs = countFaqs.value
          categories.value = categories_bu.value
        }
        categoriesShow.value = categories_bu.value
        store.dispatch('data/setAllCategoriesData', categoriesShow.value)
      }
    }

    const rereiveAllTemplate = async () => {
      await TemplateSettingDataService.get(store.state.data.settings.id)
      .then(async response => {
        if(response.data.length < 4){
          store.state.data.template_4.setting_id = store.state.data.settings.id
          store.state.data.template_5.setting_id = store.state.data.settings.id
          store.state.data.template_6.setting_id = store.state.data.settings.id
          store.state.data.template_7.setting_id = store.state.data.settings.id
          store.state.data.template_8.setting_id = store.state.data.settings.id
          response.data.push(store.state.data.template_4)
          response.data.push(store.state.data.template_5)
          response.data.push(store.state.data.template_6)
          response.data.push(store.state.data.template_7)
          response.data.push(store.state.data.template_8)
          await TemplateSettingDataService.create(store.state.data.template_4)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
          await TemplateSettingDataService.create(store.state.data.template_5)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
          await TemplateSettingDataService.create(store.state.data.template_6)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
        }
        if(response.data.length === 4){
          store.state.data.template_5.setting_id = store.state.data.settings.id
          response.data.push(store.state.data.template_5)
          await TemplateSettingDataService.create(store.state.data.template_5)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
        }
        if(response.data.length === 5){
          store.state.data.template_6.setting_id = store.state.data.settings.id
          response.data.push(store.state.data.template_6)
          await TemplateSettingDataService.create(store.state.data.template_6)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
        }
        if(response.data.length === 6){
          store.state.data.template_7.setting_id = store.state.data.settings.id
          response.data.push(store.state.data.template_7)
          await TemplateSettingDataService.create(store.state.data.template_7)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
        }
        if(response.data.length === 7){
          store.state.data.template_8.setting_id = store.state.data.settings.id
          response.data.push(store.state.data.template_8)
          await TemplateSettingDataService.create(store.state.data.template_8)
          .then(response => {
            const responseData = ref()
            responseData.value = response.data
          })
          .catch(e => {
            console.log(e)
          })
        }
        store.dispatch('data/setAllTemplateData', response.data)
      })
      .catch(e => {
        console.log(e)
      })
    }

    return {
      rereiveAllTemplate,
      setCategoryLocale,
      setFaqLocale,
      retrieveCategory,
      createUserSettings,
      waitLogin,
      checkEmbededApp,
      showLoadding,
      changeStore,
      message,
      shopifyDomain,
      shopDomain,
      login,
      retrieveUser,
      retrieveFaqMorePageSetting,
      retrieveAllDataUser
    } 
  },
  async created() {
    await this.retrieveAllDataUser()
    this.setCategoryLocale()
    await this.rereiveAllTemplate()
  },
}
 
</script>

<style>
  .loader-login {
    border: 6px solid #FF8200;
    border-radius: 50%;
    border-top: 6px solid #f6f6f7;
    border-bottom: 6px solid #f6f6f7;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 1.6s linear infinite;
    animation: spin 1.6s linear infinite;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>