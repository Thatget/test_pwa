<template>
<div style="background-color: #6e716e; color: #ffffff;">
    <div class="d-flex flex-row-reverse container">
        <div class="d-flex p-2">
            <span class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            USD - US Dollar
            </span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="p-3" href="#">EUR - Euro</a>
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
          cookies.set('customer_token', customerToken, '1h')
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
a.dropdown-menu {
    background-color:red;
}
</style>
