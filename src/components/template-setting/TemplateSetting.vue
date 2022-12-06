<template>
  <div class="px-4 pb-3">
    <div class="d-flex align-items-center position-sticky-menu-embeded justify-content-between py-3 border-bottom" style="z-index: 2;">
      <h5 class="fw-bolder m-0 float-start">
        Design
      </h5>
      <div class="border-bottom">
        <button :disabled="disableUpdate || (!faqMorePageSetting.active_template && settings.template_number !== 1)" @click="updateSetting" class="btn text-white float-end btn-primary-hover bgr-primary d-flex">
          Save
          <div v-if="disableUpdate" class="loader loader--style3 ps-1">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
              <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform 
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </button>
      </div>    
    </div>
    <div class="text-start" v-if="!loadData">
      <div class="d-flex flex-column flex-xl-row pt-3 border-bottom pb-3">
        <div class="col-12 col-xl-4 pe-4 d-flex flex-column">
          <p class="fw-bold" style="font-size: 16px">Template Selection</p>
          <p style="font-size: 14px">Choose one of our 8 pre-existing template</p>
        </div>
        <div class="col-12 col-xl-8 p-4 border bg-white" style="border-radius: 10px">
          <span class="fw-bold font-notify">CHOOSE TEMPLATE</span>
          <div class="pb-3">
          </div>
          <div class="d-flex flex-wrap text-center justify-content-center">
            <div class="col-12 col-sm-6 p-1">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(1)" style="cursor:pointer" :style="settings.template_number === 1 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 1 ? 'w-100  p-1 rounded' : 'w-100 border p-1 rounded border-3'" src="./../../../public/template1.png">
              </a>
              <h6 :class="settings.template_number === 1? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template One</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(2)" style="cursor:pointer" :style="settings.template_number === 2 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 2 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/template2.png">
              </a>
              <h6 :class="settings.template_number === 2? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Two</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(2)" style="cursor:pointer;opacity: .4" :style="settings.template_number === 2 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 2 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/template2.png">
              </a>
              <h6 :class="settings.template_number === 2? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Two</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(3)" style="cursor:pointer" :style="settings.template_number === 3 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 3 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/template3.png">
              </a>
              <h6 :class="settings.template_number === 3? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Three</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(3)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 3 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 3 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/template3.png">
              </a>
              <h6 :class="settings.template_number === 3? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Three</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(4)" style="cursor:pointer" :style="settings.template_number === 4 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 4 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template04.png">
              </a>
              <h6 :class="settings.template_number === 4? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Four</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(4)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 4 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 4 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template04.png">
              </a>
              <h6 :class="settings.template_number === 4? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Four</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(5)" style="cursor:pointer" :style="settings.template_number === 5 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 5 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template05.png">
              </a>
              <h6 :class="settings.template_number === 5? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Five</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(5)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 5 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 5 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template05.png">
              </a>
              <h6 :class="settings.template_number === 5? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Five</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(6)" style="cursor:pointer" :style="settings.template_number === 6 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 6 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template06.png">
              </a>
              <h6 :class="settings.template_number === 6? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Six</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(6)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 6 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 6 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template06.png">
              </a>
              <h6 :class="settings.template_number === 6? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Six</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(7)" style="cursor:pointer" :style="settings.template_number === 7 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 7 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template07.png">
              </a>
              <h6 :class="settings.template_number === 7? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Seven</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(7)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 7 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 7 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template07.png">
              </a>
              <h6 :class="settings.template_number === 7? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Seven</h6>
            </div>
            <div class="col-12 col-sm-6 p-1" v-if="faqMorePageSetting.active_template">
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(8)" style="cursor:pointer" :style="settings.template_number === 8 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 8 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template08.png">
              </a>
              <h6 :class="settings.template_number === 8? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Eight</h6>
            </div>
            <div v-else class="col-12 col-sm-6 p-1" style="position:relative ;">
              <div class="rounded p-2" style="position:absolute; top: 50%;left: 50%; transform:translate(-50%, -60%); z-index: 1; background-color: #ebf9fc; width: 90%; border: 1px solid #98c6cd; height: 40%; display: flex; justify-content: center; align-items: center;">
                <span class="fs-4"><b @click="contact" style="color: #ff8200; cursor:pointer">Chat us</b> to unlock template</span>
              </div>
              <a class="w-100" href="#template-config">
                <img @click="changeTemplate(8)" style="cursor:pointer; opacity: .4;" :style="settings.template_number === 8 ? 'border: 3px solid #FF8200' : ''" :class="settings.template_number === 8 ? 'w-100 rounded p-1' : 'w-100 border p-1 rounded border-3'" src="./../../../public/Template08.png">
              </a>
              <h6 :class="settings.template_number === 8? 'text-color-primary mt-2 fw-bold' : 'mt-2 fw-bold'">Template Eight</h6>
            </div>
          </div>
        </div>
      </div>
      <div style="position:relative ;">
        <div class="d-flex flex-column flex-xl-row mt-3 border-bottom pb-3" >
          <div class="col-12 col-xl-4">
            <div class="pe-4 d-flex flex-column">
              <p class="fw-bold" style="font-size: 16px">Upload Banner</p>
              <p style="font-size: 14px">Select a photo in your computer to change the store banner.</p>
            </div>
          </div>
          <div class="col-12 col-xl-8">
            <!-- <div class="mb-3" style="border-radius: 10px">
              <div class="d-flex" style="">
                <div>
                  <input :disable="!faqMorePageSetting.active_template && settings.template_number !== 1" class="form-check-input me-2" type="checkbox" id="banner-visible" v-model="settings.banner_visible">
                </div>
                <label for="banner-visible">
                  Show banner (After hiding the banner, you can adjust the space created by the banner through the height bar.)
                </label>
              </div>
            </div> -->
            <form method="POST" enctype="multipart/form-data">
              <div class="d-flex justify-content-center w-100" style="margin: auto">
                <label for="up-load-banner" class="text-center d-flex flex-column justify-content-center w-100" style="cursor:pointer; height: 250px">
                  <div class="p-1 w-100" :style="`border: dashed #FF8200; border-radius: 6px; height: 250px`"> 
                    <div v-if="uploading === false" class="w-100" style="height: 238px">
                      <div v-if="settings.image_banner" class="w-100 h-100" :style="`background-image: url(${backendLink}/var/images/banner/${settings.image_banner}); background-size: cover; background-position: center`"></div>
                      <div v-else class="w-100 h-100" :style="`background-image: url(${backendLink}/var/images/banner/${settings.banner_default}); background-size: cover; background-position: center`"></div>
                    </div>
                    <div v-else class="bg-white d-flex align-items-center justify-content-center border" style="border-radius: 10px; height: 238px">
                        <div class="fw-bold text-color-primary">UPLOADING</div>
                        <div class="loader loader--style8 d-flex align-items-center justify-content-center ms-2">
                          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="24px" height="50px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <rect x="0" y="50" width="4" height="100" fill="#FF8200" opacity="0.2">
                              <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                            </rect>
                            <rect x="8" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                              <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                            </rect>
                            <rect x="16" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                              <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                              <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                            </rect>
                          </svg>
                        </div>
                    </div>
                  </div>
                  <div>
                    <input @change="uploadFile" id="up-load-banner" class="d-none" type="file" name="profile_pic"/>  
                  </div>
                </label>
              </div>
              <h4 class="text-center mt-2 text-color-primary">
                <label id="template-config" for="up-load-banner">
                  <span style="cursor:pointer; font-size: 16px;">SELECT AN IMAGE</span>
                </label>
              </h4>
              <div class="text-center">
                <span>Banner file should be smaller than 8MB. You can customize the height for the banner.</span>
              </div>
            </form>
          </div>
        </div>
        <div class="pe-4">
          <p class="fw-bold mt-3" style="font-size: 16px">Template configuration</p>
        </div>
        <div v-if="settings.template_number === 1 && checkUpdateBanner === false">
          <Template01
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 2 && checkUpdateBanner === false">
          <Template02
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 3 && checkUpdateBanner === false">
          <Template03
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 4 && checkUpdateBanner === false">
          <Template04 
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 5 && checkUpdateBanner === false">
          <Template05 
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 6 && checkUpdateBanner === false">
          <Template06 
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 7 && checkUpdateBanner === false">
          <Template07
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="settings.template_number === 8 && checkUpdateBanner === false">
          <Template08
            :setting="settings" 
            :settingOrigin="settingsOrigin"
            :fontFamilyprop="fontFamily"
            :fontWeightsprop="fontWeights"
          />
        </div>
        <div v-if="!faqMorePageSetting.active_template && settings.template_number !== 1" style="position:absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #f7f7f7; opacity: .6">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SettingDataService from "../../services/SettingDataService";
