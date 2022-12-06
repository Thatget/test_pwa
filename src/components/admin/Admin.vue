<template>
  <div>
    <div v-if="loadData" style="height: 100vh; width: 100vw" class="d-flex align-items-center justify-content-center flex-column">
      <div>
        <img src="./../../../public/Logo-App.png" style="height: 50px" class="mb-2">
      </div>
      <div>
        <h2 class="text-color-primary" style="font-weight:800">FAQ ADMIN</h2>
      </div>
      <div class="loader-login mt-3"></div>
    </div>
    <div v-else class="py-3 px-4" style="position:relative">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="text-color-primary">ADMIN</h3>
        <div class="d-flex align-items-center fs-6 justify-content-center" style="flex: 1;">
          <router-link @click="hideMerchants = false" active-class="actived-menu"  to="/merchant" class="text-dark hover-color" style="text-decoration: none;">
            <i class="fa-solid fa-users"></i>
            Merchants
          </router-link>
          <router-link @click="hideMerchants = true" active-class="actived-menu"  to="/rating-suggest" class="text-dark hover-color ms-4" style="text-decoration: none;">
            <i class="fa-solid fa-star"></i>          
            Rating & Suggest
          </router-link>
        </div>
      </div>
      <router-view :rattingData="rattingData"/>
      <div v-if="!hideMerchants">
        <div class="fs-6 my-2 fw-bold d-flex align-items-center justify-content-between w-100">
          <div class="">
            <span>Total: {{ listUser.length }} merchant</span>
          </div>
          <div class="d-flex align-items-center">
            <label for="search-merchant">Search</label>
            <input type="email" class="form-control ms-3" @input="searchDomain" v-model="shopifyDomain" id="search-merchant" aria-describedby="emailHelp">
          </div>
        </div>
        <div class="fs-6 border bg-white product-scroll" style="border-radius: 10px; min-width: 1000px; overflow-x: auto;">
          <div class="d-flex align-items-center fw-bold text-center p-2" style="text-transform: uppercase;">
            <div style="width: 30px">Id</div>
            <div class="col-3">Domain</div>
            <div class="col">Product FAQ</div>
            <div class="col">Template</div>
            <div class="col">Logo Yanet</div>
            <div class="col-2">EMail</div>
            <div class="col-2">Install on</div>
            <div class="col-2">Action</div>
          </div>
          <div class="product-scroll" style="overflow-y: auto; max-height: 500px;">
            <div class="d-flex align-items-center text-center p-2  border-top" v-for="user in listUser" :key="user">
              <div style="width: 30px">{{ user.id }}</div>
              <div class="col-3">{{ user.shopify_domain }}</div>
              <div class="col">
                <div class="form-check form-switch d-flex justify-content-center">
                  <input :disabled="disableUpdate" class="form-check-input" v-model="user.active_feature" type="checkbox" @change="updateActiveFeature(user.id, user.active_feature, user.active_template)" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="col">
                <div class="form-check form-switch d-flex justify-content-center">
                  <input :disabled="disableUpdate" class="form-check-input" v-model="user.active_template" type="checkbox" @change="updateActiveFeature(user.id, user.active_template, user.active_feature)" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="col">
                <div class="form-check form-switch d-flex justify-content-center">
                  <input :disabled="disableUpdate" class="form-check-input" v-model="user.yanet_logo_visible" type="checkbox" @change="updateActiveLogo(user.id, user.yanet_logo_visible)" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="col-2">{{ user.email }}</div>
              <div class="col-2">{{ user.createdAt }}</div>
              <div class="col-2 d-flex align-items-center justify-content-center">
                <div>
                  <button class="btn btn-secondary p-2 me-2" @click="loginMerchant(user.shopify_domain)">Login</button>
                </div>
                <div>
                  <button class="btn btn-secondary p-2" data-bs-toggle="modal" :data-bs-target="`#exampleModal${user.id}`">CSS</button>
                </div>
                <div class="modal fade" :id="`exampleModal${user.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ user.shopify_domain }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-floating" v-if="user.custom_css">
                          <textarea class="form-control" v-model="user.custom_css.custom_css" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                          <label for="floatingTextarea2">Custom_css</label>
                        </div>                  
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="updateCustomCss()" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UserDataService from "./../../services/UserDataService"
import { ref } from '@vue/reactivity'
import FaqMorePageSettingDataService from "../../services/FaqMorePageSettingDataService";
import { inject } from 'vue'
import SettingDataService from "./../../services/SettingDataService";
import TemplateSettingDataService from "../../services/TemplateSettingDataService";
import { debounce } from 'vue-debounce';
import store from '../../store';
import { useRoute } from 'vue-router';
import router from '../../router';
import AdminDataService from './../../services/AdminDataService'
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

