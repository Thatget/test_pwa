<template>
<div class="container-fluid mt-3 mb-3">
  <div class="row g-2">
    <div v-for="product in currentProductList" :key="product.id" class="col-md-3">
      {{ product.id }}
      <div class="card">
        <div class="img-container">
          <div class="d-flex justify-content-between align-items-center p-2 first">
            <span class="percent">-25%</span> <span class="wishlist"><i class="fa fa-heart"></i></span>
          </div>
          <a @click="toDetailPage(product.id)">
            <img :src="baseUrl + 'media/catalog/product' + product.media_gallery_entries[0].file" class="img-fluid">
          </a>
        </div>
        <div class="product-detail-container">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0">{{ product.name }}</h6> <span class="text-danger font-weight-bold">${{ product.price }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="ratings"> <i class="fa fa-star"></i> <span>4.5</span> </div>
            <div class="size"> <label class="radio"> <input type="radio" name="size1" value="small"> <span>S</span> </label> <label class="radio"> <input type="radio" name="size1" value="Medium" checked> <span>M</span> </label> <label class="radio"> <input type="radio" name="size1" value="Large"> <span>L</span> </label> </div>
          </div>
          <div class="mt-3"> <button class="btn btn-danger btn-block">Buy Now</button> </div>
        </div>
      </div>
    </div>
  </div>
  <div aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="pageId in page" :key="pageId" class="page-item">
        <a @click="paginate(4,pageId)" class="page-link" href="#">{{ pageId }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity'
export default {
  props: {
    searchText: String
  },
  async setup (props) {
    const produtList = ref()
    const route = useRoute()
    const currentProductList = ref()
    const page = ref()
    const baseUrl = 'https://startpwa.com/'

    const searchQuery = ref()
    searchQuery.value = route.query

    if (searchQuery.value.textSearch) {
      console.log('xx')
    }

    const getSearchResult = async (searchText) => {
      const api = `${baseUrl}rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${searchText}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`
      await axios.get(api).then(response => {
        produtList.value = response.data
      })
    }

    await getSearchResult(props.searchText)

    const paginate = (pageSize, pageNumber) => {
      page.value = Math.ceil((produtList.value.items.length) / 4)
      currentProductList.value = (produtList.value.items).slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    }

    paginate(8, 1)

    return { baseUrl, produtList, getSearchResult, paginate, currentProductList, page }
  },
  methods: {
    toDetailPage (productId) {
      for (var i = 0; i < this.currentProductList.length; i++) {
        if (productId === this.currentProductList[i].id) {
          this.$emit('detailProduct', this.currentProductList[i])
        }
      }
    }
  },
  watch: {
    searchText: async function (newVal) {
      await this.getSearchResult(newVal)
      this.paginate(8, 1)
    }
  }
}
</script>
