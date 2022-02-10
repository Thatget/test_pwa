<template>
  <h2>ss</h2>
</template>

<script>
import axios from 'axios'
export default {
  setup () {
    const baseUrl = 'https://startpwa.com/'
    const userData = {
      username: 'roni_cost@example.com',
      password: 'roni_cost3@example.com'
    }
    const api = `${baseUrl}index.php/rest/V1/integration/customer/token`
    axios.post(api, userData).then(response => {
      console.log(response.data)
    })
    return {
    }
  }
}
</script>

<style>

</style>
