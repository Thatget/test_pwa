<template>
  <div class="home">
    <page-header></page-header>
    <nav-sections></nav-sections>
    <main-content></main-content>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import NavSections from '../components/NavSections.vue'
import MainContent from '../components/MainContent.vue'
import PageFooter from '../components/PageFooter.vue'
// import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  components: {
    PageHeader,
    NavSections,
    MainContent,
    PageFooter
  },
  watch: {
    $route (to, from) {
      console.log(to)
    }
  }
}
</script>
