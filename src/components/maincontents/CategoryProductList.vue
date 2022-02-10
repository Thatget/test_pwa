<template>
<div class="container-fluid mt-3 mb-3">
  <div class="row g-2">
    <div v-for="product in currentProductList" :key="product.id" class="col-md-3">
      <div class="card">
        <div class="img-container">
          <a @click="toDetailPage(product.id)">
            <img :src="baseUrl + 'media/catalog/product' + product.media_gallery_entries[0].file" class="img-fluid">
          </a>
        </div>
        <div class="product-detail-container">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0">{{ product.name }}</h6> <span class="text-danger font-weight-bold">${{ product.price }}</span>
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
        <a @click="paginate(8,pageId)" class="page-link" href="#">{{ pageId }}</a>
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
import { ref } from '@vue/reactivity'
export default {
  props: {
    categoryId: Number
  },
  async setup (props) {
    const produtList = ref()
    const currentProductList = ref()
    const page = ref()
    const baseUrl = 'https://startpwa.com/'

    const getSearchResult = async (categoryId) => {
      const api = `${baseUrl}rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}`
      await axios.get(api).then(response => {
        produtList.value = response.data
      })
    }
    await getSearchResult(props.categoryId)
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
    categoryId: async function (newVal) {
      await this.getSearchResult(newVal)
      this.paginate(8, 1)
    }
  }
}
</script>
<style scoped>
.card {
  border: none;
}
</style>
