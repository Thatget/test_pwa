<template>
  <div class="home">
    <page-header></page-header>
    <nav-sections></nav-sections>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import NavSections from '../components/NavSections.vue'

export default {
  name: 'Home',
  components: {
    PageHeader,
    NavSections
  }
}
</script>
