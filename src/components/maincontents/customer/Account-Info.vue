<template>
  <div>
    <h1>My account</h1>
    <div class="container">
      <strong>Account Infomation</strong>
      <hr>
      <div class="row">
        <div class="col-sm-6">
          <h5>Contact Infomation</h5>
          <h6>{{ customerInfo.firstname + ' ' + customerInfo.lastname }}</h6>
          <span> {{customerInfo.email }}</span>
        </div>
        <div class="col-sm-6">
          <h5>Newsletter</h5>
          <div v-if="customerInfo.extension_attributes.is_subscribed">
            Newsletter Info
          </div>
          <div v-else>
            You aren't subscribed to our newsletter.
          </div>
        </div>
      </div>
    </div>
    <div class="container p-4">
      <strong>Address Book</strong>
      <hr>
      <div class="row">
        <div class="col-sm-6">
          <h5>Default Billing Address</h5>
          <address v-if="billingAddress">
            {{ billingAddress.firstname + ' ' + billingAddress.lastname }}
            <br>
            <template v-for="addressStreet in billingAddress.street" :key="addressStreet">{{ addressStreet }}</template>
            <br>
            {{ billingAddress.city + ',' + billingAddress.postcode }}
            <br>
            T: <a :href="'tel:' + billingAddress.telephone">{{ billingAddress.telephone }}</a>
          </address>
          <span v-else>The customer does not have default billing address</span>
        </div>
        <div class="col-sm-6">
          <h5>Default Shipping Address</h5>
          <address v-if="shippingAddress">
            {{ shippingAddress.firstname + ' ' + shippingAddress.lastname }}
            <br>
            <template v-for="addressStreet in shippingAddress.street" :key="addressStreet">{{ addressStreet }}</template>
            <br>
            {{ shippingAddress.city + ',' + shippingAddress.postcode }}
            <br>
            T: <a :href="'tel:' + shippingAddress.telephone">{{ shippingAddress.telephone }}</a>
          </address>
          <span v-else>The customer does not have default shipping address</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
export default {
  props: {
    customerInfo: Object
  },
  setup (props) {
    const billingAddress = ref()
    const shippingAddress = ref()
    const { customerInfo } = toRefs(props)

    if (customerInfo.value.default_billing) {
      for (let i = 0; i < customerInfo.value.addresses.length; i++) {
        if (Number(customerInfo.value.default_billing) === customerInfo.value.addresses[i].id) {
          billingAddress.value = customerInfo.value.addresses[i]
        }
      }
    }
    if (customerInfo.value.default_shipping) {
      for (let i = 0; i < customerInfo.value.addresses.length; i++) {
        if (Number(customerInfo.value.default_shipping) === customerInfo.value.addresses[i].id) {
          shippingAddress.value = customerInfo.value.addresses[i]
        }
      }
    }
    console.log(customerInfo.value)
    return {
      shippingAddress, billingAddress
    }
  }

}
</script>

<style>

</style>
