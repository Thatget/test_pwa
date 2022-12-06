<template>
  <div class="mb-3" id="header-config">
    <div class="d-flex flex-column flex-lg-row">
      <div class="col-12 col-lg-4">
        <div class="me-0 me-lg-2 product-scroll" style="line-height: 1.8; height: calc(100vh - 108px); overflow-y: auto;position: sticky; top: 130px;">
          <div class="d-flex flex-column">
            <div class="bg-white border " style="border-radius: 10px">
              <div class="border-bottom px-4 py-3 fw-bold d-flex align-items-center justify-content-between">
                <span>Header</span>
                <div class="d-flex align-items-center" style="">
                  <input :disable="!faqMorePageSetting.active_template && settings.template_number !== 1" class="form-check-input me-2 mt-0 fs-6" type="checkbox" id="banner-visible" v-model="settings.banner_visible">
                  <label for="banner-visible">
                    <span>Show banner</span>
                  </label>
                </div>  
              </div>
              <div class="px-4 pt-3">
                <div class="d-flex flex-column">
                  <label for="height"><span class="fw-bold">Header height:</span> {{settings.banner_height}}px</label>
                  <input class="form-range" type="range" min="0" max="460" step="2" id="height" v-model="settings.banner_height">
                </div>
              </div>
              <div class="p-4">
                <nav class="mb-3">
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link col fw-bold active" id="page_title-tab" data-bs-toggle="tab" data-bs-target="#page_title" type="button" role="tab" aria-controls="page_title" aria-selected="true">Page title</button>
                    <button class="nav-link col fw-bold" id="search_input-tab" data-bs-toggle="tab" data-bs-target="#search_input" type="button" role="tab" aria-controls="search_input" aria-selected="false">Search bar</button>
                    <button class="nav-link col fw-bold" id="intro_text-tab" data-bs-toggle="tab" data-bs-target="#intro_text" type="button" role="tab" aria-controls="intro_text" aria-selected="false">Intro text</button>
                  </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="page_title" role="tabpanel" aria-labelledby="page_title-tab">
                    <div>
                      <div class="">
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="m-0">Show page title</p>
                          <div class="form-check form-switch" style="margin-right: -10px;">
                            <input :disable="!faqMorePageSetting.active_template && settings.template_number !== 1" v-model="settingsOrigin.show_page_title" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                          </div>
                        </div>
                        <div v-if="settingsOrigin.show_page_title">
                          <div class="my-3">
                            <span>Font color</span>
                            <div class="d-flex align-items-center mt-2 border p-3 rounded">
                              <div>
                                <input v-model="settings.page_title_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                              </div>
                              <input v-model="settings.page_title_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="fontweight">Font family</label>
                              <select class="form-select mt-1" id="fontweight"  style="cursor:pointer" aria-label="Default select example" v-model="settings.page_title_font">
                                <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                              </select>
                          </div>
                          <div class="mb-3">
                            <span>Font size: {{settings.page_title_fontsize}}px</span>
                            <div>
                              <input v-model="settings.page_title_fontsize" min="10" max="60" type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                          <div class="mb-3">
                            <span>Padding top: {{ settings.page_title_paddingtop }}px</span>
                            <div>
                              <input v-model="settings.page_title_paddingtop" min="0" max="60"  type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                          <div>
                            <span>Padding bottom: {{ settings.page_title_paddingbottom }}px</span>
                            <div>
                              <input v-model="settings.page_title_paddingbottom" min="0" max="60"  type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="search_input" role="tabpanel" aria-labelledby="search_input-tab">
                    <div class="mt-3">
                      <div class="">
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="m-0">Show search bar</p>
                          <div class="form-check form-switch" style="margin-right: -10px;">
                            <input v-model="settings.show_search_input" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                          </div>
                        </div>
                        <div v-if="settings.show_search_input">
                          <div class="my-3">
                            <label for="fontweight">Font family</label>
                            <select class="form-select mt-1" id="fontweight"  style="cursor:pointer" aria-label="Default select example" v-model="settings.search_placeholder_font">
                              <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <span>Style</span>
                            <div class="d-flex align-items-center justify-content-center mt-2 border p-3 rounded">
                              <div class="rounded py-2 px-3 border bg-white me-4" @click="settings.search_input_style = 1" style="cursor: pointer;" :class="settings.search_input_style == 1? 'bgr-primary text-white' : ''">Style 1</div>
                              <div class="py-2 px-3 border bg-white rounded" @click="settings.search_input_style = 2" :class="settings.search_input_style == 2? 'bgr-primary text-white' : ''" style="cursor: pointer;">Style 2</div>
                            </div>
                          </div>
                          <div class="mb-3">
                            <span>Placeholder color</span>
                            <div class="d-flex align-items-center mt-2 border p-3 rounded">
                              <div>
                                <input v-model="settings.placeholder_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                              </div>
                              <input v-model="settings.placeholder_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                            </div>
                          </div>
                          <div class="mb-3" v-if="settings.search_input_style == 2">
                            <span>Micro scope color</span>
                            <div class="d-flex align-items-center mt-2 border p-3 rounded">
                              <div>
                                <input v-model="settings.micro_scope_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                              </div>
                              <input v-model="settings.micro_scope_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="intro_text" role="tabpanel" aria-labelledby="intro_text-tab">
                    <div class="mt-3">
                      <div class="">
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="m-0">Show Intro text</p>
                          <div class="form-check form-switch" style="margin-right: -10px;">
                            <input v-model="settingsOrigin.show_intro_text" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                          </div>
                        </div>
                        <div v-if="settingsOrigin.show_intro_text">
                          <div class="my-3">
                            <label for="fontweight">Font family</label>
                              <select class="form-select mt-1" id="fontweight"  style="cursor:pointer" aria-label="Default select example" v-model="settings.intro_text_font">
                                <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                              </select>
                          </div>
                          <div class="mb-3">
                            <span>Color</span>
                            <div class="d-flex align-items-center mt-2 border p-3 rounded">
                              <div>
                                <input v-model="settings.intro_text_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                              </div>
                              <input v-model="settings.intro_text_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                            </div>
                          </div>
                          <div class="mb-3">
                            <span>Font size: {{settings.intro_text_fontsize}}px</span>
                            <div>
                              <input v-model="settings.intro_text_fontsize" min="10" max="40"  type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                          <div class="mb-3">
                            <span>Padding top: {{ settings.intro_text_paddingtop }}px</span>
                            <div>
                              <input v-model="settings.intro_text_paddingtop" min="0" max="60"  type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                          <div>
                            <span>Padding bottom: {{ settings.intro_text_paddingbottom }}px</span>
                            <div>
                              <input v-model="settings.intro_text_paddingbottom" min="0" max="60"  type="range" class="form-range" id="customRange1">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border bg-white mt-3" style="border-radius: 10px">
              <div class="px-4 py-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold">Powered by Yanet</span>
                  <div @click="contact" class="form-check form-switch" style="margin-right: -10px;">
                    <input @click="contact" disabled v-model="settingsOrigin.yanet_logo_visible" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <div class="p-4 border bg-white" style="border-radius: 10px">
                <span class="fw-bold">Page background color</span>
                <div class="d-flex align-items-center mt-2 border p-3 rounded">
                  <div>
                    <input v-model="settings.page_background_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                  </div>
                  <input v-model="settings.page_background_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                </div>
              </div>
            </div>
            <div class="">
              <div class="mt-2" style="border-radius: 10px" >
                <div class="">
                  <div class="border bg-white" style="border-radius: 10px">
                    <div class="border-bottom px-4 py-3 fw-bold">
                      Body`
                    </div>
                    <div class="p-4">
                      <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <button class="nav-link col active" id="category" data-bs-toggle="tab" data-bs-target="#categoryid" type="button" role="tab" aria-controls="categoryid" aria-selected="true">Category</button>
                          <button class="nav-link col" id="question" data-bs-toggle="tab" data-bs-target="#questionid" type="button" role="tab" aria-controls="questionid" aria-selected="false">Question</button>
                          <button class="nav-link col" id="answer" data-bs-toggle="tab" data-bs-target="#answerid" type="button" role="tab" aria-controls="answerid" aria-selected="false">Answer</button>
                          <button class="nav-link col" id="custom" data-bs-toggle="tab" data-bs-target="#customid" type="button" role="tab" aria-controls="customid" aria-selected="false">Custom</button>
                        </div>
                      </nav>
                      <div class="tab-content mt-3" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="categoryid" role="tabpanel" aria-labelledby="category">
                          <div class="pb-2 d-flex justify-content-between align-items-center" v-if="!settings.dont_category_faq">
                            <span>Show category bar</span>
                            <div class="form-check form-switch" style="margin-right: -10px;">
                              <input v-model="settings.show_category_bar" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                            </div>
                          </div>
                          <div class="mb-3">
                            <span>Style</span>
                            <div class="d-flex align-items-center justify-content-center mt-2 border p-3 rounded">
                              <div class="rounded py-2 px-3 border bg-white me-4" @click="settings.category_bar_number = 1" style="cursor: pointer;" :class="settings.category_bar_number === 1? 'bgr-primary text-white' : ''">Style 1</div>
                              <div class="py-2 px-3 border bg-white rounded" @click="settings.category_bar_number = 2" :class="settings.category_bar_number === 2? 'bgr-primary text-white' : ''" style="cursor: pointer;">Style 2</div>
                            </div>
                          </div>
                          <div class="pt-2">
                            <span>Category bar background color</span>
                            <div class="p-3 border d-flex flex-wrap mt-2" style="border-radius: 5px">
                              <div class="d-flex flex-wrap">
                                <input type="color" v-model="settings.category_bar_background" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                                <div class="d-flex align-items-center m-1">
                                  <input class="form-control" :placeholder="settings.category_bar_background" v-model="settings.category_bar_background" style="height: 34px; width: 150px" type="text">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2">
                            <span>Category bar font color</span>
                            <div class="p-3 border d-flex flex-wrap mt-2" style="border-radius: 5px">
                              <div class="d-flex flex-wrap">
                                <input type="color" v-model="settings.category_bar_color" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                                <div class="d-flex align-items-center m-1">
                                  <input class="form-control" :placeholder="settings.category_bar_color" v-model="settings.category_bar_color" style="height: 34px; width: 150px" type="text">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="py-2">
                            <label for="fontsize" class="form-label m-0">Font Size: {{ settings.category_font_size }}</label>
                            <input type="range" class="form-range" id="fontsize" v-model="settings.category_font_size" min="10" max="40">
                          </div>
                          <div class="py-2">
                            <label for="fontweight">Font family</label>
                              <select class="form-select mt-1" id="fontweight"  style="cursor:pointer" aria-label="Default select example" v-model="settings.category_font_family">
                                <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                              </select>
                          </div>
                          <div class="py-2">
                            <label for="fontweight">Font Weight</label>
                              <select class="form-select mt-1 text-capitalize" style="cursor:pointer" id="fontweight" aria-label="Default select example" v-model="settings.category_font_weight">
                                <option v-for="fontw in fontWeights" class="text-capitalize" :key="fontw" :value="`${fontw}`">{{fontw}}</option>
                              </select>
                          </div>
                          <div class="py-2">
                            <label for="fontweight">Text Style</label>
                            <select class="form-select mt-1" id="fontweight" style="cursor:pointer" aria-label="Default select example" v-model="settings.category_text_style">
                              <option value="lowercase">Lowercased </option>
                              <option value="unset">Normal </option>
                              <option value="uppercase">Uppercased </option>
                              <option value="capitalize">CapiTaliZed </option>
                            </select>
                          </div>
                          <div class="py-2">
                            <label for="fontweight">Text Align</label>
                            <select class="form-select mt-1" id="fontweight" style="cursor:pointer" aria-label="Default select example" v-model="settings.category_text_align">
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                          <div class="pt-2">
                            <span>Font color</span>
                            <div class="p-3 border d-flex flex-wrap mt-2" style="border-radius: 5px">
                              <div class="d-flex flex-wrap">
                                <input type="color" v-model="settings.category_font_color" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                                <div class="d-flex align-items-center m-1">
                                  <input class="form-control" :placeholder="settings.category_font_color" v-model="settings.category_font_color" style="height: 34px; width: 150px" type="text">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="questionid" role="tabpanel" aria-labelledby="question">
                          <div class="tab-pane fade show active" id="questionid" role="tabpanel" aria-labelledby="question">
                            <div>
                              <label for="fontsize" class="form-label m-0">Font Size: {{ settings.faq_font_size }}</label>
                              <input type="range" class="form-range" id="fontsize" v-model="settings.faq_font_size"  :min="10" :max="40">
                            </div>
                            <div class="py-2">
                              <label for="fontweight">Font Weight</label>
                              <select class="form-select mt-1 text-capitalize" style="cursor:pointer" id="fontweight" aria-label="Default select example" v-model="settings.faq_font_weight">
                                <option v-for="fontw in fontWeights" class="text-capitalize" :key="fontw" :value="`${fontw}`">{{fontw}}</option>
                              </select>
                            </div>
                            <div class="py-2">
                              <label for="fontweight">Font family</label>
                              <select class="form-select mt-1" id="fontweight" style="cursor:pointer" aria-label="Default select example" v-model="settings.faq_font_family">
                                <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                              </select>
                            </div>
                            <div class="py-2">
                              <span>Font color</span>
                              <div class="p-3 border d-flex mt-2" style="border-radius: 5px">
                                <div class="d-flex flex-wrap">
                                  <input type="color" v-model="settings.faq_font_color" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                                  <div class="d-flex align-items-center m-1">
                                    <input class="form-control" :placeholder="settings.faq_font_color" v-model="settings.faq_font_color" style="height: 34px; width: 150px" type="text">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="answerid" role="tabpanel" aria-labelledby="answer">
                          <div class="py-2">
                            <div>
                              <label for="fontsize" class="form-label m-0">Font Size: {{ settings.answer_font_size }}</label>
                              <input type="range" class="form-range" id="fontsize" v-model="settings.answer_font_size"  :min="10" :max="40">
                            </div>
                            <div class="py-2">
                              <label for="fontweight">Font family</label>
                              <select class="form-select mt-1" id="fontweight" style="cursor:pointer" aria-label="Default select example" v-model="settings.answer_font_family">
                                <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                              </select>
                            </div>
                            <div class="py-2">
                              <label for="fontweight">Font Weight</label>
                              <select class="form-select mt-1 text-capitalize" style="cursor:pointer" id="fontweight" aria-label="Default select example" v-model="settings.answer_font_weight">
                                <option v-for="fontw in fontWeights" class="text-capitalize" :key="fontw" :value="`${fontw}`">{{fontw}}</option>
                              </select>
                            </div>
                            <div class="pt-2">
                              <span>Font color</span>
                              <div class="p-3 border d-flex align-items-end mt-2" style="border-radius: 5px">
                                <div class="d-flex flex-wrap">
                                  <input type="color" v-model="settings.answer_font_color" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                                  <div class="d-flex align-items-center m-1">
                                    <input class="form-control" :placeholder="settings.answer_font_color" v-model="settings.answer_font_color" style="height: 34px; width: 150px" type="text">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade p-3 border" style="border-radius: 10px" id="customid" role="tabpanel" aria-labelledby="custom">
                          <div>
                            <span>CSS</span>
                          </div>
                          <div class="overflow-auto">
                            <textarea 
                              placeholder=".faq-page-title{
          color: #fff;
          margin:0; 
          padding: 20px 0; 
          font-weight: 600;
      }" 
                              v-model="settings.custom_css" class="w-100 border px-2 " style="border-radius: 10px; outline: none" rows="3"></textarea>
                          </div>
                          <span style="color: #position">This will be applicable to your entire FAQ page. As this is page related setting, changes you make here won't be reflected on live view on left side. Please don't touch this section if you don't know what you are doing. Feel free to contact our support and we are more than welcome to help.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3" id="footer-config">
            <div class="bg-white border" style="border-radius: 10px">
              <div class="d-flex justify-content-between align-items-center px-4 py-3">
                  <p class="m-0 fw-bold">Footer text</p>
                  <div class="form-check form-switch" style="margin-right: -10px;">
                    <input v-model="settingsOrigin.show_footer_text" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
                  </div>
                </div>
              <div class="px-4 py-3 border-top" v-if="settingsOrigin.show_footer_text">
                <div class="mb-3">
                  <label for="fontweight">Font family</label>
                  <select class="form-select mt-1" id="fontweight"  style="cursor:pointer" aria-label="Default select example" v-model="settings.footer_text_font">
                    <option v-for="font in fontFamily" :key="font" :value="`${font}`" :style="`font-family: ${font}`">{{ font == 'unset' ? 'Use your store font (not available in live preview)' : font }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <span>Color</span>
                  <div class="d-flex align-items-center mt-2 border p-3 rounded">
                    <div>
                      <input v-model="settings.footer_text_color" type="color" class="p-0 m-1" style="height: 34px; width: 34px; border: none; border-radius: 10px; cursor:pointer">
                    </div>
                    <input v-model="settings.footer_text_color" class="form-control ms-2" type="text" placeholder="" style="height: 34px; width: 150px">
                  </div>
                </div>
                <div class="mb-3">
                  <span>Font size: {{settings.footer_text_fontsize}}px</span>
                  <div>
                    <input v-model="settings.footer_text_fontsize" min="10" max="40"  type="range" class="form-range">
                  </div>
                </div>
                <div class="mb-3">
                  <span>Padding top: {{ settings.footer_text_paddingtop }}px</span>
                  <div>
                    <input v-model="settings.footer_text_paddingtop" min="0" max="60"  type="range" class="form-range">
                  </div>
                </div>
                <div>
                  <span>Padding bottom: {{ settings.footer_text_paddingbottom }}px</span>
                  <div>
                    <input v-model="settings.footer_text_paddingbottom" min="0" max="60"  type="range" class="form-range">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 border bg-white mt-3" style="border-radius: 10px">
            <div>
              <p class="fw-bold">FAQ accordian width</p>
              <label for="fontsize" class="form-label m-0">Width in px (not available in live preview): {{ settings.width_faqs_accordian }}px</label>
              <input type="range" aria-valuemax="1800" aria-valuemin="800" step="10" class="form-range" id="fontsize" min="800" max="1800" v-model="settings.width_faqs_accordian">
            </div>
          </div>
          <div class="border bg-white mt-3" style="border-radius: 10px">
            <div class="d-flex justify-content-between align-items-center px-4 py-3">
              <span class="fw-bold">Button Back To Top</span>
              <div class="form-check form-switch" style="margin-right: -10px;">
                <input v-model="settings.btn_top_visible" class="form-check-input fs-5" type="checkbox" id="flexSwitchCheckDefault" style="cursor:pointer">
              </div>
            </div>
            <div class="px-4 py-3 border-top" v-if="settings.btn_top_visible">
              <div class="pt-2">
                <span>Button Background Color</span> 
                <div class="p-3 border d-flex flex-wrap mt-2" style="border-radius: 5px">
                  <div class="d-flex flex-wrap">
                    <input type="color" v-model="settings.btn_top_background" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                    <div class="d-flex align-items-center m-1">
                      <input class="form-control" :placeholder="settings.btn_top_background" v-model="settings.btn_top_background" style="height: 34px; width: 150px" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-2">
                <span>Button Hover Color</span> 
                <div class="p-3 border d-flex flex-wrap mt-2" style="border-radius: 5px">
                  <div class="d-flex flex-wrap">
                    <input type="color" v-model="settings.btn_top_hover" class="rounded p-0 m-1" style="height: 34px; width: 34px; border: none">
                    <div class="d-flex align-items-center m-1">
                      <input class="form-control" :placeholder="settings.btn_top_hover" v-model="settings.btn_top_hover" style="height: 34px; width: 150px" type="text">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8 mt-3 mt-lg-0">
        <div class="bg-white border" style="border-radius: 10px; line-height: 1.8 !important">
          <div class="border-bottom p-3 fw-bold d-flex align-items-center justify-content-between">
            <span class="col">Live preview</span>
            <div class="col-8 text-center d-flex">
              <a target="_blank" :href="`https://${shopDomain}/apps/faqs`" class="d-flex align-items-center m-auto text-color-primary" style="text-decoration: none;">
                <span>https://{{ shopDomain }}{{settings.faq_page_url}}</span>
                <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
              </a>
            </div>
            <span class="col"></span>
          </div>
          <div class="m-4 border" :style="`background-color: ${settings.page_background_color}`">
            <div class="" v-if="settings.banner_visible">
              <div class="d-flex flex-column justify-content-between" :style="settings.image_banner? `background-image: url(${backendLink}/var/images/banner/${settings.image_banner}); background-size: cover; background-position: center; min-height: calc(${settings.banner_height}px)` : `background-image: url(${backendLink}/var/images/banner/${settings.banner_default}); background-size: cover; background-position: center;min-height: calc(${settings.banner_height}px)`">
                <div>
                  <div v-if="settingsOrigin.show_page_title" class="text-center" :style="`padding-top: ${settings.page_title_paddingtop}px; padding-bottom: ${settings.page_title_paddingbottom}px; color: ${settings.page_title_color}; font-family: ${settings.page_title_font}`">
                    <div :style="`font-size: ${settings.page_title_fontsize}px`" class="m-0" style="font-weight: 600">Frequently Asked Questions</div>
                  </div>
                  <div class="text-center w-100" :style="settingsOrigin.show_page_title? '' : 'margin-top: 70px'" v-if="settings.show_search_input && settings.search_input_style == 1">
                    <input type="text" class="form-control m-auto fs-6 placeholder-color" ::placeholder="settings.placeholder_color" :placeholder-color="settings.placeholder_color" placeholder="What can we help you with?" style="box-shadow: none; width: 70%; line-height:1 !important; padding: 16px;"  :style="`font-family: ${settings.search_placeholder_font};--placeholder-color: ${settings.placeholder_color}; color: ${settings.placeholder_color}`">
                  </div>
                  <div class="text-center w-100" :style="settingsOrigin.show_page_title? '' : 'margin-top: 70px'" v-if="settings.show_search_input && settings.search_input_style == 2">
                    <div class="border m-auto" style="position:relative; width: 70%; border-radius: 100px;">
                      <input type="text" class="fs-6 placeholder-color" :placeholder-color="settings.placeholder_color" id="" placeholder="What can we help you with?" style="box-shadow: none; outline: none; border:none; border-radius: 100px;width: 100%; padding: 16px 16px 16px 50px; line-height:1" :style="`font-family: ${settings.search_placeholder_font};--placeholder-color: ${settings.placeholder_color}; color: ${settings.placeholder_color}`">
                      <i class="fa-solid fw-none fa-magnifying-glass fs-5" style="position:absolute; top: 50%; left: 0; transform: translateY(-50%); margin-left: 17px;" :style="`color: ${settings.micro_scope_color}`"></i>
                    </div>
                  </div>
                </div>
                <div v-if="settingsOrigin.show_intro_text"  class="text-center" :style="`padding-top: ${settings.intro_text_paddingtop}px; padding-bottom: ${settings.intro_text_paddingbottom}px; color: ${settings.intro_text_color}; font-size: ${settings.intro_text_fontsize}px; font-family: ${settings.intro_text_font}`">
                  <span>Check most frequently asked questions here</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="d-flex flex-column justify-content-between" :style="`min-height: ${settings.banner_height}px`">
                <div>
                  <div v-if="settingsOrigin.show_page_title" class="text-center" :style="`padding-top: ${settings.page_title_paddingtop}px; padding-bottom: ${settings.page_title_paddingbottom}px; color: ${settings.page_title_color}; font-family: ${settings.page_title_font}`">
                    <div :style="`font-size: ${settings.page_title_fontsize}px`" class="m-0" style="font-weight: 600">Frequently Asked Questions</div>
                  </div>
                  <div class="text-center w-100" :style="settingsOrigin.show_page_title? '' : 'margin-top: 70px'" v-if="settings.show_search_input && settings.search_input_style == 1">
                    <input type="text" class="form-control m-auto fs-6 placeholder-color" :placeholder-color="settings.placeholder_color" placeholder="What can we help you with?" ::placeholder="settings.placeholder_color" style="box-shadow: none; width: 70%; line-height:1 !important; padding: 16px"  :style="`font-family: ${settings.search_placeholder_font};--placeholder-color: ${settings.placeholder_color}; color: ${settings.placeholder_color}`">
                  </div>
                  <div class="text-center w-100" :style="settingsOrigin.show_page_title? '' : 'margin-top: 70px'" v-if="settings.show_search_input && settings.search_input_style == 2">
                    <div class="border m-auto" style="position:relative; width: 70%; border-radius: 100px;">
                      <input type="text" class="fs-6 placeholder-color" id="" placeholder="What can we help you with?" :placeholder-color="settings.placeholder_color" style="box-shadow: none; outline: none; border:none; border-radius: 100px;width: 100%; padding: 16px 16px 16px 50px; line-height:1" :style="`font-family: ${settings.search_placeholder_font}; --placeholder-color: ${settings.placeholder_color}; color: ${settings.placeholder_color}`">
                      <i class="fa-solid fw-none fa-magnifying-glass fs-5" style="position:absolute; top: 50%; left: 0; transform: translateY(-50%); margin-left: 17px;" :style="`color: ${settings.micro_scope_color}`"></i>
                    </div>
                  </div>
                </div>
                <div v-if="settingsOrigin.show_intro_text"  class="text-center" :style="`padding-top: ${settings.intro_text_paddingtop}px; padding-bottom: ${settings.intro_text_paddingbottom}px; color: ${settings.intro_text_color}; font-size: ${settings.intro_text_fontsize}px; font-family: ${settings.intro_text_font}`">
                  <span>Check most frequently asked questions here</span>
                </div>
              </div>
            </div>
            <div class="m-auto" style="max-width: 800px">
              <div class="" style="padding: 0px 32px">
                <div v-if="!settingsOrigin.dont_category_faq && settings.show_category_bar && settings.category_bar_number === 1" class="d-flex justify-content-center" style="margin-bottom: 20px">
                  <div class="border rounded px-2 py-1 fs-6" :style="`font-family: ${settings.category_font_family};color:${settings.category_bar_color}; background-color: ${settings.category_bar_background}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`" style="margin: 6px; cursor:pointer">Plancing an Order</div>
                  <div class="border rounded px-2 py-1 fs-6" :style="`font-family: ${settings.category_font_family};color:${settings.category_bar_color}; background-color: ${settings.category_bar_background}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`" style="margin: 6px; cursor:pointer">Refunds</div>
                </div>
                <div v-if="!settingsOrigin.dont_category_faq && settings.show_category_bar && settings.category_bar_number === 2" class="d-flex justify-content-center" style="margin-bottom: 20px">
                  <div class="border px-3 py-2 fs-6" :style="`font-family: ${settings.category_font_family};color:${settings.category_bar_color}; background-color: ${settings.category_bar_background}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`" style="margin: 6px; cursor:pointer; border-radius: 50px;">Plancing an Order</div>
                  <div class="border px-3 py-2 fs-6" :style="`font-family: ${settings.category_font_family};color:${settings.category_bar_color}; background-color: ${settings.category_bar_background}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`" style="margin: 6px; cursor:pointer; border-radius: 50px;">Refunds</div>
                </div>
                <div>
                  <div>
                    <div v-if="!settingsOrigin.dont_category_faq" :style="`text-align: ${settings.category_text_align}; padding-bottom: 10px`">
                      <span :style="`font-size: ${settings.category_font_size}px; color: ${settings.category_font_color}; font-family: ${settings.category_font_family}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`">Plancing an Order</span>
                    </div>
                    <div style="margin-bottom: 20px">
                      <div class="pt-2">
                        <span :style="`color: ${settings.faq_font_color}; font-weight: ${settings.faq_font_weight}; font-family: ${settings.faq_font_family}; font-size: ${settings.faq_font_size}px`">How do I redeem my One 4 All card?</span>
                      </div>
                      <span class="d-flex" :style="`font-size: ${settings.answer_font_size}px; font-weight: ${settings.answer_font_weight}; color: ${settings.answer_font_color}; font-family: ${settings.answer_font_family}`">We are currently accepting One 4 All cards instore only. Please retain your card after making your purchase, as should you wish to return any items bought using a One 4 All card, we will use this payment method to refund you.</span>
                    </div>
                    <div style="margin-bottom: 40px">
                      <div class="d-flex align-items-center justify-content-between pt-2">
                        <span class="" :style="`color: ${settings.faq_font_color}; font-weight: ${settings.faq_font_weight}; font-family: ${settings.faq_font_family}; font-size: ${settings.faq_font_size}px`">When will I be charged for my order?</span>
                      </div>
                      <span class="d-flex" :style="`font-size: ${settings.answer_font_size}px; font-weight: ${settings.answer_font_weight}; color: ${settings.answer_font_color}; font-family: ${settings.answer_font_family}`">Payment is taken at the point of ordering. If for any reason your item is not dispatched we will ensure you are refunded within 3-5 working days.</span>
                    </div>                    
                  </div>
                  <div>
                    <div v-if="!settingsOrigin.dont_category_faq" :style="`text-align: ${settings.category_text_align}; padding-bottom: 10px`">
                      <span :style="`font-size: ${settings.category_font_size}px; color: ${settings.category_font_color}; font-family: ${settings.category_font_family}; font-weight: ${settings.category_font_weight}; text-transform: ${settings.category_text_style}`">Refunds</span>
                    </div>
                    <div style="margin-bottom: 20px">
                      <div class="d-flex align-items-center justify-content-between ">
                        <span class="pt-2" :style="`color: ${settings.faq_font_color}; font-weight: ${settings.faq_font_weight}; font-family: ${settings.faq_font_family}; font-size: ${settings.faq_font_size}px`">I have returned my order – will you refund my delivery?</span>
                      </div>
                      <span class="d-flex" :style="`font-size: ${settings.answer_font_size}px; font-weight: ${settings.answer_font_weight}; color: ${settings.answer_font_color}; font-family: ${settings.answer_font_family}`">If you have returned your full order within 30 days of receipt, we will refund the full amount, including delivery costs. Please note, delivery costs are refunded additionally and will show as a separate refund.</span>
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px; position: relative">
              <div v-if="settingsOrigin.show_footer_text" :style="`color: ${settings.footer_text_color}; padding-top: ${settings.footer_text_paddingtop}px; padding-bottom: ${settings.footer_text_paddingbottom}px; font-size: ${settings.footer_text_fontsize}px; font-family: ${settings.footer_text_font};`">
                <a class="text-break d-flex align-items-center justify-content-center" href="#footer-config" :style="`text-decoration: none; color: ${settings.footer_text_color}`">
                  <span>Thanks for visiting our page!</span>              
                </a>
              </div>
              <div v-if="settingsOrigin.yanet_logo_visible" style="padding-bottom: 10px; text-align: center;">
                <span style="color: #4b4b4b; font-size: 15px; text-decoration: none; text-decoration: none;font-family: 'Times New Roman', Times, serif;">Powered by Yanet</span>
              </div>
              <div @mousemove="changeBtnColor = true" @mouseleave="changeBtnColor = false" v-if="settings.btn_top_visible" class="btn-top d-flex justify-content-center align-items-center" style="height: 50px; width: 50px; border-radius: 4px; cursor: pointer; position: absolute; bottom: 10px; right: 10px;" :style="changeBtnColor === true? `background-color: ${settings.btn_top_hover}` : `background-color: ${settings.btn_top_background}`">
                <i class="fa-solid fa-angles-up" style="color: #ffffff"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  import store from '../../../store';

  export default {
    props: {
      setting: Array,
      settingOrigin : Array,
      fontWeightsprop: Array,
      fontFamilyprop: Array,
    },
    setup(props, { emit }){
      const changeBtnColor = ref()
      const shopDomain = ref(store.state.auth.shopifyDomain)
      const backendLink = ref()
      backendLink.value = process.env.VUE_APP_BACKEND_LINK
      const settings = ref(props.setting)
      const settingsOrigin = ref(props.settingOrigin)
      const fontFamily = ref(props.fontFamilyprop)
      const fontWeights = ref(props.fontWeightsprop)
      const faqMorePageSetting = ref()
      faqMorePageSetting.value = store.state.data.faq_more_page_setting
      watch(settings.value,settingsOrigin.value, () => {
        emit('data', {settings, settingsOrigin})
      })
      const contact = () => {
        if(document.getElementsByClassName('cc-dc5e')[0]){
          document.getElementsByClassName('cc-dc5e')[0].click()
        }
        else{
          let user_nickname = `[FAQ]${shopDomain.value}`
          window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
        }
      }
      return{
        contact,
        shopDomain,
        changeBtnColor,
        backendLink,
        fontFamily,
        fontWeights,
        faqMorePageSetting,
        settings,
        settingsOrigin
      }
    }
  }
</script>
<style>
  .placeholder-color::placeholder {color:var(--placeholder-color)}
  .placeholder-color:-ms-input-placeholder {color:var(--placeholder-color) ;}
  .placeholder-color::-ms-input-placeholder {color:var(--placeholder-color);}
</style>