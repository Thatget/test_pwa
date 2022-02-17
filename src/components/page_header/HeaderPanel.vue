<template>
<div class="d-flex flex-row-reverse" style="background-color: #6e716e; color: #ffffff;">
    <div class="d-flex p-2">
        <strong class="language-USD">
            <span>USD - US Dollar</span>
        </strong>
        <button type="button" class="dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <ul class="nav" >
                <li class="currency-EUR switcher-option">
                    <a href="#" style="color: #333333 !important;">EUR - Euro</a>
                </li>
            </ul>
        </div>
    </div>
    <ul v-if="customerInfo" class="nav nav-pills">
        <li class="p-2">
            <div class="btn-group">
                <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span>Welcome, {{ customerInfo.firstname + ' ' + customerInfo.lastname }}</span>
                </span>
                <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item" type="button">My Account</button>
                    <button class="dropdown-item" type="button">My Wish List</button>
                    <button @click="signOut" class="dropdown-item" type="button">Sign Out</button>
                </div>
            </div>
        </li>
    </ul>
    <ul v-else class="nav nav-pills">
        <li class="p-2">
            <span class="not-logged-in" data-bind="html: 'Default welcome msg!'">Default welcome msg!</span>
        </li>
        <li class="p-2">
            <router-link :to="{ name: 'Home', query: { pageType: 'customer' }}">Sign In</router-link>
        </li>
        <li class="p-2">
            <a href="#">Create an Account</a>
        </li>
    </ul>
</div>
</template>

<script>
import { useCookies } from 'vue3-cookies'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const { cookies } = useCookies()
    const router = useRouter()
    const customerToken = cookies.get('customer_token')
    const customerInfo = ref()

    if (customerToken) {
      axios.get('http://local0m243.com/rest/V1/customers/me', { headers: { Authorization: `Bearer ${customerToken}` } })
        .then(response => {
          customerInfo.value = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response.data.message)
        })
    }

    const signOut = () => {
      cookies.remove('customer_token')
      router.go('home')
    }
    return {
      customerInfo, signOut
    }
  }

}
</script>

<style scoped>
li a {
    color: #ffffff;
    text-decoration: none;
}
</style>
