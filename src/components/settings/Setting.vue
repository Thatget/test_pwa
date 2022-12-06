<template>
  <div class="px-4 mb-4">
    <div class="text-start">
      <div class="d-flex align-items-center position-sticky-menu-embeded justify-content-between py-3 border-bottom">
        <div class="d-flex align-items-center">
          <h5 class="fw-bolder m-0 float-start me-4">Settings</h5>
        </div>
        <div class="d-flex">
        </div>
        <div class="dropdown d-flex ">
          <div class="border-bottom">
            <button :disabled="disableClick" @click="updateSetting" class="btn btn-primary-hover d-flex align-items-center justify-content-center text-white float-end bgr-primary text-white">Save
              <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
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
      <div v-if="!loadData">
        <div class="d-flex flex-column flex-xl-row border-bottom py-3">
          <div class="col-12 col-xxl-4 col-xl-4 pe-4 d-flex flex-column">
            <p class="fw-bold float-start" style="font-size: 16px">General</p>
            <p class="float-start text-start">Allows you to change customer facing FAQ URL along with plan you are currently subscribed to.</p>
          </div>
          <div class="col-12 col-xl-8 p-4 border" style="background-color: white; border-radius:10px">
            <div class="mb-4">
              <p class="fw-bold text-start d-flex font-notify">FAQS PAGE URL</p>
              <div class="d-flex align-items-center p-3 p-md-4 flex-md-row flex-column border" style="background-color:#FAFBFB;border-radius:10px;">
                <div class="col-12 col-md-9 mb-3 mb-md-0 p-0 pe-0 pe-md-3">
                  <input type="text" class="form-control" name="page-url" v-model="settings.faq_page_url">
                </div>
                <a class="btn text-white btn-primary-hover col-sm-4 col-md-3 align-self-end text-nowrap bgr-primary text-white" data-bs-toggle="modal" data-bs-target="#page-url"  target="_blank" role="button">Customize URL</a>
                <div class="modal fade" id="page-url" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">How to change FAQ page URL?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="d-flex flex-column">
                          <p>By default FAQ page is located at "/apps/faqs" . If you would like to update that, app allows you to make changes based on your need. In this example, following will be my current and new URLs:</p>
                          <p><b>Current:</b> {{shopDomain}}/apps/faqs</p>
                          <p><b>New:</b> {{shopDomain}}/community/new-faqs</p>
                          <p>To make these changes, please follow these instructions:</p>
                          <p><b>1.</b> Click on <b>"Settings"</b> within your Shopify admin.<a target="_blank" style="text-decoration: none;" class="ms-1"  :href="'https://'+shopDomain+'/admin/settings/apps/app_installations/app/yanet-professional-faq-page'">Setting Page Link <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>
                          <p><b>2.</b> Click on <b>"App and sales channels"</b> , select <b>"Professional FAQ app"</b>.</p>
                          <p><b>3.</b> Click on <b>"Customize URL"</b> under App proxy section.</p>
                          <p><b>4.</b> Choose option that suits your need along with the new FAQ page link.</p>
                          <p><b>5.</b> Click <b>"Save"</b></p>
                          <p><b>6.</b> Visit newly created URL from your browser. Last step, you need to change the "FAQS PAGE URL" setting in the app and save.</p>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary-hover bgr-primary text-white" data-bs-dismiss="modal">I understood</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <span class="text-danger mt-2 d-flex">{{message}}</span> -->
              <span style="font-size: 14px; color:rgb(129, 129, 129)" class="text-start mt-1">Important Note: Once you are redirected, change App Proxy URL. After you are done updating URL, visit newly created page by typing URL in browser.</span>
            </div>
            <div>
              <p class="fw-bold text-start d-flex font-notify">SHOW FAQS ON OTHER PAGES LIKE PRODUCT, CART, HOME PAGE...</p>
              <div id="set-more-page" class="d-flex align-items-center justify-content-between p-3 p-md-4 flex-md-row flex-row border" style="background-color:#FAFBFB;border-radius:10px;">
                <span style="line-height:normal" class="me-3">This setting allows you to show FAQs on other pages of store.</span>
                <router-link class="btn bgr-primary btn-primary-hover text-white" to="/faq-more-page">Settings</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-xl-row py-3 border-bottom">
          <div class="col-12 col-xxl-4 col-xl-4 pe-0 pe-xl-4 d-flex flex-column">
            <p class="fw-bold float-start" style="font-size: 16px">Display settings</p>
            <p class="float-start text-start">Adjust how FAQs and Categories should be shown on customer facing FAQs page.</p>
          </div>
          <div class="col-12 col-xl-8 p-4 border text-start" style="background-color: white; border-radius:10px">
            <div class="form-check mb-3">
              <input class="form-check-input" :disabled="settings.dont_category_faq" type="checkbox" id="sortCategory" v-model="settings.category_sort_name">
              <label class="form-check-label " for="sortCategory">
                Sort categories alphabetically
              </label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="sortFaqs" v-model="settings.faq_sort_name">
              <label class="form-check-label " for="sortFaqs">
                Sort FAQs alphabetically
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="dontCategory" v-model="settings.dont_category_faq">
              <label class="form-check-label " for="dontCategory">
                Don't categorize FAQs (This would show all FAQs flat)
              </label>
            </div>
            <!-- <div class="border p-4 mt-3" style="border-radius: 10px; background-color: rgb(250, 251, 251)">
              <div class="d-flex align-items-center">
                <i class="fas fa-info-circle me-2" style="color: #4989b6;"></i>
                <span>Please save current settings before initiating rearrangement of faqs or categories.</span>
              </div>
              <div class="d-flex flex-column flex-sm-row justify-content-evenly">
                <button @click="changeRouter('faq')" :disabled="settings.faq_sort_name" class="btn btn-primary-hover bgr-primary text-white border rounded col-12 col-sm-6 mt-3 me-0 me-sm-3">
                  Rearrange FAQs
                </button>
                <button @click="changeRouter('category')" :disabled="settings.category_sort_name" class="btn btn-primary-hover border bgr-primary text-white rounded col-12 col-sm-6 mt-3">
                  Rearrange Categories
                </button>
              </div>
            </div> -->
          </div>
        </div>
        <div class="d-flex flex-column flex-xl-row border-bottom py-3">
          <div class="col-12 col-xxl-4 col-xl-4 pe-0 pe-xl-4 d-flex flex-column">
            <p class="fw-bold float-start" style="font-size: 16px">Search bar settings</p>
            <p class="float-start text-start">Allows customers to search for FAQs. Note that search bar only works on stand 
              alone page created by this app. If you are showing FAQs on other parts of your FAQs, it's hidden by default.</p>
          </div>
          <div class="col-12 col-xl-8 p-4 border text-start" style="background-color: white; border-radius:10px">
            <div class="pb-4">
              <p class="fw-bold text-start font-notify">SEARCH PLACEHOLDER</p>
              <div class="p-4 border" style="background-color: #FAFBFB; border-radius: 10px">
                <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{searchPlacehoder}}</div>
                <p class="m-0 pt-1" style="color:rgb(129, 129, 129); font-size: 14px">This text would show on search input box as placeholder</p>
                <div class="mt-1 mb-3" style="font-size: 14px">
                  <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                    <span class="text-color-primary">Edit & Add Translation</span>
                  </router-link>
                  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">Search placeholder</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                            <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                            <input type="text" class="form-control w-100" v-model="searchPlacehoder">
                          </div>
                          <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                            <p class="m-0 mb-2">Add Translation</p>
                            <select @change="changeLocale('search_placehoder')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                              <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                            </select>
                            <div class="d-flex flex-wrap mt-2">
                              <div v-for="element in searchPlacehoderLocales" :key="element" class="me-1">
                                <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                  <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                  <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                  </div>
                                  <div class="text-nowrap">{{ element.locale }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-for="item in languages" :key="item">
                            <div v-if="item.locale === locale && item.primary !== true">
                              <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                <input type="text" class="form-control w-100" v-model="searchPlacehoderTrans">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary-hover bgr-primary text-white d-flex align-items-center" :disabled="disableClick" @click="Save(searchPlacehoder, locale, 'search_placehoder', searchPlacehoderTrans)">Save
                            <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                              <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                <animateTransform attributeType="xml"
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
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p class="fw-bold text-start font-notify">SEARCH NOT FOUND TEXT</p>
              <div class="p-4 border" style="background-color: #FAFBFB; border-radius: 10px">
                <!-- <input type="text" class="form-control w-100" :placeholder="searchNotFound"> -->
                <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{searchNotFound}}</div>
                <p style="color:rgb(129, 129, 129); font-size: 14px" class="m-0 pt-1">This text is shown when customer search doesn't produce any results.</p>
                <div class="mt-1 mb-3" style="font-size: 14px">
                  <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#search-not-found">
                    <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                    <span class="text-color-primary">Edit & Add Translation</span>
                  </router-link>
                  <div class="modal fade" id="search-not-found" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                   aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">Search not found</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                            <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                            <input type="text" class="form-control w-100" v-model="searchNotFound">
                          </div>
                          <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                            <p class="m-0 mb-2">Add Translation</p>
                            <select @change="changeLocale('search_not_found')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                              <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                            </select>
                            <div class="d-flex flex-wrap mt-2">
                              <div v-for="element in searchNotFoundLocales" :key="element" class="me-1">
                                <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                  <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                  <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                  </div>
                                  <div class="text-nowrap">{{ element.locale }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-for="item in languages" :key="item">
                            <div v-if="item.locale === locale && item.primary !== true">
                              <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                <input type="text" class="form-control w-100" v-model="searchNotFoundTrans">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary-hover bgr-primary text-white d-flex align-items-center" :disabled="disableClick" @click="Save(searchNotFound, locale, 'search_not_found', searchNotFoundTrans)">Save
                            <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                              <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                <animateTransform attributeType="xml"
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
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex flex-column flex-xl-row border-bottom py-3">
            <div class="col-12 col-xl-4 pe-4 d-flex flex-column">
              <p class="fw-bold" style="font-size: 16px">Global settings</p>
              <p style="font-size: 14px">You can setup header and footer text along with choosing right template for customer facing FAQ page.</p>
            </div>
            <div class="col-12 col-xl-8 p-4 border bg-white" style="border-radius: 10px" >
              <div class="pb-3">
                <div class="border p-3" style="border-radius: 10px; background-color: #FAFBFB">
                  <div class="pb-1 d-flex align-items-center">
                    <input class="form-check-input" style="width: 15px" v-model="settings.show_intro_text" type="checkbox" id="showIntroText">
                    <label class="form-check-label ms-2" for="showIntroText">
                      Show intro text
                    </label>
                  </div>
                  <div style="max-height: 80px;">
                    <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto;">{{introText}}</div>
                    <!-- <textarea disabled :placeholder="introText" class="border p-2 bg-white w-100 text-break overflow-auto"  rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea> -->
                  </div>
                  <div class="pt-1" style="color:rgb(129, 129, 129); font-size: 14px">
                    <span>This would be shown above all FAQs. Please don't forget single quotes around href tag if you change this.</span>
                  </div>
                  <div class="mt-1 mb-3" style="font-size: 14px">
                    <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#show-intro-text">
                      <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                      <span class="text-color-primary">Edit & Add Translation</span>
                    </router-link>
                    <div class="modal fade" id="show-intro-text" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Intro text</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                              <textarea v-model="introText" class="border p-2 bg-white w-100 text-break overflow-auto"  rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea>
                            </div>
                            <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">Add Translation</p>
                              <select @change="changeLocale('intro_text_content')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                                <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                              </select>
                              <div class="d-flex flex-wrap mt-2">
                                <div v-for="element in introTextLocales" :key="element" class="me-1">
                                  <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                    <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                    <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                    </div>
                                    <div class="text-nowrap">{{ element.locale }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-for="item in languages" :key="item">
                              <div v-if="item.locale === locale && item.primary !== true">
                                <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                  <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                  <input type="text" class="form-control w-100" v-model="introTextTrans">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" :disabled="disableClick" @click="Save(introText, locale, 'intro_text_content', introTextTrans)">Save
                              <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                  width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                  <animateTransform attributeType="xml"
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pb-3">
                <div class="border p-3" style="border-radius: 10px; background-color: #FAFBFB">
                  <div class="pb-1 d-flex align-items-center">
                    <input class="form-check-input" style="width: 15px" type="checkbox" v-model="settings.show_footer_text" id="showFooterText">
                    <label class="form-check-label ms-2" for="showFooterText">
                      Show footer text
                    </label>
                  </div>
                  <div style="max-height: 80px;" >
                    <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{footerText}}</div>
                    <!-- <textarea :placeholder="footerText" class="border p-2 bg-white w-100 text-break overflow-auto" rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea> -->
                  </div>
                  <div class="pt-1" style="color:rgb(129, 129, 129); font-size: 14px">
                    <span>This would be shown below all FAQs.</span>
                  </div>
                  <div class="mt-1 mb-3" style="font-size: 14px">
                    <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#show-footer-text">
                      <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                      <span class="text-color-primary">Edit & Add Translation</span>
                    </router-link>
                    <div class="modal fade" id="show-footer-text" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Footer text</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                                <!-- <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{footerText}}</div> -->
                                <textarea v-model="footerText" class="border p-2 bg-white w-100 text-break overflow-auto" rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea>
                            </div>
                            <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">Add Translation</p>
                              <select @change="changeLocale('footer_text_content')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                                <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                              </select>
                              <div class="d-flex flex-wrap mt-2">
                                <div v-for="element in footerTextLocales" :key="element" class="me-1">
                                  <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                    <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                    <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                    </div>
                                    <div class="text-nowrap">{{ element.locale }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-for="item in languages" :key="item">
                              <div v-if="item.locale === locale && item.primary !== true">
                                <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                  <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                  <input type="text" class="form-control w-100" v-model="footerTextTrans">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" :disabled="disableClick" @click="Save(footerText, locale, 'footer_text_content', footerTextTrans)">Save
                              <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                  width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                  <animateTransform attributeType="xml"
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pb-3">
                <div class="border p-3" style="border-radius: 10px; background-color: #FAFBFB">
                  <div class="pb-1 d-flex align-items-center">
                    <input v-model="settings.show_page_title" class="form-check-input" style="width: 15px" type="checkbox" id="showPageTitle">
                    <label class="form-check-label ms-2" for="showPageTitle">
                      Show page title
                    </label>
                  </div>
                  <div style="max-height: 80px;">
                    <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{pageTitle}}</div>
                    <!-- <textarea :placeholder="pageTitle" class="border p-2 bg-white w-100 text-break overflow-auto" rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea> -->
                  </div>
                  <div class="pt-1" style="color:rgb(129, 129, 129); font-size: 14px">
                    <span>Title for your dedicated FAQ page.</span>
                  </div>
                  <div class="mt-1 mb-3" style="font-size: 14px">
                    <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#show-page-title">
                      <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                      <span class="text-color-primary">Edit & Add Translation</span>
                    </router-link>
                    <div class="modal fade" id="show-page-title" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">FAQs page title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                              <textarea v-model="pageTitle" class="border p-2 bg-white w-100 text-break overflow-auto" rows="3" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea>
                            </div>
                            <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">Add Translation</p>
                              <select @change="changeLocale('page_title_content')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                                <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                              </select>
                              <div class="d-flex flex-wrap mt-2">
                                <div v-for="element in pageTitleLocales" :key="element" class="me-1">
                                  <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                    <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                    <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                    </div>
                                    <div class="text-nowrap">{{ element.locale }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-for="item in languages" :key="item">
                              <div v-if="item.locale === locale && item.primary !== true">
                                <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                  <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                  <input type="text" class="form-control w-100" v-model="pageTitleTrans">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" :disabled="disableClick" @click="Save(pageTitle, locale, 'page_title_content', pageTitleTrans)">Save
                              <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                  width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                  <animateTransform attributeType="xml"
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="border p-3" style="border-radius: 10px; background-color: #FAFBFB">
                  <div class="d-flex pb-1">
                    <input v-model="settings.show_page_construction" class="form-check-input" style="width: 15px" type="checkbox" id="showPageUnderConstruction">
                    <label class="form-check-label ms-2" for="showPageUnderConstruction">
                      Show page under construction
                    </label>
                  </div>
                  <div style="max-height: 80px;">
                    <div class="w-100 p-2 bg-white border rounded" style="min-height: 40px; max-height: 80px; overflow-y: auto">{{pageUnderContruction}}</div>
                    <!-- <textarea class="border p-2 bg-white w-100 text-break overflow-auto" :placeholder="pageUnderContruction" rows="1" style="border-radius: 5px; outline: none; max-height: 80px;"></textarea> -->
                  </div>
                  <div class="pt-1" style="color:rgb(129, 129, 129); font-size: 14px">
                    <span>Text shown when you haven't published any FAQs.</span>
                  </div>
                  <div class="mt-1 mb-3" style="font-size: 14px">
                    <router-link @click="addTranslation" to="" class="text-decoration-none float-end" data-bs-toggle="modal" data-bs-target="#page-under-construction">
                      <i class="text-color-primary fas fa-language fa-lg me-1"></i>
                      <span class="text-color-primary">Edit & Add Translation</span>
                    </router-link>
                    <div class="modal fade" id="page-under-construction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Page under construction</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="border p-3 mb-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">{{localePrimary[0].language}} (Default)</p>
                              <textarea class="border p-2 bg-white w-100 text-break overflow-auto" v-model="pageUnderContruction" rows="3" style="border-radius: 5px; outline: none; max-height: 80px"></textarea>
                            </div>
                            <div class="border p-3" style="border-radius: 10px; background-color: #fafbfb">
                              <p class="m-0 mb-2">Add Translation</p>
                              <select @change="changeLocale('page_under_contruction')" style="cursor:pointer" class="form-select" aria-label="Default select example" v-model="locale">
                                <option v-for="item in locales" :value="item.locale" :key="item">{{item.language}} ({{item.locale}})<span v-if="item.primary === true"> - Default</span></option>
                              </select>
                              <div class="d-flex flex-wrap mt-2">
                                <div v-for="element in pageUnderContructionLocales" :key="element" class="me-1">
                                  <div :title="element.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="element.status === true || element.locale === locale_default? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: .8rem">
                                    <div v-if="element.status === true || element.locale === locale_default" style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                    <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                                    </div>
                                    <div class="text-nowrap">{{ element.locale }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div v-for="item in languages" :key="item">
                              <div v-if="item.locale === locale && item.primary !== true">
                                <div class="border p-3 mt-3" style="border-radius: 10px; background-color: #fafbfb">
                                  <p class="m-0 mb-2 fw-bold">{{ item.language }} ({{ item.locale }}) translation</p>
                                  <input type="text" class="form-control w-100" v-model="pageUnderContructionTrans">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn bgr-primary btn-primary-hover text-white d-flex align-items-center" :disabled="disableClick" @click="Save(pageUnderContruction, locale, 'page_under_contruction', pageUnderContructionTrans)">Save
                              <div v-if="disableClick" class="loader loader--style3 ps-1" title="2">
                                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                  width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                                <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                  <animateTransform attributeType="xml"
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="border-radius: 10px; position: fixed; top: 120px" class="border p-3 bg-white col-4">
      <div class="d-flex align-items-center justify-content-between border-bottom pb-2">
        <span class="fw-bold">Preview</span>
        <i class="fa-solid fa-xmark fs-4" style="cursor:pointer"></i>
      </div>
      <div></div>
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import SettingDataService from "../../services/SettingDataService";
import swal from 'sweetalert';
import { useRoute } from 'vue-router';
import router from '../../router';
import store from '../../store';

export default {
  methods:{
    async Save(content, locale, type, content_trans){
      this.disableClick = true
      await this.save(content, locale, type, content_trans)
      this.$toast.open({
        message: "Updated Successfully!",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    },
    async updateSetting(){
      this.disableClick = true
      await this.saveUpdate()
      this.$toast.open({
        message: "Updated Successfully!",
        type: "success",
        duration: 3000,
        dismissible: true
      })
    }
  },
  setup() {
    const route = useRoute()
    if(route.query.accessToken){
      store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    }
    const loadData = ref()
    const locale = ref()
    const locales = ref([])
    const languages = ref([])
    languages.value = JSON.parse(store.state.auth.languages);
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    locales.value = JSON.parse(store.state.auth.languages)
    locale.value = store.state.auth.locale
    const localePrimary = ref()
    localePrimary.value = locales.value.filter(function(item){
      return item.primary === true
    })
    const locale_default = ref('default')

    const searchPlacehoderArr = ref()
    const searchPlacehoder = ref()
    const searchPlacehoderTrans = ref()

    const searchNotFoundArr = ref()
    const searchNotFound = ref()
    const searchNotFoundTrans = ref()

    const introTextArr = ref()
    const introText = ref()
    const introTextTrans = ref()

    const footerTextArr = ref()
    const footerText = ref()
    const footerTextTrans = ref()

    const pageTitleArr = ref()
    const pageTitle = ref()
    const pageTitleTrans = ref()

    const pageUnderContructionArr = ref()
    const pageUnderContruction = ref()
    const pageUnderContructionTrans = ref()

    const message = ref()
    const settings = ref([])
    settings.value = store.state.data.settings

    const addTranslation = function(){
      locale.value = localePrimary.value[0].locale
    }

    // const listLocalesearchPlacehoder = ref([])
    const searchPlacehoderLocales = ref([])
    const searchNotFoundLocales = ref([])
    const introTextLocales = ref([])
    const footerTextLocales = ref([])
    const pageUnderContructionLocales = ref([])
    const pageTitleLocales = ref([])

    const retrieveSettings = async function() {
      searchPlacehoderLocales.value = []
      searchNotFoundLocales.value = []
      introTextLocales.value = []
      footerTextLocales.value = []
      pageUnderContructionLocales.value = []
      pageTitleLocales.value = []
      await SettingDataService.get()
      .then(response => {
        settings.value = response.data;
        locales.value.forEach(item => {
          if(item.primary != true){
            if(settings.value.search_placehoder !== null){
              searchPlacehoderLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.search_placehoder).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
            if(settings.value.search_not_found !== null){
              searchNotFoundLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.search_not_found).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
            if(settings.value.intro_text_content){
              introTextLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.intro_text_content).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
            if(settings.value.footer_text_content !== null){
              footerTextLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.footer_text_content).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
            if(settings.value.page_under_contruction){
              pageUnderContructionLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.page_under_contruction).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
            if(settings.value.page_title_content !== null){
              pageTitleLocales.value.push({
                locale: item.locale,
                status: JSON.parse(settings.value.page_title_content).some(element => {
                  return element !== null? element.locale == item.locale : ''
                }),
                language : item.language
              })
            }
          }
          else{
            searchPlacehoderLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
            searchNotFoundLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
            introTextLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
            footerTextLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
            pageUnderContructionLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
            pageTitleLocales.value.push({
              locale: item.locale,
              status: true,
              language : item.language
            })
          }
        })
        if(settings.value.search_placehoder !== null) {
          searchPlacehoderArr.value = JSON.parse(settings.value.search_placehoder).filter(function(item) {
            if(item){
              return item.locale === locale_default.value
            }
          })
          if(searchPlacehoderArr.value.length === 1) {
            searchPlacehoder.value = searchPlacehoderArr.value[0].content
          }
          else{
            searchPlacehoder.value = ''
          }
        }
        else{
          searchPlacehoder.value = ''
        }
        if(settings.value.search_not_found !== null) {
          searchNotFoundArr.value = JSON.parse(settings.value.search_not_found).filter(function(item) {
            if(item){
              return item.locale === locale_default.value
            }
          })
          if(searchNotFoundArr.value.length === 1){
            searchNotFound.value = searchNotFoundArr.value[0].content
          }
          else{
            searchNotFound.value = ''
          }
        }
        else{
          searchNotFound.value = ''
        }
        if(settings.value.intro_text_content !== null) {
          introTextArr.value = JSON.parse(settings.value.intro_text_content).filter(function(item) {
            if(item){
              return item.locale === locale_default.value              
            }
          })
          if(introTextArr.value.length === 1){
            introText.value = introTextArr.value[0].content
          }
          else{
            introText.value = ''
          }
        }
        else{
          introText.value = ''
        }
        if(settings.value.footer_text_content !== null) {
          footerTextArr.value = JSON.parse(settings.value.footer_text_content).filter(function(item) {
            if(item){
              return item.locale === locale_default.value
            }
          })
          if(footerTextArr.value.length === 1){
            footerText.value = footerTextArr.value[0].content
          }
          else{
            footerText.value = ''
          }
        }
        else{
          footerText.value = ''
        }
        if(settings.value.page_title_content !== null) {
          pageTitleArr.value = JSON.parse(settings.value.page_title_content).filter(function(item) {
            if(item){
              return item.locale === locale_default.value
            }
          })
          if(pageTitleArr.value.length === 1) {
            pageTitle.value = pageTitleArr.value[0].content
          }
          else{
            pageTitle.value = ''
          }
        }
        else{
          pageTitle.value = ''
        }
        if(settings.value.page_under_contruction !== null) {
          pageUnderContructionArr.value = JSON.parse(settings.value.page_under_contruction).filter(function(item) {
            if(item){
              return item.locale === locale_default.value
            }
          })
          if(pageUnderContructionArr.value.length === 1){
            pageUnderContruction.value = pageUnderContructionArr.value[0].content
          }
          else{
            pageUnderContruction.value = ''
          }
        }
        else{
          pageUnderContruction.value = ''
        }
      })
      .catch(e => {
        console.log(e);
      });
    };

    const getSetting = async () => {
      await SettingDataService.get()
      .then(response => {
        settings.value = response.data;
        store.dispatch('data/setSettingsData', response.data)
      })
      .catch(e => {
        console.log(e);
      });
    }

    const retrieveSetting = function() {
      searchPlacehoderLocales.value = []
      searchNotFoundLocales.value = []
      introTextLocales.value = []
      footerTextLocales.value = []
      pageUnderContructionLocales.value = []
      pageTitleLocales.value = []
      loadData.value = true
      locales.value.forEach(item => {
        if(item.primary != true){
          if(settings.value.search_placehoder !== null){
            searchPlacehoderLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.search_placehoder).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
          if(settings.value.search_not_found !== null){
            searchNotFoundLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.search_not_found).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
          if(settings.value.intro_text_content){
            introTextLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.intro_text_content).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
          if(settings.value.footer_text_content !== null){
            footerTextLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.footer_text_content).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
          if(settings.value.page_under_contruction){
            pageUnderContructionLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.page_under_contruction).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
          if(settings.value.page_title_content !== null){
            pageTitleLocales.value.push({
              locale: item.locale,
              status: JSON.parse(settings.value.page_title_content).some(element => {
                return element !== null? element.locale == item.locale : ''
              }),
              language : item.language
            })
          }
        }
        else{
          searchPlacehoderLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
          searchNotFoundLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
          introTextLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
          footerTextLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
          pageUnderContructionLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
          pageTitleLocales.value.push({
            locale: item.locale,
            status: true,
            language : item.language
          })
        }
      })
      if(settings.value.search_placehoder !== null) {
        searchPlacehoderArr.value = JSON.parse(settings.value.search_placehoder).filter(function(item) {
          if(item){
            return item.locale === locale_default.value
          }
        })
        if(searchPlacehoderArr.value.length === 1) {
          searchPlacehoder.value = searchPlacehoderArr.value[0].content
        }
        else{
          searchPlacehoder.value = ''
        }
      }
      else{
        searchPlacehoder.value = ''
      }
      if(settings.value.search_not_found !== null) {
        searchNotFoundArr.value = JSON.parse(settings.value.search_not_found).filter(function(item) {
          if(item){
            return item.locale === locale_default.value
          }
        })
        if(searchNotFoundArr.value.length === 1){
          searchNotFound.value = searchNotFoundArr.value[0].content
        }
        else{
          searchNotFound.value = ''
        }
      }
      else{
        searchNotFound.value = ''
      }
      if(settings.value.intro_text_content !== null) {
        introTextArr.value = JSON.parse(settings.value.intro_text_content).filter(function(item) {
          if(item){
            return item.locale === locale_default.value              
          }
        })
        if(introTextArr.value.length === 1){
          introText.value = introTextArr.value[0].content
        }
        else{
          introText.value = ''
        }
      }
      else{
        introText.value = ''
      }
      if(settings.value.footer_text_content !== null) {
        footerTextArr.value = JSON.parse(settings.value.footer_text_content).filter(function(item) {
          if(item){
            return item.locale === locale_default.value
          }
        })
        if(footerTextArr.value.length === 1){
          footerText.value = footerTextArr.value[0].content
        }
        else{
          footerText.value = ''
        }
      }
      else{
        footerText.value = ''
      }
      if(settings.value.page_title_content !== null) {
        pageTitleArr.value = JSON.parse(settings.value.page_title_content).filter(function(item) {
          if(item){
            return item.locale === locale_default.value
          }
        })
        if(pageTitleArr.value.length === 1) {
          pageTitle.value = pageTitleArr.value[0].content
        }
        else{
          pageTitle.value = ''
        }
      }
      else{
        pageTitle.value = ''
      }
      if(settings.value.page_under_contruction !== null) {
        pageUnderContructionArr.value = JSON.parse(settings.value.page_under_contruction).filter(function(item) {
          if(item){
            return item.locale === locale_default.value
          }
        })
        if(pageUnderContructionArr.value.length === 1){
          pageUnderContruction.value = pageUnderContructionArr.value[0].content
        }
        else{
          pageUnderContruction.value = ''
        }
      }
      else{
        pageUnderContruction.value = ''
      }
      loadData.value = false
    };

    
    const disabled = ref(false)
    const closeModal = ref(true)

    const changeLocale = async function(type) {
      switch(type){
        case 'search_placehoder':
          if(settings.value.search_placehoder !== null) {
            if(JSON.parse(settings.value.search_placehoder).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              searchPlacehoderTrans.value = JSON.parse(settings.value.search_placehoder).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              searchPlacehoderTrans.value = searchPlacehoder.value
            }
          }
          else{
            searchPlacehoder.value = ''
          }
          break;
        case 'search_not_found':
          if(settings.value.search_not_found !== null) {
            if(JSON.parse(settings.value.search_not_found).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              searchNotFoundTrans.value = JSON.parse(settings.value.search_not_found).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              searchNotFoundTrans.value = searchNotFound.value
            }
          }
          break;
        case 'intro_text_content':
          if(settings.value.intro_text_content !== null) {
            if(JSON.parse(settings.value.intro_text_content).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              introTextTrans.value = JSON.parse(settings.value.intro_text_content).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              introTextTrans.value = introText.value
            }
          }
          break;
        case 'footer_text_content':
          if(settings.value.footer_text_content !== null) {
            if(JSON.parse(settings.value.footer_text_content).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              footerTextTrans.value = JSON.parse(settings.value.footer_text_content).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              footerTextTrans.value = footerText.value
            }
          }
          break;
        case 'page_title_content':
          if(settings.value.page_title_content !== null) {
            if(JSON.parse(settings.value.page_title_content).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              pageTitleTrans.value = JSON.parse(settings.value.page_title_content).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              pageTitleTrans.value = pageTitle.value
            }
          }
          break;
        case 'page_under_contruction':
          if(settings.value.page_under_contruction !== null) {
            if(JSON.parse(settings.value.page_under_contruction).some(function(item) {
              if(item){
                return item.locale === locale.value
              }
            })){
              pageUnderContructionTrans.value = JSON.parse(settings.value.page_under_contruction).filter(function(item) {
                return item.locale === locale.value
              })[0].content
            }
            else{
              pageUnderContructionTrans.value = pageUnderContruction.value
            }
          }
          break;
      }

      for(let i = 0; i < locales.value.length; i++){
        if(locale.value === locales.value[i].locale && locales.value[i].primary === true){
          disabled.value = false
          return
        }
        else {
          disabled.value = true
        }
      }
    }
    const disableClick = ref()
    const initialization = ref()
    const save = async function(content, locale, type, content_trans) {
      disableClick.value = true
      const dataInitialization = [{
        content : content,
        locale : locale_default.value,
      }]
      const dataUpdate = {
        content : content,
        locale : locale_default.value
      }
      const dataTransUpdate = ref()
      if(locale != localePrimary.value[0].locale){
        dataTransUpdate.value = {
          content: content_trans,
          locale: locale
        }
      }
      switch (type) {
        case 'search_placehoder':
          initialization.value = {
            search_placehoder: JSON.stringify(dataInitialization)
          }
          break;
        case 'search_not_found':
          initialization.value = {
            search_not_found: JSON.stringify(dataInitialization)
          }
          break;
        case 'intro_text_content':
          initialization.value = {
            intro_text_content: JSON.stringify(dataInitialization)
          }
          break;
        case 'footer_text_content':
          initialization.value = {
            footer_text_content: JSON.stringify(dataInitialization)
          }
          break;
        case 'page_title_content':
          initialization.value = {
            page_title_content: JSON.stringify(dataInitialization)
          }
          break;
        case 'page_under_contruction':
          initialization.value = {
            page_under_contruction: JSON.stringify(dataInitialization)
          }
          break;
      } 
      if(settings.value[type] === null) {
        await SettingDataService.update(initialization.value)
        .then(async response => {
          const id = ref()
          id.value = response
          message.value = ''
          disableClick.value = false
          await getSetting()
          await retrieveSettings()
        })
        .catch(e => {
          console.log(e);
        });
        return
      }
      else {
        const dataTypeArray = ref([])
        const dataTypeJson = ref()
        dataTypeArray.value = JSON.parse(settings.value[type])
        if(dataTypeArray.value.some(function(item){
          if(item){
            return item.locale === locale
          }
        })){
          for(let i = 0; i < dataTypeArray.value.length; i++){
            if(dataTypeArray.value[i].locale === locale_default.value){
              dataTypeArray.value[i] = dataUpdate
            }
            if(dataTypeArray.value[i].locale === locale){
              dataTypeArray.value[i] = dataTransUpdate.value
            }
          }
          switch (type) {
            case 'search_placehoder':
              dataTypeJson.value = {
                search_placehoder: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'search_not_found':
              dataTypeJson.value = {
                search_not_found: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'intro_text_content':
              dataTypeJson.value = {
                intro_text_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'footer_text_content':
              dataTypeJson.value = {
                footer_text_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'page_title_content':
              dataTypeJson.value = {
                page_title_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'page_under_contruction':
              dataTypeJson.value = {
                page_under_contruction: JSON.stringify(dataTypeArray.value)
              }
              break;
          }
          await SettingDataService.update(dataTypeJson.value)
          .then(async response => {
            const id = ref()
            id.value = response
            message.value = ''
            disableClick.value = false
            await getSetting()
            await retrieveSettings()
          })
          .catch(e => {
            console.log(e);
          });
        }
        else{
          for(let i = 0; i < dataTypeArray.value.length; i++){
            if(dataTypeArray.value[i] && dataTypeArray.value[i].locale === locale_default.value){
              dataTypeArray.value[i] = dataUpdate
            }
          }
          if(dataTransUpdate.value){
            dataTypeArray.value.push(dataTransUpdate.value)
          }
          switch (type) {
            case 'search_placehoder':
              dataTypeJson.value = {
                search_placehoder: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'search_not_found':
              dataTypeJson.value = {
                search_not_found: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'intro_text_content':
              dataTypeJson.value = {
                intro_text_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'footer_text_content':
              dataTypeJson.value = {
                footer_text_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'page_title_content':
              dataTypeJson.value = {
                page_title_content: JSON.stringify(dataTypeArray.value)
              }
              break;
            case 'page_under_contruction':
              dataTypeJson.value = {
                page_under_contruction: JSON.stringify(dataTypeArray.value)
              }
              break;
            } 
            await SettingDataService.update(dataTypeJson.value)
            .then(async response => {
              const id = ref()
              id.value = response
              message.value = ''
              disableClick.value = false
              await getSetting()
              await retrieveSettings()
            })
            .catch(e => {
              console.log(e);
            });
          return
        }
      }
    }

    const saveUpdate = async function() {
      await SettingDataService.update(settings.value)
      .then(async response => {
        const id = ref()
        id.value = response
        message.value = ''
        disableClick.value = false
        await getSetting()
      })
      .catch(e => {
        console.log(e);
        swal("Updated Settings Failed!", {
          buttons: false,
          timer: 3000,
          icon: "error",
        });
      });
    }
    const changeRouter = function(router_name){
      if(router_name === 'faq'){
        router.push({
          path: "/reorder-faqs",
        })
      }
      else{
        router.push({
          path: "/reorder-categories",
        })
      }
    }
    return {
      changeRouter,
      disableClick,
      pageUnderContructionLocales,
      pageTitleLocales,
      introTextLocales,
      footerTextLocales,
      searchNotFoundLocales,
      searchPlacehoderLocales,
      loadData,
      languages,
      saveUpdate,
      shopDomain,
      localePrimary,
      disabled,
      locale,
      locales,
      changeLocale,
      searchPlacehoder,
      searchPlacehoderTrans,
      searchNotFound,
      searchNotFoundTrans,
      introText,
      introTextTrans,
      footerText,
      footerTextTrans,
      pageTitle,
      pageTitleTrans,
      pageUnderContruction,
      pageUnderContructionTrans,
      closeModal,
      save,
      message,
      settings,
      retrieveSetting,
      addTranslation,
      locale_default,
      getSetting,
    }
  },
  created() {
    this.retrieveSetting();
  },
}

</script>

<style>

</style>