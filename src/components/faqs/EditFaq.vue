<template>
  <div v-if="currentFaq" class="pb-4" style="position:relative">
    <div v-if="disableCreate" style="height: 100%; width: 100%; position: absolute; opacity: .2; z-index: 10;"></div>
    <div class="px-2 px-sm-4">
      <div class="py-3 d-flex align-items-center position-sticky-menu-embeded justify-content-between w-100">
        <div class="d-flex align-items-center w-100">
          <router-link to="/storeFAQs" class="text-decoration-none">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </router-link>
          <div>
            <span class="fs-5 fw-bold me-2">Edit FAQ</span>
          </div>
        </div>
        <div class="d-flex align-items-end justify-content-center">
          <router-link to="/add-faq" @mouseover="changeColorIcon = true" @mouseleave="changeColorIcon = false" class="d-flex btn align-items-center">
            <svg :fill="changeColorIcon === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
            <span :style="changeColorIcon === true? 'color: #FF8200' : ''" class="ms-1 text-nowrap">New FAQ</span>
          </router-link>
          <div class="d-flex justify-content-end ms-2">
            <button @click="Save" :disabled="disableCreate" class="d-flex btn text-white btn-primary-hover bgr-primary align-items-center">Save
              <div v-if="disableCreate" class="loader loader--style3 ps-1" title="2">
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
      </div>
      <div v-if="!loadAllData" class="text-start d-flex flex-column flex-xl-row">
        <div class="col-12 col-xl-8 ps-0">
          <div v-if="status" class="mb-3 p-3 d-flex align-items-center me-0 me-xl-4" style="border-radius: 10px; background-color: #ebf9fc; border: 1px solid #98c6cd;">
            <i class="fas fa-check-circle me-3 text-success fs-5"></i>
            FAQ is created successfully so currently, you can add translation for this.
          </div>
          <div class="bg-white p-4 me-0 me-xl-4 border" style="border-radius: 10px">
            <div>
              <div class="form-group">
                <label class="fw-bold" for="title">Question <span class="text-danger">*</span></label>
                <input
                  @input="checkLengthTitle"
                  v-model="title"
                  type="text"
                  class="form-control"
                  id="title"
                  required
                  name="title"
                />
              </div>
              <div class="text-end" style="font-size: .8rem">
                <span class="text-danger">{{titleLengthError}}</span>
              </div>
              <div class="form-group mt-3">
                <label class="fw-bold" for="description">Answer <span class="text-danger">*</span></label>
                <editor
                  v-model="content"
                  api-key="iw2savyfxm3l9qi0l30klxs2ne4dugzr451uxhs7ook0gc3p"
                  :init="{
                    forced_root_block : false,
                    height: 300,
                    menubar: insert,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help'
                  }"
                />
              </div>
            </div>
            <div class="mt-2">
              <span class="text-danger" style="font-size: .8rem">* This is requied</span>
            </div>
          </div>
          <div v-for="item in languages" :key="item">
            <div v-if="item.locale === locale && item.primary !== true">
              <div class="bg-white p-4 me-0 me-xl-4 border mt-4" style="border-radius: 10px">
                <div class="bg-light border rounded d-flex p-2 align-items-center">
                  <i class="fas fa-exclamation-circle ms-2 me-3 fs-5" style="color:red"></i>
                  <div>After adding a translation, please save FAQ before adding new translation. If you don't save, your translation will be lost.</div>
                </div>
              </div>
              <div>
                <div class="bg-white p-4 me-0 me-xl-4 border mt-4" style="border-radius: 10px">
                  <span class="fw-bold" style="font-size: 1.2rem">
                    {{ item.language }} ({{ item.locale }}) translation
                  </span>  
                  <div class="mt-4">
                    <div class="form-group">
                      <label class="fw-bold" for="title">Question <span class="text-danger">*</span></label>
                      <input
                        @input="checkLengthTitle"
                        v-model="titleTranslate"
                        type="text"
                        class="form-control"
                        id="title"
                        required
                        name="title"
                      />
                    </div>
                    <div class="text-end" style="font-size: .8rem">
                      <span class="text-danger">{{titleLengthError}}</span>
                    </div>
                    <div class="form-group mt-3">
                      <label class="fw-bold" for="description">Answer <span class="text-danger">*</span></label>
                      <editor
                        v-model="contentTranslate"
                        api-key="iw2savyfxm3l9qi0l30klxs2ne4dugzr451uxhs7ook0gc3p"
                        :init="{
                          forced_root_block : false,
                          height: 300,
                          menubar: insert,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }"
                      />
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="text-danger" style="font-size: .8rem">* This is requied</span>
                  </div>            
                </div>
              </div>            
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4 ">
          <div class="d-block p-4 mt-4 mt-xl-0 bg-white border" style="border-radius: 10px">
            <div class="p-3 border bg-light" style="border-radius: 10px">
              <div class="text-start">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="faqVisible">
                <label class="form-check-label fw-bold ms-2" for="flexCheckDefault">
                  Show FAQs on page
                </label>
              </div>
              <span style="font-size: .8rem">This will enable this FAQ so that your customers can see it on FAQ page.</span>
            </div>
            <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
            <div class="d-flex">
              <input v-model="featureFaq" class="form-check-input" type="checkbox" id="feature_faq">
              <label class="form-check-label fw-bold ms-2" for="feature_faq">
                Featured
              </label>
            </div>
            <div class="mt-1" style="font-size: .8rem">This will show this FAQ so that your customers can see it on Widget.</div>
          </div>
            <div class="p-3 border bg-light mt-3 d-block" style="border-radius: 10px">
              <div class="pb-2 fw-bold">Choose Category</div>
              <select class="form-select" style="cursor:pointer" aria-label="Default select example" v-model="categoryIdentify">
                <option v-for="(faqC, index) in categories" :key="index" :value="faqC.identify">{{ faqC.title }}</option>
              </select>
              <div class="py-2" style="font-size: 0.8rem">Category this FAQ belongs. You can create unlimited categories by clicking categories option in menu.</div>
            </div>
            <div class="p-3 border bg-light mt-3 d-block" style="border-radius: 10px">
              <div class="pe-2 pb-2 fw-bold">Add Translation</div>
              <select @change="changeLocale" style="cursor:pointer" class="form-select mb-2" aria-label="Default select example" v-model="locale">
                <option :value="item.locale" v-for="item in languages" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option> 
              </select>
              <div style="font-size: 14px">
                <span>Available translations are pulled from your store settings.</span>
                <a target="blank" :href="`https://${shopDomain}/admin/settings/languages`">
                  You can manage language settings here
                  <svg viewBox="0 0 20 20" width="18" fill="#0d6efd" height="18" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M14 13v1a1 1 0 0 1-1 1h-7c-.575 0-1-.484-1-1v-7a1 1 0 0 1 1-1h1c1.037 0 1.04 1.5 0 1.5-.178.005-.353 0-.5 0v6h6v-.5c0-1 1.5-1 1.5 0zm-3.75-7.25a.75.75 0 0 1 .75-.75h4v4a.75.75 0 0 1-1.5 0v-1.44l-3.22 3.22a.75.75 0 1 1-1.06-1.06l3.22-3.22h-1.44a.75.75 0 0 1-.75-.75z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import FaqDataService from "../../services/FaqDataService";
