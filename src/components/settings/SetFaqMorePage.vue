<template>
  <div>
    <div class="d-flex flex-column mx-4 mb-4" :style="faqMorePageSetting.active_feature? '' : 'opacity:.4'">
      <div class="d-flex justify-content-between position-sticky-menu-embeded align-items-center border-bottom">
        <div class="d-flex align-items-center">
          <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </a>
          <div class="fw-bold fs-5">Show FAQs on different pages of store</div>
        </div>
        <div class="d-flex aling-items-center">
          <!-- <div data-bs-toggle="modal" data-bs-target="#productFaqGuide" style="cursor: pointer" class="d-flex align-items-center justify-content-center hover-color ms-2"  @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false">
            <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg hover-color" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
            <div class="d-none d-md-block" style="padding: 6px; word-wrap: normal;">Add FAQs block</div>
          </div> -->
          <button @click="Save" :disabled="waitSave" :class="faqMorePageSetting.active_feature === true? 'bgr-primary btn-primary-hover' : 'btn-secondary'" class="btn float-end my-3 ms-3 text-white d-flex align-items-center">Save
            <div v-if="waitSave" class="loader loader--style3 ps-1" title="2">
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
      <div class="mb-3 p-2 rounded d-flex align-items-center mt-3 col-12 col-lg-8" style="margin: auto; background-color: #ebf9fc; border: 1px solid #98c6cd;">
        <i class="fas fa-info-circle fs-4 ms-2 me-3" style="color: #4989b6;"></i>
        By default your FAQs get a dedicated page. Following feature allows you to show FAQs on other pages of your store. (ex. Homepage, Cart etc...). Note that this feature only works with Online Store 2.0 compatible themes and don't forget to add a faq block to page detail.
      </div>
      <div class="mb-3 d-none align-items-center justify-content-sm-center flex-wrap d-md-flex">
        <button @click="changePage('index')" :class="(pageName === 'index' && faqMorePageSetting.active_feature === true)? 'bgr-primary text-white' : 'bg-white text-black'" class="p-2 border btn rounded  me-3">Add on Home page</button>
        <button @click="changePage('page')" :class="pageName === 'page'? 'bgr-primary text-white' : 'bg-white text-black'" class="p-2 border btn rounded me-3">Add on CMS page</button>
        <button @click="changePage('cart')" :class="pageName === 'cart'? 'bgr-primary text-white' : 'bg-white text-black'" class="p-2 border btn rounded me-3">Add on Cart page</button>
        <button @click="changePage('collection')" :class="pageName === 'collection'? 'bgr-primary text-white' : 'bg-white text-black'" class="p-2 border btn rounded">Add on Collection page</button>
      </div>
      <div class="d-flex d-md-none mb-3 flex-row-reverse">
        <select style="max-width: 250px" class="form-select" aria-label="Default select example" @change="changePage(pageName)" v-model="pageName">
          <option value="index" selected>Add on Home page</option>
          <option value="page">Add on CMS page</option>
          <option value="cart">Add on Cart page</option>
          <option value="collection">Add on Collection page</option>
        </select>
      </div>
      <div class="d-flex flex-column">
        <div v-if="!loadAllData" class="col-12 col-lg-8" style="margin: auto; position: relative;">
          <div class="bg-white border rounded h-100">
            <div class="d-flex align-items-center justify-content-between p-3 border-bottom flex-wrap">
              <div class="fw-bold" :class="pageName === 'index'? '': 'd-none'">FAQs on Home page</div>
              <div class="fw-bold" :class="pageName === 'page'? '': 'd-none'">FAQs on CMS page</div>
              <div class="fw-bold" :class="pageName === 'cart' || pageName === 'collection'? '': 'd-none'">FAQs on <span style="text-transform: capitalize">{{pageName}}</span> page</div>
              <div class="d-flex align-items-center justify-content-center ps-3">
                <div v-if="pageName === 'index'" class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
                  <input class="form-check-input m-0 fs-5" type="checkbox" id="index-page" v-model="showOnHomePage">
                </div>
                <div v-if="pageName === 'page'" class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
                  <input class="form-check-input m-0 fs-5" type="checkbox" id="cms-page" v-model="showOnCMSPage">
                </div>
                <div v-if="pageName === 'cart'" class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
                  <input class="form-check-input m-0 fs-5" type="checkbox" id="cart-page" v-model="showOnCartPage">
                </div>
                <div v-if="pageName === 'collection'" class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
                  <input class="form-check-input m-0 fs-5" type="checkbox" id="collection-page" v-model="showOnCollectionPage">
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between ms-auto" style="cursor:pointer;">
                <button class="btn text-white ms-3" :class="faqMorePageSetting.active_feature === true? 'bgr-primary btn-primary-hover' : 'btn-secondary'" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add FAQs</button>
              </div>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Add FAQs</h5>
                    <div class="d-flex align-items-center">
                      <button type="button" class="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                  </div>
                  <div class="border-bottom p-3">
                    <div class="rounded" style="position:relative; box-shadow: 2px 2px #ddd ;">
                      <svg viewBox="0 0 20 20" style="position: absolute; left: 10px; top: 50%; transform: translatey(-50%);" height="22" width="22" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293-4.82-4.82a5.968 5.968 0 0 0 1.113-3.473 6 6 0 0 0-12 0 6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path></svg>
                      <input class="form-control py-2" style="padding-left: 40px; font-size: 14px;" type="text" placeholder="Search Faq" v-model="title" @input="searchInstantFaq">
                    </div>
                  </div>
                  <div class="modal-body" style="min-height: 180px">
                    <div>
                      <div v-if="!loadDataFaqs && categories.length > 0">
                        <div v-if="faqs.length > 0" class="product-scroll ps-3 me-2 mb-2" style="max-height: 450px; overflow-y: auto">
                          <div class="pe-2" v-for="category in categories" :key="category">
                            <div :class="hideCategory === true? 'd-none' :'text-end text-break fw-bold my-1'">{{category.title}}</div>
                            <TransitionGroup
                              class="d-flex flex-column justify-content-between">
                              <div v-for="(faq,index) in faqs" :key="index" :data-index="index">
                                <div class="d-flex mb-2 border rounded px-2 bg-light" style="cursor: pointer" v-if="faq.category_identify === category.identify">
                                  <div class="me-2 py-3" style="cursor: pointer">
                                    <input class="form-check-input" style="cursor: pointer" type="checkbox" :value="faq" v-model="faqData" :id="faq.id">
                                  </div>
                                  <label class="form-check-label w-100 text-break py-3" style="cursor: pointer" :for="faq.id">
                                    <span>{{faq.title}}</span>
                                  </label>
                                </div>
                              </div>
                            </TransitionGroup>
                          </div>
                        </div>
                        <div class="product-scroll" v-if="faqs.length === 0" style="max-height: 450px; overflow-y: auto">
                          <div v-if="!searchFaqNotFound" class="py-5 d-flex flex-column align-items-center justify-content-center">
                            <div class="text-center mb-2">You haven't created any FAQs yet!</div>
                            <div class="text-center">Please create FAQs if you wish to show them on this page.</div>
                            <router-link to="/add-faq" data-bs-dismiss="modal" aria-label="Close" class="btn border mt-3 text-white" :class="faqMorePageSetting.active_feature === true? 'bgr-primary btn-primary-hover' : 'btn-secondary'">Create FAQs now!</router-link>
                          </div>
                          <div v-if="searchFaqNotFound" class="text-center fs-5 align-items-center d-flex justify-content-center py-5">
                            <span>Oops, your search did not match any FAQs</span>
                          </div>
                        </div>
                      </div>
                      <div v-else-if="categories.length === 0" class="py-5 d-flex flex-column align-items-center justify-content-center">
                        <div class="text-center mb-2">You haven't created any FAQs yet!</div>
                        <div class="text-center">Please create FAQs if you wish to show them on this page.</div>
                        <router-link to="/add-faq"  class="btn border mt-3 btn-primary-hover bgr-primary text-white">Create FAQs now!</router-link>
                      </div>
                      <div v-else class="d-flex align-items-center justify-content-center my-4" style="min-height: 250px; overflow-y: auto">
                        <div class="loader loader--style8 d-flex align-items-center justify-content-center h-100">
                          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <rect x="0" y="50" width="4" height="10" fill="#FF8200" opacity="0.2">
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
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="closeFaqModal" style="border: 1px solid rgb(92, 95, 98);" class="btn" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" @click="addFaqs" data-bs-dismiss="modal" class="btn btn-primary-hover bgr-primary text-white">Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="settings.dont_category_faq === false" class="product-scroll pt-3 pb-2" style="max-height: 450px; overflow-y: auto;">
              <div v-for="element in categories" :key="element">
                <div v-for="(item,index) in faqByPage" :key="item" class="px-3">
                  <div v-if="element.identify === item.category_identify">
                    <div @mousemove="changeBgr = index" @mouseleave="changeBgr = ''" :class="changeBgr === index? 'bg-light' : ''" class="p-2 border rounded d-flex justify-content-between align-items-center mb-2">
                      <div class="d-flex flex-column">
                        <span>{{ item.faq_title }}</span>
                        <span style="font-size: 12px; color: rgb(152, 198, 205);">{{ element.title }}</span>
                      </div>
                      <button @click="deleteThisFaq(item.id, item.faq_id)" @mouseover="hoveDelFaq = index" @mouseleave="hoveDelFaq = ''" :class="hoveDelFaq === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " title="Delete" class="text-danger btn border">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="faqByPage.length === 0" class="d-flex h-100 product-scroll" style="max-height: 450px; overflow-y: auto;">
                <h3 style="margin: auto" class="p-4">No FAQs</h3>
              </div>
            </div>
            <div v-else class="product-scroll pt-3 pb-2" style="max-height: 450px; overflow-y: auto;">
              <div v-for="(item,index) in faqByPage" :key="item" class="px-3">
                <div @mousemove="changeBgr = index" @mouseleave="changeBgr = ''" :class="changeBgr === index? 'bg-light' : ''" class="p-2 border rounded d-flex justify-content-between align-items-center mb-2">
                  <div class="d-flex flex-column">
                    <span>{{ item.faq_title }}</span>
                  </div>
                  <button @click="deleteThisFaq(item.id, item.faq_id)" @mouseover="hoveDelFaq = index" @mouseleave="hoveDelFaq = ''" :class="hoveDelFaq === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " title="Delete" class="text-danger btn border">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>            
              </div>
              <div v-if="faqByPage.length === 0" class="d-flex h-100 product-scroll" style="max-height: 450px; overflow-y: auto;">
                <h3 style="margin: auto" class="p-4">No FAQs</h3>
              </div>
            </div>
          </div>
          <div v-if="!faqMorePageSetting.active_feature" class="w-100 h-100" style="background-color: light; opacity: 1; position:absolute; top: 0"></div>
        </div>
        <div v-else>
          <div class="loading col-12 col-lg-10 border bg-white" style="margin: auto; border-radius: 10px;">
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="modal fade text-start" style="z-index: 5 !important" id="productFaqGuide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add block Product FAQs to your store.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><b>Merchants use this feature to show different FAQs on different products of their store.</b></p>
              <p><b>1. </b><a target="_blank" :href="`https://${shopify_domain}/admin/themes/current/editor?template=product&activateAppId=b70c1465-6820-4911-8d5d-2299efd66134/app-block`">Go to theme editor <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>
              <p><b>2.</b> Click <b>"Add block"</b> in <b>"Product information"</b>from left and side bar</p>
              <p><b>3.</b> Choose <b>"Yanet Professional FAQs"</b> block</p>
              <span><b>4.</b> Click <b>"Save"</b> on <b>"Main menu"</b> page and you should be all set.</span>
            </div>  
            <div class="modal-footer">
              <button type="button" data-bs-dismiss="modal" class="btn btn-primary-hover bgr-primary text-white">I understood</button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="w-100 h-100" v-if="!faqMorePageSetting.active_feature" style="position:absolute; top:0;">
      <div style="position:fixed; opacity: 1;z-index:1; border-radius: 10px; border: 1px solid #98c6cd; transform: translate(-50%, -50%); left: 50%; top: calc(50%)" class="p-4 col-10 col-md-7 bg-white">
        <div class="rounded font-notify p-2 d-flex fs-5 align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;min-height: 100px;">
          <i class="fas fa-info-circle  fs-3 d-none d-sm-flex m-3" style="color: #4989b6;"></i>
          <span>Currently, this feature has been not activated for your store. Please <span @click="contact" class="contact text-color-primary fs-5" style="cursor: pointer">&ensp;Chat With Us&ensp;</span> if you would like to work with this.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import FaqMorePageDataService from "../../services/FaqMorePageDataService";
