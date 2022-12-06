<template>
  <div id="app" class="d-flex">
    <select class="form-select me-4" aria-label="Default select example" style="width: 200px; height: 40px" v-model="color">
      <option value="black">Black</option>
      <option value="red">Red</option>
      <option value="yellow">Yellow</option>
      <option value="blue">Blue</option>
    </select>
    <div style="height: 200px; width:200px" :style="`background-color: ${color}`"></div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup(){
    const color = ref()
    return{
      color,
    }
  }
}
</script>
<style>
</style>