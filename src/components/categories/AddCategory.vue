<template>
  <div class="px-2 px-sm-4 text-dark mb-4 pb-4">
    <div class="d-flex justify-content-between position-sticky-menu-embeded align-items-center">
      <div class="py-3 d-flex align-items-center justify-content-between w-100">
        <div class="d-flex align-items-center ">
          <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </a>
          <span class="fs-5 fw-bold">Add Category</span>
        </div>
        <div class="">
          <button @click="save" :disabled="disableSave" class="btn text-white bgr-primary btn-primary-hover d-flex align-items-center">Save
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
        <!-- <router-link to="/add-faq" class="ms-3 btn btn-primary">Add FAQ</router-link> -->
        </div>
      </div>
      <!-- <div class="d-none align-items-center d-sm-flex">
        <i class="fas pe-2 fs-5 fa-question-circle"></i>
        <router-link to="/" class="text-decoration-none" style="color: #6d7175;">Help Guide</router-link>
      </div> -->
      <!-- <div class="dropdown d-block d-sm-none me-2">
        <div class="btn bg-white dropdown-toggle border d-flex p-0 align-items-center justify-content-center" style="width: 38px; height: 38px" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <div class="me-1 rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
          <div class="me-1 rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
          <div class="rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
        </div>
        <ul class="dropdown-menu text-nowrap" aria-labelledby="dropdownMenuButton1">
          <div class="d-block text-start">
            <div class="py-2 justify-content-center d-flex align-items-center">
              <i class="fas fs-5 pe-2 fa-question-circle"></i>
              <router-link to="/" style="color: #6d7175;">Help Guide</router-link>
            </div>
          </div>
        </ul>
      </div> -->
    </div>
    <!-- <div class="d-flex text-start p-3 border border-success text-dark" style="border-radius: 10px">
      <i class="fas fa-check-circle text-success pt-1 fs-4 pe-3"></i>
      <div>
        <p class="mb-1 fw-bold">Created {Cat}</p>
        <router-link to="" class="text-dark">Create another Category</router-link>
      </div>
    </div> -->
    <div class="d-flex flex-column flex-xl-row text-start">
      <div class="col-12 col-xl-8 me-0 me-xl-4 p-4 border bg-white mb-4 mb-xl-0" style="border-radius: 10px">
        <div class="mb-3" style="border-radius: 10px">
          <div class="form-group">
            <label for="title" class="pb-2 fw-bold">Category <span class="text-danger">*</span></label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              id="title"
              required
              name="title"
              style="padding-right: 60px"
            />
            <div class="dropdown">
              <i class="fa-solid fa-icons dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton3" style="color: #FF8200; position:absolute; right: 12px; bottom: 7px; cursor:pointer" focusable="false" aria-hidden="true"></i>
              <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton3">
                <div style="height: 200px; width: 210px; overflow-y: auto;" class="d-flex flex-wrap product-scroll">
                  <li @click="addIcon(item.icon)" v-for="item in categoriesIcon" :key="item" class="d-flex align-items-center justify-content-center m-2" style="cursor:pointer; height: 24px; width: 24px">
                    {{ item.icon }}
                  </li>
                </div>
              </ul>
            </div>
            <div v-if="titleError" style="font-size: .8rem" class="text-end text-danger">
              {{ titleError }} 
            </div>
          </div>
        </div>
        <div class="bg-white" style="border-radius: 10px">
          <div class="form-group">
            <label for="description" class="pb-2 fw-bold">Description</label>
            <input
              v-model="description"
              type="text"
              class="form-control"
              id="description"
              required
              name="description"
            />
            <!-- <p v-if="descriptionError" class="text-danger text-end">
              {{ descriptionError }} 
            </p> -->
          </div>
        </div>
        <div class="mt-2">
          <span class="text-danger" style="font-size: .8rem">* This is requied</span>
        </div>
      </div>
      <div class="col">
        <div class="border bg-white p-4" style="border-radius: 10px">
          <div class="d-flex p-3 border" style="border-radius: 10px; background-color: #FAFBFB">
            <input v-model="visible" class="form-check-input" type="checkbox" id="flexCheckDefault" >
            <label class="form-check-label fw-bold ms-2" for="flexCheckDefault">
              Enable category
            </label>
          </div>
          <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
            <div class="d-flex">
              <input v-model="featureCategory" class="form-check-input" type="checkbox" id="feature_categpry">
              <label class="form-check-label fw-bold ms-2" for="feature_categpry">
                Featured
              </label>
            </div>
            <div class="mt-1" style="font-size: .8rem">This will show this category so that your customers can see it on Widget.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryDataService from "../../services/CategoryDataService";