import FaqMorePageSettingDataService from "../../services/FaqMorePageSettingDataService";
import { inject } from 'vue'
import store from "../../store";
// import gsap from 'gsap'

export default {
  name: "add-faq",
  async created() {
		this.retrieveFaq();
    this.retrieveFaqMorePage();
		this.retrieveCategory();
    this.changePage();
    this.retrieveFaqMorePageSetting();
  },
  methods:{
    async Save(){
      await this.saveChange()
      this.$toast.open({
        message: "Add Faq Successfully !",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    },
    async deleteThisFaq(id, faq_id){
      await this.removeThisFaq(id, faq_id)
    },
  },
  setup() {
    const changeColorIconAdd = ref()
    const toast = inject('$toast');
    const loadAllData = ref(true)
    const changeBgr = ref()
		const hoveDelFaq = ref()
		const faqs = ref([])
		const loadDataFaqs = ref(true)
		const categories_origin = ref([])
		const faqData = ref([])
		const title = ref()
		const searchFaqNotFound = ref(true)
		const hideCategory = ref()
		const pageName = ref('index')
		const faqByPageOrigin = ref([])
    const faqMorePage = ref([])
    faqMorePage.value = store.state.data.faq_more_page
    const faqByPage = ref([])
    const addFaqData = ref([])
    const faqsOrigin = ref()
    const showOnHomePage = ref(true)
    const showOnCMSPage = ref(true)
    const showOnCartPage = ref(true)
    const showOnCollectionPage = ref(true)
    const waitSave = ref()
    const checkCategories = ref()
    const categories = ref([])
    const categoriesNoFaq = ref([])
    const faqMorePageSetting = ref()
    faqMorePageSetting.value = store.state.data.faq_more_page_setting
    const settings = ref([])
    settings.value = store.state.data.settings

    const addFaqs = function() {
      addFaqData.value = []
      if(faqByPage.value.length === 0){
        for(let i = 0; i < faqData.value.length; i++){
          const data = {
            faq_id: faqData.value[i].id,
            faq_title: faqData.value[i].title,
            category_identify: faqData.value[i].category_identify,
            faq_identify: faqData.value[i].identify
          }
          faqByPage.value.push(data)
        }
      }
      else{
        faqData.value.forEach(item => {
          if(faqByPage.value.some(element => {
            return item.id === element.faq_id
          }) === false){
            const data = {
              faq_id: item.id,
              faq_title: item.title,
              category_identify: item.category_identify,
              faq_identify: item.identify
            }
            addFaqData.value.push(data)
          }
        })
        addFaqData.value.forEach(item => {
          faqByPage.value.push(item)
        })
      }
      faqs.value = faqsOrigin.value
      title.value = ''
      rearrangeFaq()
    }

    const retrieveFaqMorePage = function(){
      for(let i = 0; i < faqMorePage.value.length; i++){
        for(let j = 0; j < faqs.value.length; j++){
          if(faqMorePage.value[i].faq_id === faqs.value[j].id){
            faqMorePage.value[i].faq_title = faqs.value[j].title
            faqMorePage.value[i].faq_position = faqs.value[j].position
          }
        }
      }
      faqByPageOrigin.value = faqMorePage.value.filter(item => {
        return item.page_name === pageName.value
      })
    }

    const getFaqMorePage = async () => {
      await FaqMorePageDataService.getAll()
      .then(async response => {
				faqMorePage.value = response.data
        store.dispatch('data/setFaqMorePage', response.data)
			})
			.catch(e => {
				console.log(e)
			})
    }
    
    const rearrangeFaq = function(){
      if(settings.value.faq_sort_name === true){
        faqByPage.value.sort(function(a, b){
          if (a.faq_title.toLowerCase() < b.faq_title.toLowerCase()) {return -1;}
          if (a.faq_title.toLowerCase() > b.faq_title.toLowerCase()) {return 1;}
          return 0;
        });
      }
      else{
        faqByPage.value.sort(function(a, b){return a.faq_position - b.faq_position});
      }
    }

    const retrieveFaqMorePageSetting = function(){
      loadAllData.value = false
      showOnHomePage.value = faqMorePageSetting.value.home_page_visible
      showOnCMSPage.value = faqMorePageSetting.value.cms_page_visible
      showOnCartPage.value = faqMorePageSetting.value.cart_page_visible
      showOnCollectionPage.value = faqMorePageSetting.value.collection_page_visible
    }

    const changePage = function(data){
      if(!data){
        pageName.value = 'index'
      }
      else{
        pageName.value = data
      }
      faqByPageOrigin.value = faqMorePage.value.filter(item => {
        return item.page_name === pageName.value
      })
      faqByPage.value = faqByPageOrigin.value
      hoveDelFaq.value = ''
      rearrangeFaq()
    }

    const retrieveCategory = function() {
        categories_origin.value = store.state.data.categories
        for(let i = 0; i < categories_origin.value.length; i++) {
          checkCategories.value = false
          checkCategories.value = faqs.value.every(function(faq){
            return faq.category_identify !== categories_origin.value[i].identify
          })
          if(checkCategories.value == true){
            categoriesNoFaq.value.push(categories_origin.value[i])
          }
        }
        categories.value = categories_origin.value.filter(item => !categoriesNoFaq.value.includes(item))      
    };
		
		const retrieveFaq = function() {
      faqs.value = store.state.data.faqs
      faqsOrigin.value = faqs.value
      loadDataFaqs.value = false
    };

		const searchInstantFaq = async function() {
      hideCategory.value = true
      if(title.value === ''){
        hideCategory.value = false
        searchFaqNotFound.value = false
        faqs.value = faqsOrigin.value
      }
      else{
        faqs.value = store.state.data.faqs.filter((item)=>{
          return title.value.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
        faqs.value.length === 0? searchFaqNotFound.value = true : searchFaqNotFound.value = false
      }
    };

		const saveChange = async function(){
      if(faqMorePageSetting.value.active_feature === true){
        waitSave.value = true
        const data_more_page_setting = {
          home_page_visible: showOnHomePage.value,
          cms_page_visible : showOnCMSPage.value,
          cart_page_visible : showOnCartPage.value, 
          collection_page_visible : showOnCollectionPage.value,
        }
        await FaqMorePageSettingDataService.update(faqMorePageSetting.value.id, data_more_page_setting)
        .then(respone => {
          const id = ref()
          id.value = respone.data
        })
        .catch(e => {
          console.log(e)
        })  
        if(faqData.value.length === 0){
          waitSave.value = false
          return
        }
        const dataCreate = ref([])
        for(let i = 0; i < faqData.value.length; i++){
          const data = {
            faq_id: faqData.value[i].id,
            faq_identify: faqData.value[i].identify,
            category_identify: faqData.value[i].category_identify,
            page_name: pageName.value
          }
          dataCreate.value.push(data)
        }
        for(let i = 0; i < faqByPageOrigin.value.length; i++){
          for(let j = 0; j < dataCreate.value.length; j++){
            if(faqByPageOrigin.value[i].page_name === dataCreate.value[j].page_name && faqByPageOrigin.value[i].faq_id === dataCreate.value[j].faq_id){
              dataCreate.value.splice(j, 1)
            } 
          }
        }
        for(let i = 0; i < dataCreate.value.length; i++){
          for(let j = 0; j < faqs.value.length; j++){
            if(dataCreate.value[i].faq_id === faqs.value[j].id){
              dataCreate.value[i].faq_title = faqs.value[j].title
            }
          }
        }
        await FaqMorePageDataService.create(dataCreate.value)
        .then(async response => {
          const id = ref()
          id.value = response
          faqData.value = []
          await getFaqMorePage()
          retrieveFaqMorePage()
          changePage(pageName.value)
          waitSave.value = false
        })
        .catch(e => {
          const id = ref()
          id.value = e
        });
      }
		}
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    const contact = () => {
      if(document.getElementsByClassName('cc-1qth cc-1s3d')[0]){
        document.getElementsByClassName('cc-1qth cc-1s3d')[0].click()
      }
      else{
        let user_nickname = `[FAQ]${shopDomain.value}`
        window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
      }
    }

    const removeThisFaq = async function(id, faq_id){
      if(id){
        faqByPage.value =  faqByPage.value.filter(item => {
          return item.id !== id
        })
        toast.open({
          message: "Deleted Faq Successfully!",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      }
      else{
        if(faq_id){
          faqByPage.value =  faqByPage.value.filter(item => {
            return item.faq_id !== faq_id
          })
          toast.open({
            message: "Deleted Faq Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      await FaqMorePageDataService.delete(id)
      .then(async response => {
        const id = ref()
        id.value = response.data
        await getFaqMorePage()
        retrieveFaqMorePage()
      })
      .catch(e => {
        console.log(e)
      })
    }
    
    return {
      changeColorIconAdd,
      contact,
      loadAllData,
      changeBgr,
      rearrangeFaq,
      settings,
      waitSave,
      addFaqs,
      categories,
      faqMorePageSetting,
      retrieveFaqMorePageSetting,
      showOnHomePage,
      showOnCMSPage,
      showOnCartPage,
      showOnCollectionPage,
      faqByPage,
      retrieveFaqMorePage,
      faqByPageOrigin,
      removeThisFaq,
			hoveDelFaq,
			changePage,
			saveChange,
			pageName,
			faqData,
			title,
			searchFaqNotFound,
			hideCategory,
			searchInstantFaq,
			categories_origin,
			retrieveCategory,
			loadDataFaqs,
			retrieveFaq,
			faqs,
      getFaqMorePage
    }
  }
}
</script>
<style>
</style>
