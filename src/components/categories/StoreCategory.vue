<template>
  <div class="pb-4" style="text-align: center; max-width: 100vw">
    <div class="px-4 py-3 d-flex position-sticky-menu-embeded justify-content-between align-items-center">
      <div class="d-flex">
        <div class="fs-5 fw-bolder me-2 me-md-4">Store Category</div>
      </div>
      <div class="d-flex align-items-center">
        <!-- <router-link to="/reorder-categories" class="ms-2 ms-md-4 d-flex hover-color align-items-center text-black" style="text-decoration:none">
          <i class="fa-solid fa-layer-group me-1"></i>
          <span class="d-none d-sm-block">Rearrange Categories</span>
          <span class="d-block d-sm-none">Rearrange</span>
        </router-link> -->
        <router-link to="/add-category" class="btn text-white ms-2 ms-md-4 bgr-primary">Add Category</router-link>
      </div>
    </div>
    <div v-if="!loadData" style="padding-top: 1px">
      <div class="mx-4 product-scroll" style="overflow-x: auto">
        <div class="bg-white border" style="min-width: 800px; border-radius: 10px; overflow: hidden;">
          <div class="px-3 py-2 fw-bold border-bottom d-flex align-items-center">
            <span class="col-3 text-start">Category</span>
            <span class="col-2">Description</span>
            <span class="col">Visibility</span>
            <span class="col">Featured</span>
            <span class="col-2">Store languages</span>
            <span class="col-2">Actions</span>
          </div>
          <draggable v-if="!dontCategoryFaq" class="dragArea list-group w-full product-scroll" :list="categoriesShow" @change="changePositionCategory" style="max-height: 500px; overflow-y:auto">
            <div v-for="(cat, index) in categoriesShow" :key="index" style="font-size: 14px;">
              <div class="p-3 border-bottom d-flex align-items-center" @mousemove="hoverCategory = index" @mouseleave="hoverCategory = ''" :style="hoverCategory === index? 'background-color: #f6f6f7' : ''">
                <div class="col-3 text-break pe-2 d-flex" style="text-align: start">
                  <i class="fas fa-grip-vertical pe-2" style="padding-top: 5px; cursor: move"></i>
                  <div>
                    <div class="">
                      {{ cat.title }}
                    </div>
                    <div class="" style="color:#98c6cd; font-size: 12px;">
                      {{cat.count_faqs === 0? 'No' : cat.count_faqs}} FAQs</div>
                    </div>
                  </div>
                <div class="col-2 text-break px-2">{{ cat.description }}</div>
                <!-- <div class="col">{{ cat.category_id }}</div> -->
                <div class="col px-2 d-flex align-items-center justify-content-center fs-6 m-0">
                  <div class="form-check form-switch m-0">
                    <input :disabled="disableUpdate" style="cursor:pointer" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="cat.is_visible" @change="updateCategoryVisible(cat.id)">
                  </div>
                  <!-- <span :class="cat.is_visible? 'bgr-primary px-2 text-white' : 'bgr-disable px-2'" style="border-radius: 20px">{{ cat.is_visible === true ? "Visible" : "Hidden" }}</span> -->
                </div>
                <div class="col px-2 d-flex align-items-center justify-content-center fs-6 m-0">
                  <div class="form-check m-0" style="cursor:pointer">
                    <input :disabled="disableUpdate" style="cursor:pointer" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="cat.feature_category" @change="updateCategoryVisible(cat.id)">
                  </div>
                  <!-- <span :class="cat.is_visible? 'bgr-primary px-2 text-white' : 'bgr-disable px-2'" style="border-radius: 20px">{{ cat.is_visible === true ? "Visible" : "Hidden" }}</span> -->
                </div>
                <div class="col-2 px-2 d-flex justify-content-center" style="flex-wrap:wrap">
                  <div v-for="item in cat.locale_info" :key="item">
                    <div class="me-1" v-if="item.added === true || item.locale === locale">
                      <div :title="item.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="item.added === true || item.locale === locale? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: 14px">
                        <div style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                        <!-- <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                        </div> -->
                        <div class="text-nowrap">{{ item.locale }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <div class="d-flex justify-content-center" :style="cat.identify === 'Uncategorized1'? 'width: 90px' : 'display: none'">
                    <router-link title="Edit" :to="{ path:`/edit-category/${cat.id}`}" @mouseover="hoverEdit = index" @mouseleave="hoverEdit = ''" :class="hoverEdit === index? 'btn border text-white btn-success' : 'btn border text-success border-success' ">
                      <i class="fas fa-pencil-alt"></i>
                    </router-link>
                    <button v-if="cat.identify === 'Uncategorized1'? false : true" title="Delete" @mouseover="hoverDel = index" @mouseleave="hoverDel = ''" :class="hoverDel === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " class="ms-2" @click="deleteThisCategory(cat.id, cat.identify)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>          
          </draggable>
          <div class="text-center p-2 d-flex align-items-center px-4 bg-light" style="color: #aaa">
            <div class="col-3"></div>
            <div class="col-6 ">
              <span>Showing {{ categoriesShow.length }}  of {{ categoriesShow.length }} Categories</span>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CategoryDataService from "../../services/CategoryDataService";
import FaqDataService from "../../services/FaqDataService";
import swal from 'sweetalert';
import { useRoute } from 'vue-router';
import FaqProductDataService from "../../services/FaqProductDataService";
import { inject } from 'vue'
import FaqMorePageDataService from "../../services/FaqMorePageDataService";
import store from "../../store";
import { VueDraggableNext } from 'vue-draggable-next'
import { debounce } from 'vue-debounce';

export default {
  components: {
    draggable: VueDraggableNext,
  },
  methods:{
    async deleteThisCategory(category_id, category_identify){
      await this.removeThisCategory(category_id, category_identify)
    },
  },
  setup() {
    const route = useRoute()
    if(route.query.accessToken){
      store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    }
    const locale = ref()
    const locales = ref([])
    const settings = ref(store.state.data.settings)
    locales.value = JSON.parse(store.state.auth.languages)
    locale.value = store.state.auth.locale
    const toast = inject('$toast');
    const hoverEdit = ref()
    const hoverDel = ref()
    const hoverCategory = ref()
    const loadData = ref(false)
    const faqs = ref([])
    faqs.value = store.state.data.faqs
    const allCategory = ref([])
    const categories = ref([])
    const categoriesShow = ref([])
    categoriesShow.value = store.state.data.categories
    const categories_bu = ref([])
    const localeDefault = ref('default')
    const retrieveFaqs = async function() {
      await FaqDataService.getAll(localeDefault.value)
      .then(response => {
        faqs.value = response.data;
      })
      .catch(e => {
        console.log(e);
      });
    };

    const disableUpdate = ref()
    const updateCategoryVisible = async (category_id) => {
      disableUpdate.value = true
      const data = ref()
      data.value = categoriesShow.value.filter(item => {
        return item.id === category_id
      })[0]
      store.dispatch('data/setCategoriesData', categoriesShow.value);
      CategoryDataService.update(data.value.id ,data.value)
      .then(response => {
        disableUpdate.value = false
        const responses = ref()
        responses.value = response
      })
      .catch(e => {
        console.log(e)
      })
    }

    const retrieveAllCategory = async function() {
      await CategoryDataService.getAllCategory()
      .then(async response => {
        store.dispatch('data/setAllCategoriesData', response.data)
      })
      .catch(e => {
        console.log(e);
      });
    };

    const setCategoryLocale = async function(){
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
        console.log(categoriesShow.value)
        if(settings.value.category_sort_name){
          categoriesShow.value.sort(function(a, b){
              if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1;}
              if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1;}
              return 0;
          });
        }
        else{
          categoriesShow.value.sort(function(a, b){return a.position - b.position});
        }
        store.dispatch('data/setAllCategoriesData', categoriesShow.value)
      }
    }

    const removeThisCategory = async function(id, identify) {
      await swal({ title: "Waring!",
        text: "Do you really want to delete this category?",
        dangerMode: true,
        buttons: true,
        type: "success"
      })
      .then(async done => {
        if(done) {
          for(let i = 0; i < categoriesShow.value.length; i++){
            if(categoriesShow.value[i].id === id){
              categoriesShow.value.splice(i, 1)
            }
          }
          for(let i = 0; i < faqs.value.length; i++){
            if(faqs.value[i].category_identify === identify){
              faqs.value[i].category_identify = 'Uncategorized1'
            }
          }
          setCategoryLocale()
          await CategoryDataService.delete(id, identify)
          .then(async response => {
            toast.open({
              message: "Deleted Category Successfully!",
              type: "success",
              duration: 3000,
              dismissible: true
            })
            const id = ref()
            id.value = response
            await updateFaqCategory(identify)
            await retrieveAllCategory()
          })
          .catch(e => {
            console.log(e);
          });
        } 
      });
    }

    const changePositionCategory = debounce(async() => {
      disableUpdate.value = true
      for(let i = 0; i < categoriesShow.value.length; i++){
        categoriesShow.value[i].position = i
      }
      const data = ref([])
      for(let i = 0; i < categoriesShow.value.length; i++){
        data.value.push({
          id: categoriesShow.value[i].id,
          identify: categoriesShow.value[i].identify,
          position: categoriesShow.value[i].position
        })
      }
      await CategoryDataService.updateRearrangeCategories(data.value)
      .then(response => {
        const data = ref()
        data.value = response
        disableUpdate.value = false
      })
      .catch(e => {
        console.log(e)
      })
    },500)

    const updateFaqCategory = async function(identify){
      await FaqDataService.getAllFaq()
      .then(async response => {
        const listFaqsId = ref([])
        const listFaq = ref([])
        listFaq.value = response.data.filter(item => {
          return item.category_identify === identify
        })
        listFaq.value.forEach(item => {
          listFaqsId.value.push(item.id)
        })
        if(listFaqsId.value.length > 0){
          await FaqDataService.updateWhenDeleteCategory(listFaqsId.value)
          .then(async response => {
            const id = ref()
            id.value = response
            const listFaqId = ref([])
            listFaqId.value = faqs.value.filter(item => {
              return item.category_identify === identify
            })
            await retrieveFaqs()
            const data = ref([])
            for(let i = 0; i < faqs.value.length; i++){
              for(let j = 0; j < listFaqId.value.length; j++){
                if(faqs.value[i].id === listFaqId.value[j].id){
                  data.value.push(faqs.value[i])
                }
              }
            }
            await FaqProductDataService.updateFaq(data.value)
            .then(response => {
              const id = ref()
              id.value = response.data
            })
            .catch(e => {
              console.log(e)
            })
            await FaqMorePageDataService.updateFaq(data.value)
            .then(response => {
              const id = ref()
              id.value = response.data
            })
            .catch(e => {
              console.log(e)
            })
          })
          .catch(e => {
            console.log(e);
          });
        }
        
      })
      .catch(e => {
        console.log(e);
      });
    }

    return {
      changePositionCategory,
      disableUpdate,
      updateCategoryVisible,
      updateFaqCategory,
      setCategoryLocale,
      allCategory,
      locale,
      locales,
      hoverDel,
      hoverEdit,
      hoverCategory,
      loadData,
      retrieveFaqs,
      faqs,
      categories,
      categoriesShow,
      removeThisCategory,
      retrieveAllCategory,
    }
  },
  async created() {
    // await this.retrieveFaqs()
    // this.retrieveCategory();
    await this.setCategoryLocale()
  }
}
</script>

<style>

</style>