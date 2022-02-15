<template>
  <div class="row">
      <div class="col">
          <img :src="baseUrl + 'media/catalog/product' + parentvariable.media_gallery_entries[0].file" alt="" style="width:100%">
      </div>
      <div class="col">
          <h3>{{ parentvariable.name }}</h3>
          <div class="d-flex justify-content-between" style="padding:10px; border-bottom: 1px solid #c1c1c1;">
              <div>Price: {{ parentvariable.price }} $</div>
              <div>SKU: {{ parentvariable.sku }}</div>
          </div>
          <div style="padding: 10px" v-html="shortDescription"></div>
          <div>
            <button class="btn btn-primary">Add To Cart</button>
          </div>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  props: {
    parentvariable: Object
  },
  setup (props) {
    const store = useStore()
    console.log(store.state)
    const baseUrl = 'https://startpwa.com/'
    const shortDescription = ref('')
    const x = ref(props)
    for (var i = 0; i < props.parentvariable.custom_attributes.length; i++) {
      if (props.parentvariable.custom_attributes[i].attribute_code === 'short_description') {
        shortDescription.value = x.value.parentvariable.custom_attributes[i].value
      }
    }
    console.log(props.parentvariable)
    return { baseUrl, shortDescription }
  }
}
</script>

<style>

</style>
