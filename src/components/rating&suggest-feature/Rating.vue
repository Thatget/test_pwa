<template>
  <div class="modal-body">
    <div class="px-1">
      <div v-if="!rating">
        <div class="d-flex align-items-start">
          <span class="d-none d-md-flex mt-1">If our App is helpful to you, please rate and give us some feedback so we can improve our app better for you😀</span>
          <span class="d-flex d-md-none mt-1">Please rate and give us some feedback</span>
          <star-rating class="fs-6 ms-1" :show-rating="false" :star-size="30" @update:rating="changeStar" :glow="5" glow-color="#ffd055"></star-rating>
        </div>
        <div v-if="ratingstar" class="fw-bold mt-2">
          You rate {{ ratingstar }}-stars out of 5
        </div>
      </div>
      <div v-else class="d-flex fs-6">
        <div>Your rating</div>
        <div class="ms-2">
          <i v-if="ratingstar > 0" class="fa-solid fa-star" style="color: #ffd055"></i>
          <i v-if="ratingstar > 1" class="fa-solid fa-star" style="color: #ffd055"></i>        
          <i v-if="ratingstar > 2" class="fa-solid fa-star" style="color: #ffd055"></i>        
          <i v-if="ratingstar > 3" class="fa-solid fa-star" style="color: #ffd055"></i>        
          <i v-if="ratingstar > 4" class="fa-solid fa-star" style="color: #ffd055"></i>                
        </div>
      </div>
      <div class="d-flex align-items-start mt-2 w-100">
        <div class="border p-3 bg-light w-100" style="border-radius: 10px;">
          <div class="">
            <label class="form-label" for="suggest">Comment / Suggest Feature</label>
            <textarea class="form-control py-2" @input="commenting" v-model="ratingComment" style="height: 100px" placeholder="Comment ..." id="suggest"></textarea>
          </div>      
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" :disabled="disableButton" class="btn btn-primary-hover d-flex align-items-center bgr-primary text-white" @click="submit">
      <span>Submit</span>
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
    <button type="button" data-bs-dismiss="modal" class="btn btn-secondary text-white close-modal-rating">Cancel</button>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { ref } from 'vue'
import store from "../../store";
import { inject } from 'vue'
import RatingDataService from "../../services/RatingDataService";

export default {
  components: {
    StarRating
  },
  setup(){
    const disableButton = ref(true)
    const disableUpdate = ref()
    const toast = inject('$toast');
    const ratingComment = ref()
    const rating = ref(store.state.data.rating_data.star)
    const ratingstar = ref(store.state.data.rating_data.star)
    const commenting = () => {
      if(ratingComment.value.length > 0 || ratingstar.value){
        disableButton.value = false
      }
      else{
        disableButton.value = true
      }
    }
    const changeStar = (rating) => {
      ratingstar.value = rating   
      if(rating > 3){
        window.open('https://apps.shopify.com/yanet-professional-faq-page#modal-show=ReviewListingModal')
      }
      if(rating){
        disableButton.value = false
      }
    }
    const submit = async() => {
      disableUpdate.value = true
      if(ratingstar.value){
        const data = {
          star : ratingstar.value,
          comment : ratingComment.value,
          email : store.state.auth.email,
          domain : store.state.auth.shopifyDomain
        }
        if(store.state.data.rating_data.star){
          if(ratingComment.value){
            await RatingDataService.update(data)
            .then(response => {
              toast.open({
                message: "Thank you so much for your suggest !",
                type: "success",
                duration: 3000,
                dismissible: true
              })
              rating.value = ratingstar.value
              store.dispatch('data/setRatingData', data)
              console.log(response)
              ratingComment.value = ''
              document.getElementsByClassName('close-modal-rating')[0].click()
              disableUpdate.value = false
              disableButton.value = false
            })
            .catch(e => {
              console.log(e)
            })
          }
          else{
            toast.open({
              message: "Please enter comment!",
              type: "default",
              duration: 3000,
              dismissible: true
            })
            disableUpdate.value = false
          }
        }
        else{
          await RatingDataService.create(data)
          .then(response => {
            toast.open({
              message: "Thank you so much for your rate !",
              type: "success",
              duration: 3000,
              dismissible: true
            })
            rating.value = ratingstar.value
            store.dispatch('data/setRatingData', data)
            ratingComment.value = ''
            document.getElementsByClassName('close-modal-rating')[0].click()
            disableUpdate.value = false
            disableButton.value = false
            console.log(response)
          })
          .catch(e => {
            console.log(e)
          })
        }
      }
      else{
        if(!ratingComment.value){
          disableButton.value = true
        }
        else{
          toast.open({
            message: "Thank you so much for your suggest !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          disableButton.value = false
        }
        disableUpdate.value = false
      }
    }
    return{
      commenting,
      disableButton,
      disableUpdate,
      rating,
      submit,
      ratingComment,
      changeStar,
      ratingstar
    }
  },
}
</script>
<style>
</style>