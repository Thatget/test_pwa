<template>
  <header>
    <header-panel></header-panel>
      <div class="d-flex container navbar">
        <div class="row">
          <div class="col-6">
            <a class="logo" href="https://startpwa.com/index.php/" title="" aria-label="store logo">
              <img src="https://startpwa.com/static/version1638845206/frontend/Magento/luma/en_US/images/logo.svg" title="" alt="" width="170">
            </a>
          </div>
          <div class="col-6 d-flex">
            <div class="d-flex">
              <input v-model="textSearch" @keyup.enter="Search" placeholder="Search" />
              <i class="bi bi-cart"></i>
            </div>
          </div>
        </div>
      </div>
  </header>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import HeaderPanel from './page_header/HeaderPanel.vue'
export default {
  components: { HeaderPanel },
  setup () {
    const store = useStore()
    const textSearch = ref('')
    const Search = () => {
      store.commit('setTextSearch', textSearch.value)
      store.commit('setShowProductDetail', false)
    }
    return {
      textSearch, Search
    }
  }
}
</script>

<style>

</style>
