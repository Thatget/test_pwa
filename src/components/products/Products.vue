<template>
  <div>
    <!-- <div style="width: 100%" class="position-sticky-menu">
      <div class="bgr-primary rounded-pill" :style="`height: 2px; width: ${progressSave}%`"></div>
    </div> -->
    <div class="px-4 mb-2">
      <div class="d-flex align-items-center justify-content-between position-sticky-menu">
        <div class="d-flex align-items-center">
          <div class="text-start fs-4 fw-bold py-3">Product FAQs</div>
          <div class="d-none d-sm-block ms-4">
            <select :disabled="progressSave"  @change="changeLocale" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
              <option :value="item.locale" v-for="item in locales" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
            </select>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="dropdown d-block d-sm-none">
            <div class="btn bg-white border d-flex p-0 align-items-center justify-content-center" style="width: 38px; height: 38px" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="me-1 rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
              <div class="me-1 rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
              <div class="rounded" style="width: 4px; height: 4px; background-color: #6d7175"></div>
            </div>
            <ul class="dropdown-menu text-nowrap px-3" style="min-width: 200px" aria-labelledby="dropdownMenuButton1">
              <div class="d-block text-start py-2">
                <select @change="changeLocale" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                  <option :value="item.locale" v-for="item in locales" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                </select>
              </div>
            </ul>
          </div>
          <div class="text-end ms-2">
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" :disabled="selectProductsId.length === 0 || progressSave" @click="Save" class="btn text-white bgr-primary d-flex">Save
              
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column flex-xl-row padding">
        <div class="col-12 col-xl-4 bg-white border rounded mb-3 mb-xl-0 me-0 me-xl-2">
          <div class="d-flex align-items-center m-3 justify-content-between">
            <div class="text-start fw-bold">Choose Product</div>
            <div class="d-flex align-items-center justify-content-center">
              <span>Products show</span>
              <select :disabled="progressSave"  v-if="showAllProduct" v-model="limit" @change="numberOfProductShow(limit)" class="form-select ms-2" style="width: unset !important" aria-label="Default select example">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="250">250</option>
              </select>
              <select :disabled="!showAllProduct" v-if="!showAllProduct" v-model="limitSearchValue" @change="numberOfProductShow(limit)" class="form-select ms-2" style="width: unset !important" aria-label="Default select example">
                <option>20</option>
              </select>
            </div>
          </div>
          <div style="min-height: 400px">
            <div class="mx-3">
              <input class="form-control" type="text" placeholder="Search Product" v-model="productTitle" @input="searchProducts">
            </div>
            <div v-if="showAllProduct" class="mb-3 me-2">
              <div v-if="!loadData">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center my-2 w-100 justify-content-between">
                    <div class="d-flex align-items-center" v-if="listProduct.length > 1">
                      <input :disabled="progressSave" @click="selectAllProduct" class="form-check-input mx-3" v-model="selectAll" type="checkbox" id="select-product" style="cursor: pointer">
                      <label class="form-check-label text-break fw-bold my-1" for="select-product" style="cursor: pointer">Select All</label>
                    </div>
                  </div>
                </div>
                <div style="max-height: 400px; overflow-y: auto" class="product-srcoll border-bottom">
                  <label @mouseenter="changeProduct(product.id), chooseProduct = index" style="cursor: pointer" :for="product.id" class="pe-2 d-flex align-items-center mb-2" :class="listProduct.length === 1? ' mt-3' : ''" v-for="(product, index) in listProduct" :key="index">
                    <div class="mx-3">
                      <input :disabled="progressSave" class="form-check-input" :id="product.id" style="cursor: pointer" type="checkbox" :value="product.id" v-model="selectProductsId">
                    </div>
                    <div :style="chooseProduct === index? ' background-color: #eee; color: #FF8200; flex: 1' : ' background-color: #f8f9fa; flex: 1'" :class="chooseProduct === index? 'product-acctive' : ''" class="d-flex border rounded align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <div class="text-center border-end" style="min-width: 80px">
                          <img :src="product.images[0].src" style="height: 50px">
                        </div>
                        <div class="m-3  text-ellipsis">{{product.title}}</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div v-else-if="loadData" class="d-flex justify-content-center align-items-center" style="min-height: 400px">
                <div class="loader loader--style8 d-flex align-items-center justify-content-center">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <rect x="0" y="50" width="4" height="10" fill="#FF8200" opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="8" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="16" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                </div>
              </div>
              <div v-else-if="listProduct.length === 0" class="text-center align-items-center d-flex justify-content-center pb-5" style="height: 400px">
                <span>Oops, your search did not match any Products</span>
              </div>
            </div>
            <div v-else class="product-srcoll mb-3 me-2">
              <div v-if="!loadDataSearch">
                <div class="d-flex align-items-center my-2" v-if="listProductSearch.length > 1">
                  <input @click="selectAllProduct" :disabled="progressSave" class="form-check-input mx-3" id="select-product-search" v-model="selectAll" type="checkbox" style="cursor: pointer">
                  <label for="select-product-search" class="my-1 fw-bold" style="cursor: pointer">Select All</label>
                </div>
                <div style="max-height: 400px; overflow-y: auto" class="product-srcoll">
                  <label style="cursor: pointer" @mouseenter="changeProductSearch(product.node.id), chooseProductSearch = index" :for="product.node.id" class="pe-2 d-flex align-items-center mb-2" v-for="(product, index) in listProductSearch" :key="index" :class="listProductSearch.length === 1? 'mt-3' : ''">
                    <div class="mx-3">
                      <input :id="product.node.id" :disabled="progressSave" class="form-check-input" type="checkbox" :value="product.node.id.slice(product.node.id.lastIndexOf('/') + 1)" v-model="selectProductsId" style="cursor: pointer">
                    </div>
                    <div :style="chooseProductSearch === index? ' background-color: #eee; color: #FF8200; flex: 1' : ' background-color: #f8f9fa; flex: 1'" :class="chooseProductSearch === index? 'product-acctive' : ''" class="d-flex border rounded align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div style="min-width: 80px" class="d-flex align-items-center justify-content-center border-end">
                          <img :src="product.node.images.edges[0].node.url" style="height: 50px"/>
                        </div>
                        <div class="form-check-label w-100 text-break p-3">
                          <span class="text-ellipsis">{{product.node.title}}</span>
                        </div>
                      </div>
                    </div>
                  </label>                
                </div>
              </div>
              <div v-else class="d-flex justify-content-center align-items-center" style="height: 400px">
                <div class="loader loader--style8 d-flex align-items-center justify-content-center">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <rect x="0" y="50" width="4" height="10" fill="#FF8200" opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="8" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="16" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                </div>
              </div>
              <div v-if="listProductSearch.length === 0" class="text-center align-items-center d-flex justify-content-center pb-5" style="height: 400px">
                <span>Oops, your search did not match any Products</span>
              </div>
            </div>
            <nav class="px-3 w-100" aria-label="Page navigation example" v-if="showPaginate && showAllProduct">
              <ul class="pagination d-flex justify-content-between align-items-center">
                <li style="cursor: pointer"><button :style="previousPaginate === false? 'color: gray' : ''" :disabled="previousPaginate === false" class="btn page-link rounded" @click="changeListProduct('back')">Previous</button></li>
                <li style="cursor: pointer"><button :style="nextPaginate === false? 'color: gray' : '' " :disabled="nextPaginate === false" class="btn page-link rounded" @click="changeListProduct('next')">Next</button></li>
              </ul>
            </nav>
            <nav class="px-3" aria-label="Page navigation example" v-if="!showAllProduct && listProductSearch.length > 19">
              <ul class="pagination d-flex justify-content-between align-items-center">
                <li style="cursor:pointer"><button :disabled="!hasPreviousPage" @click="changeListProductSearch('back')" class="btn page-link rounded" :style="hasPreviousPage === false? 'color: gray' : '' ">Previous</button></li>
                <li style="cursor:pointer"><button :disabled="!hasNextPage" @click="changeListProductSearch('next')" :style="hasNextPage === false? 'color: gray' : '' " class="btn page-link rounded">Next</button></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-12 col-xl bg-white border rounded ms-0 ms-xl-2">
          <div class="m-4 d-flex justify-content-between align-items-center" style="height: 22px">
            <div class="text-start fw-bold">Choose Faqs</div>
          </div>
          <div >
            <div class="mb-3 px-3 ">
              <input @input="searchInstantFaq" v-model="title" class="form-control" type="text" placeholder="Search Faq">
            </div>
            <div style="min-height: 400px" v-if="!loadDataFaqs">
              <div v-if="faqs.length > 0" class="product-srcoll ps-3 me-2 mb-2" style="max-height: 450px; overflow-y: auto">
                <div class="pe-2" v-for="category in categoriesCompact" :key="category" >
                  <div :class="hideCategory === true? 'd-none' :'text-end text-break fw-bold my-1' ">{{category.title}}</div>
                  <div class="d-flex flex-column justify-content-between">
                    <div v-for="faq in faqs" :key="faq">
                      <div class="d-flex mb-2 border rounded px-2 bg-light" style="cursor: pointer" v-if="faq.category_identify === category.identify">
                        <div class="me-2 py-3" style="cursor: pointer">
                          <input :disabled="progressSave" class="form-check-input" style="cursor: pointer" type="checkbox" :value="faq.id" v-model="faqId" :id="faq.id">
                        </div>
                        <label class="form-check-label w-100 text-break py-3" style="cursor: pointer" :for="faq.id">
                          <span>{{faq.title}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="faqs.length === 0">
                <div v-if="dontFaq && !searchFaqNotFound" class="d-flex align-items-center justify-content-center pb-5" style="height: 400px">
                  <div class="text-center align-items-center d-flex justify-content-center h-100">You don't have any FAQ. Please add a faq to use this feature !</div>
                </div>
                <div v-if="searchFaqNotFound" class="text-center align-items-center d-flex justify-content-center pb-5" style="height: 400px">
                  <span>Oops, your search did not match any FAQs</span>
                </div>
              </div>
            </div>
            <div v-else style="min-height: 400px" class="d-flex align-items-center justify-content-center">
              <div class="loader loader--style8 d-flex align-items-center justify-content-center">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                  <rect x="0" y="50" width="4" height="10" fill="#FF8200" opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                  <rect x="8" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                  <rect x="16" y="50" width="4" height="10" fill="#FF8200"  opacity="0.2">
                    <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryDataService from "../../services/CategoryDataService";
import { ref } from 'vue'
import FaqDataService from "../../services/FaqDataService";
import ProductsDataService from "../../services/ProductsDataService";
import GetProductList from "../../services/GetProductList";
import FaqProductDataService from "../../services/FaqProductDataService";
import swal from 'sweetalert';
import { debounce } from 'vue-debounce'
export default {
  setup() {
    const limitSearchValue = ref(20)
    const progressSave = ref(0)
    const selectAll = ref(false)
    const selectProductsId = ref([])
    const searchProductsNotFound = ref()
    const loadDataSearch = ref()
    const loadDataFaqs = ref()
    const loadData = ref()
    const productTitle  = ref()
    const listProductSearch = ref([])
    const pageNumber = ref(1)
    const checkCategories = ref()
    const dontFaq = ref(false)
    const locales = ref([])
    const chooseProduct = ref(0)
    const chooseProductSearch = ref()
    const user = ref([])
    const products = ref()
    const locale = ref()
    const faqId = ref([])
    const categoriesCompact = ref([])
    const categoriesNoFaq = ref([])
    const hideCategory = ref(false)
    const title = ref()
    const titleProduct = ref()
    const faqs = ref([])
    const productId = ref()
    const productName = ref()
    const allProduct = ref([])
    const allFaqProduct = ref()
    const categories = ref([])
    const showPaginate = ref()
    const listPageNumber = ref([])
    const previousPaginate = ref()
    const nextPaginate = ref()
    const nextPage = ref('')
    const backPage = ref('')
    const listProduct = ref([])
    const limit = ref(20)
    const listProductOrigin = ref([])
    const showAllProduct = ref(true)
    const searchFaqNotFound = ref(false)
    const nextPageSearch = ref()
    const backPageSearch = ref()
    const hasNextPage = ref()
    const hasPreviousPage = ref()
    const lastCreateFaqProduct = ref(0)
    const listProductCreate = ref([])
    const listProductDelete = ref([])
    const listFaqProduct = ref([])
    const checkFaqProductId = ref()

    const retrieveCategory = function() {
      CategoryDataService.getAll(locale.value)
      .then(response => {
        categories.value = response.data;
        for(let i = 0; i < categories.value.length; i++) {
          checkCategories.value = false
          checkCategories.value = faqs.value.every(function(faq){
            return faq.category_identify !== categories.value[i].identify
          })
          if(checkCategories.value == true){
            categoriesNoFaq.value.push(categories.value[i])
          }
        }
        categoriesCompact.value = categories.value.filter(item => !categoriesNoFaq.value.includes(item))
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    };

    const retrieveFaq = function() {
      loadDataFaqs.value = true
      FaqDataService.getAll(locale.value)
      .then(response => {
        faqs.value = response.data;
        faqs.value.length === 0? dontFaq.value = true : dontFaq.value = false
        loadDataFaqs.value = false
        retrieveCategory()
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    };

    const retrieveAllProduct = function() {
      ProductsDataService.getAll()
      .then(response => {
        allProduct.value = response.data
      })
      .catch(e => {
        console.log(e)
      })
    }

    const checkIdProduct = ref(0)
    const changeProduct = function(product_id) {
      faqId.value = []
      if(checkIdProduct.value === 0 || checkIdProduct.value !== product_id){
        if(allProduct.value.length > 0) {
          for(let i = 0; i < allProduct.value.length; i++){
            if(allProduct.value[i].product_id == product_id){
              FaqProductDataService.getAll(allProduct.value[i].id)
              .then(response => {
                allFaqProduct.value = response.data
                for(let j = 0; j < allFaqProduct.value.length; j++){
                  faqId.value.push(allFaqProduct.value[j].faq_id)
                }
                checkIdProduct.value = allProduct.value[i].product_id
              })
              .catch(e => {
                console.log(e)
              })
            }
            else{
              faqId.value = []
            }
          }
        }
        else{
          faqId.value = []
        }
        productId.value = product_id
      }
    }
    
    const checkIdProductSearch = ref(0)
    const changeProductSearch = function(product_id) {
      if(checkIdProductSearch.value === 0 || checkIdProductSearch.value !== product_id){
        if(allProduct.value.length > 0) {
          for(let i = 0; i < allProduct.value.length; i++){
            if(allProduct.value[i].product_id == product_id.slice(product_id.lastIndexOf('/') + 1)){
              faqId.value = []
              FaqProductDataService.getAll(allProduct.value[i].id)
              .then(response => {
                allFaqProduct.value = response.data
                for(let j = 0; j < allFaqProduct.value.length; j++){
                  faqId.value.push(allFaqProduct.value[j].faq_id)
                }
                checkIdProduct.value = allProduct.value[i].product_id
              })
              .catch(e => {
                console.log(e)
              })
            }
            else{
              faqId.value = []
            }
          }
        }
        productId.value = product_id.slice(product_id.lastIndexOf('/') + 1)
      }
    }

    const changeLocale = function() {
      retrieveFaq()
    }

    const Save = async function() {
      listProductDelete.value = []
      checkFaqProductId.value = ''
      listProductCreate.value = []
      listFaqProduct.value = []
      const checkProductId = ref()
      progressSave.value = true
      lastCreateFaqProduct.value = 0
      ProductsDataService.getAll()
      .then(async response => {
        allProduct.value = response.data
        for(let i = 0; i < selectProductsId.value.length; i++){
          listProductCreate.value.push({
            product_id: selectProductsId.value[i]
          })
          checkProductId.value = allProduct.value.some(function(checkProductId){
            return checkProductId.product_id == selectProductsId.value[i]
          })
          checkFaqProductId.value = allProduct.value.filter(function(checkFaqProductId){
            return checkFaqProductId.product_id == selectProductsId.value[i]
          })
          if(checkFaqProductId.value.length > 0){
            listProductDelete.value.push(checkFaqProductId.value[0].product_id)
          }
        }

        if(faqId.value.length > 0){
          if(listProductDelete.value.length > 0){
            ProductsDataService.deleteAll(listProductDelete.value)
            .then(response => {
              const id = ref()
              id.value = response.data.id;
              ProductsDataService.create(listProductCreate.value)
              .then(response => {
                const id = ref()
                id.value = response.data.id
                createFaqProduct()        
              })
              .catch(e => {
                console.log(e);
              });
            })
            .catch(e => {
              console.log(e)
            })
          }
          else{
            await ProductsDataService.create(listProductCreate.value)
            .then(response => {
              const id = ref()
              id.value = response.data.id
              createFaqProduct()        
            })
            .catch(e => {
              console.log(e);
            });
          }
        }
        else{
          if(listProductDelete.value.length > 0){
            ProductsDataService.deleteAll(listProductDelete.value)
            .then(response => {
              const id = ref()
              id.value = response.data.id;
              progressSave.value = false
              swal("Successfully!", {
                buttons: false,
                timer: 3000,
                icon: "success",
              });
              return
            })
            .catch(e => {
              console.log(e)
            })
          }
          else{
            swal("Successfully!", {
              buttons: false,
              timer: 3000,
              icon: "success",
            });
            progressSave.value = false
            return
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
    }

    const listFaqProductId = ref([])
    const createFaqProduct = function() {
      listFaqProductId.value = []
      checkFaqProductId.value = []
      ProductsDataService.getAll()
      .then(response => {
        allProduct.value = response.data
        for(let i = 0; i < selectProductsId.value.length; i++){
          checkFaqProductId.value = allProduct.value.filter(function(checkFaqProductId){
            return checkFaqProductId.product_id == selectProductsId.value[i]
          })
          if(checkFaqProductId.value.length > 0){
            listFaqProductId.value.push(checkFaqProductId.value[0].id)
          }
        }
        for(let i = 0; i < listFaqProductId.value.length; i++){
          for(let j = 0; j < faqId.value.length; j++){
          const faq_product = {
            product_id: listFaqProductId.value[i],
            faq_id: faqId.value[j]
          }
          listFaqProduct.value.push(faq_product) 
          }
        }
        FaqProductDataService.create(listFaqProduct.value)
        .then(response => {
          const id = ref()
          id.value = response.data
          progressSave.value = false
          swal("Successfully!", {
            buttons: false,
            timer: 3000,
            icon: "success",
          });
        })
        .catch(e => {
          console.log(e)
        })
      })
      .catch(e => {
        console.log(e)
      })
    }

    const retrieveAllFaqProduct = function(product_id) {
      faqId.value = []
      FaqProductDataService.getAll(product_id)
      .then(response => {
        allFaqProduct.value = response.data
        for(let j = 0; j < allFaqProduct.value.length; j++){
          faqId.value.push(allFaqProduct.value[j].faq_id)
        }
      })
      .catch(e => {
        console.log(e)
      })
    }

    const allProductNumber = ref()
    const retrieveListProduct = function(){
      loadData.value = true
      GetProductList.get(limit.value)
      .then(response => {
        (!response.data.paginate.next && !response.data.paginate.previous)? showPaginate.value = false: showPaginate.value = true
        if(response.data.paginate.next && !response.data.paginate.previous){
          nextPaginate.value = showPaginate.value = true
          previousPaginate.value = false
        }
        else{
          nextPaginate.value = false
        }
        if(response.data.paginate.previous && !response.data.paginate.next){
          previousPaginate.value = showPaginate.value = true
          nextPaginate.value = false
        }
        else{
          previousPaginate.value = false
        }
        allProductNumber.value = response.data.count.count
        listProductOrigin.value = response.data.products.products
        listProduct.value = response.data.products.products
        loadData.value = false
        productId.value = listProductOrigin.value[0].id
        productName.value = listProductOrigin.value[0].title
        ProductsDataService.getAll()
        .then(response => {
          allProduct.value = response.data
          if(allProduct.value.length > 0){
            const product = ref()
            product.value = allProduct.value.filter(function(item){
              return item.product_id == listProductOrigin.value[0].id
            })
            product.value.length > 0? retrieveAllFaqProduct(product.value[0].id) : faqId.value = []
          }
        })
        .catch(e => {
          console.log(e)
        })        
        nextPage.value = response.data.paginate.next
      })
      .catch(e => {
        console.log(e)
      })
    }

    const changeListProduct = function(change){
      previousPaginate.value = false
      nextPaginate.value = false
      chooseProduct.value = 0
      // selectProductsId.value = []
      GetProductList.get(limit.value,change === 'next'? nextPage.value : backPage.value)
        .then(response => {
          (!response.data.paginate.next && !response.data.paginate.previous)? showPaginate.value = false: showPaginate.value = true
          !response.data.paginate.next? nextPaginate.value = false : nextPaginate.value = true
          !response.data.paginate.previous? previousPaginate.value = false : previousPaginate.value = true
          listProductOrigin.value = response.data.products.products
          listProduct.value = response.data.products.products
          nextPage.value = response.data.paginate.next
          backPage.value = response.data.paginate.previous
          ProductsDataService.getAll()
          .then(response => {
            allProduct.value = response.data
            if(allProduct.value.length > 0){
              const product = ref()
              product.value = allProduct.value.filter(function(item){
                return item.product_id == listProductOrigin.value[0].id
              })
              product.value.length > 0? retrieveAllFaqProduct(product.value[0].id) : faqId.value = []
            }
            selectAll.value = false
          })
          .catch(e => {
            console.log(e)
          })   
        })
        .catch(e => {
          console.log(e)
        })
    }

    const numberOfProductShow = function(num){
      pageNumber.value = 1
      // selectProductsId.value = []
      selectAll.value = false
      if(productTitle.value === ''|| productTitle.value === undefined){
        GetProductList.get(num, backPage.value)
        .then(response => {
          (response.data.paginate.next && response.data.paginate.previous)? showPaginate.value = true: showPaginate.value = false
          if(response.data.paginate.next && !response.data.paginate.previous){
            nextPaginate.value = true
            showPaginate.value = true
            previousPaginate.value = false
          }
          else{
            nextPaginate.value = false
          }
          if(response.data.paginate.previous && !response.data.paginate.next){
            previousPaginate.value = true
            showPaginate.value = true
            nextPaginate.value = false
          }
          else{
            previousPaginate.value = false
          }
          listPageNumber.value = []
          listProductOrigin.value = response.data.products.products
          listProduct.value = response.data.products.products
          nextPage.value = response.data.paginate.next
          backPage.value = response.data.paginate.previous
        })
        .catch(e => {
          console.log(e)
        })
      }
      else{
        searchProducts()
      }
    }

    const searchInstantFaq = function() {
      FaqDataService.getAll(locale.value)
      .then(response => {
        hideCategory.value = true
        if(title.value === ''){
          hideCategory.value = false
          searchFaqNotFound.value = false
          retrieveFaq()
        }
        else{
          faqs.value = response.data.filter((item)=>{
            return title.value.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
          })
          faqs.value.length === 0? searchFaqNotFound.value = true : searchFaqNotFound.value = false
        }
      })
      .catch(e => {
        console.log(e);
      });
    };

    const searchProducts = debounce(() => {
      loadDataSearch.value = true
      chooseProductSearch.value = ''
      selectAll.value = false
      if(productTitle.value == '' || productTitle.value == undefined){
        loadDataSearch.value = true
        searchProductsNotFound.value = false
        ProductsDataService.getAll()
        .then(response => {
          allProduct.value = response.data
          if(allProduct.value.length > 0){
            const product = ref()
            product.value = allProduct.value.filter(function(item){
              return item.product_id == listProductOrigin.value[0].id
            })
            product.value.length > 0? retrieveAllFaqProduct(product.value[0].id) : faqId.value = []
          }
        })
        .catch(e => {
          console.log(e)
        })   
        showAllProduct.value = true
        listProductSearch.value = []
      }
      else{
        showAllProduct.value = false
        faqId.value = []
        ProductsDataService.searchByTitle(limitSearchValue.value,productTitle.value)
        .then(async response => {
          if(response.data.edges !== null && response.data.edges.length > 0){
            listProductSearch.value = response.data.edges
            response.data.edges[0].node === undefined? searchProductsNotFound.value = true : searchProductsNotFound.value = false
            nextPageSearch.value = listProductSearch.value[response.data.edges.length - 1].cursor
            backPageSearch.value = listProductSearch.value[0].cursor
            if(response.data.pageInfo){
              hasNextPage.value = response.data.pageInfo.hasNextPage
              hasPreviousPage.value = response.data.pageInfo.hasPreviousPage
            }
            await ProductsDataService.get(listProductSearch.value[0].node.id.slice(listProductSearch.value[0].node.id.lastIndexOf('/') + 1))
            .then(response => {
              retrieveAllFaqProduct(response.data.id)
            })
            .catch(e => {
              console.log(e)
            })
          }
          else{
            listProductSearch.value = []
          }
          loadDataSearch.value = false
        })
        .catch(e => {
          console.log(e)
        })
      }
  }, 500)

    const changeListProductSearch = function(page_info){
      hasNextPage.value = false
      hasPreviousPage.value = false
      ProductsDataService.searchByTitle(limit.value,productTitle.value,page_info === 'next'? `,after: "${nextPageSearch.value}"` : `,before: "${backPageSearch.value}"`)
        .then(async response => {
          if(response.data.edges !== null && response.data.edges.length > 0){
            listProductSearch.value = response.data.edges
            nextPageSearch.value = listProductSearch.value[response.data.edges.length - 1].cursor
            backPageSearch.value = listProductSearch.value[0].cursor
            if(response.data.pageInfo){
              hasNextPage.value = response.data.pageInfo.hasNextPage
              hasPreviousPage.value = response.data.pageInfo.hasPreviousPage
            }
            await ProductsDataService.get(listProductSearch.value[0].node.id.slice(listProductSearch.value[0].node.id.lastIndexOf('/') + 1))
            .then(response => {
              retrieveAllFaqProduct(response.data.id)
            })
            .catch(e => {
              console.log(e)
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
    
    const selectAllProduct = function(){
      selectProductsId.value = []
      if(selectAll.value === false){
        if(productTitle.value == '' || productTitle.value == undefined){
          for(let i = 0; i < listProduct.value.length; i++){
            selectProductsId.value.push(listProduct.value[i].id)
          }
        }
        else{
          for(let i = 0; i < listProductSearch.value.length; i++){
            selectProductsId.value.push(listProductSearch.value[i].node.id.slice(listProductSearch.value[i].node.id.lastIndexOf('/') + 1))
          }
        }
      }
      else{
        return
      }
    }
    return{
      listProductCreate,
      progressSave,
      loadDataFaqs,
      allProductNumber,
      selectAll,
      selectAllProduct,
      searchProductsNotFound,
      loadDataSearch,
      loadData,
      previousPaginate,
      nextPaginate,
      changeListProductSearch,
      showAllProduct,
      listProductSearch,
      productTitle,
      searchProducts,
      titleProduct,
      dontFaq,
      searchFaqNotFound,
      hideCategory,
      categoriesCompact,
      categoriesNoFaq,
      title,
      searchInstantFaq,
      showPaginate,
      limit,
      numberOfProductShow,
      listPageNumber,
      retrieveListProduct,
      listProduct,
      changeListProduct,
      createFaqProduct,
      retrieveAllFaqProduct,
      retrieveAllProduct,
      Save,
      changeLocale,
      changeProduct,
      changeProductSearch,
      retrieveCategory,
      faqId,
      categories,
      faqs,
      locale,
      locales,
      retrieveFaq,
      chooseProduct,
      chooseProductSearch,
      products,
      user,
      hasNextPage,
      hasPreviousPage,
      selectProductsId,
      limitSearchValue
    }
  },
  mounted() {
    this.retrieveAllProduct()
    this.retrieveListProduct();
    // this.changeListProduct();
    this.retrieveFaq();
  }
}
</script>

<style>

</style>