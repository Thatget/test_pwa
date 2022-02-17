<template>
<div class="container p-4">
  <Suspense v-if="pageType === 'customer'">
    <customer></customer>
  </Suspense>
  <product-detail v-if="showProductDetail" :parentvariable="parentvariable"></product-detail>
  <Suspense v-else-if="pageType === 'search-criteria'">
    <search-result @detailProduct="updateparent" :searchText="textSearch"></search-result>
  </Suspense>
</div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import SearchResult from './maincontents/SearchResult.vue'
import ProductDetail from './maincontents/ProductDetail.vue'
import Customer from './maincontents/Customer.vue'

export default {
  components: { SearchResult, ProductDetail, Customer },
  setup () {
    const pageType = ref('')
    const route = useRoute()
    pageType.value = route.query.pageType
    console.log(pageType.value)
    const productDetail = ref()
    const baseUrl = 'https://startpwa.com/'
    const api = `${baseUrl}rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25Watch%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`
    axios.get(api).then(response => {
      productDetail.value = response.data.children_data
    })
    return {
      pageType
    }
  },
  data () {
    const store = useStore()
    return {
      store,
      parentvariable: null
    }
  },
  methods: {
    updateparent (variable) {
      this.store.commit('setShowProductDetail', true)
      this.parentvariable = variable
    }
  },
  computed: {
    textSearch () {
      return this.$store.state.textSearch
    },
    categoryId () {
      return this.$store.state.category
    },
    showProductDetail () {
      return this.$store.state.showProductDetail
    },
    errorMessage () {
      return this.$store.state.error
    }
  },
  watch: {
    $route (to, from) {
      this.pageType = to.query.pageType
    }
  }
}
</script>
