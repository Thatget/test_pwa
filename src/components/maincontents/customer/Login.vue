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
                        <button class="btn btn-primary">Sign In</button>
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
import { ref } from '@vue/reactivity'
export default {
  async setup () {
    const baseUrl = 'http://local0m243.com/'
    const token = ref('')
    const email = ref('')
    const password = ref('')

    const logIn = () => {
      const api = `${baseUrl}/rest/V1/integration/customer/token?username=${email.value}&password=${password.value}`
      axios.post(api).then(response => {
        console.log(response.data)
        token.value = response.data
      })
    }
    return {
      logIn
    }
  }
}
</script>
