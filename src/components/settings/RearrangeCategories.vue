<template>
  <div class="mb-3">
    <div class="col-12 col-lg-10 col-md-10 px-4" style="margin: auto">
      <div class="d-flex align-items-center position-sticky-menu-embeded justify-content-between border-bottom">
        <div class="d-flex align-items-center w-100 py-3">
          <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </a>
          <!-- <router-link to="/setting" class="text-decoration-none">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </router-link> -->
          <div>
            <span class="fs-5 fw-bold me-2">Rearrange Categories</span>
            <!-- <span :class="faqVisible? 'bgr-primary px-2 text-white' : 'bgr-disable px-2'" style="border-radius: 20px;font-size: .9rem">{{ faqVisible === true ? "Visible" : "Hidden" }}</span> -->
          </div>
        </div>
        <div>
          <button :disabled="waitSave" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" @click="Save">Save
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
      <div class="pt-3">
        <div class="p-3 bg-white border rounded mb-3">
          <div class="p-2 rounded d-flex align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
            <i class="fas fa-info-circle fs-5 ms-2 me-3" style="color: #4989b6;"></i>
            This will make category order changes on all pages (Ex. Faq page, Product page).
          </div>
        </div>
      </div>
      <div class="p-3 border bg-white rounded">
        <draggable v-if="!loadData" class="dragArea list-group w-full" :list="categories_origin" @change="changePosition">
          <div
            @mousemove="changeBgr = index"
            @mouseleave="changeBgr = ''"
            class="list-group-item border my-1 p-3 d-flex align-items-center justify-content-between rounded-md"
            style="cursor: move"
            :class="changeBgr === index? 'bg-light' : ''"
            v-for="(element, index) in categories_origin"
            :key="element">
            <div class="col-9 d-flex align-items-center">
              <i class="fas fa-grip-vertical pe-3"></i>
              <div>{{ element.title }}</div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  import { ref  } from 'vue';
  import CategoryDataService from "../../services/CategoryDataService";

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    async created(){
      await this.retrieveCategory()
    },
    methods:{
      async Save(){
        await this.saveChange()
        this.waitSave = false
        this.$toast.open({
          message: "Rearrange Categories Successfully!",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      }
    },
    setup(){
      const changeBgr = ref()
      const waitSave = ref()
      const loadData = ref(true)
      const localeDefault = ref('default')
      const categories_origin = ref()
      const retrieveCategory = async function() {
        await CategoryDataService.getAll(localeDefault.value)
        .then(response => {
          categories_origin.value = response.data;
          loadData.value = false
        })
        .catch(e => {
          console.log(e);
        });
      };
      
      const changePosition = async function() {
        for(let i = 0; i < categories_origin.value.length; i++){
          categories_origin.value[i].position = i
        }
      }

      const saveChange = async function(){
        waitSave.value = true
        const data = ref([])
        for(let i = 0; i < categories_origin.value.length; i++){
          data.value.push({
            id: categories_origin.value[i].id,
            identify: categories_origin.value[i].identify,
            position: categories_origin.value[i].position
          })
        }
        await CategoryDataService.updateRearrangeCategories(data.value)
        .then(response => {
          const data = ref()
          data.value = response
        })
        .catch(e => {
          console.log(e)
        })
      }
      return{
        changeBgr,
        waitSave,
        loadData,
        saveChange,
        categories_origin,
        retrieveCategory,
        changePosition,
      }
    },
  })
</script>