import { ref } from '@vue/reactivity'
import router from '../../router';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import store from "../../store";
import Icon from './../../assets/category-icon.json'
export default {
  methods: {
    async save(){
      await this.addCategory()
      if(this.title){
        if(this.checkExitsCategory === true){
          this.$toast.open({
            message: "Category Already Exits!",
            type: "error",
            duration: 3000,
            dismissible: true
          })
        }
        else{
          this.$toast.open({
            message: "Created Category Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
        }
      }
      else{
        this.$toast.open({
          message: "Category Name can't be empty !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
      }
    }
  },
  setup() {
    const categoriesIcon = ref(Icon)
    const locale = ref()
    locale.value = store.state.auth.locale
    const localeDefault = ref('default')
    const languages = ref([])
    languages.value = JSON.parse(store.state.auth.languages);
    const description = ref()
    const schema = yup.object({
      title: yup.string().required(''),
    })
    const featureCategory = ref(false)
    useForm({
      validationSchema: schema,
    });
    const { value: title, errorMessage: titleError } = useField('title')

    const { handleSubmit } = useForm(title.value)
    const visible = ref(true)
    const categories = ref([])
    categories.value = store.state.data.categories

    const retrieveCategory = async function() {
      await CategoryDataService.getAll(localeDefault.value)
      .then(response => {
        store.state.data.categories = response.data;
        categories.value = response.data
      })
      .catch(e => {
        console.log(e);
      });
    };

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

    const disableSave = ref(false)
    const checkExitsCategory = ref()

    const addCategory = handleSubmit(async function() {
      checkExitsCategory.value = false
      if (title.value === undefined  || title.value === '') {
        title.value = ""
        return
      }
      disableSave.value = true
      for( let i = 0; i < categories.value.length ; i++ ) {
        if (categories.value[i].title === title.value.replace(/\s+/g,' ').trim()) {
          checkExitsCategory.value = true
          disableSave.value = false
          return
        }
      }
      const data = {
        locale : 'default',
        title: title.value.replace(/\s+/g,' ').trim(),
        is_visible : visible.value,
        description : description.value,
        feature_category: featureCategory.value
        // show_on_cart: showOnCart.value,
      };
      await CategoryDataService.create(data)
        .then(async response => {
          const id = ref()
          id.value = response.data.id;
          await retrieveAllCategory()
          disableSave.value = false
          const newCategory = ref()
          newCategory.value = categories.value.filter(item => {
            return (item.title === title.value.replace(/\s+/g,' ').trim())
          })
          router.push({
            path: `/edit-category/${newCategory.value[0].id}`,
            query: {status: 'new'}
          })
        })
        .catch(e => {
          console.log(e);
        });
    });
    const addIcon = (icon) => {
      title.value = title.value? `${icon}`+ ' ' + title.value : `${icon}` + ' '
    }
    return {
      addIcon,
      categoriesIcon,
      featureCategory,
      retrieveAllCategory,
      checkExitsCategory,
      disableSave,
      locale,
      languages,
      titleError,
      description,
      title,
      addCategory,
      retrieveCategory,
      categories,
      visible,
      // showOnCart
    }
  },
};
</script>
<style>
</style>
