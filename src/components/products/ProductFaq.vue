<template>
  <div>
    <div class="px-2 px-sm-4 mb-4" @click="filterByFaq = false" :style="faqMorePageSetting.active_feature? '' : 'opacity:.4;overflow: hidden; height: calc(100vh - 41px);'">
      <div class="mb-3">
        <div class="d-flex align-items-center position-sticky-menu-embeded border-bottom justify-content-between py-3" style="z-index:1">
          <div class="d-flex align-items-center">
            <div class="text-start fs-5 fw-bold ms-2 ms-sm-0 me-3">Product FAQs</div>
            <div class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
              <!-- <span class="form-check-label me-2 fs-6" for="flexSwitchCheckChecked">{{ messages_settings.faq_messages_visible === true? 'Enable' : 'Disable' }}</span> -->
              <input :disabled="disableSave || !faqMorePageSetting.active_feature" class="form-check-input m-0 fs-4" type="checkbox" id="flexSwitchCheckChecked" @change="changeStatus" v-model="faqMorePageSetting.product_page_visible">
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div data-bs-toggle="modal" data-bs-target="#productFaqGuide" style="cursor: pointer" class="d-flex align-items-center justify-content-center hover-color me-3" @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false">
              <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg hover-color" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
              <div class="d-none d-sm-block" style="padding: 6px;">Add Product FAQs block</div>
            </div>
            <div class="text-end">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" :disabled="disableSave" @click="Save" :class="faqMorePageSetting.active_feature === true? 'bgr-primary btn-primary-hover' : 'btn-secondary'" class="btn text-white d-flex align-items-center">Save
                <div v-if="disableSave" class="loader loader--style3 ps-1" title="2">
                  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                      <animateTransform 
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                      repeatCount="indefinite"/>
                    </path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div v-if="!loadAllData" class="pt-3" style="position:relative">
          <div class="mb-3 p-2 rounded font-notify d-flex align-items-center fs-6" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
            <i class="fas fa-info-circle fs-4 ms-2 me-3" style="color: #4989b6;"></i>
            if you would like to show faqs on product page, please implement configuration on this. Anymore, don't forget to add a faq block to product details. Note this only works with Online Store 2.0 compatible themes.        
          </div>
          <!-- <div v-else style="position:absolute; opacity: 1;z-index:1; border-radius: 10px; border: 1px solid #98c6cd; transform: translate(-50%, -50%); left: 50%; top: calc(100vh/2 - 60px)" class="p-4 col-10 col-md-7 bg-white">
            <div class="rounded font-notify p-2 d-flex fs-5 align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;min-height: 100px;">
              <i class="fas fa-info-circle  fs-3 d-none d-sm-flex m-3" style="color: #4989b6;"></i>
              <span>Currently, this feature has been not activated for your store. Please <span @click="contact" class="contact text-color-primary fs-5" style="cursor: pointer">&ensp;Chat Us&ensp;</span> if you would like to work with this.</span>
            </div>
          </div> -->
          <div>
            <div class="d-flex flex-column flex-lg-row padding">
              <div class="col-12 col-lg bg-white border rounded mb-3 mb-lg-0 me-0 me-lg-2">
                <div class="d-flex align-items-center m-3 justify-content-between">
                  <div class="text-start fw-bold">Choose Product</div>
                </div>
                <div v-if="selectProductList.length > 0" class="px-0 px-sm-3">
                  <div v-if="selectProductsId.length === 0" class="d-flex align-items-center mb-2 ps-3 py-2" style="border: 1px solid #fff">
                    <input @click="selectAllProduct" :disabled="disableSave" class="form-check-input me-3 mt-0" id="ed-search" v-model="selectAll" type="checkbox" style="cursor: pointer">
                    <label for="ed-search" style="cursor: pointer">Showing {{selectProductList.length}} product</label>
                  </div>
                  <div v-else class="d-flex mb-2 align-items-center ms-2">
                    <label for="selected-product" class="d-flex p-2 border rounded-start" style="cursor: pointer">
                      <input @click="unSelectAllProduct" :disabled="disableSave" class="form-check-input me-2" id="selected-product" v-model="unSelectAll" type="checkbox" style="cursor: pointer">
                      <div class="px-2">{{selectProductsId.length}} Selected</div>
                    </label>
                    <div @click="removeProducts" style="cursor: pointer" class="p-2 px-3 border rounded-end border-start-0">Remove product</div>
                  </div>
                  <div style="max-height: 450px; overflow-y: auto" class="product-scroll">
                    <label style="cursor: pointer" :for="`${product.product_id}a`" class="d-flex align-items-center border-top" :class="selectProductList.length === 1? ' mb-0' : ''" v-for="(product, index) in selectProductList" :key="index">
                      <div class="me-3 ps-3">
                        <input :disabled="disableSave" class="form-check-input" :id="`${product.product_id}a`" style="cursor: pointer" type="checkbox" :value="product" v-model="selectProductsId">
                      </div>
                      <div style="flex: 1" class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center w-100">
                          <div v-if="product.src" class="text-center border m-2 ms-0 rounded bg-white" :style="`width: 80px; height: 80px; background-image: url(${product.src});background-size: contain;background-repeat: no-repeat;`" style="background-position: 50%;">
                          </div>
                          <div v-else class="text-center border m-2 ms-0 rounded bg-light d-flex justify-content-center product-no-image align-items-center" :style="`width: 80px; height: 80px`"></div>
                          <div class="m-3 text-ellipsis" style="flex:1">{{product.title}}</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div :class="faqMorePageSetting.active_feature? 'choose-product-style' : ''" style="  border-radius: 6px; border: 1px solid #ccc; padding: 6px;" class="d-flex justify-content-center align-items-center mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <i class="fas fa-tag change-icon-derection me-2" style="transform:rotate(90deg)"></i>
                  <span style="font-weight: 500">Choose products</span>
                </div>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content" style="z-index: 1000000">
                      <div class="modal-header">
                        <h6 class="modal-title" id="staticBackdropLabel">Add products</h6>
                        <div class="d-flex align-items-center">
                          <button @click="closeProductModal" type="button" class="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                      </div>
                      <div class="border-bottom p-3">
                        <div class="rounded" style="position:relative; box-shadow: 2px 2px #ddd ;">
                          <svg viewBox="0 0 20 20" style="position: absolute; left: 10px; top: 50%; transform: translatey(-50%);" height="22" width="22" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293-4.82-4.82a5.968 5.968 0 0 0 1.113-3.473 6 6 0 0 0-12 0 6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path></svg>
                          <input class="form-control py-2" style="padding-left: 40px; font-size: 14px;" type="text" placeholder="Search Product" v-model="productTitle" @input="searchProducts">
                        </div>
                      </div>
                      <div class="modal-body">
                        <div v-if="showAllProduct" class="mb-3 me-2">
                          <div v-if="!loadData">
                            <label style="cursor: pointer" :for="product.id" class="d-flex align-items-center" :class="listProduct.length === 1? ' mb-0' : 'mb-2'" v-for="(product, index) in listProduct" :key="index">
                              <div class="me-3">
                                <input :disabled="disableSave" class="form-check-input" :id="product.id" style="cursor: pointer" type="checkbox" :value="product" v-model="addProductOrigin">
                              </div>
                              <div style="background-color: #f8f9fa; flex: 1" class="d-flex border rounded align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                  <div class="text-center border-end" style="min-width: 80px">
                                    <img v-if="product.src" :src="product.src" style="height: 50px; max-width: 80px">
                                    <div v-else class="d-flex align-items-center border product-no-image-small justify-content-center bg-white" style="max-width: 80px; margin: auto; font-size: 14px; height: 50px;"></div>
                                  </div>
                                  <div class="m-3 text-ellipsis">{{product.title}}</div>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div v-else-if="loadData" class="d-flex justify-content-center align-items-center">
                            <div class="loader loader--style8 d-flex align-items-center justify-content-center my-4">
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
                          <div v-else-if="listProduct.length === 0" class="text-center align-items-center d-flex justify-content-center pb-5">
                            <span>Oops, your search did not match any Products</span>
                          </div>
                        </div>
                        <div v-else class="product-scroll">
                          <div v-if="!loadDataSearch">
                            <div style="overflow-y: auto" class="product-scroll">
                              <label style="cursor: pointer" @mouseenter="chooseProductSearch = index" :for="product.id" class="d-flex align-items-center" v-for="(product, index) in listProductSearch" :key="index" :class="listProductSearch.length === 1? 'mb-0' : 'mb-2'">
                                <div class="me-3">
                                  <input :id="product.id" :disabled="disableSave" class="form-check-input" type="checkbox" :value="product" v-model="addProductOrigin" style="cursor: pointer">
                                </div>
                                <div :style="chooseProductSearch === index? ' background-color: #eee; color: #FF8200; flex: 1' : ' background-color: #f8f9fa; flex: 1'" :class="chooseProductSearch === index? 'product-acctive' : ''" class="d-flex border rounded align-items-center justify-content-between">
                                  <div class="d-flex align-items-center w-100">
                                    <div style="min-width: 80px" class="d-flex align-items-center justify-content-center border-end">
                                      <img v-if="product.src" :src="product.src" style="height: 50px; max-width: 80px"/>
                                      <div v-else class="d-flex align-items-center border product-no-image-small justify-content-center bg-white" style="width: 80px; margin: auto; font-size: 14px; height: 50px;"></div>
                                    </div>
                                    <div class="form-check-label w-100 text-break p-3">
                                      <span class="text-ellipsis">{{product.title}}</span>
                                    </div>
                                  </div>
                                </div>
                              </label>                
                            </div>
                          </div>
                          <div v-else class="d-flex justify-content-center align-items-center">
                            <div class="loader loader--style8 d-flex align-items-center justify-content-center my-4">
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
                          <div v-if="listProductSearch.length === 0 && !loadDataSearch" class="text-center align-items-center d-flex justify-content-center py-5">
                            <span>Oops, your search did not match any Products</span>
                          </div>
                        </div>
                        <nav class="px-3 w-100" aria-label="Page navigation example" v-if="showPaginate && showAllProduct">
                          <ul class="pagination d-flex justify-content-between align-items-center">
                            <li style="cursor: pointer"><button :style="previousPaginate === false? 'color: gray' : ''" :disabled="previousPaginate === false" class="btn btn-primary-hover page-link rounded" @click="changeListProduct('back')">Previous</button></li>
                            <li style="cursor: pointer"><button :style="nextPaginate === false? 'color: gray' : '' " :disabled="nextPaginate === false" class="btn btn-primary-hover page-link rounded" @click="changeListProduct('next')">Next</button></li>
                          </ul>
                        </nav>
                        <nav class="px-3" aria-label="Page navigation example" v-if="!showAllProduct && listProductSearch.length > 19">
                          <ul class="pagination d-flex justify-content-between align-items-center">
                            <li style="cursor:pointer"><button :disabled="!hasPreviousPage" @click="changeListProductSearch('back')" class="btn btn-primary-hover page-link rounded" :style="hasPreviousPage === false? 'color: gray' : '' ">Previous</button></li>
                            <li style="cursor:pointer"><button :disabled="!hasNextPage" @click="changeListProductSearch('next')" :style="hasNextPage === false? 'color: gray' : '' " class="btn btn-primary-hover page-link rounded">Next</button></li>
                          </ul>
                        </nav>
                      </div>
                      <div class="modal-footer">
                        <button type="button" @click="closeProductModal" style="border: 1px solid rgb(92, 95, 98);" class="btn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" @click="addProduct" data-bs-dismiss="modal" class="btn btn-primary-hover bgr-primary text-white">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg bg-white border rounded ms-0 ms-lg-2">
                <div class="m-3 d-flex justify-content-between align-items-between">
                  <div class="text-start fw-bold">Choose Faqs</div>
                </div>
                <div >
                  <div class="mb-3 px-3 ">
                    <input @input="searchInstantFaq" v-model="title" class="form-control" type="text" placeholder="Search Faq">
                  </div>
                  <div v-if="!loadDataFaqs">
                    <div v-if="faqs.length > 0" class="product-scroll ps-3 me-2 mb-2" style="max-height: 450px;min-height: 150px; overflow-y: auto">
                      <div class="pe-2" v-for="category in categoriesCompact" :key="category" >
                        <div :class="hideCategory === true? 'd-none' :'text-end text-break fw-bold my-1' ">{{category.title}}</div>
                        <TransitionGroup name="search-faq" class="d-flex flex-column justify-content-between ps-0" tag="ul">
                          <li v-for="(faq,index) in faqs" style="list-style:none" :key="index" :data-index="index" :style="faq.category_identify === category.identify? '' : 'height: 0 !important'">
                            <div class="d-flex mb-2 border rounded px-2 bg-light" style="cursor: pointer" v-if="faq.category_identify === category.identify">
                              <div class="me-2 py-3" style="cursor: pointer">
                                <input :disabled="disableSave" class="form-check-input" style="cursor: pointer" type="checkbox" :value="faq" v-model="faqId" :id="faq.id">
                              </div>
                              <label class="form-check-label w-100 text-break py-3" style="cursor: pointer" :for="faq.id">
                                <span>{{faq.title}}</span>
                              </label>
                            </div>
                          </li>
                        </TransitionGroup>
                      </div>
                    </div>
                    <div v-if="faqs.length === 0">
                      <div v-if="dontFaq && !searchFaqNotFound" class="py-5 d-flex flex-column align-items-center justify-content-center">
                        <div class="text-center mb-2">You haven't created any FAQs yet!</div>
                        <div class="text-center">Please create FAQs if you wish to show them on product page.</div>
                        <router-link to="/add-faq" class="btn border mt-3 bgr-primary btn-primary-hover text-white" :class="faqMorePageSetting.active_feature === true? 'bgr-primary btn-primary-hover' : 'btn-secondary'">Create FAQs now!</router-link>
                      </div>
                      <div v-if="searchFaqNotFound" class="text-center fs-5 align-items-center d-flex justify-content-center py-5">
                        <span>Oops, your search did not match any FAQs</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="d-flex align-items-center justify-content-center my-4">
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
            <div class="border bg-white rounded p-3 mt-3">
              <div class="d-flex">
                <div class="rounded me-2" style="position:relative; box-shadow: 1px 1px #ddd; flex: 1;">
                  <svg viewBox="0 0 20 20" style="position: absolute; left: 10px; top: 50%; transform: translatey(-50%);" height="22" width="22" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293-4.82-4.82a5.968 5.968 0 0 0 1.113-3.473 6 6 0 0 0-12 0 6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path></svg>
                  <!-- <i class="fas fa-search" style="position: absolute; left: 10px; top: 50%; transform: translatey(-50%); color: #faqProductList; font-size: 20px;"></i> -->
                  <input class="form-control py-2" style="padding-left: 40px; font-size: 14px;" type="text" placeholder="Search Product" v-model="productSearchTitle" @input="searchProductsFaqs">
                </div>
                <div @click.stop="filterByFaq = !filterByFaq" class="col-2 rounded border d-flex align-items-center justify-content-center" style="box-shadow: 1px 1px #ddd; width: 140px; font-size: 14px; cursor:pointer; position: relative;">
                  <div>
                    <span class="mx-2" style="font-weight: 500">Filter by FAQ</span>
                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" height="20" width="20" focusable="false" aria-hidden="true"><path d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267Z"></path></svg>
                  </div>
                  <div @click.stop="filterByFaq = true" v-if="filterByFaq === true" class="bg-white border rounded p-3 fs-6 d-flex flex-column" style="position: absolute; top: 120%; right: -20%; cursor:default; box-shadow: 1px 1px 1px #ddd; z-index: 2;">
                    <label v-for="item in listFaqTitle" :for="item.faq_title" :key="item" class="mb-2" style="cursor: pointer; min-width: 350px">
                      <div class="form-check">
                        <input :value="item.faq_title" v-model="faqTitle" class="form-check-input" type="radio" name="flexRadioDefault" :id="item.faq_title" style="cursor:pointer">
                        <div class="form-check-label text-break">
                          {{ item.faq_title }}
                        </div>
                      </div>
                    </label>
                    <div @click="clearFilterByFaq" class="rounded py-1 px-2" style="width: 60px; text-align: center; cursor:pointer" :style="faqTitle? 'color: red; border: 1px solid red' : 'color: gray; border: 1px solid #ccc'">
                      <span>Clear</span>
                    </div>
                  </div>
                </div>        
              </div>
              <div class="py-3 d-flex" v-if="faqTitle">
                <span class="bg-secondary rounded p-2 d-flex">
                  <span class="me-2 text-white" style="font-size: 14px; display: -webkit-box;line-height: 1.3;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis">{{ faqTitle }}</span>
                  <button @click="faqTitle = ''" type="button" class="btn-close" style="font-size: 12px; cursor:pointer" aria-label="Close"></button>
                </span>
              </div>
              <div class="product-scroll" style="overflow-x: auto">
                <div style="min-width: 800px">
                  <div class="d-flex justify-content-between align-items-center mt-4 mb-3 fw-bold w-100">
                    <div class="col-2" style="min-width: 112px"></div>
                    <div class="col-4 ps-3 text-ellipsis">Product Title</div>
                    <div class="col-4 text-ellipsis">Embedded FAQs</div>
                    <div class="col-2 pe-3 text-end text-ellipsis">Delete</div>
                  </div>
                  <TransitionGroup v-if="!searchProductFaqNotFound" class="border rounded ps-0"
                    :css="false" 
                    tag="ul"
                    @before-enter="onBeforeEnter"
                    @enter="onEnterProduct"
                    @leave="onLeaveProduct">
                    <li v-for="(product,index) in allProduct" @mouseover="hoverProduct = index" @mouseleave="hoverProduct = ''" :key="index" :data-index="index" :style="hoverProduct === index? 'background-color:#f8f9fa' : ''" class="w-100 d-flex justify-content-between align-items-center border-bottom">
                      <div class="col-2" style="min-width: 112px">
                        <div v-if="product.product_image" class="text-center border m-3 rounded bg-white" :style="`width: 80px; height: 80px; background-image: url(${product.product_image});background-size: contain;background-repeat: no-repeat;`" style="background-position: 50%;"></div>
                        <div v-else class="text-center border m-3 product-no-image rounded bg-light d-flex align-items-center justify-content-center" :style="`width: 80px; height: 80px`">
                          
                        </div>
                      </div>
                      <div class="ps-3 col-4 text-ellipsis" style="flex: 1">{{product.product_title}}</div>
                      <div class="col-4">
                        <button class="rounded border p-2 hover-product-style" data-bs-toggle="modal" :data-bs-target="`#a${product.id}`" role="button">Show & Rearrange FAQ</button>
                        <div class="modal fade" :id="`a${product.id}`" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                          <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header d-flex justify-content-between">
                                <h6 class="modal-title" id="exampleModalToggleLabel">{{product.product_title}}</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body p-0 px-3 pt-3">
                                <!-- <div v-for="(faq_product, index) in product.faq_title" :key="index" class="" style="background-color:#f8f9fa">
                                  <div class="border rounded mb-3 py-2 pe-2 d-flex align-items-center justify-content-between" style="color: black; min-width: 400px;">
                                    <div class="px-2 my-2" style="flex: 1">{{faq_product.title}}</div>
                                    <button @click="removeThisFaq(faq_product.id)" @mouseover="hoveDelFaq = index" @mouseleave="hoveDelFaq = ''" :class="hoveDelFaq === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " title="Delete" class="text-danger btn border">
                                      <i class="fas fa-trash-alt"></i>
                                    </button>
                                  </div>
                                </div> -->
                                <div v-if="settings.dont_category_faq === false">
                                  <div v-for="(item) in categoriesCompact" :key="item">
                                    <div style="border-radius: none" class="dragArea list-group w-full">
                                      <div
                                        v-for="(faq_product, i) in product.faq_title" :key="i">
                                        <div @mousemove="changeBgr = i" @mouseleave="changeBgr = ''" :class="changeBgr === i? 'bg-light' : ''" v-if="item.identify === faq_product.category_identify" class="border mb-3 rounded p-2 d-flex align-items-center justify-content-between" style="color: black; min-width: 400px">
                                          <div class="d-flex align-items-center">
                                            <!-- <i class="fas fa-grip-vertical pe-3"></i> -->
                                            <div class="me-3">
                                              <div class="" style="flex: 1">{{faq_product.title}}</div>                                      
                                              <div class="" style="color: rgb(152, 198, 205); font-size: 12px;">{{item.title}}</div>
                                            </div>
                                          </div>
                                          <button @click="removeThisFaq(faq_product.id)" @mouseover="hoveDelFaq = i" @mouseleave="hoveDelFaq = ''" :class="hoveDelFaq === i? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " title="Delete" class="text-danger btn border">
                                            <i class="fas fa-trash-alt"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>                        
                                </div>
                                <div v-else>
                                  <div style="border-radius: none" class="dragArea list-group w-full">
                                      <div
                                        class=""
                                        v-for="(faq_product, i) in product.faq_title" :key="i">
                                        <div @mousemove="changeBgr = i" @mouseleave="changeBgr = ''" :class="changeBgr === i? 'bg-light' : ''" class="border mb-3 rounded p-2 d-flex align-items-center justify-content-between" style="color: black; min-width: 400px">
                                          <div class="d-flex align-items-center justify-content-center">
                                            <!-- <i class="fas fa-grip-vertical pe-3"></i> -->
                                            <div class="me-3">
                                              <div style="flex: 1">{{faq_product.title}}</div>                                      
                                            </div>
                                          </div>
                                          <button @click="removeThisFaq(faq_product.id)" @mouseover="hoveDelFaq = i" @mouseleave="hoveDelFaq = ''" :class="hoveDelFaq === i? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " title="Delete" class="text-danger btn border">
                                            <i class="fas fa-trash-alt"></i>
                                          </button>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <div class="border-top p-3 d-flex justify-content-end">
                                <button :disabled="waitSavePosition" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" @click="saveChangePosition(product.id)">Save
                                  <div class="loader loader--style3 ps-1" title="2">
                                    <svg v-if="waitSavePosition" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                      width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                      <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                        <animateTransform 
                                          attributeType="xml"
                                          attributeName="transform"
                                          type="rotate"
                                          from="0 25 25"
                                          to="360 25 25"
                                          dur="0.6s"
                                        repeatCount="indefinite"/>
                                      </path>
                                    </svg>
                                  </div>                            
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-2 px-3 text-end">
                        <button title="Delete" @mouseover="hoverDel = index" @mouseleave="hoverDel = ''" :class="hoverDel === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " class="ms-2" @click="deleteThisProduct(product.id)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                    <div class="text-center p-2" style="background-color:#f8f9fa">
                      <span>Showing {{allProduct.length}} of {{allProduct.length}} Product FAQ Relationships</span>
                    </div>
                  </TransitionGroup>
                  <div v-else class="border-top pt-4 mb-3 text-center fs-5">
                    <span>Oops, your search did not match any Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="">
          <div class="loading">
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
            <div class="content">
              <h4></h4>
              <div class="description"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade text-start" style="z-index: 5 !important" id="productFaqGuide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add block Product FAQs to your store.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><b>Merchants use this feature to show different FAQs on different products of their store.</b></p>
              <p><b>1. </b><a target="_blank" :href="`https://${shopify_domain}/admin/themes/current/editor?template=product&activateAppId=3c16d53e-037f-4a3a-abf1-e054532428ff/app-block`">Go to theme editor <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>
              <p><b>2.</b> Click <b>"Add block"</b> in <b>"Product information"</b> or <b>"Add section"</b> from left and side bar</p>
              <p><b>3.</b> Choose <b>"Yanet Professional FAQs"</b> block</p>
              <span><b>4.</b> Click <b>"Save"</b> on <b>"Main menu"</b> page and you should be all set.</span>
            </div>  
            <div class="modal-footer">
              <button type="button" data-bs-dismiss="modal" class="btn btn-primary-hover bgr-primary text-white">I understood</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 h-100" v-if="!faqMorePageSetting.active_feature" style="position:absolute; top:0;">
      <div style="position:fixed; opacity: 1;z-index:1; border-radius: 10px; border: 1px solid #98c6cd; transform: translate(-50%, -50%); left: 50%; top: calc(50%)" class="p-4 col-10 col-md-7 bg-white">
        <div class="rounded font-notify p-2 d-flex fs-5 align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;min-height: 100px;">
          <i class="fas fa-info-circle  fs-3 d-none d-sm-flex m-3" style="color: #4989b6;"></i>
          <span>Currently, this feature has been not activated for your store. Please <span @click="contact" class="contact text-color-primary fs-5" style="cursor: pointer">&ensp;Chat With Us&ensp;</span> if you would like to work with this.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import ProductsDataService from "../../services/ProductsDataService";
