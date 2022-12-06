<template>
    <div class="mb-3 w-100" style="position:relative; top: 41px;font-family:inherit">
    <div class="col-12 px-4" style="margin: auto">
      <div class="d-flex align-items-center w-100 justify-content-between border-bottom" style="z-index: 999999999 !important;position: sticky; top: 41px; background-color: #f6f6f7;">
        <div class="d-flex align-items-center py-3">
          <a @click="$router.go(-1)" class="text-decoration-none" style="cursor:pointer">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </a>
          <!-- <router-link to="/setting" class="text-decoration-none">
            <i class="fas fa-long-arrow-alt-left rounded-3 fs-4 d-flex justify-content-center align-items-center me-3" style="border:1px solid #9ea5ac; height: 40px; width: 40px; color: #5c5f62"></i>
          </router-link> -->
          <div>
            <span class="fs-5 fw-bold me-2">Translation</span>
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
      <div class="pb-4">
        <div class="col-12 col-md-8 bg-white border mt-4 p-4" style="border-radius: 10px; margin: auto">
          <span class="fw-bold">Choose the primary language</span>
          <select class="form-select mt-2" aria-label="Default select example" @change="changeLanguage" v-model="faqMessagesSetting.primary_language">
            <option v-for="item in translationData" :key="item" :value="item.country">{{ item.country }}</option>
          </select>
        </div>
        <div class="mt-4">
          <div class="col-12 col-md-8 bg-white border p-4" style="border-radius: 10px; margin: auto">
            <div class="">
              <label :for="contactUsTitle" class="form-label mb-0 fw-bold">Contact Us</label>
              <input placeholder="eg. Contact Us" type="email" class="form-control mt-1" v-model="contactUsTitle" :id="contactUsTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="faqTitle" class="form-label mb-0 fw-bold">FAQs</label>
              <input placeholder="eg. FAQs" type="email" class="form-control mt-1" v-model="faqTitle" :id="faqTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="categoryTitle" class="form-label mb-0 fw-bold">Categories</label>
              <input placeholder="eg. Categories" type="email" class="form-control mt-1" v-model="categoryTitle" :id="categoryTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="searchTitle" class="form-label mb-0 fw-bold">Search</label>
              <input placeholder="eg. Search" type="email" class="form-control mt-1" v-model="searchTitle" :id="searchTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="yourNameTitle" class="form-label mb-0 fw-bold">Your Name</label>
              <input placeholder="eg. Search" type="email" class="form-control mt-1" v-model="yourNameTitle" :id="yourNameTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="messagesTitle" class="form-label mb-0 fw-bold">Messages</label>
              <input placeholder="eg. Messages" type="email" class="form-control mt-1" v-model="messagesTitle" :id="messagesTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="sendTitle" class="form-label mb-0 fw-bold">Send</label>
              <input placeholder="eg. Send" type="email" class="form-control mt-1" v-model="sendTitle" :id="sendTitle" aria-describedby="emailHelp">
            </div>

            <div class="mt-3">
              <label :for="contactTitle" class="form-label mb-0 fw-bold">Contact</label>
              <input placeholder="eg. Contact" type="email" class="form-control mt-1" v-model="contactTitle" :id="contactTitle" aria-describedby="emailHelp">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import store from '../../store';
import MessagesSettingDataService from "../../services/MessagesSettingDataService";
import { inject } from 'vue'

export default {
  setup(){
    const waitSave = ref()
    const country = ref('English')
    const translationData = ref()
    const faqMessagesSetting = ref()
    const toast = inject('$toast');
    const contactUsTitle = ref()
    const faqTitle = ref()
    const categoryTitle = ref()
    const yourNameTitle = ref()
    const messagesTitle = ref()
    const contactTitle = ref()
    const sendTitle = ref()
    const searchTitle = ref()
    faqMessagesSetting.value = store.state.data.faq_messages_setting
    const changeLanguage = () => {
      translationData.value = JSON.parse(faqMessagesSetting.value.translation)
      translationData.value.forEach(item => {
        if(item.country === faqMessagesSetting.value.primary_language){
          contactUsTitle.value = item.contact_us
          faqTitle.value = item.faq
          categoryTitle.value = item.categories
          yourNameTitle.value = item.your_name
          messagesTitle.value = item.messages
          contactTitle.value = item.contact
          sendTitle.value = item.send
          searchTitle.value = item.search
        }
      })
    }
    const retriveMessagesSetting = async () => {
      await MessagesSettingDataService.findOne()
      .then(response => {
        store.dispatch('data/setFaqMessagesSetting', response.data)
        faqMessagesSetting.value = store.state.data.faq_messages_setting
        changeLanguage()
      })
      .catch(async e => {
        console.log(e)
      })
    }

    const Save = async () => {
      waitSave.value = true
      const translationUpdateData = ref([])
      JSON.parse(faqMessagesSetting.value.translation).forEach(item => {
        if(item.country === faqMessagesSetting.value.primary_language){
          const data = {
            country: item.country,
            contact_us : contactUsTitle.value,
            faq : faqTitle.value,
            categories : categoryTitle.value,
            your_name : yourNameTitle.value,
            messages : messagesTitle.value,
            contact : contactTitle.value,
            send : sendTitle.value,
            search : searchTitle.value
          }
          translationUpdateData.value.push(data)
        }
        else{
          translationUpdateData.value.push(item)
        }
      })
      faqMessagesSetting.value.translation = JSON.stringify(translationUpdateData.value)
      await MessagesSettingDataService.update(faqMessagesSetting.value)
      .then(async response => {
        const id = ref()
        id.value = response
        await retriveMessagesSetting()
        waitSave.value = false
        toast.open({
          message: "Update Successfully !",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      })
      .catch(e => {
        console.log(e)
        waitSave.value = false
        toast.open({
          message: "Update Error !",
          type: "error",
          duration: 3000,
          dismissible: true
        })
      })
    }
    return{
      changeLanguage,
      contactUsTitle,
      faqTitle,
      categoryTitle,
      yourNameTitle,
      messagesTitle,
      contactTitle,
      sendTitle,
      searchTitle,
      retriveMessagesSetting,
      waitSave,
      faqMessagesSetting,
      Save,
      translationData,
      country
    }
  },
  mounted(){
    this.changeLanguage()
  }
}
</script>

<style>

</style>