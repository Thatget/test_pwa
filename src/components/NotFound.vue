<template>
  <div class="col-12 col-xl-6 text-break d-flex align-items-center justify-content-center flex-column pb-5" style="margin:auto; height: 100vh">
    <img src="././../../public/Logo-App.png" class="rounded" style="height: 50px">
		<div class="text-color-primary mt-4" style="font-size: .9rem">404 ERROR</div>
    <h1 class="m-0" style="font-weight:900">This page does not exist.</h1>
    <span class="mt-2">The page you are looking for could not be found.</span>
    <div class="mt-3">
      <router-link to="/storeFAQs" class="text-decoration-none btn bgr-primary btn-primary-hover text-white">Go back home →</router-link>
    </div>
  </div>
</template>

<script>
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';
import { ref  } from 'vue';

export default {
  setup(){
    const checkEmbededApp = ref()
    if (isShopifyEmbedded()) {
      checkEmbededApp.value = true
    } else {
      checkEmbededApp.value = false
    }
    return{
      checkEmbededApp
    }
  }
}
</script>

<style>
</style>