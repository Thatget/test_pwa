<template>
  <h2>ss</h2>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
export default {
  async setup () {
    const baseUrl = 'https://startpwa.com/'
    const token = ref('')
    // const userData = {
    //   username: 'roni_cost@example.com',
    //   password: 'roni_cost3@example.com'
    // }
    const api = `${baseUrl}/rest/V1/integration/customer/token?username=roni_cost@example.com&password=roni_cost3@example.com`
    await axios.post(api).then(response => {
      console.log(response.data)
      token.value = response.data
    })

    const config = {
      headers: { Authorization: `Bearer ${token.value}` }
    }

    await axios.get(`${baseUrl}rest/V1/customers/me`, config)
      .then(response => {
        console.log(response.data)
      }).catch(console.log)
    return {
    }
  }
}
</script>