import GetProductList from "../../services/GetProductList";
import FaqProductDataService from "../../services/FaqProductDataService";
import { debounce } from 'vue-debounce';
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue'
import { inject } from 'vue'
import FaqMorePageSettingDataService from "../../services/FaqMorePageSettingDataService";
import store from "../../store";
import gsap from 'gsap'

export default defineComponent({
  methods: {
    async Save(){
      await this.SaveChange()
      if(this.faqMorePageSetting.active_feature === true){
        if(this.faqEmty === true){
          this.$toast.open({
            message: "Please choose Product & FAQ !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
        }
        else{
          this.disableSave = false
          this.$toast.open({
            message: "Added Products<>FAQs relationship !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
        }
      }
    },
    async deleteThisProduct(product_id){
      await this.removeThisProduct(product_id)
      this.$toast.open({
        message: "Deleted Product Successfully !",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    },
    async saveChangePosition(product_id){
      await this.savePosition(product_id)
      this.waitSavePosition = false
      this.$toast.open({
        message: "Rearrange FAQs Successfully !",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    },
    onBeforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    onLeaveProduct(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.07,
        onComplete: done
      })
    },
    onEnterProduct(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '113px',
        delay: el.dataset.index * 0.07,
        onComplete: done
      })
    },
  },
  setup() {
    const faqMorePageSetting = ref()
    faqMorePageSetting.value = store.state.data.faq_more_page_setting
    const route = useRoute()
    if(route.query.accessToken){
      store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    }
    const waitSavePosition = ref(false)
    const savePosition = async function(id){
      waitSavePosition.value = true
      const data = ref([])
      for(let i = 0; i < allFaqProduct.value.length; i++){
        if(allFaqProduct.value[i].product_id === id){
          data.value.push(allFaqProduct.value[i])
        }
      }
      await FaqProductDataService.updatePosition(id, data.value)
      .then(response => {
        const data = ref()
        data.value = response.data
      })
      .catch(e => {
        console.log(e)
      })
    }
    const loadAllData = ref(true)
    const shopify_domain =  ref()
    const toast = inject('$toast');
    const changeBgr = ref()
    const settings = ref([])
    settings.value = store.state.data.settings
    shopify_domain.value = store.state.auth.shopifyDomain
    const faqTitle = ref()
    const hoverProduct = ref()
    const changeColorIconAdd = ref()
    const hoverDel = ref()
    const unSelectAll = ref()
    const addProductOrigin = ref([])
    const limitSearchValue = ref(20)
    const progressSave = ref(0)
    const selectAll = ref(false)
    const selectProductsId = ref([])
    const searchProductsNotFound = ref()
    const loadDataSearch = ref()
    const loadDataFaqs = ref()
    const loadData = ref(true)
    const productTitle  = ref()
    const listProductSearch = ref([])
    const checkCategories = ref()
    const dontFaq = ref(false)
    const locales = ref([])
    locales.value = JSON.parse(store.state.auth.languages)
    const chooseProductSearch = ref()
    const user = ref([])
    const products = ref()
    const locale = ref()
    locale.value = store.state.auth.locale
    const faqId = ref([])
    const categoriesCompact = ref([])
    const categoriesNoFaq = ref([])
    const hideCategory = ref(false)
    const title = ref()
    const titleProduct = ref()
    const faqs = ref([])
    const allProduct = ref([])
    allProduct.value = store.state.data.all_product
    const allFaqProduct = ref()
    allFaqProduct.value = store.state.data.faq_product
    const categories = ref([])
    const showPaginate = ref()
    const listPageNumber = ref([])
    const previousPaginate = ref()
    const nextPaginate = ref()
    const nextPage = ref('')
    const backPage = ref('')
    const listProduct = ref([])
    listProduct.value = store.state.data.product_data
    const limit = ref(250)
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
    const checkFaqId = ref()
    const searchProductFaqNotFound = ref()
    const productSearchTitle = ref()
    const allProductOrigin = ref()
    allProductOrigin.value = store.state.data.all_product
    const faqProductList = ref([])
    const addProductSearch = ref([])
    const selectProductList = ref([])
    const allProductNumber = ref()
    const listFaqProductId = ref([])
    const listFaqTitle = ref([])
    const disableSave = ref()
    const faqEmty = ref()
    const hoveDelFaq = ref()
    const localeDefault = ref('default')
    watch(selectProductsId, (currentValue) => {
      if(currentValue.length > 0){
        unSelectAll.value = true
      }
    });

    watch(faqTitle, (currentValue) => {
      const allProductFilter = ref([])
      allProduct.value = allProductOrigin.value
      if(currentValue != ''){
        for(let i = 0; i < allProduct.value.length; i++){
          const checkTitle = ref()
          checkTitle.value = allProduct.value[i].faq_title.some(item => {
            return item.title === faqTitle.value
          })
        checkTitle.value === true? allProductFilter.value.push(allProduct.value[i]) : ''
        }
        allProduct.value = allProductFilter.value
      }
      else{
        allProduct.value = allProductOrigin.value
      }
    });

    const changeStatus = async () => {
      await FaqMorePageSettingDataService.update(faqMorePageSetting.value.id, faqMorePageSetting.value)
        .then(respone => {
          const id = ref()
          id.value = respone.data
          toast.open({
            message: "Update Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          store.dispatch('data/setFaqMorePageSetting', faqMorePageSetting.value)
        })
        .catch(e => {
          console.log(e)
        })  
    }
    const retrieveCategory = function() {
      categories.value = store.state.data.categories
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
    };

    const retrieveFaq = function() {
      loadDataFaqs.value = true
      faqs.value = store.state.data.faqs
      faqs.value.length === 0? dontFaq.value = true : dontFaq.value = false
      loadDataFaqs.value = false
      retrieveCategory()
    };


    const retrieveAllProduct = async function() {
      await ProductsDataService.getAll()
      .then(async response => {
        allProduct.value = response.data
        store.dispatch('data/setProductsData', allProduct.value);
        allProductOrigin.value = store.state.data.all_product
        await retrieveAllFaqProduct()
      })
      .catch(e => {
        console.log(e)
      })
    }

    const changeLocale = async function() {
      retrieveFaq()
      store.dispatch('auth/setLocale', locale.value);
    }

    const showToast = ref()
    const retrieveListProduct = async function(){
      loadData.value = true
      if(listProduct.value.length === 0){
        await GetProductList.get(limit.value)
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
          listProductOrigin.value = []
          response.data.products.products.forEach(element => {
            let item = {}
            if(element.images[0]){
              item = {
                product_id: element.id,
                title: element.title,
                src: element.images[0].src
              }
            }
            else{
              item = {
                product_id: element.id,
                title: element.title,
              }
            }
            listProductOrigin.value.push(item)
          })
          listProduct.value = listProductOrigin.value
          store.dispatch('data/setProductShopify', listProduct.value);
          nextPage.value = response.data.paginate.next
          loadData.value = false
          loadAllData.value = false
        })
        .catch(e => {
          console.log(e)
        })
      }
      else{
        loadData.value = false
        loadAllData.value = false
      }
    }

    const changeListProduct = async function(change){
      previousPaginate.value = false
      nextPaginate.value = false
      await GetProductList.get(limit.value,change === 'next'? nextPage.value : backPage.value)
        .then(response => {
          (!response.data.paginate.next && !response.data.paginate.previous)? showPaginate.value = false: showPaginate.value = true
          !response.data.paginate.next? nextPaginate.value = false : nextPaginate.value = true
          !response.data.paginate.previous? previousPaginate.value = false : previousPaginate.value = true
          listProductOrigin.value = []
          response.data.products.products.forEach(element => {
            let item = {}
            if(element.images[0]){
              item = {
                product_id: element.id,
                title: element.title,
                src: element.images[0].src
              }
            }
            else{
              item = {
                product_id: element.id,
                title: element.title,
              }
            }
            listProductOrigin.value.push(item)
          })
          listProduct.value = listProductOrigin.value
          nextPage.value = response.data.paginate.next
          backPage.value = response.data.paginate.previous   
        })
        .catch(e => {
          console.log(e)
        })
    }

    const searchInstantFaq = async function() {
      hideCategory.value = true
      if(title.value === ''){
        hideCategory.value = false
        searchFaqNotFound.value = false
        retrieveFaq()
      }
      else{
        faqs.value = store.state.data.faqs.filter((item)=>{
          return title.value.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
        faqs.value.length === 0? searchFaqNotFound.value = true : searchFaqNotFound.value = false
      }    
    };

    const searchProducts = debounce(async () => {
      loadDataSearch.value = true
      chooseProductSearch.value = ''
      selectAll.value = false
      if(productTitle.value == '' || productTitle.value == undefined){
        loadDataSearch.value = true
        searchProductsNotFound.value = false
        showAllProduct.value = true
        listProductSearch.value = []
      }
      else{
        showAllProduct.value = false
        await ProductsDataService.searchByTitle(limitSearchValue.value,productTitle.value)
        .then(async response => {
          listProductSearch.value = []
          if(response.data.edges !== null && response.data.edges.length > 0){
            response.data.edges.forEach(element => {
              let item = {}
              if(element.node.images.edges[0]){
                item = {
                  product_id: element.node.id.slice(element.node.id.lastIndexOf('/') + 1),
                  title: element.node.title,
                  src: element.node.images.edges[0].node.url
                }
              }
              else{
                item = {
                  product_id: element.node.id.slice(element.node.id.lastIndexOf('/') + 1),
                  title: element.node.title,
                }
              }
              listProductSearch.value.push(item)
            })
            response.data.edges[0].node === undefined? searchProductsNotFound.value = true : searchProductsNotFound.value = false
            nextPageSearch.value = response.data.edges[response.data.edges.length - 1].cursor
            backPageSearch.value = response.data.edges[0].cursor
            if(response.data.pageInfo){
              hasNextPage.value = response.data.pageInfo.hasNextPage
              hasPreviousPage.value = response.data.pageInfo.hasPreviousPage
            }
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

    const changeListProductSearch = async function(page_info){
      hasNextPage.value = false
      hasPreviousPage.value = false
      await ProductsDataService.searchByTitle(limit.value,productTitle.value,page_info === 'next'? `,after: "${nextPageSearch.value}"` : `,before: "${backPageSearch.value}"`)
      .then(async response => {
        if(response.data.edges !== null && response.data.edges.length > 0){
          response.data.edges.forEach(element => {
            let item = {}
            if(element.node.images.edges[0]){
              item = {
                product_id: element.node.id.slice(element.node.id.lastIndexOf('/') + 1),
                title: element.node.title,
                src: element.node.images.edges[0].node.url
              }
            }
            else{
              item = {
                product_id: element.node.id.slice(element.node.id.lastIndexOf('/') + 1),
                title: element.node.title,
              }
            }
            listProductSearch.value.push(item)
          })        
          nextPageSearch.value = response.data.edges[response.data.edges.length - 1].cursor
          backPageSearch.value = response.data.edges[0].cursor
          if(response.data.pageInfo){
            hasNextPage.value = response.data.pageInfo.hasNextPage
            hasPreviousPage.value = response.data.pageInfo.hasPreviousPage
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
    }
    
    const selectAllProduct = function(){
      unSelectAll.value = true
      selectProductsId.value = []
      if(selectAll.value === false){
        for(let i = 0; i < selectProductList.value.length; i++){
          selectProductsId.value.push(selectProductList.value[i])
        }
      }
      else{
        return
      }
    }
    
    const addProduct = function(){
      const checkProductId = ref()
      const checkProductSelect = ref()
      for(let i = 0; i < addProductOrigin.value.length; i++){
        checkProductSelect.value = []
        checkProductSelect.value = listProduct.value.filter(element => {
          return element.product_id == addProductOrigin.value[i].product_id
        })
        checkProductId.value = selectProductList.value.some(function(checkProductId){
          return checkProductId.product_id == addProductOrigin.value[i].product_id
        })
        if(checkProductId.value != true){
          selectProductList.value.push(checkProductSelect.value[0])
        }
      }
      addProductOrigin.value = []
      productTitle.value = ''
      showAllProduct.value = true
    }
    
    const unSelectAllProduct = function(){
      unSelectAll.value = false
      selectProductsId.value =[]
    }

    const removeProducts = function(){
      selectProductList.value = selectProductList.value.filter(item => !selectProductsId.value.includes(item));
      selectProductsId.value =[]
      addProductOrigin.value = []
    }

    const SaveChange = async function(){
      if(faqMorePageSetting.value.active_feature === true){
        showToast.value = false
        faqEmty.value = false
        if(faqId.value.length > 0 && selectProductList.value.length > 0){
          disableSave.value = true
          listProductDelete.value = []
          checkFaqId.value = ''
          listProductCreate.value = []
          listFaqProduct.value = []
          progressSave.value = true
          lastCreateFaqProduct.value = 0
          await ProductsDataService.getAll()
          .then(async response => {
            allProduct.value = response.data
            store.dispatch('data/setProductsData', allProduct.value);
            allProductOrigin.value = response.data
            for(let i = 0; i < selectProductList.value.length; i++){
              if(!allProduct.value.some(item => {
                return item.product_id == selectProductList.value[i].product_id
              })){
                listProductCreate.value.push({
                  product_id: selectProductList.value[i].product_id,
                  product_title: selectProductList.value[i].title,
                  product_image: selectProductList.value[i].src
                })
              }
            }
            if(listProductCreate.value.length > 0){
              await ProductsDataService.create(listProductCreate.value)
                .then(async response => {
                  const id = ref()
                  id.value = response.data.id
                })
                .catch(e => {
                  console.log(e);
                });        
            }
            await createFaqProduct()        
          })
          .catch(e => {
            console.log(e)
          })  
        }
        else{
          faqEmty.value = true
        }
      }
    }

    const createFaqProduct = async function() {
      listFaqProductId.value = []
      checkFaqId.value = []
      await ProductsDataService.getAll()
      .then(async response => {
        allProduct.value = response.data
        store.dispatch('data/setProductsData', allProduct.value);
        allProductOrigin.value = response.data
        showToast.value = true
        for(let i = 0; i < selectProductList.value.length; i++){
          checkFaqId.value = allProduct.value.filter(function(item){
            return item.product_id == selectProductList.value[i].product_id
          })
          if(checkFaqId.value.length > 0){
            listFaqProductId.value.push(checkFaqId.value[0].id)
          }
        }
        for(let i = 0; i < listFaqProductId.value.length; i++){
          for(let j = 0; j < faqId.value.length; j++){
            const faq_product = {
              product_id: listFaqProductId.value[i],
              faq_id: faqId.value[j].id,
              faq_identify: faqId.value[j].identify,
              category_identify: faqId.value[j].category_identify
            }
            listFaqProduct.value.push(faq_product) 
          }
        }
        for(let i = 0; i < allFaqProduct.value.length; i++){
          for(let j = 0; j < listFaqProduct.value.length; j++){
            if(allFaqProduct.value[i].product_id === listFaqProduct.value[j].product_id && allFaqProduct.value[i].faq_id === listFaqProduct.value[j].faq_id){
              listFaqProduct.value.splice(j, 1)
            } 
          }
        }
        await FaqProductDataService.create(listFaqProduct.value)
        .then(async response => {
          const id = ref()
          id.value = response.data
          progressSave.value = false
          selectProductsId.value = []
          selectProductList.value = []
          faqId.value = []
          disableSave.value = false
          await retrieveAllFaqProduct()
        })
        .catch(e => {
          console.log(e)
        })
      })
      .catch(e => {
        console.log(e)
      })
    }

    const getAllFaqProduct = async function() {
      if(store.state.data.faq_product.length > 0){
        allFaqProduct.value = store.state.data.faq_product
        faqProductList.value = allFaqProduct.value
      }
      else{
        await FaqProductDataService.getAll()
        .then(response => {
          allFaqProduct.value = response.data
          store.dispatch('data/setFaqProductData', allFaqProduct.value)
          faqProductList.value = allFaqProduct.value
        })
        .catch(e => {
          console.log(e)
        })
      }
      listFaqTitle.value = []
      if(faqProductList.value && faqs.value.length > 0){
        faqs.value.forEach(element => {
          for(let i = 0; i < faqProductList.value.length; i++){
            if(element.id === faqProductList.value[i].faq_id){
              faqProductList.value[i].faq_title = element.title
              faqProductList.value[i].faq_position = element.position
            }
          }
        })
      }
      const faqTitleData = ref([])
      for(let i = 0; i < allProduct.value.length; i++){
        faqTitleData.value = []
        const checkProductId = ref()
        if(faqProductList.value.length > 0){
          checkProductId.value = faqProductList.value.some(element => {
            return element.product_id === allProduct.value[i].id
          })
          if(checkProductId.value === false){
            faqTitleData.value = []
            allProduct.value[i].faq_title = faqTitleData.value
          }
          faqProductList.value.forEach(element => {
            if(element.product_id === allProduct.value[i].id){
              faqTitleData.value.push({
                title: element.faq_title,
                id: element.id,
                category_identify: element.category_identify,
                faq_position: element.faq_position
              })
              allProduct.value[i].faq_title = faqTitleData.value
              if(listFaqTitle.value.length === 0){
                listFaqTitle.value.push({
                  faq_title: element.faq_title
                })
              }
              else{
                if(!listFaqTitle.value.some(item => {return item.faq_title === element.faq_title })){
                  listFaqTitle.value.push({
                    faq_title: element.faq_title
                  })
                }
              }
            }
          })
        }
        else{
          faqTitleData.value = []
          allProduct.value[i].faq_title = faqTitleData.value
        }
      }
      for(let i = 0; i < allProduct.value.length; i++){
        if(settings.value.faq_sort_name === true){
          allProduct.value[i].faq_title.sort(function(a, b){
            if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1;}
            if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1;}
            return 0;
          });
        }
        else{
          allProduct.value[i].faq_title.sort(function(a, b){return a.faq_position - b.faq_position});
        }
      }
    }

    const retrieveAllFaqProduct = async function() {
      await FaqProductDataService.getAll()
      .then(response => {
        listFaqTitle.value = []
        allFaqProduct.value = response.data
        store.dispatch('data/setFaqProductData', allFaqProduct.value)
        faqProductList.value = allFaqProduct.value
        if(faqProductList.value && faqs.value.length > 0){
          faqs.value.forEach(element => {
            for(let i = 0; i < faqProductList.value.length; i++){
              if(element.id === faqProductList.value[i].faq_id){
                faqProductList.value[i].faq_title = element.title
                faqProductList.value[i].faq_position = element.position
              }
            }
          })
        }
        const faqTitleData = ref([])
        for(let i = 0; i < allProduct.value.length; i++){
          faqTitleData.value = []
          const checkProductId = ref()
          if(faqProductList.value.length > 0){
            checkProductId.value = faqProductList.value.some(element => {
              return element.product_id === allProduct.value[i].id
            })
            if(checkProductId.value === false){
              faqTitleData.value = []
              allProduct.value[i].faq_title = faqTitleData.value
            }
            faqProductList.value.forEach(element => {
              if(element.product_id === allProduct.value[i].id){
                faqTitleData.value.push({
                  title: element.faq_title,
                  id: element.id,
                  category_identify: element.category_identify,
                  faq_position: element.faq_position
                })
                allProduct.value[i].faq_title = faqTitleData.value
                if(listFaqTitle.value.length === 0){
                  listFaqTitle.value.push({
                    faq_title: element.faq_title
                  })
                }
                else{
                  if(!listFaqTitle.value.some(item => {return item.faq_title === element.faq_title })){
                    listFaqTitle.value.push({
                      faq_title: element.faq_title
                    })
                  }
                }
              }
            })
          }
          else{
            faqTitleData.value = []
            allProduct.value[i].faq_title = faqTitleData.value
          }
        }
        for(let i = 0; i < allProduct.value.length; i++){
          if(settings.value.faq_sort_name === true){
            allProduct.value[i].faq_title.sort(function(a, b){
              if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1;}
              if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1;}
              return 0;
            });
          }
          else{
            allProduct.value[i].faq_title.sort(function(a, b){return a.faq_position - b.faq_position});
          }
        }
        loadAllData.value = false
      })
      .catch(e => {
        console.log(e)
      })
    }

    const searchProductsFaqs = function(){
      if(productSearchTitle.value == '' || productSearchTitle.value == undefined){
        allProduct.value = allProductOrigin.value
      }
      else{
        allProduct.value = allProductOrigin.value.filter((item)=>{
          return productSearchTitle.value.toLowerCase().split(' ').every(v => item.product_title.toLowerCase().includes(v))
        })
      }
      allProduct.value.length === 0? searchProductFaqNotFound.value = true : searchProductFaqNotFound.value = false
    }

    const removeThisProduct = async function(product_id){
      await ProductsDataService.delete(product_id)
      .then(async response => {
        const id = ref()
        id.value = response.data
        await retrieveAllProduct()
      })
      .catch(e => {
        console.log(e)
      })
    }

    const removeThisFaq = async function(faq_product_id){
      await FaqProductDataService.delete(faq_product_id)
      .then(async response => {
        const id = ref()  
        id.value = response.data
        await retrieveAllFaqProduct()
        toast.open({
          message: "Deleted Faq Successfully!",
          type: "success",
          duration: 3000,
          dismissible: true
        })
      })
      .catch(e => {
        console.log(e)
      })
    }
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    const contact = () => {
      if(document.getElementsByClassName('cc-dc5e')[0]){
        document.getElementsByClassName('cc-dc5e')[0].click()
      }
      else{
        let user_nickname = `[FAQ]${shopDomain.value}`
        window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
      }
    }
    const closeProductModal = function(){
      productTitle.value = ''
      addProductOrigin.value = []
      showAllProduct.value = true
    }

    const filterByFaq = ref(false)
    const clearFilterByFaq = function(){
      faqTitle.value = ''
    }
    return{
      getAllFaqProduct,
      changeStatus,
      faqMorePageSetting,
      contact,
      shopify_domain,
      changeBgr,
      waitSavePosition,
      loadAllData,
      savePosition,
      changeColorIconAdd,
      showToast,
      localeDefault,
      hoveDelFaq,
      faqEmty,
      disableSave,
      listFaqTitle,
      clearFilterByFaq,
      faqTitle,
      filterByFaq,
      closeProductModal,
      addProductSearch,
      removeThisFaq,
      removeThisProduct,
      searchProductFaqNotFound,
      productSearchTitle,
      searchProductsFaqs,
      faqProductList,
      allProduct,
      SaveChange,
      removeProducts,
      unSelectAll,
      unSelectAllProduct,
      addProductOrigin,
      selectProductList,
      addProduct,
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
      listPageNumber,
      retrieveListProduct,
      listProduct,
      changeListProduct,
      createFaqProduct,
      retrieveAllFaqProduct,
      retrieveAllProduct,
      changeLocale,
      retrieveCategory,
      faqId,
      categories,
      faqs,
      locale,
      locales,
      retrieveFaq,
      chooseProductSearch,
      products,
      user,
      hasNextPage,
      hasPreviousPage,
      selectProductsId,
      limitSearchValue,
      hoverDel,
      hoverProduct,
      settings
    }
  },
  async created() {
    this.retrieveFaq();
    await this.getAllFaqProduct()
    await this.retrieveListProduct();
  }
})
</script>

<style scoped>
ul{
  margin: 0;
}
</style>