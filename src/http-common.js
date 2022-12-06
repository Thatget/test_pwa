import axios from "axios";
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

const baseURL = process.env.VUE_APP_BACKEND_LINK
var url = window.location.href;
let accessToken = ''
if(url.indexOf('?accessToken=') === -1){
  if (!isShopifyEmbedded()) {
    if (typeof localStorage !== 'undefined') {
      accessToken = localStorage.getItem('admin-accessToken');
    } 
  } 
}
else {
  accessToken = url.slice(url.search('=') + 1, url.search('&'))
}
export default axios.create({
  baseURL: baseURL+"/api",
  headers: {
    "x-access-token": accessToken
  }
});