import { ref } from '@vue/reactivity'
import { useRouter } from  'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import FaqProductDataService from "../../services/FaqProductDataService";
import FaqMorePageDataService from "../../services/FaqMorePageDataService";
import store from '../../store';
import { inject } from 'vue'

export default {
  name: "add-faq",
    components: {
    'editor': Editor
  },
  async created() {
    await this.getFaq(this.$route.params.id);
  },
  methods: {
    async Save() {
      this.disableCreate = true
      await this.saveChange()
      if(this.title.length > 255){
        this.$toast.open({
          message: "Questions cannot exceed 255 characters !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
        return
      }
      if(this.locale != this.localePrimary){
        if(this.titleTranslate.length > 255){
          this.$toast.open({
            message: "Translated Questions cannot exceed 255 characters !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          return
        }
        if(!this.title || !this.content){
          this.$toast.open({
            message: "Question & Answer can't be empty !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          return
        }
        else if(!this.contentTranslate || !this.titleTranslate){
          this.$toast.open({
            message: "Translated Question & Answer can't be empty !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      else{
        if((this.title && this.content)){
          this.status = false
        }
        else{
          this.$toast.open({
            message: "Question & Answer can't be empty !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      await this.changeLocale()
    },
    async deleteThisFaq(faq_id, faq_identify){
      await this.deleteFaq(faq_id, faq_identify)
      this.$toast.open({
        message: "Deleted FAQ Successfully !",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    }
  },
  setup() {
    const featureFaq = ref()
    const status = ref(false)
    if(location.href.indexOf('?status=new') > 0){
      status.value = true
    }
    const toast = inject('$toast');
    const loadAllData = ref(true)
    const changeColorIcon = ref()
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain;
    const hoverEdit = ref(false)
    const hoverDel = ref(false)
    const languages = ref([])
    languages.value = JSON.parse(store.state.auth.languages);
    const changeButton = ref()
    const faqVisible = ref(true)
    const faqByLocale = ref()
    const titleTranslate = ref()
    const contentTranslate = ref()
    const locale = ref()
    locale.value = store.state.auth.locale
    const localePrimary = ref()
    localePrimary.value = languages.value.filter(item => {
      return item.primary === true
    })[0].locale
    const categoryIdentify = ref()
    const localeDefault = ref('default')
    const schema = yup.object({
      title: yup.string().required(),
      content: yup.string().required(),
    })
    const locales = ref([])
    const faqs_bu = ref([])
    faqs_bu.value = store.state.data.faqs

    useForm({
      validationSchema: schema,
    });
    const { value: title, errorMessage: titleError } = useField('title')
    const { value: content, errorMessage: contentError } = useField('content')
    const dataValid = [title, content]

    const { handleSubmit } = useForm(title.value, content.value)
    const router = useRouter()
    const currentFaq = ref([])
    const categories = ref([])
    const faqs = ref([])
    const allFaqs = ref([])
    
    const getFaq = async function(id) {
      categories.value = store.state.data.categories
      faqs.value = store.state.data.faqs
      allFaqs.value = store.state.data.all_faqs
      currentFaq.value = faqs.value.filter(item => {
        return item.id == id
      })[0]
      categoryIdentify.value = currentFaq.value.category_identify
      title.value = currentFaq.value.title
      content.value = currentFaq.value.content
      faqVisible.value = currentFaq.value.is_visible
      featureFaq.value = currentFaq.value.feature_faq
      loadAllData.value = false
    };
    
    const changeLocale = async function() {
      disableCreate.value = false
      await FaqDataService.getByIdentify(currentFaq.value.identify, currentFaq.value.category_identify, locale.value)
      .then(response => {
        faqByLocale.value = response.data
        if(faqByLocale.value.length === 0){
          changeButton.value = true
          titleTranslate.value = title.value
          contentTranslate.value = content.value
        }
        else {
          titleTranslate.value = faqByLocale.value[0].title
          contentTranslate.value = faqByLocale.value[0].content
        }
      })
      .catch(e => {
        console.log(e);
      });
    }

    const titleLengthError = ref('')
    const checkLengthTitle = function(){
      if(title.value.length > 255){
        titleLengthError.value = 'Questions cannot exceed 255 characters'
      }
      else{
        titleLengthError.value = ''
      }
    }
    
    const disableCreate = ref(false)
    const listFaqProductId = ref([])

    const saveChange = handleSubmit(async function() {
      listFaqProductId.value = []
      disableCreate.value = true
      if(title.value.length > 255){
        disableCreate.value = false
        return
      }
      for(let i = 0; i < dataValid.length; i++){
        if(dataValid[i].value === undefined){
          dataValid[i].value = ''
        }
      }
      if(title.value === '' || content.value === ''){
        disableCreate.value = false
        return
      }
      if(categoryIdentify.value !== currentFaq.value.category_identify){
        await FaqProductDataService.getAll()
        .then(async response => {
          if(response.data){
            const faqProduct = ref([])
            faqProduct.value = response.data.filter(item => {
              return item.faq_id == currentFaq.value.id
            })
            if(faqProduct.value.length > 0){
              for(let i = 0; i < faqProduct.value.length; i++){
                listFaqProductId.value.push(faqProduct.value[i].id)
              }
              const data = {
                id: currentFaq.value.id,
                faq_identify: currentFaq.value.identify,
                category_identify: categoryIdentify.value,
              }
              await FaqProductDataService.updateFaqCategory(data)
              .then(response => {
                const id = ref()
                id.value = response.data.id;
              })
              .catch(e => {
                console.log(e)
              })
              await FaqMorePageDataService.updateFaqCategory(data)
              .then(response => {
                const id = ref()
                id.value = response.data.id;
              })
              .catch(e => {
                console.log(e)
              })
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
      if(locale.value !== localePrimary.value){
        if(contentTranslate.value === '' || titleTranslate.value === '' || contentTranslate.value == undefined || titleTranslate.value == undefined){
          disableCreate.value = false
          return
        }
        else{
          if(faqByLocale.value.length > 0){
            const data = {
              id: currentFaq.value.id,
              locale : localeDefault.value,
              identify: currentFaq.value.identify,
              category_identify: categoryIdentify.value,
              is_visible: faqVisible.value,
              feature_faq: featureFaq.value,
              title: title.value,
              content : content.value,
            }
            const data_transtale = {
              id: faqByLocale.value[0].id,
              title: titleTranslate.value,
              content: contentTranslate.value,
              locale : locale.value,
              is_visible: faqVisible.value,
              feature_faq: featureFaq.value,
              identify: currentFaq.value.identify,
              category_identify: categoryIdentify.value,
            }
            await FaqDataService.update(currentFaq.value.id, data)
            .then(async response => {
              const id = ref()
              id.value = response.data.id;
              // disableCreate.value = false
            })
            .catch(e => {
              console.log(e);
            });
            await FaqDataService.update(faqByLocale.value[0].id, data_transtale)
            .then(async response => {
              const id = ref()
              id.value = response.data.id;
              await changeLocale(locale.value)
              await retrieveAllFaq()
              disableCreate.value = false
              toast.open({
                message: "Updated Successfully !",
                type: "success",
                duration: 3000,
                dismissible: true
              })
              await getFaq(currentFaq.value.id)
            })
            .catch(e => {
              console.log(e);
            });
          }
          else{
            if(title.value !== currentFaq.value.title || content.value !== currentFaq.value.content || faqVisible.value !== currentFaq.value.is_visible || categoryIdentify.value !== currentFaq.value.category_identify){
              const data = {
                id: currentFaq.value.id,
                locale : localeDefault.value,
                identify: currentFaq.value.identify,
                category_identify: categoryIdentify.value,
                is_visible: faqVisible.value,
                feature_faq: featureFaq.value,
                title: title.value,
                content : content.value,
              }
              await FaqDataService.update(currentFaq.value.id, data)
              .then(response => {
                const id = ref()
                id.value = response.data.id;
              })
              .catch(e => {
                console.log(e);
              });
            }
            const dataTranslate = {
              content: contentTranslate.value,
              title: titleTranslate.value,
              locale: locale.value,
              is_visible: faqVisible.value,
              feature_faq: featureFaq.value,
              identify: currentFaq.value.identify,
              category_identify: categoryIdentify.value,
            }
            await FaqDataService.create(dataTranslate)
              .then(async response => {
              const id = ref()
              id.value = response.data.id;
              await changeLocale(locale.value)
              await retrieveAllFaq()
              disableCreate.value = false
              toast.open({
                message: "Updated Successfully !",
                type: "success",
                duration: 3000,
                dismissible: true
              })
              await getFaq(currentFaq.value.id)
            })
            .catch(e => {
              console.log(e);
            });
          }
        }
      }
      else{
        const data = {
          locale: localeDefault.value,
          title: title.value,
          content: content.value,
          category_identify : categoryIdentify.value,
          is_visible : faqVisible.value,
          feature_faq: featureFaq.value,
          identify : currentFaq.value.identify,
        }
        await FaqDataService.update(currentFaq.value.id, data)
        .then(async response => {
          const id = ref()
          id.value = response.data.id;
          await retrieveAllFaq()
          disableCreate.value = false
          toast.open({
            message: "Updated Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
        })
        .catch(e => {
          console.log(e);
        });
      }
    })

    const categoryCurrent = ref()
    const checkCategoryId = ref(true)
    const checkCategoryIdentify = async function() {
      categoryCurrent.value = categories.value.filter(item => {
        return (item.identify === categoryIdentify.value && item.locale === localeDefault.value)
      })[0]
      checkCategoryId.value = categories.value.some(item => {
        return (item.identify == categoryIdentify.value && item.locale == locale.value)
      })
    }

    const disableDelete = ref(false)
    const deleteFaq = async function(id, identify) {
      disableDelete.value = true
      await FaqDataService.delete(id, identify)
      .then(response => {
        const id = ref()
        id.value = response
        router.push({ path: "/storeFAQs" });
      })
      .catch(e => {
        console.log(e);
      })
    };

    const retrieveAllFaq = async function() {
      await FaqDataService.getAllFaq()
      .then(async response => {
        store.dispatch('data/setAllFaqsData', response.data);
        await retrieveFaq()
        await setFaqLocale()
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    };
    const setFaqLocale = async function(){
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
          locales.value = JSON.parse(store.state.auth.languages)
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
      faqs.value = faqs_bu.value
    }

    const retrieveFaq = async function() {
      await FaqDataService.getAll(localeDefault.value)
      .then(response => {
        store.dispatch('data/setFaqsData', response.data);
        faqs_bu.value = store.state.data.faqs
      })
      .catch(e => {
        console.log(e)
      });
    };
    return {
      featureFaq,
      retrieveFaq,
      retrieveAllFaq,
      loadAllData,
      changeColorIcon,
      status,
      shopDomain,
      localePrimary,
      checkCategoryIdentify,
      categoryIdentify,
      locale,
      titleTranslate,
      contentTranslate,
      disableCreate,
      disableDelete,
      // disableUpdate,
      titleError,
      contentError,
      titleLengthError,
      checkLengthTitle,
      hoverDel,
      hoverEdit,
      faqVisible,
      saveChange,
      changeButton,
      content,
      title,
      faqByLocale,
      changeLocale,
      languages,
      // retrieveUser,
      // user,
      getFaq,
      // updateFaq,
      deleteFaq,
      currentFaq,
      categories,
    }
  }
}
</script>
<style>
</style>
