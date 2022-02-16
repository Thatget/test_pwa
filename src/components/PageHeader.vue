<template>
  <header>
    <header-panel></header-panel>
      <div class="d-flex container navbar">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/logo.svg" title="" alt="">
        </router-link>
        <div class="form-inline my-2 my-lg-0">
          <input v-model="textSearch" @keyup.enter="Search" placeholder="Search" class="form-control mr-sm-2" type="search" />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </div>
      </div>
  </header>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import HeaderPanel from './page_header/HeaderPanel.vue'
export default {
  components: { HeaderPanel },
  setup () {
    const textSearch = ref('')
    const router = useRouter()
    const Search = () => {
      if (textSearch.value) {
        router.replace({ query: { pageType: 'search-criteria', searchText: textSearch.value } })
        textSearch.value = ''
      }
    }
    return {
      textSearch, Search
    }
  }
}
</script>

<style>

</style>
