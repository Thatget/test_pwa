<template>
  <div>
    <div class="d-flex" v-if="!redirecting">
      <div class="col w-100" >
        <div class="d-none align-items-center justify-content-start d-lg-flex bg-white border-bottom w-100 ps-4" style="position: fixed; height: 41px; z-index: 4; font-size: 14px;">
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/storeFAQs" active-class="actived-menu" exact class="hover-color not-actived-menu text-color-secondary text-decoration-none mx-2 px-3 d-flex align-items-center">
            <i class="fas fa-comments pe-2"></i>
            <span>FAQs</span>
          </router-link>
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/categories" active-class="actived-menu" class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex align-items-center">
            <i class="fas fa-th-large pe-2"></i>
            <span>Categories</span>
          </router-link>
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/design" active-class="actived-menu" class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex align-items-center">
            <i class="fas fa-pager pe-2"></i>
            <span>Design</span>
          </router-link>
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/setting" class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex align-items-center" active-class="actived-menu">
            <i class="fas fa-cogs pe-2"></i>
            <span>Setting</span>
          </router-link>
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/products-faqs" active-class="actived-menu" exact class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex align-items-center">
            <i class="fas fa-tags pe-2"></i>
            <span>Products FAQs</span>
          </router-link>
          <router-link style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" to="/message" active-class="actived-menu" class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex hover-color align-items-center text-black" >
            <i class="fa-solid fa-envelope-open-text pe-2"></i>
            <span>Widget</span>
          </router-link>
          <div @click="contact" style="cursor:pointer;padding-bottom: 7px; padding-top: 9px" class="hover-color not-actived-menu text-decoration-none text-color-secondary mx-2 px-3 d-flex hover-color align-items-center text-black">
            <div style="height: 12px; width: 12px; border-radius: 50%; background-color: #0ade57;" class="me-1"></div>
            <span style="font-weight: 500">Live chat</span>
          </div>
          <a style="font-weight: 500;padding-bottom: 7px; padding-top: 9px" class="hover-color d-flex align-items-center text-color-secondary mx-2 px-3 text-decoration-none" target="_blank" :href="`https://${shopifyDomain}/apps/faqs`">
            <i class="fas fa-eye"></i>
            <div class="ps-2">View FAQs page</div>
          </a>
        </div>
        <div v-if="checkEmbededApp" class="d-flex align-items-center bg-white justify-content-between d-lg-none text-dark border-bottom w-100" style="position: fixed;  z-index: 99999999; height: 41px">
          <div class="dropdown">
            <i class="fas fa-bars fs-2 ms-2 p-2 d-flex align-items-center" style="height: 40px" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu p-0 w-100" aria-labelledby="dropdownMenuLink" style="min-width: 100vw; z-index: 1000;height: calc(100vh - 41px);; border: none; border-radius: none; font-size: 14px; inset: -1px auto auto 0px !important">
              <router-link style="border-color:red" to="/storeFAQs" active-class="actived" exact class="text-dark hover-color text-decoration-none w-100 p-3 border-top d-flex align-items-center">
                <i class="fas fa-comments pe-2"></i>
                <span>FAQs</span>
              </router-link>
              <router-link style="border-color:red" to="/categories" active-class="actived" class="text-decoration-none text-dark hover-color w-100 p-3 border-top d-flex align-items-center">
                <i class="fas fa-th-large pe-2"></i>
                <span>Categories</span>
              </router-link>
              <router-link style="border-color:red" to="/design" active-class="actived" class="text-decoration-none text-dark hover-color w-100 p-3 border-top d-flex align-items-center">
                <i class="fas fa-pager pe-2"></i>
                <span>Design</span>
              </router-link>
              <router-link style="border-color:red" to="/setting" class="text-decoration-none text-dark hover-color w-100 p-3 border-top d-flex align-items-center" active-class="actived">
                <i class="fas fa-cogs pe-2"></i>
                <span>Setting</span>
              </router-link>
              <router-link style="border-color:red" to="/products-faqs" active-class="actived" exact class="text-decoration-none text-dark hover-color w-100 p-3 border-top d-flex align-items-center">
                <i class="fas fa-tags pe-2"></i>
                <span>Products FAQs</span>
              </router-link>
              <router-link style="border-color:red" to="/message" active-class="actived" class="text-decoration-none text-dark hover-color w-100 p-3 border-top d-flex align-items-center">
                <i class="fa-solid fa-envelope-open-text pe-2"></i>
                <span>Widget</span>
              </router-link>
              <div @click="contact" style="cursor:pointer" class="hover-color border-top not-actived-menu text-decoration-none text-color-secondary p-3 d-flex hover-color align-items-center text-black">
                <div style="height: 12px; width: 12px; border-radius: 50%; background-color: #0ade57;" class="me-2"></div>
                <span>Live chat</span>
              </div>
              <a class="d-flex text-decoration-none text-dark hover-color align-items-center p-3 border-top border-bottom" target="_blank" :href="`https://${shopDomain}/apps/faqs`">
                <i class="fas fa-eye"></i>
                <span class="ps-2">View FAQs page</span>
              </a>     
            </ul>
          </div>
        </div>
        <router-view :checkEmbededApp="checkEmbededApp" style="z-index: 0"/>
      </div>
    </div>
    <div v-else style="height: 100vh; width: 100vw" class="d-flex align-items-center justify-content-center flex-column">
      <div>
        <img src="../../public/Logo-App.png" style="height: 50px; border-radius: 8px" class="mb-4">
      </div>
      <div>
        <h2 class="text-color-primary" style="font-weight:800">Professional FAQ</h2>
      </div>
      <div class="loader loader--style8 d-flex align-items-center justify-content-center">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <rect x="0" y="50" width="4" height="10" fill="#FF6700" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="8" y="50" width="4" height="10" fill="#FF6700"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="16" y="50" width="4" height="10" fill="#FF6700"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
        <span class="fs-5 text-color-primary ps-2">Redirecting...</span>
      </div>
    </div>    
  </div>
</template>

<script>
import { ref  } from 'vue';
import store from '../store';
// import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

export default {
  computed: {
    shopifyDomain () {
      return store.state.auth.shopifyDomain
    },
    faqPageUrl () {
      return store.state.data.settings['faq_page_url']
    }
  },
  setup() {
    const redirecting = ref(false)
    const user = ref([])
    const locales = ref([])
    const locale = ref()
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    const checkEmbededApp = ref(true)
    // const backendLink = process.env.VUE_APP_BACKEND_LINK
    // if (isShopifyEmbedded()) {
    //   checkEmbededApp.value = true
    //   redirecting.value = false
    // }
    // else {
    //   redirecting.value = true
    //   if(localStorage.getItem('yanet-isAuthenticated') === 'true' && localStorage.getItem('yanet-shopify-domain')){
    //     location.href = backendLink+"?shop="+localStorage.getItem('yanet-shopify-domain')
    //   }
    //   checkEmbededApp.value = false
    // }
    const contact = () => {
      if(document.getElementsByClassName('cc-dc5e')[0]){
        document.getElementsByClassName('cc-dc5e')[0].click()
      }
      else{
        let user_nickname = `[FAQ]${shopDomain.value}`
        window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
      }
    }

    return {
      contact,
      redirecting,
      checkEmbededApp,
      shopDomain,
      locale,
      locales,
      user,
    }
  },
  async created() {
  }
};

</script>

<style>
</style>