<template>
  <div v-if="customerInfo" class="row">
     <div class="col-md-3 bg-light">
       <div>My account</div>
       <div>My Orders</div>
    </div>
    <div class="col-md-9 p-3 min-vh-100">
      <account-info :customerInfo="customerInfo"></account-info>
    </div>
  </div>
  <out-side v-else></out-side>
</template>

<script>
import AccountInfo from './customer/Account-Info.vue'
import OutSide from './customer/OutSide.vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { useCookies } from 'vue3-cookies'
export default {
  components: { OutSide, AccountInfo },
  async setup () {
    const store = useStore()
    const { cookies } = useCookies()
    const customerToken = cookies.get('customer_token')
    const customerInfo = ref()
    if (customerToken) {
      axios.get('http://local0m243.com/rest/V1/customers/me', { headers: { Authorization: `Bearer ${customerToken}` } })
        .then(response => {
          customerInfo.value = response.data
          console.log(response.data)
        })
        .catch(error => {
          store.commit('setError', error.response.data)
          console.log(error.response.data.message)
        })
    }
    return {
      customerInfo
    }
  }
}
</script>
