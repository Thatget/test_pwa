<template>
  <div class="text-dark pb-4" style="position:relative">
    <div v-if="disableCreate" style="height: 100%; width: 100%; position: absolute; opacity: .2;z-index: 10;"></div>
    <div class="px-2 px-sm-4">
      <div class="d-flex justify-content-between position-sticky-menu-embeded align-items-center">
        <div class="py-3 d-flex align-items-center justify-content-between w-100">
          <div class="d-flex align-items-center">
            <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
              <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
            </a>
            <div>
              <span class="fs-5 me-3 fw-bold">Edit Category</span>
              <!-- <span :class="categoryVisible? 'bgr-primary px-2 text-white' : 'bgr-disable px-2'" style="border-radius: 20px;font-size: .9rem">{{ categoryVisible === true ? "Visible" : "Hidden" }}</span> -->
            </div>
          </div>
          <div class="d-flex align-items-end">
            <div class="d-flex align-items-end">
              <router-link v-if="status" to="/add-category" @mouseover="changeColorIcon = true" @mouseleave="changeColorIcon = false" class="d-flex btn align-items-end">
                <svg :fill="changeColorIcon === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
                <span :style="changeColorIcon === true? 'color: #FF8200' : ''" class="ms-1">New Category</span>
              </router-link>
              <button :disabled="disableCreate" class="d-flex align-items-center btn bgr-primary btn-primary-hover text-white ms-3" @click="Save">Save
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
            <!-- <button :disabled="disableDelete" @click="deleteThisCategory(currentCategory[0].id,currentCategory[0].identify)" @mouseover="hoverDel = true" @mouseleave="hoverDel = false" :class="hoverDel === true? 'btn border text-white btn-danger' : 'border text-danger border-danger btn bg-light' ">Delete</button> -->
          </div>
        </div>
      </div>
      <div v-if="!loadAllData" class="d-flex flex-column flex-lg-row text-start">
        <div class="col-12 col-lg-8 pe-0 pe-lg-4 pb-4 pb-lg-0 ">
          <div v-if="status" class="mb-3 p-3 d-flex align-items-center" style="border-radius: 10px; background-color: #ebf9fc; border: 1px solid #98c6cd;">
            <i class="fas fa-check-circle me-3 text-success fs-5"></i>
            Category is created successfully so currently, you can add translation for this.
          </div>
          <div class="bg-white p-3 border" style="border-radius: 10px">
            <div class="mb-3 " style="border-radius: 10px">
              <div class="form-group">
                <label for="title" class="pb-2 fw-bold">Category Name <span class="text-danger">*</span></label>
                <input
                  v-model="categoryTitle"
                  type="text"
                  class="form-control"
                  id="title"
                  required
                  name="title"
                  style="padding-right: 60px"
                />
                <div class="dropdown">
                  <i class="fa-solid fa-icons dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton3" style="color: #FF8200; position:absolute; right: 12px; bottom: 7px; cursor:pointer"  aria-hidden="true"></i>
                  <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton3">
                    <div style="height: 200px; width: 210px; overflow-y: auto;" class="d-flex flex-wrap product-scroll">
                      <li @click="addIcon(item.icon)" v-for="item in categoriesIcon" :key="item" class="d-flex align-items-center justify-content-center m-2" style="cursor:pointer; height: 24px; width: 24px">
                        {{ item.icon }}
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div style="border-radius: 10px">
              <div class="form-group">
                <label for="description" class="pb-2 fw-bold">Description</label>
                <input
                  v-model="categoryDescription" 
                  type="text"
                  class="form-control"
                  id="description"
                  required
                  name="description"
                />
              </div>
            </div>
            <div class="mt-2">
              <span class="text-danger" style="font-size: .8rem">* This is requied</span>
            </div>
          </div>
          <div v-for="item in languages" :key="item">
            <div v-if="item.locale === locale && item.primary !== true">
              <div class="d-flex flex-column flex-lg-row text-start">
                <div class="pb-4 pb-lg-0 w-100">
                  <div class="bg-white p-4 border mt-4" style="border-radius: 10px">
                    <div class="bg-light border rounded d-flex p-2 align-items-center">
                      <i class="fas fa-exclamation-circle ms-2 me-3 fs-5" style="color:red"></i>
                      <div>After adding a translation, please save FAQ before adding new translation. If you don't save, your translation will be lost.</div>
                    </div>
                  </div>
                  <div class="bg-white p-3 border mt-4" style="border-radius: 10px">
                    <span class="fw-bold" style="font-size: 1.2rem">
                      {{ item.language }} ({{ item.locale }}) translation
                    </span> 
                    <div class="mb-3 mt-2" style="border-radius: 10px">
                      <div class="form-group">
                        <label for="title-translation" class="pb-2 fw-bold">Category Name <span class="text-danger">*</span></label>
                        <input
                          v-model="categoryTitleTranslation"
                          type="text"
                          class="form-control"
                          id="title-translation"
                          required
                          name="title-translation"
                          style="padding-right: 60px"
                        />
                        <div class="dropdown">
                          <i class="fa-solid fa-icons dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton3" style="color: #FF8200; position:absolute; right: 12px; bottom: 7px; cursor:pointer" focusable="false" aria-hidden="true"></i>
                          <!-- <svg id="dropdownMenuButton3" fill="#ff8200" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 20 20" height="20" width="20" style="position:absolute; right: 12px; bottom: 9px; cursor:pointer" focusable="false" aria-hidden="true"><path d="M10 0c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm-2.293 7.707a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm6 0a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm2.082 3.87a5.997 5.997 0 0 1-5.789 4.423 6 6 0 0 1-5.789-4.422c-.081-.299.155-.578.465-.578h10.649c.309 0 .545.279.464.578z"></path></svg> -->
                          <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton3">
                            <div style="height: 200px; width: 210px; overflow-y: auto;" class="d-flex flex-wrap product-scroll">
                              <li @click="addTranslationIcon(item.icon)" v-for="item in categoriesIcon" :key="item" class="d-flex align-items-center justify-content-center m-2" style="cursor:pointer; height: 24px; width: 24px">
                                {{ item.icon }}
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div style="border-radius: 10px">
                      <div class="form-group">
                        <label for="description-translation" class="pb-2 fw-bold">Description</label>
                        <input
                          v-model="categoryDescriptionTranslation"
                          type="text"
                          class="form-control"
                          id="description-translation"
                          required
                          name="description-translation"
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
        </div>
        <div class="col-12 col-lg">
          <div class="bg-white border p-3" style="border-radius: 10px">
            <div class="d-flex p-3 border" style="border-radius: 10px; background-color: #FAFBFB">
              <input v-model="categoryVisible" class="form-check-input" type="checkbox" id="category_visible" >
              <label class="form-check-label ms-2 fw-bold" for="category_visible">
                Enable category
              </label>
            </div>
            <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
              <div class="d-flex">
                <input v-model="featureCategory" class="form-check-input" type="checkbox" id="feature_categpry">
                <label class="form-check-label ms-2 fw-bold" for="feature_categpry">
                  Featured
                </label>
              </div>
              <div class="mt-1" style="font-size: .8rem">This will show this category so that your customers can see it on Widget.</div>
            </div>
            <div class="px-4 py-2 border bg-light mt-3 d-block" style="border-radius: 10px">
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
import CategoryDataService from "../../services/CategoryDataService";
import { ref } from '@vue/reactivity';
import FaqProductDataService from "../../services/FaqProductDataService";
import store from "../../store";
import { inject } from 'vue'
import Icon from './../../assets/category-icon.json'

