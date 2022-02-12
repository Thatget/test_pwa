<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="categories in showedNav" :key="categories.id">
          <template v-if="categories.is_active">
            <template v-if="categories.children_data.length">
              <div class="dropdown">
                <a @click="choseCategory(categories.id)" style="color: inherit;cursor: pointer;text-decoration: none;" class="dropbtn">{{ categories.name }}</a>
                <div class="dropdown-content">
                  <a v-for="subCategory in categories.children_data" @click="choseCategory(subCategory.id)" :key="subCategory.id" href="#">{{ subCategory.name }}</a>
                </div>
              </div>
            </template>
            <div v-else>
              <router-link :to="{ name: 'Home', query: { pageType: 'search-criteria', categoryId: categories.id }}">{{ categories.name }}</router-link>
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
.dropbtn {
  padding: 16px;
  font-size: 16px;
  border: none;
}

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
