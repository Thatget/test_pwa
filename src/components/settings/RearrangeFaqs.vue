<template>
  <div class="mb-3">
    <div class="col-12 col-lg-10 col-md-10 px-4" style="margin: auto">
      <div class="d-flex position-sticky-menu-embeded align-items-center justify-content-between border-bottom">
        <div class="d-flex align-items-center w-100 py-3">
          <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </a>
          <!-- <router-link to="/setting" class="text-decoration-none">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </router-link> -->
          <div>
            <span class="fs-5 fw-bold me-2">Rearrange FAQs</span>
          </div>
        </div>
        <div>
          <button :disabled="waitSave" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" @click="Save">Save
            <svg v-if="waitSave" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
          </button>
        </div>
      </div>
      <div class="pt-3">
        <div class="p-3 bg-white border rounded mb-3 pt-3">
          <div class="p-2 rounded d-flex align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
            <i class="fas fa-info-circle fs-5 ms-2 me-3" style="color: #4989b6;"></i>
            This will make faq order changes on all pages (Ex. Faq page, Product page).
          </div>
        </div>
      </div>
      <div class="p-3 border bg-white rounded">
        <div v-if="!loadData">
          <div v-if="faqs_origin.length > 0">
            <div v-if="settings.dont_category_faq === true">
              <draggable class="dragArea list-group w-full" :list="faqs_origin" @change="changePosition">
                <div
                  @mousemove="changeBgr = index"
                  @mouseleave="changeBgr = ''"
                  v-for="(element, index) in faqs_origin"
                  :key="element">
                  <div class="d-flex align-items-center justify-content-between  border my-1 p-3 list-group-item rounded-md" :class="changeBgr === index? 'bg-light' : ''" style="cursor: move">
                    <div class="col-9 d-flex align-items-center">
                      <i class="fas fa-grip-vertical pe-3"></i>
                      <div>{{ element.title }}</div>
                    </div>
                    <div class="col-3 text-end ps-3" style="color: rgb(152, 198, 205); font-size: 14px;">
                      {{element.category_name}}
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
            <div v-else>
              <div v-for="(item, item_index) in categories" :key="item" :class="item_index === categories.length - 1? '' : 'mb-4'">
                <div class="mb-1 fs-6 fw-bold">
                  {{item.title}}
                </div>
                <draggable class="dragArea list-group w-full" :list="faqs_origin" @change="changePosition">
                  <div
                    @mousemove="changeBgr = index"
                    @mouseleave="changeBgr = ''"
                    v-for="(element, index) in faqs_origin"
                    :key="element">
                    <div v-if="element.category_identify === item.identify" :class="changeBgr === index? 'bg-light' : ''" class="d-flex align-items-center justify-content-between rounded border my-1 p-3 list-group-item rounded-md" style="cursor: move">
                      <div class="d-flex align-items-center">
                        <i class="fas fa-grip-vertical pe-3"></i>
                        <div>{{ element.title }}</div>
                      </div>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            <div class="text-center mb-2">You haven't created any FAQs yet!</div>
            <div class="text-center">Please create FAQs if you wish to use this feature.</div>
            <router-link to="/add-faq" class="btn border mt-3 bgr-primary btn-primary-hover text-white">Create FAQs now!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  import { ref  } from 'vue';
  import FaqDataService from "../../services/FaqDataService";
  import CategoryDataService from "../../services/CategoryDataService";
  import SettingDataService from "../../services/SettingDataService";
  import store from '../../store';

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    async created(){
      // await this.retrieveCategory()
      this.changeData();
      await this.retrieveSettings()
    },
    methods:{
      async Save(){
        await this.saveChange()
        this.waitSave = false
        this.$toast.open({
          message: "Rearrange FAQs Successfully!",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      }
    },
    setup(){
      const waitSave = ref()
      const changeBgr = ref()
      const loadData = ref(true)
      const localeDefault = ref('default')
      const faqs_origin = ref([])
      const faqs_rearrange = ref([])
      const settings = ref([])
      const categories_origin = ref([])
      categories_origin.value = store.state.data.categories
      const categories = ref([])
      const changeData = () => {
        categories.value = []
        faqs_origin.value = store.state.data.faqs
        for(let i = 0; i < faqs_origin.value.length; i++){
          for(let j = 0; j < categories_origin.value.length; j++){
            if(faqs_origin.value[i].category_identify === categories_origin.value[j].identify){
              faqs_origin.value[i].category_name = categories_origin.value[j].title
            }
          }
        }
        for(let i = 0; i < categories_origin.value.length; i++){
          if(faqs_origin.value.some(item => {
            return categories_origin.value[i].identify === item.category_identify
          })){
            categories.value.push(categories_origin.value[i])
          }
        }
        faqs_rearrange.value = faqs_origin.value
      }
      const retrieveFaq = async function() {
        await FaqDataService.getAll(localeDefault.value)
        .then(response => {
          faqs_origin.value = response.data;
          store.dispatch('data/setFaqsData', response.data)
          changeData()
        })
        .catch(e => {
          console.log(e)
        });
      };
      
      const retrieveCategory = async function() {
        await CategoryDataService.getAll(localeDefault.value)
        .then(response => {
          categories_origin.value = response.data;
        })
        .catch(e => {
          console.log(e);
        });
      };
      
      const changePosition = async function() {
        for(let i = 0; i < faqs_origin.value.length; i++){
          faqs_origin.value[i].position = i
        }
      }

      const saveChange = async function(){
        waitSave.value = true
        const data = ref([])
        for(let i = 0; i < faqs_origin.value.length; i++){
          data.value.push({
            id: faqs_origin.value[i].id,
            position: faqs_origin.value[i].position
          })
        }
        await FaqDataService.updateRearrangeFaqs(data.value)
        .then(response => {
          const data = ref()
          data.value = response.data
        })
        .catch(e => {
          console.log(e)
        })
      }
      const retrieveSettings = async function() {
        if(!store.state.data.settings){
          await SettingDataService.get()
          .then(response => {
            settings.value = response.data;
            store.dispatch('data/setSettingsData', response.data)
            loadData.value = false
          })
          .catch(e => {
            console.log(e);
          });          
        }
        else{
          settings.value = store.state.data.settings
          loadData.value = false
        }
      };
      return{
        changeData,
        waitSave,
        changeBgr,
        categories,
        settings,
        retrieveSettings,
        loadData,
        saveChange,
        categories_origin,
        retrieveCategory,
        faqs_rearrange,
        faqs_origin,
        retrieveFaq,
        changePosition,
      }
    },
  })
</script>