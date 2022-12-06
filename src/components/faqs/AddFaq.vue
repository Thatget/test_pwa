<template>
  <div class="px-4 mb-4 ">
    <div class="py-3 d-flex position-sticky-menu-embeded align-items-center justify-content-between">
      <div class="d-flex align-items-center w-100">
        <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
          <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
        </a>
        <span class="fs-5 fw-bold">Add FAQ</span>
      </div>
      <div class="">
        <button @click="save(userId)" :disabled="disableSave" class="btn text-white btn-primary-hover bgr-primary d-flex align-items-center">Save
          <div v-if="disableSave" class="loader loader--style3 ps-1">
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
    <div class="pb-4 text-start d-flex flex-column flex-xl-row">
      <div class="col-12 col-xl-8 ps-0 pe-0 pe-xl-4">
        <div class="bg-white p-4 border " style="border-radius: 10px">
          <div>
            <div class="form-group">
              <label for="title" class="pb-2 fw-bold">Question <span class="text-danger">*</span></label>
              <input
                @input="checkLengthTitle"
                name="title"
                type="text"
                class="form-control"
                id="title"
                required
                v-model="title"
              />
              <div class="text-end" style="font-size: .8rem">
                <span class="text-danger">{{titleLengthError}}</span>
              </div>
            </div>
            <div class="form-group mt-3">
              <label class="pb-2 fw-bold" for="description">Answer <span class="text-danger">*</span></label>
              <editor
                name="content"
                id="content"
                v-model="content"
                api-key="iw2savyfxm3l9qi0l30klxs2ne4dugzr451uxhs7ook0gc3p"
                :init="{
                  forced_root_block : false,
                  height: 400,
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
              <div class="p-3 border bg-light mt-3" style="border-radius: 10px">
                <div class="text-start">
                  <span >You can insert the link in the answer section when you right click on it.</span>
                </div>
              </div>
              <div class="mt-2">
                <span class="text-danger" style="font-size: .8rem">* This is requied</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 ">
        <div class="d-block p-4 mt-3 mt-xl-0 bg-white border" style="border-radius: 10px">
          <div class="p-3 border bg-light" style="border-radius: 10px">
            <div class="text-start">
              <input class="form-check-input" type="checkbox" v-model="visible" id="flexCheckDefault">
              <label class="form-check-label ms-2 fw-bold" for="flexCheckDefault">
                Show FAQs on page
              </label>
            </div>
            <span style="font-size: .8rem">This will enable this FAQ so that your customers can see it on FAQ page.</span>
          </div>
          <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
            <div class="d-flex">
              <input v-model="featureFaq" class="form-check-input" type="checkbox" id="feature_faq">
              <label class="form-check-label ms-2 fw-bold" for="feature_faq">
                Featured
              </label>
            </div>
            <div class="mt-1" style="font-size: .8rem">This will show this FAQ so that your customers can see it on Widget.</div>
          </div>
          <div class="px-4 py-2 border bg-light mt-3 d-block" style="border-radius: 10px">
            <label for="categories" class="pe-2 pb-2 fw-bold">Choose Category <span class="text-danger">*</span></label>
            <select class="form-select" style="cursor:pointer" name="categories" id="categories" aria-label="Default select example" v-model="categoryIdentify">
              <option v-for="(category, index) in categories" :key="index" :value="category.identify">{{ category.title }}</option> 
            </select>
            <div class="pe-2 py-2" style="font-size: 0.8rem">Category this FAQ belongs. You can create unlimited categories by clicking categories option in menu.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router';
