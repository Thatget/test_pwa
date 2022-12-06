<template>
  <div class="fs-6">
    <div class="fs-6 my-2 fw-bold d-flex align-items-center justify-content-between w-100">
      <div class="fw-bold">
        <span>Total: {{ RatingSuggest.length }} Rate</span>
      </div>
      <div class="d-flex align-items-center">
        <label for="search-merchant">Search</label>
        <input type="email" class="form-control ms-3" @input="searchDomain" v-model="shopifyDomain" id="search-merchant" aria-describedby="emailHelp">
      </div>
    </div>
    <div class="border bg-white" style="border-radius: 10px">
      <div class="d-flex align-items-center text-center fw-bold p-2">
        <!-- <div class="col-1 px-1">ID</div> -->
        <div class="col-3 px-1">Domain</div>
        <div class="col-2 px-1">Rating star</div>
        <div class="col px-1">Comment</div>
        <div class="col-2 px-1">Time</div>
      </div>
      <div v-if="RatingSuggest.length > 0">
        <div class="d-flex align-items-center text-center border-top p-2" v-for="item in RatingSuggest" :key="item">
          <!-- <div class="col-1 px-1">{{ item.id }}</div> -->
          <div class="col-3 p-1">{{ item.domain }}</div>
          <div class="col-2 p-1">{{ item.star }}</div>
          <div class="col p-1">{{ item.comment }}</div>
          <div class="col-2 p-1">{{ item.createdAt }}</div>
        </div>
      </div>
      <div v-else class="">
        
      </div>
    </div>
  </div>
</template>

<script>
// import RatingDataService from '../../services/RatingDataService';
import { ref } from "vue";

export default {
  props: {
    rattingData: Array,
  },
  setup(props){
    console.log(props.rattingData)
    const RatingSuggest = ref(props.rattingData)
    const shopifyDomain = ref()
    const RatingSuggestOrigin = ref(props.rattingData)
    RatingSuggest.value.forEach(item => {
      let date = ''
      date = new Date(item.createdAt).toString()
      item.createdAt = date.slice(0, date.indexOf('GMT'))
    })

    const searchDomain = () => {
      if(shopifyDomain.value == '' || shopifyDomain.value == undefined){
        RatingSuggest.value = RatingSuggestOrigin.value
      }
      else{
        RatingSuggest.value = RatingSuggestOrigin.value.filter((item)=>{
          return shopifyDomain.value.toLowerCase().split(' ').every(v => item.domain.toLowerCase().includes(v))
        })
      }
    }
    return{
      shopifyDomain,
      RatingSuggest,
      searchDomain
    }
  },
  async created() {
  }
}
</script>