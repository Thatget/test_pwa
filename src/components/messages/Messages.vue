<template>
  <div class="mb-3" style="font-family:inherit">
    <div class="col-12 px-2 px-sm-4" style="margin: auto">
      <div class="d-flex align-items-center position-sticky-menu-embeded justify-content-between border-bottom" style="z-index: 10 !important">
        <div class="d-flex align-items-center py-3">
          <div class="d-flex align-items-center">
            <span class="fs-5 me-3 fw-bold">Widget</span>
            <div class="form-check form-switch p-0 d-flex align-items-center justify-content-end mt-1" style="cursor: pointer">
              <!-- <span class="form-check-label me-2 fs-6" for="flexSwitchCheckChecked">{{ messages_settings.faq_messages_visible === true? 'Enable' : 'Disable' }}</span> -->
              <input :disabled="disableSave" class="form-check-input m-0 fs-4" type="checkbox" style="cursor:pointer" @change="changeStatus" v-model="messages_settings.help_desk_visible">
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center py-3">
          <div class="d-none d-sm-flex">
            <router-link to="/translation" class="me-4 hover-color text-black d-flex align-items-center" style="cursor:pointer; text-decoration: none;">
              <i class="hover-color fas fa-language fa-lg me-1 fs-5" style="margin-top:2px"></i>
              <span>Translation</span>
            </router-link>
            <a :href="`https://${ShopifyDomain}/admin/themes/current/editor?context=apps&template=index&activateAppId=${embedAppId}/app-embed`" target="_blank" class="d-flex align-items-center me-4 hover-color text-black" style="cursor:pointer; text-decoration: none;" @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false">
              <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg hover-color me-1" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
              <span>Enable Embed App</span>
            </a>
          </div>
          <div class="dropdown d-block d-sm-none ms-3">
            <button class="btn dropdown-toggle border bg-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <span>More actions</span>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <router-link to="/faq-more-page" class="p-2 d-flex align-items-center text-black d-md-none text-nowrap hover-color" style="text-decoration:none">
                <i class="fas fa-language fa-md me-2" style="font-size: 20px"></i>
                <span class="text-nowrap">Translation</span>
              </router-link>
              <a :href="`https://${ShopifyDomain}/admin/themes/current/editor?context=apps&template=index&activateAppId=${embedAppId}%2Fapp-embed`" target="_blank" class="p-2 d-flex align-items-center text-black d-md-none hover-color text-black" style="cursor:pointer; text-decoration: none;" @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false">
                <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg hover-color me-1" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
                <span class="text-nowrap">Enable Embed App</span>
              </a>
            </div>
          </div>
          <button :disabled="disableSave" @click="updateMessagesSetting" class="ms-3 btn text-white bgr-primary btn-primary-hover d-flex align-items-center">
            <span>Save</span>
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
      <div class="pt-3">
        <div class="p-2 rounded d-flex align-items-center mb-3" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
          <i class="fas fa-info-circle fs-3 ms-2 me-3" style="color: #4989b6;"></i>
          <div class="">
            <p class="m-0 fw-bold">This feature is developed to bring a better experience for users when visiting your store online.</p>
            <ul class="d-flex flex-column flex-xxl-row mt-2 mb-0">
              <li class="m-0 me-0 me-xxl-4 col">Reach brilliant FAQs easily through a dynamic popup.</li>
              <li class="m-0 mx-0 mx-xxl-4 col">Easy to customize the layout to look nice and match your brand.</li>
              <li class="m-0 ms-0 ms-xxl-4 col">Quick to contact and respond by integrating 3rd parties: WhatsApp, messenger, contact form, and phone call</li>
            </ul>
          </div>
        </div>
        <div v-if="!loadData">
          <div class="d-flex flex-column flex-lg-row">
            <div class="col-12 col-lg-6">
              <div class="border bg-white me-0 me-lg-2 p-4" style="border-radius: 10px">
                <div class="pb-2 border-bottom fs-6 d-flex align-items-center justify-content-between">
                  <span class="fw-bold">
                    Config
                  </span> 
                </div>
                <div class="mt-3 border p-3 bg-light" style="border-radius: 10px">
                  <div class="fw-bold pb-3 d-flex align-items-center justify-content-between border-bottom">
                    <span>Theme</span>
                  </div>
                  <div class="ps-4">
                    <div class="mt-2">
                      <span>Welcome title</span>
                      <div style="position:relative">
                        <input :disabled="disableSave" class="form-control mt-2" v-model="messages_settings.welcome_title" type="text" placeholder="" :style="welcome_error === true? 'border: 1px solid red' : ''">
                        <div class="dropdown">
                          <svg id="dropdownMenuButton3" fill="#ff8200" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 20 20" height="20" width="20" style="position:absolute; right: 12px; bottom: 9px; cursor:pointer" focusable="false" aria-hidden="true"><path d="M10 0c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm-2.293 7.707a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm6 0a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm2.082 3.87a5.997 5.997 0 0 1-5.789 4.423 6 6 0 0 1-5.789-4.422c-.081-.299.155-.578.465-.578h10.649c.309 0 .545.279.464.578z"></path></svg>
                          <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton3">
                            <div style="height: 200px; width: 210px; overflow-y: auto;" class="d-flex flex-wrap product-scroll">
                              <li @click="addIcon(item.image)" v-for="item in icons" :key="item" class="d-flex align-items-center m-2" style="cursor:pointer">
                                {{ item.image }}
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div class="text-end" style="font-size: 12px; color: red" v-if="welcome_error === true">{{ error_info }}</div>
                    </div>
                    <div class="mt-2">
                      <span>Description title</span>
                      <input :disabled="disableSave" class="form-control mt-2" v-model="messages_settings.description_title" type="text" placeholder="" :style="description_error === true? 'border: 1px solid red' : ''">
                      <div class="text-end" style="font-size: 12px; color: red" v-if="description_error === true">{{ error_info }}</div>
                    </div>
                    <div class="mt-2">
                      <span>Theme color</span>
                      <div class="d-flex align-items-center mt-2">
                        <div style="height: 38px">
                          <input :disabled="disableSave" type="color" v-model="messages_settings.theme_color" class="h-100 border-none p-0 m-0" style="outline: none; border:none; cursor:pointer">
                        </div>
                        <input :disabled="disableSave" class="form-control ms-2" v-model="messages_settings.theme_color" type="text" placeholder="" :style="theme_color_error === true? 'border: 1px solid red' : ''">
                      </div>
                      <div class="text-end" style="font-size: 12px; color: red" v-if="theme_color_error === true">{{ error_info }}</div>
                    </div>
                    <div class="mt-2">
                      <span>Header text color</span>
                      <div class="d-flex align-items-center mt-2">
                        <div style="height: 36px">
                          <input :disabled="disableSave" type="color" v-model="messages_settings.text_color" class="h-100 border-none p-0 m-0" style="outline: none; border:none; cursor:pointer">
                        </div>
                        <input :disabled="disableSave" class="form-control ms-2" v-model="messages_settings.text_color" type="text" placeholder="" :style="text_color_error === true? 'border: 1px solid red' : ''">
                      </div>
                      <div class="text-end" style="font-size: 12px; color: red" v-if="text_color_error === true">{{ error_info }}</div>
                    </div>
                    <div class="mt-2">
                      <span>Title color</span>
                      <div class="d-flex align-items-center mt-2">
                        <div style="height: 36px">
                          <input :disabled="disableSave" type="color" v-model="messages_settings.send_messages_text_color" class="h-100 border-none p-0 m-0" style="outline: none; border:none; cursor:pointer">
                        </div>
                        <input :disabled="disableSave" class="form-control ms-2" v-model="messages_settings.send_messages_text_color" type="url" placeholder="" :style="send_messages_text_error === true? 'border: 1px solid red' : ''">
                      </div>
                      <div class="text-end" style="font-size: 12px; color: red" v-if="send_messages_text_error === true">{{ error_info }}</div>
                    </div>                  
                    <div class="mt-2">
                      <label for="fontweight">Font Family</label>
                        <select class="form-select mt-1" style="cursor:pointer" id="fontweight" aria-label="Default select example" v-model="messages_settings.font_family">
                          <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div class="mt-3 border bg-light" style="border-radius: 10px">
                  <div class="border-bottom p-3">
                    <div class="fw-bold d-flex align-items-center justify-content-between">
                      <span>Contact Us</span>
                      <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                        <input :disabled="disableSave" class="form-check-input fs-4 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.contact_us_visible">
                      </div>             
                    </div>
                    <div class="ps-0 ps-lg-4" v-if="messages_settings.contact_us_visible">
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="d-flex align-items-center col-3">
                          <i class="fa-solid fa-phone border fs-5 p-2 bg-success rounded text-white me-2"></i>
                          <span class="contact-item-title">Phone</span>
                        </div>
                        <div class="col-7 d-flex">
                          <div class="dropdown">
                            <button class="py-1 px-2 dropdown-toggle d-flex align-items-center justify-content-center bg-white" style="border-radius: 4px 0 0 4px; border: 1px solid #ccc; border-right: none;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <div style="height: 30px; width: 30px;background-size: contain ; background-repeat: no-repeat" :style="`background-image: url(${phoneCountryImage})`"></div>
                            </button>
                            <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton1" style="min-width: 330px">
                              <div class="d-flex align-items-center mb-2 border rounded">
                                <i class="fa-solid fa-magnifying-glass pt-1" style="padding-left: 12px"></i>
                                <input type="text" class="form-control" style="flex:1; border:none;box-shadow: none; outline: none" placeholder="Search" @input="searchCountry1" v-model="countryName1">
                              </div>
                              <div style="height: 200px; overflow-y: auto;" class="d-flex flex-column product-scroll">
                                <li v-for="item in flagData1" :key="item" class="d-flex align-items-center px-2" style="cursor:pointer; font-size: 12px" @click="chooseFlagPhone(item.dialCode, item.image)">
                                  <div style="height: 30px; width: 40px; background-size: contain; background-repeat: no-repeat;" :style="`background-image: url(${item.image})`"></div>
                                  <span class="d-flex align-items-center">
                                    <span class="text-start text-nowrap pe-2">{{ item.name }}</span>
                                    <span class="fw-bold">{{ item.dialCode }}</span>
                                  </span> 
                                </li>
                                <span v-if="flagData1.length === 0" style="margin: 30px auto">{{ searchNotFound1 }}</span>
                              </div>
                            </ul>
                          </div>
                          <input :disabled="disableSave" class="w-100 p-2" type="tel" placeholder="Phone number" style="border-radius: 0 4px 4px 0; border: 1px solid #ccc; outline:none" @input="enterPhone" v-model="messages_settings.phone_number">               
                        </div>
                        <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                          <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.phone_visible">
                        </div>
                      </div>
                      <div class="mt-3">
                        <div class="d-flex align-items-center justify-content-between w-100" v-if="messages_settings.user_id == 1202">
                          <div class="d-flex align-items-center col-3">
                            <svg class=" me-2" width="36" height="36" viewBox="0 0 36 36">
                              <defs>
                                <radialGradient id="radial-gradient" cx="0.372" cy="1.001" r="1.247" gradientUnits="objectBoundingBox">
                                  <stop offset="0" stop-color="#fd5"/>
                                  <stop offset="0.328" stop-color="#ff543f"/>
                                  <stop offset="0.348" stop-color="#fc5245"/>
                                  <stop offset="0.504" stop-color="#e64771"/>
                                  <stop offset="0.643" stop-color="#d53e91"/>
                                  <stop offset="0.761" stop-color="#cc39a4"/>
                                  <stop offset="0.841" stop-color="#c837ab"/>
                                </radialGradient>
                                <radialGradient id="radial-gradient-2" cx="0.161" cy="-0.012" r="0.828" gradientTransform="translate(0 -0.004) scale(1 0.666)" gradientUnits="objectBoundingBox">
                                  <stop offset="0" stop-color="#4168c9"/>
                                  <stop offset="0.999" stop-color="#4168c9" stop-opacity="0"/>
                                </radialGradient>
                              </defs>
                              <g id="icons8-instagram" transform="translate(-5.99 -5.99)">
                                <path id="Path_1" data-name="Path 1" d="M34.017,41.99l-20,.019a8.024,8.024,0,0,1-8.008-7.992l-.019-20a8.024,8.024,0,0,1,7.992-8.008l20-.019a8.024,8.024,0,0,1,8.008,7.992l.019,20A8.022,8.022,0,0,1,34.017,41.99Z" fill="url(#radial-gradient)"/>
                                <path id="Path_2" data-name="Path 2" d="M34.017,41.99l-20,.019a8.024,8.024,0,0,1-8.008-7.992l-.019-20a8.024,8.024,0,0,1,7.992-8.008l20-.019a8.024,8.024,0,0,1,8.008,7.992l.019,20A8.022,8.022,0,0,1,34.017,41.99Z" fill="url(#radial-gradient-2)"/>
                                <path id="Path_3" data-name="Path 3" d="M24,31a7,7,0,1,1,7-7A7.008,7.008,0,0,1,24,31Zm0-12a5,5,0,1,0,5,5A5.006,5.006,0,0,0,24,19Z" fill="#fff"/>
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="1.5" cy="1.5" r="1.5" transform="translate(30 15)" fill="#fff"/>
                                <path id="Path_4" data-name="Path 4" d="M30,37H18a7.008,7.008,0,0,1-7-7V18a7.008,7.008,0,0,1,7-7H30a7.008,7.008,0,0,1,7,7V30A7.008,7.008,0,0,1,30,37ZM18,13a5.006,5.006,0,0,0-5,5V30a5.006,5.006,0,0,0,5,5H30a5.006,5.006,0,0,0,5-5V18a5.006,5.006,0,0,0-5-5Z" fill="#fff"/>
                              </g>
                            </svg>
                            <span class="contact-item-title">Instagram link</span>
                          </div>
                          <div class="col-7">
                            <input :disabled="disableSave" class="form-control" type="url" placeholder="Instagram" v-model="messages_settings.message_link" :style="message_error === true? 'border: 1px solid red' : ''">        
                            <div class="text-end" style="font-size: 12px; color: red" v-if="message_error === true">{{ error_info }}</div>          
                          </div>
                          <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                            <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.message_visible">
                          </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-between w-100" v-else>
                          <div class="d-flex align-items-center col-3">
                            <i class="fa-brands fa-facebook-messenger border fs-5 p-2 bg-primary rounded text-white me-2"></i>
                            <span class="contact-item-title">Message link</span>
                          </div>
                          <div class="col-7">
                            <input :disabled="disableSave" class="form-control" type="url" placeholder="Message" v-model="messages_settings.message_link" :style="message_error === true? 'border: 1px solid red' : ''">        
                            <div class="text-end" style="font-size: 12px; color: red" v-if="message_error === true">{{ error_info }}</div>          
                          </div>
                          <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                            <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.message_visible">
                          </div>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="d-flex align-items-center col-3">
                          <i class="fa-solid fa-envelope fs-5 p-2 rounded text-white me-2" style="background-color: #479dde"></i>
                          <span class="contact-item-title">Contact form</span>
                        </div>
                        <div class="col-7">
                          <input :disabled="disableSave" class="form-control" type="url" placeholder="Contact form" v-model="messages_settings.email_link" :style="email_error === true? 'border: 1px solid red' : ''">    
                          <div class="text-end" style="font-size: 12px; color: red" v-if="email_error === true">{{ error_info }}</div>              
                        </div>
                        <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                          <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.email_visible">
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="d-flex align-items-center col-3">
                          <div style="height: 36px; width: 36px" class="rounded bg-success text-white me-2 d-flex align-items-center justify-content-center">
                            <i class="fa-brands fa-whatsapp fs-4 p-2"></i>
                          </div>
                          <span class="contact-item-title">WhatsApp</span>
                        </div>
                        <div class="col-7 d-flex">
                          <div class="dropdown">
                            <button class="py-1 px-2 dropdown-toggle d-flex align-items-center justify-content-center bg-white" style="border-radius: 4px 0 0 4px; border: 1px solid #ccc; border-right: none;" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                              <div style="height: 30px; width: 30px;background-size: contain ; background-repeat: no-repeat" :style="`background-image: url(${whatsAppCountryImage})`"></div>
                            </button>
                            <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton2" style="min-width: 330px">
                              <div class="d-flex align-items-center mb-2 border rounded">
                                <i class="fa-solid fa-magnifying-glass pt-1" style="padding-left: 12px"></i>
                                <input type="text" class="form-control" style="flex:1; border:none; outline: none; box-shadow: none;" placeholder="Search" @input="searchCountry2" v-model="countryName2">
                              </div>
                              <div style="height: 200px; overflow-y: auto;" class="d-flex flex-column product-scroll">
                                <li v-for="item in flagData2" :key="item" class="d-flex align-items-center px-2" style="cursor:pointer; font-size: 12px" @click="chooseFlagWhatsApp(item.dialCode, item.image)">
                                  <div style="height: 30px; width: 40px; background-size: contain; background-repeat: no-repeat;" :style="`background-image: url(${item.image})`"></div>
                                  <span class="text-nowrap">
                                    {{ item.name }} <span class="fw-bold">{{ item.dialCode }}</span>
                                  </span> 
                                </li>
                                <span v-if="flagData2.length === 0" style="margin: 30px auto">{{ searchNotFound2 }}</span>                            
                              </div>
                            </ul>
                          </div>
                          <input :disabled="disableSave" class="w-100 p-2" type="tel" placeholder="+84 989 115 593" style="border-radius: 0 4px 4px 0; border: 1px solid #ccc; outline:none" @input="enterWhatsApp" v-model="messages_settings.whatsApp_number">                 
                        </div>
                        <div class="form-check form-switch col p-0 d-flex justify-content-end mt-2">
                          <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.whatsApp_visible">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom p-3">
                    <div class="fw-bold d-flex align-items-center justify-content-between">
                      <span>Featured Questions</span>
                      <div class="form-check form-switch ms-2 col p-0 d-flex justify-content-end mt-2">
                        <input :disabled="disableSave" class="form-check-input fs-4 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.feature_questions_visible">
                      </div>
                    </div>
                  </div>
                  <div class="p-3">
                    <div class="fw-bold d-flex align-items-center justify-content-between">
                      <span>Featured Categories</span>
                      <div class="form-check form-switch ms-2 col p-0 d-flex justify-content-end mt-2">
                        <input :disabled="disableSave" class="form-check-input fs-4 m-0" type="checkbox" style="cursor:pointer" v-model="messages_settings.feature_categories_visible">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-3 border p-3 bg-light" style="border-radius: 10px">
                  <div class="fw-bold pb-2 d-flex align-items-center justify-content-between border-bottom">
                    <span>Widget Button</span>
                  </div>
                  <div>
                    <div>
                      <div class="">
                        <div class="ps-4">
                          <div class="mt-2">
                            <div class="d-flex align-items-center justify-content-between">
                              <span>
                                Icon
                              </span>
                              <div class="d-flex align-items-center justify-content-between" style="cursor:pointer">
                                <label for="animation"  style="cursor:pointer">Animation </label>
                                <div class="form-check form-switch ms-2 col p-0 d-flex justify-content-end mt-2"  style="cursor:pointer">
                                  <input :disabled="disableSave" class="form-check-input fs-5 m-0" type="checkbox" id="animation" v-model="messages_settings.animation_visible" style="cursor:pointer">
                                </div>
                              </div>
                            </div>
                            <div class="d-flex flex-wrap">
                              <div class="p-1 mt-2 rounded me-3 me-sm-4" :style="messages_settings.icon_number === '1'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="cursor:pointer" @click="changeIcon('1')">
                                <div style="height: 50px; width: 50px; border-radius: 50%" :style="`background-color: ${messages_settings.button_background_color}`" class="px-2 d-flex align-items-center justify-content-center"> 
                                  <i :class="(messages_settings.animation_visible === true && messages_settings.icon_number === '1')? 'help__desk-open-icon' : ''" class="text-white fs-4 fa-regular fa-envelope"></i>
                                </div>
                              </div>
                              <div class="p-1 mt-2 rounded me-3 me-sm-4" :style="messages_settings.icon_number === '2'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="cursor:pointer" @click="changeIcon('2')">
                                <div style="height: 50px; width: 50px; border-radius: 50%" :style="`background-color: ${messages_settings.button_background_color}`" class="px-2 d-flex align-items-center justify-content-center"> 
                                  <i :class="(messages_settings.animation_visible === true && messages_settings.icon_number === '2')? 'help__desk-open-icon' : ''" class="text-white fs-4 fa-regular fa-message"></i>
                                </div>
                              </div>
                              <div class="p-1 mt-2 rounded me-3 me-sm-4" :style="messages_settings.icon_number === '3'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="cursor:pointer" @click="changeIcon('3')">
                                <div style="height: 50px; width: 50px; border-radius: 50%" :style="`background-color: ${messages_settings.button_background_color}`" class="px-2 d-flex align-items-center justify-content-center"> 
                                  <i :class="(messages_settings.animation_visible === true && messages_settings.icon_number === '3')? 'help__desk-open-icon' : ''" class="text-white fs-4 fa-regular fa-comments"></i>
                                </div>
                              </div>
                              <div class="p-1 mt-2 rounded me-3 me-sm-4" :style="messages_settings.icon_number === '4'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="cursor:pointer" @click="changeIcon('4')">
                                <div style="height: 50px; width: 50px; border-radius: 50%" :style="`background-color: ${messages_settings.button_background_color}`" class="px-2 d-flex align-items-center justify-content-center"> 
                                  <i :class="(messages_settings.animation_visible === true && messages_settings.icon_number === '4')? 'help__desk-open-icon' : ''" class="text-white fs-4 fa-solid fa-question"></i>
                                </div>
                              </div>
                              <div class="p-1 mt-2 rounded me-3 me-sm-4" :style="messages_settings.icon_number === '5'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="cursor:pointer" @click="changeIcon('5')">
                                <div style="height: 50px; width: 50px; border-radius: 50%" :style="`background-color: ${messages_settings.button_background_color}`" class="px-2 d-flex align-items-center justify-content-center"> 
                                  <i :class="(messages_settings.animation_visible === true && messages_settings.icon_number === '5')? 'help__desk-open-icon' : ''" class="fa-solid fa-info text-white fs-4"></i>                                
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="mt-3">
                            <span>Background Color</span>
                            <div class="d-flex align-items-center mt-2">
                              <div style="height: 36px;">
                                <input :disabled="disableSave" type="color" v-model="messages_settings.button_background_color" class="h-100 border-none p-0 m-0" style="outline: none; border:none;cursor:pointer">
                              </div>
                              <input :disabled="disableSave" class="form-control ms-2" v-model="messages_settings.button_background_color" type="url" placeholder="" :style="bg_color_error === true? 'border: 1px solid red' : ''">
                            </div>
                            <div class="text-end" style="font-size: 12px; color: red" v-if="bg_color_error === true">{{ error_info }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4 ps-4">
                      <span>Alignment</span>
                      <div class="d-flex mt-2 flex-column flex-sm-row">
                        <div class="me-0 me-sm-4 text-center d-flex flex-column justify-content-center align-items-center mb-3 mb-sm-0" @click="changeAlignment('left')">
                          <div class="bg-white mb-2" :style="messages_settings.aligment_faq_messages == 'left'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="border-radius: 6px; height: 100px; width: 200px; position: relative; cursor:pointer">
                            <div style="position: absolute; height: 30px; width: 30px; bottom: 6px; left: 6px; border-radius: 50%" :class="messages_settings.aligment_faq_messages === 'left'? 'bgr-primary' : 'bg-secondary'"></div>
                          </div>
                          <span>Bottom left</span>
                        </div>
                        <div class="text-center d-flex flex-column justify-content-center align-items-center" @click="changeAlignment('right')">
                          <div class="bg-white mb-2" :style="messages_settings.aligment_faq_messages == 'right'? 'border: 3px solid #FF8200' : 'border: 3px solid #ccc'" style="border-radius: 6px; height: 100px; width: 200px; position: relative; cursor:pointer">
                            <div style="position: absolute; height: 30px; width: 30px; bottom: 6px; right: 6px; border-radius: 50%" :class="messages_settings.aligment_faq_messages === 'right'? 'bgr-primary' : 'bg-secondary'"></div>
                          </div>
                          <span>Bottom right</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="border bg-white ms-0 ms-lg-2 mt-3 mt-lg-0 p-4 fw-bold" style="border-radius: 10px; font-size: 16px; position: sticky; top: 55px">
                <div class="border-bottom pb-2 fs-6">Preview</div>
                <div class="mt-3" :style="`font-family: ${messages_settings.font_family}`">
                  <div class="border bg-white" style="border-radius: 10px">
                    <div class="d-flex m-4" :class="messages_settings.aligment_faq_messages === 'right'? 'justify-content-end' : 'justify-content-start'">
                      <div :style="showbutton === true? 'opacity: 1' : 'opacity: 0'"  style="border-radius: 10px; overflow: hidden;" class="bg-light">
                        <div v-if="!openCategory && !openFaq" class="border product-scroll" style="overflow-x: hidden;border-radius: 10px">
                          <div class="help__desk-home">
                            <div class="" style="height: 100px; margin: -35px; position:relative">
                              <div class="help__desk-background" :style="`background-color: ${messages_settings.theme_color}`"></div>
                              <div class="help__desk-header text-white m-3 p-4" style="position:absolute; top:0; width: calc(100% - 32px)">
                                <div class="">
                                  <p class="help__desk-hi" :style="`color: ${messages_settings.text_color}`" >{{ messages_settings.welcome_title }}</p> 
                                  <span span class="help__desk-title" :style="`color: ${messages_settings.text_color}`" >{{ messages_settings.description_title }}</span>
                                </div>
                                <div class="help__desk-icon" title="Close" @click="showbutton = !showbutton">
                                  <svg width="26" height="26" fill="#fff" style="margin: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                                </div>
                              </div>                          
                            </div>
                            <div class="help__desk-body help__desk-scroll" style="position:relative; margin-top: 70px; padding-bottom: 1px; border-radius: 6px;">
                              <div>
                                <div v-if="messages_settings.contact_us_visible" class="help__desk-contact-items help__desk-component mb-3 bg-white p-3 border" style="border-radius: 6px">
                                  <span class="help__desk-label m-0" :style="`color: ${messages_settings.send_messages_text_color}; `">Contact Us </span>
                                  <div v-if="messages_settings.phone_visible || messages_settings.message_visible || messages_settings.email_visible || messages_settings.whatsApp_visible" class="help__desk-items d-flex align-items-center" >
                                    <a v-if="messages_settings.phone_visible" :href="`tel:${messages_settings.phone_number}`" style="margin-left: 28px" target="_blank">
                                      <i class="fa-solid fa-phone border fs-4 p-2 bg-success rounded text-white"></i>
                                    </a>
                                    <a :href="`${messages_settings.message_link}`" style="margin-left: 28px; height: 40px; width: 40px;" target="_blank" v-if="messages_settings.message_visible && messages_settings.user_id == 1202">
                                      <svg width="40" height="40" viewBox="0 0 40 40">
                                        <defs>
                                          <radialGradient id="radial-gradient" cx="0.372" cy="1.001" r="1.247" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stop-color="#fd5"/>
                                            <stop offset="0.328" stop-color="#ff543f"/>
                                            <stop offset="0.348" stop-color="#fc5245"/>
                                            <stop offset="0.504" stop-color="#e64771"/>
                                            <stop offset="0.643" stop-color="#d53e91"/>
                                            <stop offset="0.761" stop-color="#cc39a4"/>
                                            <stop offset="0.841" stop-color="#c837ab"/>
                                          </radialGradient>
                                          <radialGradient id="radial-gradient-2" cx="0.161" cy="-0.012" r="0.828" gradientTransform="translate(0 -0.004) scale(1 0.666)" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stop-color="#4168c9"/>
                                            <stop offset="0.999" stop-color="#4168c9" stop-opacity="0"/>
                                          </radialGradient>
                                        </defs>
                                        <g id="icons8-instagram" transform="translate(-5.99 -5.99)">
                                          <path id="Path_1" data-name="Path 1" d="M37.115,45.969,14.9,45.99a8.911,8.911,0,0,1-8.893-8.875L5.99,14.9a8.911,8.911,0,0,1,8.875-8.893l22.21-.021a8.911,8.911,0,0,1,8.893,8.875l.021,22.21A8.909,8.909,0,0,1,37.115,45.969Z" fill="url(#radial-gradient)"/>
                                          <path id="Path_2" data-name="Path 2" d="M37.115,45.969,14.9,45.99a8.911,8.911,0,0,1-8.893-8.875L5.99,14.9a8.911,8.911,0,0,1,8.875-8.893l22.21-.021a8.911,8.911,0,0,1,8.893,8.875l.021,22.21A8.909,8.909,0,0,1,37.115,45.969Z" fill="url(#radial-gradient-2)"/>
                                          <path id="Path_3" data-name="Path 3" d="M24,31a7,7,0,1,1,7-7A7.008,7.008,0,0,1,24,31Zm0-12a5,5,0,1,0,5,5A5.006,5.006,0,0,0,24,19Z" transform="translate(1.991 1.991)" fill="#fff"/>
                                          <circle id="Ellipse_1" data-name="Ellipse 1" cx="1.5" cy="1.5" r="1.5" transform="translate(32.895 16.086)" fill="#fff"/>
                                          <path id="Path_4" data-name="Path 4" d="M32.909,40.981H19.072A8.081,8.081,0,0,1,11,32.909V19.072A8.081,8.081,0,0,1,19.072,11H32.909a8.081,8.081,0,0,1,8.072,8.072V32.909A8.081,8.081,0,0,1,32.909,40.981ZM19.072,13.306a5.772,5.772,0,0,0-5.766,5.766V32.909a5.772,5.772,0,0,0,5.766,5.766H32.909a5.772,5.772,0,0,0,5.766-5.766V19.072a5.772,5.772,0,0,0-5.766-5.766Z" fill="#fff"/>
                                        </g>
                                      </svg>
                                    </a>
                                    <a v-if="messages_settings.message_visible && messages_settings.user_id != 1202" :href="`${messages_settings.message_link}`" style="margin-left: 28px" target="_blank">
                                      <i class="fa-brands fa-facebook-messenger border fs-4 p-2 bg-primary rounded text-white"></i>
                                    </a>
                                    <a v-if="messages_settings.email_visible" :href="`${messages_settings.email_link}`" style="margin-left: 28px" target="_blank">
                                      <i class="fa-solid fa-envelope fs-4 p-2 rounded text-white" style="background-color: #479dde"></i>
                                    </a>
                                    <a :href="`https://api.whatsapp.com/send?phone=${messages_settings.whatsApp_number.slice(1).replace(/\s+/g, '')}`" target="_blank" v-if="messages_settings.whatsApp_visible" style="height: 40px; width: 40px; text-decoration: none; margin-left: 28px" class="rounded bg-success text-white d-flex align-items-center justify-content-center">
                                      <i class="fa-brands fa-whatsapp fs-3"></i>
                                    </a>
                                  </div>
                                </div>
                                <div v-if="messages_settings.feature_questions_visible" class="help__desk-contact-items help__desk-component mb-3 bg-white border" style="border-radius: 6px">
                                  <span class="help__desk-label m-0 px-3 pt-3" :style="`color: ${messages_settings.send_messages_text_color}; font-size: 16px`">FAQs</span>
                                  <div class="help__desk-search px-3 py-2">
                                    <div class="help__desk-search-main d-flex justify-content-between align-items-center" style="border: 1px solid #ccc; border-radius: 20px; overflow: hidden; height: 36px">
                                      <i class="fa-solid fa-magnifying-glass ps-2 pe-2" style="padding-top: 2px"></i>
                                      <input class="fs-6" id="search-faq" v-model="faqTitleSearch" @input="searchFaqFeature"  style="flex: 1; border: none; outline: none;" type="text" placeholder="Search">
                                    </div>
                                  </div>
                                  <div class="help__desk-main mb-2 product-scroll" style="max-height: 190px; overflow-y: auto"> 
                                    <div v-for="(item,index) in faqs" class="help__desk-list" :key="index">
                                      <div v-if="item.feature_faq" @click="showFaqFeature(item)" @mousemove="hoverFaq = index" @mouseleave="hoverFaq = ''"  :style="hoverFaq === index? 'background-color: #e9edf1' : ''" class="help__desk-item d-flex justify-content-between align-items-center px-4 py-2" style="cursor:pointer; font-size: 13px">
                                        <span style="word-break:break-all; font-weight: 400">{{ item.title }}</span>
                                        <i class="fa-solid fa-angle-right ms-3 pt-1"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="messages_settings.feature_categories_visible" class="help__desk-contact-items help__desk-component mb-3 bg-white border" style="border-radius: 6px">
                                  <span class="help__desk-label m-0 p-3 border-bottom" :style="`color: ${messages_settings.send_messages_text_color}`">Categories</span>
                                  <div class="help__desk-main mb-2 product-scroll" style="max-height: 190px; overflow-y: auto"> 
                                    <div v-for="(item, index) in categories" :key="item" class="help__desk-list">
                                      <div v-if="item.feature_category" @click="showCategoryFeature(item)" @mousemove="hoverCategory = index" @mouseleave="hoverCategory = ''"  :style="hoverCategory === index? 'background-color: #e9edf1' : ''" class="help__desk-item border-bottom d-flex justify-content-between align-items-center py-2 px-4" style="cursor:pointer">
                                        <div>
                                          <span style="word-break:break-all">{{ item.title }}</span>
                                          <br>
                                          <span style="color:#98c6cd; font-size: 13px;font-weight: 400;">{{ item.count_faqs }} FAQs</span>
                                        </div>
                                        <i class="fa-solid fa-angle-right ms-3 pt-1"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="openCategory && !openFaq" class="border" style="height: 500px; width: 370px; background-color: white; position:relative; padding-bottom: 1px;overflow: hidden;border-radius: 10px">
                          <div style="max-height: 100px; position:relative" :style="`background-color: ${messages_settings.theme_color}`">
                            <div class="help__desk-header text-white d-flex align-items-center" style="">
                              <div class="help__desk-icon d-flex align-items-center justify-content-center" @click="openCategory = false ,openFaq = false" style="cursor:pointer;">
                                <i class="fa-solid fa-chevron-left fs-4 p-1"></i>
                              </div>
                              <div class="fs-4">
                                <span>{{ category_title }}</span>
                              </div>
                              <div class="help__desk-icon" title="Close" @click="showbutton = !showbutton">
                                <svg width="26" height="26" fill="#fff" style="margin: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                              </div>
                            </div>                          
                          </div>
                          <div class="pt-2 product-scroll" style="overflow-y:auto; height: 425px">
                            <div class="help__desk-search-main d-flex justify-content-between align-items-center mb-2 mx-3 my-2" style="border: 1px solid #ccc; border-radius: 20px; overflow: hidden; height: 36px">
                              <i class="fa-solid fa-magnifying-glass ps-2 pe-2" style="padding-top: 2px; font-size: 14px"></i>
                              <input class="fs-6" id="search-faq" v-model="faqTitle" @input="searchFaqInCategory" style="flex: 1; border: none; outline: none;" type="text" placeholder="Search">
                            </div>
                            <div>
                              <div v-for="(item, index) in faqsInCategory" :key="item" @mousemove="hoverFaq = index" @mouseleave="hoverFaq = ''" @click="showFaqFeature(item)" class="py-2 px-4" style="font-size: 14px; cursor:pointer" :style="hoverFaq === index? 'background-color: #e9edf1' : ''">
                                <div class="d-flex justify-content-between align-items-center" style="font-weight: 400">
                                  <span style="word-break:break-all">{{ item.title }}</span>
                                  <i class="fa-solid fa-angle-right ms-3 pt-1"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="openCategory && openFaq" class="border" style="height: 500px; width: 370px; background-color: white; position:relative; padding-bottom: 1px; overflow: hidden;border-radius: 10px">
                          <div style="position:relative" :style="`background-color: ${messages_settings.theme_color}`">
                            <div class="help__desk-header text-white d-flex align-items-center" style="">
                              <div class="help__desk-icon d-flex align-items-center justify-content-center" @click="openCategory = true ,openFaq = false" style="cursor:pointer;">
                                <i class="fa-solid fa-chevron-left fs-4 p-1"></i>
                              </div>
                              <div class="fs-4">
                                <span>{{ category_title }}</span>
                              </div>
                              <div class="help__desk-icon" title="Close" @click="showbutton = !showbutton">
                                <svg width="26" height="26" fill="#fff" style="margin: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                              </div>
                            </div>                          
                          </div>
                          <div class="product-scroll" style="overflow-y:auto; height: 425px">
                            <div class="mx-3 py-3 bg-white" style="overflow:hidden">
                              <p class="fw-bold" style="word-break: break-all; font-size: 16px; text-align: center;">{{ faqInfo.title }}</p>
                              <span style="font-weight: 400; word-break: break-all" v-html="`${faqInfo.content}`"></span>
                            </div>
                          </div>
                        </div>
                        <div v-else-if="!openCategory && openFaq" class="border" style="height: 500px; width: 370px; background-color: white; position:relative; padding-bottom: 1px; overflow: hidden;border-radius: 10px">
                          <div style="position:relative" :style="`background-color: ${messages_settings.theme_color}`"> 
                            <div class="help__desk-header text-white d-flex align-items-center">
                              <div @click="openCategory = false ,openFaq = false" class="help__desk-icon d-flex align-items-center justify-content-center" style="cursor:pointer;">
                                <i class="fa-solid fa-chevron-left fs-4" style="cursor:pointer"></i>
                              </div>
                              <div class="fs-4">
                                <span class="">FAQs</span>
                              </div>
                              <div class="help__desk-icon" title="Close" @click="showbutton = !showbutton">
                                <svg width="26" height="26" fill="#fff" style="margin: auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                              </div>
                            </div>                          
                          </div>
                          <div class="product-scroll" style="overflow-y:auto; height: 425px">
                            <div class="mx-3 py-3 bg-white" style="overflow:hidden">
                              <p class="fw-bold" style="word-break: break-all; font-size: 16px; text-align: center;">{{ faqInfo.title }}</p>
                              <span style="font-weight: 400; word-break: break-all" v-html="`${faqInfo.content}`"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex m-4" :class="messages_settings.aligment_faq_messages === 'right'? 'justify-content-end' : 'justify-content-start'">
                      <div class="" style="cursor: pointer" @click="showbutton = !showbutton">
                        <div style="height: 60px; width: 60px; border-radius: 50%" class="help__desk-icon-hover px-2 d-flex align-items-center justify-content-center" :style="`background-color: ${messages_settings.button_background_color}`"> 
                          <i :class="messages_settings.animation_visible === true? 'help__desk-open-icon' : ''" class="text-white fa-regular fa-envelope" style="font-size: 36px" v-if="!showbutton && messages_settings.icon_number === '1'"></i>
                          <i :class="messages_settings.animation_visible === true? 'help__desk-open-icon' : ''" class="text-white fa-regular fa-message" style="font-size: 30px" v-if="!showbutton && messages_settings.icon_number === '2'"></i>
                          <i :class="messages_settings.animation_visible === true? 'help__desk-open-icon' : ''" class="text-white fa-regular fa-comments" style="font-size: 30px" v-if="!showbutton && messages_settings.icon_number === '3'"></i>
                          <i :class="messages_settings.animation_visible === true? 'help__desk-open-icon' : ''" class="text-white fa-solid fa-question" style="font-size: 40px" v-if="!showbutton && messages_settings.icon_number === '4'"></i>
                          <i :class="messages_settings.animation_visible === true? 'help__desk-open-icon' : ''" class="fa-solid fa-info text-white" style="font-size: 38px" v-if="!showbutton && messages_settings.icon_number === '5'"></i>                        
                          <i class="fa-solid fa-angle-down text-white" style="font-size: 38px" v-if="showbutton"></i>
                        </div>
                      </div>
                    </div>
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
    </div>
  </div>
</template>
<script>
  import MessagesDataService from '../../services/MessagesDataService';
  import { ref } from 'vue';
  import { inject } from 'vue'
  import MessagesSettingDataService from "../../services/MessagesSettingDataService";
  import flag from '../../assets/flag.json'
  import dial from '../../assets/dialCode.json'
  import icon from '../../assets/icon.json'
  import store from '../../store'
  import translation from '../../assets/translation.json'
  export default {
    setup(){
      const embedAppId = ref()
      embedAppId.value = 'b70c1465-6820-4911-8d5d-2299efd66134'
      const changeColorIconAdd = ref()
      const faqTitleSearch = ref()
      const hoverFaq = ref()
      const hoverCategory = ref()
      const openFaq = ref()
      const showFaqData = ref()
      const disableSave = ref()
      const icons = ref([])
      icons.value = icon
      const toast = inject('$toast');
      const flagData1 = ref([])
      flagData1.value = flag
      const showbutton = ref(true)
      const hoverDelAll = ref()
      const loadData = ref(true)
      const hoverDel = ref()
      const messagesDataOrigin = ref([])
      const messagesData = ref([])
      const hoverItem = ref()
      const locale = ref(store.state.auth.locale)
      const phoneCountryName = ref()
      const phoneCountryImage = ref()
      const phoneCountryDial = ref()
      const phoneNumber = ref()
      const whatsAppNumber = ref()
      const settings = ref([])
      const timeSend = ref()
      const whatsAppDial = ref()
      const whatsAppCountryImage = ref()
      const flagDataOrigin = ref([])
      const flagData2 = ref([])
      const countryName1 = ref()
      const countryName2 = ref()
      const searchNotFound2 = ref()
      const messages_settings = ref([])
      const phone_number_create = ref()
      const whatsApp_number_create = ref()
      const message_error = ref()
      const email_error = ref()
      const welcome_error = ref()
      const description_error = ref()
      const theme_color_error = ref()
      const text_color_error = ref()
      const bg_color_error = ref()
      const send_messages_text_error = ref()
      const error_info = ref()
      const fontFamily = ["Questrial", "Time New Roman", "Lucida Sans", "Courier", "Garamond", "Arial", "Calibri", "Playfair Display", "Varela Round", "unset"]
      const faqs = ref([])
      const openCategory = ref()
      const categories = ref([])
      const faqsInCategory = ref([])
      const faqsInCategoryOrigin = ref([])
      const category_title = ref()
      const faqInfo = ref()
      const ShopifyDomain = ref()
      ShopifyDomain.value = store.state.auth.shopifyDomain
      faqs.value = store.state.data.faqs
      categories.value = store.state.data.categories
      const showCategoryFeature = (cat) => {
        openCategory.value = true
        faqTitle.value = ''
        category_title.value = cat.title
        // openFaq.value = false
        faqsInCategoryOrigin.value = faqs.value.filter(item => {
          return (cat.identify === item.category_identify)
        })
        faqsInCategory.value = faqsInCategoryOrigin.value
      }
      flagData1.value.forEach(item => {
        dial.forEach(element => {
          if(item.code === element.iso){
            item.dialCode = element.dialCode
            if(item.code.toLowerCase() === locale.value){
              phoneCountryImage.value = item.image
              whatsAppCountryImage.value = item.image
              phone_number_create.value = element.dialCode
              phoneCountryDial.value = element.dialCode
              whatsApp_number_create.value = element.dialCode
              whatsAppDial.value = element.dialCode
            }
          }
        })
      })
      flagData2.value = flagData1.value
      flagDataOrigin.value = flagData1.value

      const showFaqFeature = (faq) => {
        showFaqData.value = true
        openFaq.value = true
        faqInfo.value = faq
        // openCategory.value = false
      }
      const faqTitle = ref()
      const searchFaqFeature = () => {
        if(faqTitleSearch.value !== ''){
          faqs.value = store.state.data.faqs.filter((item)=>{
            return faqTitleSearch.value.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
          })
        }
        else{
          faqs.value = store.state.data.faqs
        }
      }

      const searchFaqInCategory = () => {
        if(faqTitle.value !== ''){
          faqsInCategory.value = faqsInCategoryOrigin.value.filter((item)=>{
            return faqTitle.value.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
          })
        }
        else{
          faqsInCategory.value = faqsInCategoryOrigin.value
        }
      }

      const retriveMessagesSetting = async () => {
        if(store.state.data.faq_messages_setting.id){
          messages_settings.value = store.state.data.faq_messages_setting
          loadData.value = false
        }
        else{
          await MessagesSettingDataService.findOne()
          .then(response => {
            messages_settings.value = response.data 
            store.dispatch('data/setFaqMessagesSetting', response.data )
            dial.forEach(item => {
              if(item.dialCode === messages_settings.value.phone_number.slice(0, messages_settings.value.phone_number.indexOf(' '))){
                flagDataOrigin.value.forEach(element => {
                  if(item.iso === element.code){
                    phoneCountryImage.value = element.image
                  }
                })
              }
              if(item.dialCode === messages_settings.value.whatsApp_number.slice(0, messages_settings.value.whatsApp_number.indexOf(' '))){
                flagDataOrigin.value.forEach(element => {
                  if(item.iso === element.code){
                    whatsAppCountryImage.value = element.image
                  }
                })
              }
            })
            loadData.value = false
          })
          .catch(async e => {
            console.log(e)
            await createMessagesSetting()
          })
        }
      }

      const createMessagesSetting = async () => {
        const data = {
          help_desk_visible: false,
          sort_by: 'date',
          contact_us_visible: true,
          phone_visible: true,
          email_visible: false,
          whatsApp_visible: true,
          animation_visible: false,
          message_visible: false,
          faq_messages_visible: false,
          email_link: '',
          phone_number: phone_number_create.value,
          whatsApp_number: whatsApp_number_create.value,
          message_link: '',
          welcome_title: 'Hi✌️',
          description_title: 'May I help you?',
          theme_color: '#FF8200',
          text_color: '#ffffff',
          icon_number: '4',
          button_background_color: '#FF8200',
          aligment_faq_messages: 'right',
          button_title: 'Send',
          font_family: "Time New Roman",
          send_messages_text_color: "#5c6282",
          feature_questions_visible: true,
          feature_categories_visible: true,
          translation: JSON.stringify(translation),
          primary_language: 'English'
        }
        await MessagesSettingDataService.create(data)
        .then(async response => {
          const responsedata = ref()
          responsedata.value = response.data
          await retriveMessagesSetting()
        })
        .catch(e => {
          console.log(e)
        })
      }

      const updateMessagesSetting = async () => {
        if(
          (messages_settings.value.message_link === '' && messages_settings.value.message_visible === true) || 
          (messages_settings.value.email_link === '' && messages_settings.value.email_visible === true) ||
          messages_settings.value.theme_color === '' ||
          messages_settings.value.text_color === '' ||
          messages_settings.value.welcome_title === '' ||
          messages_settings.value.description_title === '' ||
          messages_settings.value.button_background_color === ''
          ){
          if(messages_settings.value.message_link === '' && messages_settings.value.message_visible === true){
            message_error.value = true
          }
          else{
            message_error.value = false
          }
          if(messages_settings.value.email_link === '' && messages_settings.value.email_visible === true){
            email_error.value = true
          }
          else{
            email_error.value = false
          }
          if(messages_settings.value.theme_color === ''){
            theme_color_error.value = true
          }
          else{
            theme_color_error.value = false
          }
          if(messages_settings.value.text_color === ''){
            text_color_error.value = true
          }
          else{
            text_color_error.value = false
          }
          if(messages_settings.value.button_background_color === ''){
            bg_color_error.value = true
          }
          else{
            bg_color_error.value = false
          }
          if(messages_settings.value.send_messages_text_color === ''){
            send_messages_text_error.value = true
          }
          else{
            send_messages_text_error.value = false
          }
          if(messages_settings.value.description_title === ''){
            description_error.value = true
          }
          else{
            description_error.value = false
          }
          if(messages_settings.value.welcome_title === ''){
            welcome_error.value = true
          }
          else{
            welcome_error.value = false
          }
          error_info.value = 'This field is required !'
        }
        else{
          disableSave.value = true
          if(messages_settings.value.welcome_title !== '' && messages_settings.value.description_title !== ''){
            await MessagesSettingDataService.update(messages_settings.value)
            .then(async response => {
              const responseData = ref()
              responseData.value = response.data
              toast.open({
                message: "Update Successfully !",
                type: "success",
                duration: 3000,
                dismissible: true
              })
              disableSave.value = false
              message_error.value = false
              email_error.value = false
              theme_color_error.value = false
              text_color_error.value = false
              welcome_error.value = false
              description_error.value = false
              bg_color_error.value = false
              await retriveMessagesSetting()
            })
            .catch(e => {
              toast.open({
                message: "Update Error !",
                type: "error",
                duration: 3000,
                dismissible: true
              })
              console.log(e)
            })
          }
          else{
            welcome_error.value = true
            description_error.value = true
          }
        }
      }

      const changeSort = (type) => {
        switch(type){
          case 'name':
            messagesData.value.sort(function(a, b){
              if (a.customer_name.toLowerCase() < b.customer_name.toLowerCase()) {return -1;}
              if (a.customer_name.toLowerCase() > b.customer_name.toLowerCase()) {return 1;}
              return 0;
            })
            break;
          case 'date':
            messagesData.value.sort(function(a, b){
              if (a.sort_time < b.sort_time) {return -1;}
              if (a.sort_time > b.sort_time) {return 1;}
              return 0;
            })
            break;
          case 'title':
            messagesData.value.sort(function(a, b){
              if (a.faq_title.toLowerCase() < b.faq_title.toLowerCase()) {return -1;}
              if (a.faq_title.toLowerCase() > b.faq_title.toLowerCase()) {return 1;}
              return 0;
            })           
            break;
        }
      }
      const searchNotFound1 = ref()
      const searchCountry1 = () => {
        if(countryName1.value !== ''){
          if(!isNaN(Number(countryName1.value))){
            flagData1.value = flagDataOrigin.value.filter((item) => {
              return countryName1.value.toLowerCase().split(' ').every(v => item.dialCode.toLowerCase().includes(v))
            })
          }
          else{
            flagData1.value = flagDataOrigin.value.filter((item) => {
              return countryName1.value.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
            })
          }
          searchNotFound1.value = flagData1.value.length === 0? 'No entries to show !' : ''
        }
        else{
          flagData1.value = flagDataOrigin.value
          searchNotFound1.value = ''
        }
      }

      const searchCountry2 = () => {
        if(countryName2.value !== ''){
          if(!isNaN(Number(countryName2.value))){
            flagData2.value = flagDataOrigin.value.filter((item)=>{
              return countryName2.value.toLowerCase().split(' ').every(v => item.dialCode.toLowerCase().includes(v))
            })
          }
          else{
            flagData2.value = flagDataOrigin.value.filter((item)=>{
              return countryName2.value.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
            })
          }
          searchNotFound2.value = flagData2.value.length === 0? 'No entries to show !' : ''
        }
        else{
          flagData2.value = flagDataOrigin.value
          searchNotFound2.value = ''
        }
      }
      const enterPhone = () => {
        phoneNumber.value = messages_settings.value.phone_number.slice(phoneCountryDial.value.length)
        const x = phoneNumber.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)
        phoneNumber.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '')
        messages_settings.value.phone_number = phoneCountryDial.value + ' ' + phoneNumber.value
      }
      
      const addIcon = (icon) => {
        messages_settings.value.welcome_title = messages_settings.value.welcome_title + `${icon}`
      }
      const chooseFlagPhone = (dial, image) => {
        phoneCountryDial.value = dial
        phoneCountryImage.value = image
        messages_settings.value.phone_number = phoneNumber.value? phoneCountryDial.value + ' ' + phoneNumber.value : phoneCountryDial.value
      }

      const chooseFlagWhatsApp = (dial, image) => {
        whatsAppDial.value = dial
        messages_settings.value.whatsApp_number = whatsAppNumber.value? whatsAppDial.value + ' ' + whatsAppNumber.value : whatsAppDial.value
        whatsAppCountryImage.value = image
      }

      const changeIcon = (number) => {
        messages_settings.value.icon_number = number
      }

      const enterWhatsApp = () => {
        whatsAppNumber.value = messages_settings.value.whatsApp_number.slice(whatsAppDial.value.length)
        const x = whatsAppNumber.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)
        whatsAppNumber.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '')
        messages_settings.value.whatsApp_number = whatsAppDial.value + ' ' + whatsAppNumber.value
      }

      const deletequestion = async (id) => {
        if(id){
          for(let i = 0; i < messagesData.value.length; i++){
            if(messagesData.value[i].id === id){
              messagesData.value.splice(i, 1)
            }
          }
          toast.open({
            message: "Deleted question Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          await MessagesDataService.delete(id)
          .then(response => {
            const id = ref()
            id.value = response
            retriveMessages()
          })
          .catch(e => {
            console.log(e)
          })
        }
      }

      const changeStatus = async () => {
        await MessagesSettingDataService.update(messages_settings.value)
        .then(respone => {
          const id = ref()
          id.value = respone.data
          toast.open({
            message: "Update Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          store.dispatch('data/setFaqMessagesSetting', messages_settings.value)
        })
        .catch(e => {
          console.log(e)
        })  
      }

      const retriveMessages = async () => {
        messagesDataOrigin.value = []
        await MessagesDataService.findAll()
        .then(response => {
          response.data.forEach(item => {
            const time = {
              day: Math.floor((Date.now() - item.time) / 86400000),
              hour: Math.floor((Date.now() - item.time) / 3600000) % 24,
              minute: Math.floor((Date.now() - item.time) / 60000) % 60,
              second: Math.floor((Date.now() - item.time) / 1000) % 60,
            };
            if(time.day !== 0){
              time.hour = 0
              time.minute = 0
              time.second = 0
            }
            else{
              if(time.hour !== 0){
                time.minute = 0
                time.second = 0
              }
              else{
                if(time.minute !== 0){
                  time.second = 0
                }
              }
            }
            timeSend.value = Object.entries(time)
              .filter(val => val[1] !== 0)
              .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
              .join(', ');
            item.time_send = timeSend.value
            item.sort_time = (Date.now() - item.time)
            messagesDataOrigin.value.push(item)
          })
          messagesData.value = messagesDataOrigin.value
          store.dispatch('data/setFaqMessagesData', messagesData.value)
          loadData.value = false
        })
        .catch(e => {
          console.log(e)
          loadData.value = false
        })
      }

      const changeAlignment = (value) => {
        messages_settings.value.aligment_faq_messages = value
      }

      const deleteAll = async () => {
        await MessagesDataService.deleteAll()
        .then(async response => {
          messagesData.value = []
          toast.open({
            message: "Deleted All question Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          const id = ref()
          id.value = response
          await retriveMessages()
        })
        .catch(e => {
          console.log(e)
        })
      }
      return{
        embedAppId,
        changeColorIconAdd,
        ShopifyDomain,
        searchFaqInCategory,
        faqTitle,
        send_messages_text_error,
        faqTitleSearch,
        searchFaqFeature,
        hoverFaq,
        hoverCategory,
        openFaq,
        faqInfo,
        category_title,
        faqsInCategory,
        openCategory,
        showCategoryFeature,
        showFaqData,
        categories,
        showFaqFeature,
        faqs,
        fontFamily,
        disableSave,
        addIcon,
        error_info,
        message_error,
        email_error,
        welcome_error,
        description_error,
        theme_color_error,
        text_color_error,
        bg_color_error,
        searchNotFound2,
        searchNotFound1,
        flagData2,
        searchCountry2,
        countryName1,
        countryName2,
        searchCountry1,
        whatsAppNumber,
        enterWhatsApp,
        phoneCountryName,
        phoneCountryImage,
        whatsAppCountryImage,
        showbutton,
        changeIcon,
        changeAlignment,
        hoverDelAll,
        changeSort,
        loadData,
        hoverItem,
        deleteAll,
        messagesData,
        deletequestion,
        hoverDel,
        messagesDataOrigin,
        retriveMessages,
        settings,
        flagData1,
        chooseFlagPhone,
        chooseFlagWhatsApp,
        locale,
        phoneCountryDial,
        enterPhone,
        phoneNumber,
        retriveMessagesSetting,
        createMessagesSetting,
        messages_settings,
        updateMessagesSetting,
        icons,
        changeStatus
      }
    },
    async mounted() {
      await this.retriveMessagesSetting()
    }
  }
</script>
<style>
  .help__desk-open-icon{            
    animation-name: example;
    animation-duration: 4s;
    animation-iteration-count:infinite;
  }
  @keyframes example {
    0%   {transform: rotateY(0deg)}
    100%  {transform: rotateY(360deg)}
  }
</style>