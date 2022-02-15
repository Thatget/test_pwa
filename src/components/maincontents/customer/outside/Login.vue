<template>
    <div class="mb-3 p-3">
        <div>
            <h1>Customer Login</h1>
        </div>
        <div class="row">
            <div class="col-6">
                <h5>Registered Customers</h5>
                <hr>
                <div class="container">
                    <h6>If you have an account, sign in with your email address.</h6>
                    <div>
                        <div class="mb-3">
                            <label>Email:</label>
                            <input v-model="email" type="text" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label>Password:</label>
                            <input v-model="password" type="password" class="form-control">
                        </div>
                        <div class="mb-3">
                            <input type="checkbox" name="" id="" style="margin: 2px 5px 0 0;">
                            <label>Show Password</label>
                        </div>
                        <button @click="logIn" class="btn btn-primary">Sign In</button>
                        <a style="margin-left: 15px;" class="action remind" href="https://startpwa.com/index.php/customer/account/forgotpassword/"><span>Forgot Your Password?</span></a>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <h5>New Customers</h5>
                <hr>
                <p>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.Create an Account Try Demo Customer Access</p>
                <br>
                <button class="btn btn-primary">Create an Account</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies'
import { ref } from '@vue/reactivity'
export default {
  async setup () {
    const store = useStore()
    const { cookies } = useCookies()
    const baseUrl = 'https://startpwa.com/'
    const email = ref('')
    const password = ref('')
    const logIn = async () => {
      const api = `${baseUrl}/rest/V1/integration/customer/token?username=${email.value}&password=${password.value}`
      await axios.post(api).then(async (response) => {
        // await store.commit('SET_CUSTOMER_TOKEN', token.value)
        cookies.set('customer_token', response.data, '5m')
      })
        .catch(error => {
          store.commit('setError', error.response.data)
          console.log(error.response.data.message)
        })
    }
    return {
      email, password, logIn
    }
  }
}
</script>
