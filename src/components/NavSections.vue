<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="categories in showedNav" :key="categories.id">
          <template v-if="categories.is_active">
            <template v-if="categories.children_data.length">
              <div class="dropdown">
                <router-link :to="{ name: 'Home', query: { pageType: 'search-criteria', categoryId: categories.id }}" class="nav-link">{{ categories.name }}</router-link>
                <div class="dropdown-content">
                  <router-link v-for="subCategory in categories.children_data" :key="subCategory.id" :to="{ name: 'Home', query: { pageType: 'search-criteria', categoryId: subCategory.id }}">{{ subCategory.name }}</router-link>
                </div>
              </div>
            </template>
            <div v-else>
              <router-link :to="{ name: 'Home', query: { pageType: 'search-criteria', categoryId: categories.id }}" class="nav-link">{{ categories.name }}</router-link>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup () {
    const showedNav = ref([])
    const store = useStore()
    const choseCategory = (categoryId) => {
      store.commit('setTextSearch', '')
      store.commit('setShowProductDetail', false)
      store.commit('setCategoryId', categoryId)
    }
    // const token = 'vzxqyxpptpdk731i88me0brybqpj2u9r'
    const api = 'https://startpwa.com/rest/default/V1/categories?rootCategoryId=2&depth=2'
    axios.get(api).then(response => {
      showedNav.value = response.data.children_data
      // console.log(showedNav.value)
    })
    return { showedNav, choseCategory }
  }
}
</script>

<style scoped>

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

</style>