import Editor from '@tinymce/tinymce-vue'
import FaqDataService from "../../services/FaqDataService";
import { ref } from '@vue/reactivity'
import { useForm, useField } from 'vee-validate';
import store from '../../store';
import * as yup from 'yup'
export default {
  name: "add-faq",
  components: {
  'editor': Editor
  },
  methods: {
    async save(user_id){
      await this.saveChange(user_id)
      if(this.title && this.content && this.categoryIdentify){
        if(this.title.length > 255){
          this.$toast.open({
            message: "Questions cannot exceed 255 characters !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          return
        }
        if(this.checkExitsFaq === true){
          this.$toast.open({
            message: "FAQ Already Exits !",
            type: "error",
            duration: 3000,
            dismissible: true
          })
          return
        }
        else{
          this.$toast.open({
            message: "Created FAQ Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
        }
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
      if(!this.categoryIdentify && this.title && this.content){
        this.$toast.open({
          message: "Please choose Category !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
      }
      return
    },
  },
  setup() {
    const featureFaq = ref(false)
    const languages = ref([])
    // const categoryIdentify = ref()
    languages.value = JSON.parse(store.state.auth.languages);
    const schema = yup.object({
      title: yup.string().required(),
      content: yup.string().required(),
      categories: yup.string().required()
    })
    useForm({
      validationSchema: schema,
    });
    const { value: title, errorMessage: titleError } = useField('title')
    const { value: content, errorMessage: contentError } = useField('content')
    const { value: categoryIdentify, errorMessage: categoryError } = useField('categories')

    const { handleSubmit } = useForm(title.value, content.value, categoryIdentify.value)
    const visible = ref(true)
    const categories = ref([])
    const faqs = ref([])
    const localeDefault = ref('default')
    faqs.value = store.state.data.faqs
    categories.value = store.state.data.categories
    categoryIdentify.value = categories.value[0].identify
    const categories_bu = ref([])
    const allCategory = ref([])
    const categoriesShow = ref([])
    const locales = ref([])
    locales.value = JSON.parse(store.state.auth.languages)

    const retrieveFaq = async function() {
      await FaqDataService.getAll(localeDefault.value)
      .then(response => {
        faqs.value = response.data;
        store.dispatch('data/setFaqsData', response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
          countFaqs.value = faqs.value.filter(item => {
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

    const titleLengthError = ref('')
    const checkLengthTitle = function(){
      if(title.value.length > 255){
        titleLengthError.value = 'Questions cannot exceed 255 characters'
      }
      else{
        titleLengthError.value = ''
      }
    }
    const requiredCategory = ref('')
    const dataValid = [title, content, categoryIdentify]
    const checkExitsFaq = ref()
    const disableSave = ref(false)

    const saveChange = handleSubmit(async function() {
      checkExitsFaq.value = false
      for(let i = 0; i < dataValid.length; i++){
        if(dataValid[i].value === undefined){
          dataValid[i].value = ''
        }
      }
      if(title.value.length > 255){
        return
      }
      if(title.value === '' || content.value === '' || categoryIdentify.value === ''){
        return
      }
      disableSave.value = true
      for(let i = 0; i < faqs.value.length; i++){
        if (faqs.value[i].title === title.value.replace(/\s+/g,' ').trim() && faqs.value[i].category_identify === categoryIdentify.value) {
          checkExitsFaq.value = true
          disableSave.value = false
          return
        }
      }
      const data = {
        locale: localeDefault.value,
        title: title.value.replace(/\s+/g,' ').trim(),
        content: content.value,
        category_identify : categoryIdentify.value,
        is_visible : visible.value,
        feature_faq: featureFaq.value,
      };
      await FaqDataService.create(data)
        .then(async response => {
          const id = ref()
          id.value = response.data;
          await retrieveFaq()
          setCategoryLocale()
          const newFaq = ref()
          newFaq.value = faqs.value.filter(item => {
            return (item.content === content.value && item.title === title.value && item.category_identify === categoryIdentify.value)
          })
          router.push({
            path: `/edit-faq/${newFaq.value[0].id}`,
            query: {status: 'new'}
          })
        })
        .catch(e => {
          console.log(e);
        });
    });
    return {
      featureFaq,
      checkExitsFaq,
      disableSave,
      titleLengthError,
      checkLengthTitle,
      requiredCategory,
      localeDefault,
      languages,
      retrieveFaq,
      faqs,
      categoryError,
      contentError,
      titleError,
      categories,
      saveChange,
      setCategoryLocale,
      title,
      content,
      categoryIdentify,
      visible
    }
  },
};
</script>
<style>
</style>