import TemplateSettingDataService from "../../services/TemplateSettingDataService";
import swal from 'sweetalert';
import ImageDataService from "../../services/ImageDataService";
import { useRoute } from 'vue-router';
import store from '../../store';
import Template01 from './template/Template01.vue'
import Template02 from './template/Template02.vue'
import Template03 from './template/Template03.vue'
import Template04 from './template/Template04.vue'
import Template05 from './template/Template05.vue'
import Template06 from './template/Template06.vue'
import Template07 from './template/Template07.vue'
import Template08 from './template/Template08.vue'

export default {
  props: ["checkEmbededApp"],
  components: {
    Template01,
    Template02,
    Template03,
    Template04,
    Template05,
    Template06,
    Template07,
    Template08
  },
  methods:{
    async updateSetting(){
      this.disableUpdate = true
      await this.saveUpdate()
      this.$toast.open({
        message: "Updated Successfully!",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    },
    async uploadFile(event){
      this.uploading = true
      await this.uploadBanner(event)
      if(this.uploadMessage === true){
        this.$toast.open({
          message: "Updated Successfully!",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      }
      this.uploadMessage = false
    },
  },
  setup(){
    const faqMorePageSetting = ref()
    faqMorePageSetting.value = store.state.data.faq_more_page_setting
    const route = useRoute()
    if(route.query.accessToken){
      store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    }
    const uploading = ref()
    const uploadMessage = ref(false)
    const disableUpdate = ref()
    const settings = ref([])
    settings.value = store.state.data.settings
    const settingsOrigin = ref(settings.value)
    const loadData = ref()
    const getSetting = async function() {
      loadData.value = true
      await rereiveAllTemplate(settings.value.id)
      changeTemplate(settings.value.faq_template_number)
    }
    const message = ref()
    const faqsBG = ref()
    const faqsFontColor = ref()
    const hoverInstant = ref()

    const files = ref([])
    const templateSetting = ref()

    const fontFamily = ["Questrial", "Time New Roman", "Lucida Sans", "Courier", "Garamond", "Arial", "Calibri", "Playfair Display", "Varela Round" , "Karla", "Montserrat", "unset"]
    const fontWeights = ["normal", "bold"]

    const saveUpdate = async function() {
      settings.value.dont_category_faq = settingsOrigin.value.dont_category_faq
      settings.value.show_footer_text = settingsOrigin.value.show_footer_text
      settings.value.show_intro_text = settingsOrigin.value.show_intro_text
      settings.value.show_page_title = settingsOrigin.value.show_page_title
      await SettingDataService.update(settings.value)
      .then(async response => {
        const id = ref()
        id.value = response
        message.value = ''
        await retriveSetting()
      })
      .catch(e => {
        const id = ref()
        id.value = e
        disableUpdate.value = false
        swal("Updated Settings Failed!", {
          buttons: false,
          timer: 3000,
          icon: "error",
        });
      });
    }
    
    const retriveSetting = async () => {
      await SettingDataService.get()
      .then(response => {
        store.dispatch('data/setSettingsData', response.data);
      })
      .catch(async e => {
        console.log(e);
      });
      disableUpdate.value = false
    }

    const allTemplate = ref([])
    const rereiveAllTemplate = async (setting_id) => {
      if(store.state.data.all_template){
        allTemplate.value = store.state.data.all_template
      }
      else{
        await getAllTemplate(setting_id)
      }
    }

    const getAllTemplate = async (setting_id) => {
      await TemplateSettingDataService.get(setting_id)
        .then(response => {
          checkUpdateBanner.value = true
          allTemplate.value = response.data
          store.dispatch('data/setAllTemplateData', response.data);
        })
        .catch(e => {
          console.log(e)
        })
    }

    const changeTemplate = async function(tempNum) {
      templateSetting.value = []
      allTemplate.value.forEach(item => {
        if(item.template_number == tempNum){
          templateSetting.value = item
        }
      })
      settings.value = templateSetting.value
      settings.value.dont_category_faq = settingsOrigin.value.dont_category_faq
      settings.value.show_footer_text = settingsOrigin.value.show_footer_text
      settings.value.show_intro_text = settingsOrigin.value.show_intro_text
      settings.value.show_page_title = settingsOrigin.value.show_page_title
      settings.value.faq_page_url = settingsOrigin.value.faq_page_url
      settings.value.faq_template_number = templateSetting.value.template_number
      loadData.value = false
      uploading.value = false
      uploadMessage.value = true
      checkUpdateBanner.value = false
    }

    const checkUpdateBanner = ref()
    const uploadBanner = async function(event) {
      uploadMessage.value = false
      files.value = event.target.files
      await ImageDataService.upload(files.value,templateSetting.value.template_number)
      .then(async response => {
        const id = ref()
        id.value = response
        await getAllTemplate(settingsOrigin.value.id)
        changeTemplate(templateSetting.value.template_number)
      })
      .catch(response => {
        const id = ref()
        id.value = response
        uploadMessage.value = false
        uploading.value = false
        swal("Updated Banner Failed!", {
          buttons: false,
          timer: 3000,
          icon: "error",
        });
      })
    }
    const bannerWidth = ref()
    bannerWidth.value = window.innerWidth
    const backendLink = ref()
    backendLink.value = process.env.VUE_APP_BACKEND_LINK

    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    const contact = () => {
      if(document.getElementsByClassName('cc-dc5e')[0]){
        document.getElementsByClassName('cc-dc5e')[0].click()
      } 
      else{
        let user_nickname = `[FAQ]${shopDomain.value}`
        window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
      }
    }

    return{
      checkUpdateBanner,
      contact,
      faqMorePageSetting,
      settingsOrigin,
      rereiveAllTemplate,
      uploading,
      uploadMessage,
      disableUpdate,
      loadData,
      faqsFontColor,
      faqsBG,
      hoverInstant,
      backendLink,
      templateSetting,
      fontFamily,
      fontWeights,
      saveUpdate,
      message,
      getSetting,
      settings,
      bannerWidth,
      uploadBanner,
      files,
      changeTemplate,
      getAllTemplate,
    }
  },
  created() {
    this.getSetting();
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 575px) {
    .category-nav{
      margin: 0 !important
    }
  }
  .nav-tabs .nav-link.active{
    color: #FF8200 !important
  }
  .nav-link {
    color: black !important
  }
    @media only screen and (max-width: 575px) {
    .category-nav{
      margin: 0 !important;
      margin-top: 40px !important
    }
  }
</style>