export default {
  setup(){
    const loadData = ref(true)
    const hideMerchants = ref()
    const route = useRoute()
    store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    store.dispatch('data/setAdminAuth', true)
    if (!isShopifyEmbedded() && route.query.accessToken) {
      if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('admin-accessToken', route.query.accessToken);
        } catch(e) {
          console.log(e)
        }
      } 
    } 
    const allSettings = ref([])
    const allTemplate = ref([])
    const shopifyDomain = ref()
    const toast = inject('$toast');
    const disableUpdate = ref()
    const listUser = ref([])
    const listFaqMorePageSetting = ref([])
    const listUserOrigin = ref([])
    const backendLink = process.env.VUE_APP_BACKEND_LINK
    const rattingData = ref([])
    const getAllDataAdmin = async () => {
      await AdminDataService.getAll()
      .then(async response => {
        rattingData.value = response.data.data.rating
        allSettings.value = response.data.data.setting   
        await retriveAllCustomCss() 
        listFaqMorePageSetting.value = response.data.data.faqMorePageSetting
        retriveAllUser(response.data.data.user)
      })
      .catch(() => {
        
      })
    }

    const retriveAllUser = async (user_data) => {
      listUser.value = user_data
      listUser.value.forEach(item => {
        let date = ''
        listFaqMorePageSetting.value.forEach(element => {
          if(item.id === element.user_id){
            item.active_feature = element.active_feature
            item.active_template = element.active_template
          }
        })
        allSettings.value.forEach(element => {
          if(item.id === element.user_id){
            item.yanet_logo_visible = element.yanet_logo_visible
          }
        })
        allTemplate.value.forEach(element => {
          if(item.id === element.user_id){
            item.custom_css = element
          }
        })
        date = new Date(item.createdAt).toString()
        item.createdAt = date.slice(0, date.indexOf('GMT'))
        listUserOrigin.value = listUser.value
      })
      router.push({
        path: "/merchant",
      })
      loadData.value = false    
    }

    const loginMerchant = (shopify_domain) => {
      window.open(backendLink + `/merchant?shop=${shopify_domain}`)
    }

    const searchDomain = () => {
      if(shopifyDomain.value == '' || shopifyDomain.value == undefined){
        listUser.value = listUserOrigin.value
      }
      else{
        listUser.value = listUserOrigin.value.filter((item)=>{
          return shopifyDomain.value.toLowerCase().split(' ').every(v => item.shopify_domain.toLowerCase().includes(v))
        })
      }
    }

    const updateActiveFeature = async (user_id, feature_active, template_active) => {
      const dataUpdate = ref([])
      disableUpdate.value = true
      listFaqMorePageSetting.value.forEach(item => {
        if(item.user_id === user_id){
          const data = {
            id: item.id,
            active_feature: feature_active,
            active_template: template_active,
            home_page_visible: item.home_page_visible,
            product_page_visible: item.product_page_visible,
            cart_page_visible: item.cart_page_visible,
            cms_page_visible: item.cms_page_visible,
            collection_page_visible: item.collection_page_visible,
          }
          dataUpdate.value.push(data)
        }
      })
      await FaqMorePageSettingDataService.update(dataUpdate.value[0].id, dataUpdate.value[0])
        .then(() => {
          disableUpdate.value = false
          toast.open({
            message: "Updated Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
        })
        .catch(() => {
          disableUpdate.value = false
          toast.open({
            message: "Updated Error !",
            type: "error",
            duration: 3000,
            dismissible: true
          })
        })
    }

    const allTemplateOrigin = ref([])
    const retriveAllCustomCss = async() => {
      await TemplateSettingDataService.getAll()
      .then(response => {
        allTemplateOrigin.value = response.data
        allSettings.value.forEach(item => {
          response.data.forEach(element => {
            if(item.id === element.setting_id && item.faq_template_number === element.template_number){
              element.user_id = item.user_id
              allTemplate.value.push(element)
            }
          })
        })
      })
      .catch(() => {
      })
    }

    const updateActiveLogo = async(custom_id, yanet_logo_visible) => {
      disableUpdate.value = true
      await SettingDataService.updateActiveFeature(custom_id, {yanet_logo_visible: yanet_logo_visible})
      .then( () => {
        disableUpdate.value = false
          toast.open({
            message: "Updated Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
      })
      .catch(() => {
      })
    }

    const updateCustomCss = debounce(async(custom_id, content) => {
      const dataUpdate = ref()
      disableUpdate.value = true
      allTemplateOrigin.value.forEach(item => {
        if(item.id === custom_id){
          dataUpdate.value = item
          dataUpdate.value.custom_css = content
        }
      })
      TemplateSettingDataService.update(dataUpdate.value.id, {custom_css: dataUpdate.value.custom_css})
      .then(() => {
        disableUpdate.value = false
          toast.open({
            message: "Updated Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
      })
      .catch(() => {
        
      })
    },2000)

    return{
      rattingData,
      getAllDataAdmin,
      loadData,
      hideMerchants,
      updateActiveLogo,
      loginMerchant,
      updateCustomCss,
      retriveAllCustomCss,
      searchDomain,
      shopifyDomain,
      disableUpdate,
      retriveAllUser,
      listUser,
      updateActiveFeature
    }
  },
  async created(){
    await this.getAllDataAdmin()
  }
}
</script>
<style>
</style>