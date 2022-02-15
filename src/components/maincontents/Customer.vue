<template>
  <account-info v-if="customerInfo"></account-info>
  <out-side v-else></out-side>
</template>

<script>
import AccountInfo from './customer/Account-Info.vue'
import OutSide from './customer/OutSide.vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { useCookies } from 'vue3-cookies'
import { computed } from 'vue'
export default {
  components: { OutSide, AccountInfo },
  async setup () {
    const store = useStore()
    const { cookies } = useCookies()
    const customerToken1 = cookies.get('customer_token')
    const customerToken = computed(() => store.state.customerToken)
    const customerInfo = ref()
    console.log(customerToken1)
    if (customerToken.value) {
      axios.get('http://magento.docker/rest/default/V1/customers/me', { headers: { Authorization: `Bearer ${customerToken.value}` } })
        .then(response => {
          customerInfo.value = response.data
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
