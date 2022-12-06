<template>
  <div class="d-flex align-items-center justify-content-center bg-white" style="height: 100vh; width: 100vw">
    <div class="p-4 border bg-light col-8 col-md-4" style="border-radius: 10px;">
      <h3 class="text-center text-color-primary">FAQ ADMIN</h3>
      <div class="mb-3">
        <label for="user-name" class="form-label">User Name</label>
        <input type="email" class="form-control" id="user-name" v-model="userName">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div class="d-flex pt-3">
        <button @click="login" class="btn bgr-primary text-white m-auto py-2">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import store from "../../store";
import { ref } from "vue"
import { useRoute } from 'vue-router';
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

export default {
  setup(){
    const toast = inject('$toast');
    const userName = ref()
    const password = ref()
    const route = useRoute()
    const backendLink = process.env.VUE_APP_BACKEND_LINK
    const login = () => {
      if(userName.value === store.state.data.admin_account.user_name && 
        password.value === store.state.data.admin_account.password
        ){
        store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
        store.dispatch('data/setAdminAuth', true)
        if (!isShopifyEmbedded()) {
          if (typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem('isAdminAuth', true);
            } catch(e) {
              console.log(e)
            }
          } 
        } 
        location.href = backendLink + '/admin'
      }
      else{
        toast.open({
          message: "User name or password incorrect !",
          type: "error",
          duration: 3000,
          dismissible: true
        })
      }
    }
    return{
      login,
      userName,
      password
    }
  },
}
</script>