export default {
  methods:{
    async Save(){
      this.disableCreate = true
      await this.updateCategory()
      this.disableUpdate = false
      if(this.locale != this.localePrimary){
        if(!this.categoryTitle || !this.categoryTitleTranslation){
          if(!this.categoryTitle){
            this.$toast.open({
              message: "Category Name can't be empty !",
              type: "default",
              duration: 3000,
              dismissible: true
            })
          }
          else{
            if(!this.categoryTitleTranslation){
              this.$toast.open({
                message: "Translated Category Name can't be empty !",
                type: "default",
                duration: 3000,
                dismissible: true
              })
            }
          }
        }
        else{
          this.getAllCategory(this.$route.params.id)
        }
      }
      else{
        if(!this.categoryTitle){
          this.$toast.open({
            message: "Category Name can't be empty !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
        }
        else{
          this.getAllCategory(this.$route.params.id)
        }
      }
      this.disableCreate = false
    }
  },
  setup() {
    const status = ref(false)
    if(location.href.indexOf('?status=new') > 0){
      status.value = true
    }
    const categoriesIcon = ref(Icon)
    const featureCategory = ref()
    const toast = inject('$toast');
    const disableCreate = ref(false)
    const disableDelete = ref(false)
    const loadAllData = ref(true)
    const changeColorIcon = ref()
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain;
    const hoverEdit = ref(false)
    const hoverDel = ref(false)
    const categoryTitle = ref()
    const categoryDescription = ref()
    const categoryVisible = ref()
    const messageError = ref()
    const languages = ref([])
    const localePrimary = ref()
    const locale = ref()
    const categoryTitleTranslation = ref()
    const categoryDescriptionTranslation = ref()
    const allCategories = ref([])
    const currentCategory = ref([])
    const localeDefault = ref('default')
    const getAllCategory = function(category_id){
      allCategories.value = store.state.data.all_categories
      currentCategory.value = allCategories.value.filter(item => {
        return (item.locale === localeDefault.value && item.id == category_id)
      })
      if(currentCategory.value.length > 0){
        categoryTitle.value = currentCategory.value[0].title
        categoryVisible.value = currentCategory.value[0].is_visible
        categoryDescription.value = currentCategory.value[0].description
        featureCategory.value =  currentCategory.value[0].feature_category
      }
      loadAllData.value = false
    }
    const listFaqProduct = ref([])
    const retrieveFaqProduct = async function(){
      await FaqProductDataService.getAll()
      .then(async response => {
        listFaqProduct.value = response.data
        loadAllData.value = false
      })
      .catch(e => {
        console.log(e)
      })
    }
    locale.value = store.state.auth.locale
    languages.value = JSON.parse(store.state.auth.languages);
    localePrimary.value = languages.value.filter(item => {
      return item.primary === true
    })[0].locale

    const changeButton = ref()
    const categoryByLocale = ref()
    const changeLocale = function() {
      categoryByLocale.value = allCategories.value.filter(item => {
        return (item.locale === locale.value && item.identify === currentCategory.value[0].identify)
      })
      if(categoryByLocale.value.length === 1){
        categoryTitleTranslation.value = categoryByLocale.value[0].title
        categoryDescriptionTranslation.value = categoryByLocale.value[0].description
      }
      if(categoryByLocale.value.length === 0){
        categoryTitleTranslation.value = categoryTitle.value
        categoryDescriptionTranslation.value = categoryDescription.value
      }
    }

    const updateCategory = async function() {
      disableCreate.value = true
      if(locale.value === localePrimary.value){
        if(categoryTitle.value !== currentCategory.value[0].title || categoryVisible.value !== currentCategory.value[0].is_visible || categoryDescription.value !== currentCategory.value[0].description || featureCategory.value !== currentCategory.value[0].feature_category){
          if((categoryTitle.value === '' || categoryTitle.value === undefined)){
            disableCreate.value = true
            return
          }
          else{
            const data = {
              locale : currentCategory.value[0].locale,
              title: categoryTitle.value,
              is_visible : categoryVisible.value,
              feature_category: featureCategory.value,
              description : categoryDescription.value,
              identify : currentCategory.value[0].identify,
              position: currentCategory.value[0].position,
            };
            await CategoryDataService.update(currentCategory.value[0].id, data)
            .then(async response => {
              const res = ref()
              res.value = response.data
              await retrieveAllCategory()
            })
            .catch(e => {
              console.log(e);
            });
          }
        }
        else{
          disableCreate.value = true
          toast.open({
            message: "Updated Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      else{
        if((categoryTitle.value === '' || categoryTitle.value === undefined)){
          disableCreate.value = true
          return
        }
        else{
          if(categoryByLocale.value.length === 0){
            const dataCreate = {
              locale : locale.value,
              title: categoryTitleTranslation.value,
              is_visible : categoryVisible.value,
              feature_category: featureCategory.value,
              description : categoryDescriptionTranslation.value,
              identify : currentCategory.value[0].identify,
              position: currentCategory.value[0].position,
            };
            const dataUpdate = {
              locale : currentCategory.value[0].locale,
              title: categoryTitle.value,
              is_visible : categoryVisible.value,
              feature_category: featureCategory.value,
              description : categoryDescription.value,
              identify : currentCategory.value[0].identify,
              position: currentCategory.value[0].position,
            };
            await CategoryDataService.update(currentCategory.value[0].id, dataUpdate)
            .then(async response => {
              const res = ref()
              res.value = response.data
            })
            .catch(e => {
              console.log(e);
            });

            await CategoryDataService.create(dataCreate)
            .then(response => {
              const res = ref()
              res.value = response.data
              changeLocale()
            })
            .catch(e => {
              console.log(e);
            });
            await retrieveAllCategory()
          }
          else{
            if(categoryTitle.value !== currentCategory.value[0].title || categoryDescription.value !== currentCategory.value[0].description || categoryTitleTranslation.value !== categoryByLocale.value[0].title || categoryDescriptionTranslation.value !== categoryByLocale.value[0].description){
              const data = {
                locale : currentCategory.value[0].locale,
                title: categoryTitle.value,
                is_visible : categoryVisible.value,
                feature_category: featureCategory.value,
                description : categoryDescription.value,
                identify : currentCategory.value[0].identify,
                position: currentCategory.value[0].position,
                category_translate_id: categoryByLocale.value[0].id,
                title_translate : categoryTitleTranslation.value,
                description_translate : categoryDescriptionTranslation.value,
                locale_translate: locale.value
              }
              await CategoryDataService.update(currentCategory.value[0].id, data)
              .then(async response => {
                const res = ref()
                res.value = response.data
                await retrieveAllCategory()
              })
              .catch(e => {
                console.log(e);
              });
            }
          }
        }
      }
    };

    const retrieveCategory = async function(){
      await CategoryDataService.getAll(localeDefault.value)
      .then(response => {
        disableCreate.value = false
        toast.open({
          message: "Updated Successfully !",
          type: "success",
          duration: 3000,
          dismissible: true
        })
        store.dispatch('data/setCategoriesData', response.data)
      })
      .catch(async e => {
        console.log(e)
      });
    }

    const retrieveAllCategory = async () => {
      await CategoryDataService.getAllCategory()
      .then(async response => {
        store.dispatch('data/setAllCategoriesData', response.data)
        await retrieveCategory()
      })
      .catch(e => {
        console.log(e);
      });
    }
    const addIcon = (icon) => {
      categoryTitle.value = categoryTitle.value? `${icon}`+ ' ' + categoryTitle.value : `${icon}` + ' '    
    }
    const addTranslationIcon = (icon) => {
      categoryTitleTranslation.value = categoryTitleTranslation.value? `${icon}`+ ' ' + categoryTitleTranslation.value : `${icon}` + ' '    
    }

    return {
      addTranslationIcon,
      categoriesIcon,
      addIcon,
      featureCategory,
      retrieveCategory,
      retrieveAllCategory,
      loadAllData,
      changeColorIcon,
      status,
      localePrimary,
      shopDomain,
      categoryTitleTranslation,
      categoryDescriptionTranslation,
      locale,
      disableCreate,
      disableDelete,
      hoverEdit,
      hoverDel,
      categoryVisible,
      messageError,
      changeButton,
      categoryTitle,
      categoryDescription,
      categoryByLocale,
      changeLocale,
      languages,
      currentCategory,
      updateCategory,
      getAllCategory,
      retrieveFaqProduct,
    }
  },
  created() {
    this.getAllCategory(this.$route.params.id)
  },
};
</script>
<style>
</style>
