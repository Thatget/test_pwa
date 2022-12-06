<template>
  <div class="pb-4" style="max-width: 100vw">
    <div class="px-4 py-3 d-flex position-sticky-menu-embeded justify-content-between align-items-center">
      <div class="d-flex text-start">
        <div class="fs-5 fw-bolder text-nowrap">Store FAQs</div>
      </div>
      <div class="d-flex align-items-center">
        <div class="d-sm-flex align-items-center d-none">
          <div class="p-0 text-start d-none d-sm-block">
            <div class="p-0 text-nowrap d-flex align-items-center hover-color" data-bs-toggle="modal" data-bs-target="#import" style="cursor:pointer">
              <i class="fa-solid fa-upload me-1"></i>              
              <span>
                Import FAQs
              </span>
            </div>
          </div>
          <div class="ms-4 p-0 text-start d-none d-md-block">
            <div class="p-0 text-nowrap d-flex align-items-center hover-color" id="export1" data-bs-toggle="dropdown" aria-expanded="false"  style="cursor:pointer">
              <i class="fas fa-file-export me-1"></i>
              <span @click="exportFaqs()" >
                Export FAQs
              </span>
            </div>
          </div>
          <router-link to="/faq-more-page" class="ms-4 d-none d-lg-flex hover-color align-items-center text-black" style="text-decoration:none">
            <i class="fa-regular fa-window-restore me-1"></i>
            <span>Add FAQs on other pages</span>
          </router-link>
          <div class="ms-4 d-none d-xl-flex align-items-center hover-color" @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#add-faq-to-store">
            <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg hover-color" focusable="false" width="20" height="20" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
            <span class="ps-1">Add FAQs page to store</span>
          </div>
          <div class="ms-4 d-none d-xl-flex align-items-center hover-color" @mouseover="changeColorIconStar = true" @mouseleave="changeColorIconStar = false" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#rating-feedback">
            <svg :fill="changeColorIconStar === true? '#FF8200' : ''" class="Polaris-Icon__Svg hover-color" focusable="false" width="20" height="20" aria-hidden="true" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
            <span class="ps-1">Rating & Suggest Feature</span>
          </div>
        </div>
        <div class="dropdown d-block d-xl-none ms-4">
          <button class="btn dropdown-toggle border bg-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <span>More actions</span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <div class="dropdown p-0 text-start p-2 d-flex align-items-center d-sm-none">
              <button class="btn p-0 hover-color" type="button" id="export2" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-upload me-2" style="font-size: 20px"></i>
                <span>Import FAQs</span>
              </button>
            </div>
            <div class="dropdown p-0 text-start p-2 d-flex align-items-center d-md-none">
              <button class="btn p-0 hover-color" type="button" id="export2" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-file-export me-2" style="font-size: 20px"></i>
                <span @click="exportFaqs()">Export FAQs</span>
              </button>
            </div>
            <router-link to="/faq-more-page" class="p-2 d-flex align-items-center text-black d-lg-none text-nowrap hover-color" style="text-decoration:none">
              <i class="fa-regular fa-window-restore me-2" style="font-size: 20px"></i>
              <span>Add FAQs on other pages</span>
            </router-link>
            <div class="p-2 d-flex align-items-center d-xl-none text-nowrap hover-color" @mouseover="changeColorIconAdd = true" @mouseleave="changeColorIconAdd = false" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#add-faq-to-store">
              <svg :fill="changeColorIconAdd === true? '#FF8200' : ''" viewBox="0 0 20 20" class="Polaris-Icon__Svg me-2" focusable="false" width="22" height="22" aria-hidden="true"><path d="M3 3h1v-2h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h2v-1zm3 0h3v-2h-3v2zm5 0h3v-2h-3v2zm-2 16h-3v-2h3v2zm2 0h3v-2h-3v2zm6-15v-1h-1v-2h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5h-2zm-14 13v-1h-2v1.5a1.5 1.5 0 0 0 1.5 1.5h1.5v-2h-1zm13 0h1v-1h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-2zm-6-11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1zm-9 3v-3h2v3h-2zm0 2v3h2v-3h-2zm16-2v-3h2v3h-2zm0 2v3h2v-3h-2z"></path></svg>
              Add FAQs page to Store
            </div>
            <div class="p-2 d-flex align-items-center d-xl-none text-nowrap hover-color" @mouseover="changeColorIconStar = true" @mouseleave="changeColorIconStar = false" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#rating-feedback">
              <svg :fill="changeColorIconStar === true? '#FF8200' : ''" class="Polaris-Icon__Svg me-2" focusable="false" width="20" height="20" aria-hidden="true" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
              Rating & Suggest Feature
            </div>
          </div>
        </div>
        <router-link to="/add-faq" class="btn btn-primary-hover bgr-primary ms-2 ms-md-4" style="color:#fff">
          Add FAQ
        </router-link>
      </div>
    </div>
    <div class="modal fade text-start" style="z-index: 5 !important" id="add-faq-to-store" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add FAQ page to your store navigation/menu.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><b>1.</b> Visit your stores admin panel.</p>
            <p><b>2.</b> Click on <b>"Online store"</b> > <b>"Navigation"</b> from left side menu.</p>
            <p><b>3.</b> Click on menu where you would like to add <b>"FAQ"</b> page.</p>
            <p><b>4.</b> Click <b>"Add menu item"</b>.</p>
            <p><b>5.</b> Enter a menu name you would like along with your FAQ page URL which you got from app. <br>
              (URL: <a target="_blank" :href="`https://${shopDomain}/apps/faqs`">https://{{shopDomain}}/apps/faqs</a>)
            </p>
            <span><b>6.</b> Click <b>"Add"</b> and then hit <b>"Save"</b> on <b>"Main menu"</b> page and you should be all set.</span>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary-hover bgr-primary text-white">I understood</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" style="z-index: 5 !important;" id="import" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="import-faq" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="import-faq">Import FAQs</h5>
            <button type="button" id="btn-close-import" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="p-2 rounded d-flex align-items-center mb-3" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
              <!-- <i class="fas fa-info-circle fs-3 ms-2 me-3" style="color: #4989b6;"></i> -->
              <div class="">
                <!-- <p class="m-0">This feature is developed to bring a better experience for users when visiting your store online.</p> -->
                <p class="mb-1">You can download and use this <span  @click="downCsvSample()" class="contact text-color-primary" style="cursor: pointer">&ensp;sample file&ensp;</span> to prepare for your import</p>
                <p class="mb-1">If you have any questions, please <span @click="contact" class="contact text-color-primary" style="cursor: pointer">&ensp;chat with us&ensp;</span> to get quick and direct support</p>
                <p class="fw-bold m-0">Note: that make sure the FAQ of CSV file is not duplicated with these ones on store FAQ.</p>
              </div>
            </div>
            <div class="d-flex align-items-center" style="height: 50px">
              <label for="file-up-load d-flex align-items-center">
                <input id="file-up-load" type="file" @change="uploadFileCsv">              
                <!-- <div class="btn btn-primary-hover bgr-primary text-white">Upload CSV file</div> -->
              </label>
              <div v-if="disableImport" class="d-flex align-items-center justify-content-center" style="flex: 1">
                <div class="fw-bold text-color-primary">UPLOADING</div>
                <div class="loader loader--style8 d-flex align-items-center justify-content-center ms-2">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="24px" height="50px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <rect x="0" y="50" width="4" height="100" fill="#FF8200" opacity="0.2">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade text-start" style="z-index: 5 !important" id="rating-feedback" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel1">Rating & Suggest Feature</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <Rating></Rating>
        </div>
      </div>
    </div>
    <div class="mx-4 product-scroll" style="overflow-x: auto; padding-top: 1px">
      <div class="d-block bg-white border padding text-center" style="border-radius: 10px; min-width: 1000px; overflow: hidden;">
        <div>
          <div v-if="!dontCategoryFaq" class="p-3 border-bottom d-flex align-items-center fw-bold text-black">
            <div class="d-flex align-items-center col" style="text-align: start; cursor:pointer">
              <div class="d-flex align-items-center hover-color" data-bs-toggle="modal" data-bs-target="#add-category">
                <div class="" style="margin-top:2px">
                  <i class="fa-solid fa-circle-plus pe-2 fs-5"  style="cursor:pointer; color: #FF8200"></i>              
                </div>
                <span class="">Add Category</span>
              </div>
              <div class="modal fade" id="add-category" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="add-category" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="add-category">Add Category</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column flex-xl-row">
                      <div class="col-12 col-xl-8 me-0 me-xl-3 p-3 border mb-4 mb-xl-0" style="border-radius: 10px; background-color: #fafbfb">
                        <div class="mb-3" style="border-radius: 10px">
                          <div class="form-group">
                            <label for="title" class="pb-2 fw-bold">Category <span class="text-danger">*</span></label>
                            <input
                              v-model="title"
                              type="text"
                              class="form-control"
                              id="title"
                              required
                              name="title"
                              style="padding-right: 60px"
                            />
                            <div class="dropdown">
                              <i class="fa-solid fa-icons dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton3" style="color: #FF8200; position:absolute; right: 12px; bottom: 7px; cursor:pointer" focusable="false" aria-hidden="true"></i>
                              <!-- <svg id="dropdownMenuButton3" fill="#ff8200" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 20 20" height="20" width="20" style="position:absolute; right: 12px; bottom: 9px; cursor:pointer" focusable="false" aria-hidden="true"><path d="M10 0c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm-2.293 7.707a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm6 0a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414zm2.082 3.87a5.997 5.997 0 0 1-5.789 4.423 6 6 0 0 1-5.789-4.422c-.081-.299.155-.578.465-.578h10.649c.309 0 .545.279.464.578z"></path></svg> -->
                              <ul class="dropdown-menu product-scroll p-2" aria-labelledby="dropdownMenuButton3">
                                <div style="height: 200px; width: 210px; overflow-y: auto;" class="d-flex flex-wrap product-scroll">
                                  <li @click="addIcon(item.icon)" v-for="item in categoriesIcon" :key="item" class="d-flex align-items-center justify-content-center m-2" style="cursor:pointer; height: 24px; width: 24px">
                                    {{ item.icon }}
                                  </li>
                                </div>
                              </ul>
                            </div>
                            <div v-if="titleError" style="font-size: .8rem" class="text-end text-danger">
                              {{ titleError }} 
                            </div>
                          </div>
                        </div>
                        <div class="bg-white" style="border-radius: 10px">
                          <div class="form-group">
                            <label for="description" class="pb-2 fw-bold">Description</label>
                            <input
                              v-model="description"
                              type="text"
                              class="form-control"
                              id="description"
                              required
                              name="description"
                            />
                          </div>
                        </div>
                        <div class="mt-2">
                          <span class="text-danger fw-normal" style="font-size: .8rem">* This is requied</span>
                        </div>
                      </div>
                      <div class="col">
                        <div>
                          <div class="d-flex p-3 border align-items-center" style="border-radius: 10px; background-color: #FAFBFB">
                            <input v-model="visible" class="form-check-input fs-6 m-0" type="checkbox" id="flexCheckDefault" >
                            <label class="form-check-label fw-bold ms-2" for="flexCheckDefault">
                              Enable category
                            </label>
                          </div>
                          <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
                            <div class="d-flex align-items-center">
                              <input v-model="featureCategory" class="form-check-input fs-6 m-0" type="checkbox" id="feature_categpry">
                              <label class="form-check-label fw-bold ms-2" for="feature_categpry">
                                Featured
                              </label>
                            </div>
                            <div class="mt-1 fw-normal" style="font-size: .8rem">Show this category on Widget.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" id="close-add-category" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn bgr-primary text-white d-flex align-items-center btn-primary-hover" @click="addCategory">Save
                        <div v-if="disableUpdate" class="loader loader--style3 ps-1">
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
              </div>
            </div>
            <div class="col-5 d-flex align-items-center">
              <!-- <span class="col text-start" style="text-align: start"></span> -->
              <span class="col-3">Visibility</span>
              <span class="col-3">Featured</span>
              <span class="col-3">Languages</span>
              <span class="col-3">Actions</span>
            </div>
          </div>
          <div v-else class="p-3 border-bottom d-flex align-items-center fw-bold text-black">
            <span class="col text-start" style="text-align: start">FAQ</span>
            <span class="col-1">Visibility</span>
            <span class="col-1">Featured</span>
            <span class="col-1">Languages</span>
            <span class="col-2">Actions</span>
          </div>
          <div>
            <draggable v-if="!dontCategoryFaq" class="dragArea list-group w-full product-scroll" :list="categories" @change="changePositionCategory" style="">
              <div class="d-flex flex-column" v-for="(category, index) in categories" :key="index">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item border-none border-bottom">
                    <h2 class="accordion-header" :id="`headingOne${category.id}`">
                      <button class="accordion-button p-0 border-none" type="button" style="box-shadow: none;">
                        <div @mousemove="hoverCategory = index" @mouseleave="hoverCategory = ''" :style="hoverCategory === index? 'background-color: #f6f6f7' : ''" class="col d-flex align-items-center" style="text-align: start; cursor:pointer; min-height: 70px">
                          <div class="p-3 pe-0 col" :class="index === 0? '' : 'collapsed'" style=""  data-bs-toggle="collapse" :data-bs-target="`#collapseOne${category.id}`" :aria-expanded="index === 0? true :false" :aria-controls="`collapseOne${category.id}`">
                            <div class=" fs-6" style="font-weight: 500;">
                              <i class="fas fa-grip-vertical pe-2" style="cursor:move"></i>
                              <span>{{ category.title }} <span style="font-size: 12px; color:#000000"> ({{(category.count_faqs > 0? category.count_faqs : '0')}} FAQs)</span></span>
                            </div>
                          </div>
                          <div class="col-5 d-flex align-items-center pe-3">
                            <div class="col-3 py-3 d-flex justify-content-center">
                              <div class="form-check form-switch m-0 fs-5">
                                <input :disabled="disableUpdate" style="cursor:pointer" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="category.is_visible" @change="updateCategoryVisible(category.id)">
                              </div>
                            </div>
                            <div class="col-3 py-3 d-flex justify-content-center">
                              <div class="form-check m-0 fs-5" style="cursor:pointer; padding-left: 35px">
                                <input style="cursor:pointer" :disabled="disableUpdate" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="category.feature_category" @change="updateCategoryVisible(category.id)">
                              </div>
                            </div>
                            <div class="col-3 py-3 px-2 d-flex justify-content-center">
                              <div v-for="item in category.locale_info" :key="item">
                                <div v-if="item.added === true || item.locale === locale">
                                  <div :title="item.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="item.added === true || item.locale === locale? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: 14px; cursor:auto">
                                    <div style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                    <div class="text-nowrap">{{ item.locale }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-3 py-3 d-flex justify-content-center">
                              <div class="d-flex justify-content-center" :style="category.identify === 'Uncategorized1'? 'width: 90px' : 'display: none'" v-if="hoverCategory === index">
                                <router-link title="Edit & Add translation" :to="{ path:`/edit-category/${category.id}`}" @mouseover="hoverEdit = index" @mouseleave="hoverEdit = ''" :class="hoverEdit === index? 'btn border text-white btn-success' : 'btn border text-success border-success' ">
                                  <i class="fas fa-pencil-alt"></i>
                                </router-link>
                                <button v-if="category.identify === 'Uncategorized1'? false : true" title="Delete" @mouseover="hoverDel = index" @mouseleave="hoverDel = ''" :class="hoverDel === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " class="ms-2" @click="deleteThisCategory(category.id, category.identify)">
                                  <i class="fas fa-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div :id="`collapseOne${category.id}`" class="accordion-collapse collapse" :class="index === 0? 'show' : ''" :aria-labelledby="`headingOne${category.id}`">
                      <div class="accordion-body p-0">
                        <div class="col d-flex">
                          <div class="col text-start">
                            <draggable class="dragArea list-group w-full" :list="faqs" @change="changePositionFaq">
                              <div @mousemove="hoverFaq = index" @mouseleave="hoverFaq = ''" :style="hoverFaq === index? 'background-color: #f6f6f7' : ''" class="" v-for="(faq, index) in faqs" :key="index">
                                <div v-if="faq.category_identify == category.identify" class="py-2 d-flex align-items-center px-3" style="min-height: 53px;">
                                  <div class="d-flex align-items-center col">
                                    <div class="col-2" style="width: 50px"></div>
                                    <div class="col d-flex align-items-center">
                                      <i class="fas fa-grip-vertical pe-3" style="cursor:move"></i>
                                      {{ faq.title }}
                                    </div>
                                  </div>
                                  <div class="col-5 d-flex align-items-center">
                                    <div class="col-3 d-flex justify-content-center">
                                      <div class="form-check form-switch m-0">
                                        <input :disabled="disableUpdate" style="cursor:pointer" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.is_visible" @change="updateFaq(faq.id)">
                                      </div>
                                    </div>
                                    <div class="col-3 d-flex justify-content-center">
                                      <div class="form-check m-0" style="cursor:pointer; padding-left: 24px;">
                                        <input style="cursor:pointer" :disabled="disableUpdate" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.feature_faq" @change="updateFaq(faq.id)">
                                      </div>
                                    </div>
                                    <div class="col-3 px-2 d-flex justify-content-center">
                                      <div v-for="item in faq.locale_info" :key="item">
                                        <div v-if="item.added === true || item.locale === locale" >
                                          <div :title="item.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="item.added === true || item.locale === locale? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: 14px; line-height: 17.275px; cursor:auto">
                                            <div style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                                            <div class="text-nowrap" style="cursor:auto">{{ item.locale }}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-3 d-flex justify-content-center">
                                      <div v-if="hoverFaq === index">
                                        <router-link title="Edit & Add translation" :to="{path:`/edit-faq/${faq.id}`}" @mouseover="hoverEdit = index" @mouseleave="hoverEdit = ''" :class="hoverEdit === index? 'btn border text-white btn-success' : 'btn border text-success border-success' ">
                                          <i class="fas fa-pencil-alt"></i>
                                        </router-link>
                                        <button title="Delete" @mouseover="hoverDel = index" @mouseleave="hoverDel = ''" :class="hoverDel === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " class="ms-2" @click="deleteThisFaq(faq.id, faq.identify, faq.category_identify)">
                                          <i class="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>                  
                            </draggable>
                            <div class="d-flex p-3 pt-2">
                              <div class="col d-flex">
                                <div class="col-2" style="width: 50px; height: 21px;"></div>
                                <div class="col fw-bold" @click="openAddFaqModal(category.identify)" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#add-faq">
                                  <i class="fa-solid fa-circle-plus pe-2 fs-5"  style="cursor:pointer; color: #FF8200"></i>
                                  <span class="hover-color ">Add FAQ</span>
                                </div>
                                <div class="modal fade" id="add-faq" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="add-faq" aria-hidden="true">
                                  <div class="modal-dialog modal-xl modal-dialog-centered">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="add-faq">Add FAQ</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body d-flex flex-column flex-xl-row">
                                        <div class="col-12 col-xl-8 me-0 me-xl-3 p-3 border mb-4 mb-xl-0" style="border-radius: 10px; background-color: #fafbfb">
                                          <div class="mb-3" style="border-radius: 10px">
                                            <div class="form-group">
                                              <label for="title" class="pb-2 fw-bold">Question <span class="text-danger">*</span></label>
                                              <input
                                                v-model="faqTitle"
                                                type="text"
                                                class="form-control"
                                                id="title"
                                                required
                                                name="title"
                                                style="padding-right: 60px"
                                              />
                                              <div v-if="titleError" style="font-size: .8rem" class="text-end text-danger">
                                                {{ titleError }} 
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bg-white" style="border-radius: 10px">
                                            <div class="form-group">
                                              <label for="description" class="pb-2 fw-bold">Answer <span class="text-danger">*</span></label>
                                              <editor
                                                name="faqAnswer"
                                                id="faqAnswer"
                                                v-model="faqAnswer"
                                                api-key="iw2savyfxm3l9qi0l30klxs2ne4dugzr451uxhs7ook0gc3p"
                                                :init="{
                                                  forced_root_block : false,
                                                  height: 250,
                                                  menubar: insert,
                                                  plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                  ],
                                                  toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help'
                                                }"
                                              />
                                            </div>
                                          </div>
                                          <div class="mt-2">
                                            <span class="text-danger fw-normal" style="font-size: .8rem">* This is requied</span>
                                          </div>
                                        </div>
                                        <div class="col">
                                          <div>
                                            <div class="d-flex p-3 border align-items-center" style="border-radius: 10px; background-color: #FAFBFB">
                                              <input v-model="faqVisible" class="form-check-input fs-6 m-0" type="checkbox" id="flexCheckDefault" >
                                              <label class="form-check-label fw-bold ms-2" for="flexCheckDefault">
                                                Show FAQs on page
                                              </label>
                                            </div>
                                            <div class="p-3 border mt-3" style="border-radius: 10px; background-color: #FAFBFB">
                                              <div class="d-flex align-items-center">
                                                <input v-model="featureFaq" class="form-check-input fs-6 m-0" type="checkbox" id="feature_categpry">
                                                <label class="form-check-label fw-bold ms-2" for="feature_categpry">
                                                  Featured
                                                </label>
                                              </div>
                                              <div class="mt-1 fw-normal" style="font-size: .8rem">Show this faq on Widget.</div>
                                            </div>
                                            <div class="p-3 border bg-light mt-3 d-block" style="border-radius: 10px">
                                              <label for="categories" class="pe-2 pb-2 fw-bold">Category</label>
                                              <select disabled class="form-select" style="cursor:pointer" name="categories" id="categories" aria-label="Default select example" v-model="categoryIdentify">
                                                <option v-for="(category, index) in categories" :key="index" :value="category.identify">{{ category.title }}</option> 
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" id="close-add-faq" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn bgr-primary text-white d-flex align-items-center btn-primary-hover" @click="addFaq">Save
                                          <div v-if="disableUpdate" class="loader loader--style3 ps-1">
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
                                </div>
                              </div>
                              <div class="col-5" style="height: 21px"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>        
              </div>
            </draggable>
            <draggable v-else :list="faqs" @change="changePositionFaq" class="product-scroll" style="max-height: 500px; overflow-y:auto">
              <div v-for="(faq, index) in faqs" :key="faq" style="font-size: 14px">
                <div @mousemove="hoverFaq = index" @mouseleave="hoverFaq = ''" :style="hoverFaq === index? 'background-color: #f6f6f7' : ''" class="p-3 border-bottom d-flex align-items-center" style="min-height: 53px; cursor:pointer">
                  <div class="col text-start text-break pe-2 d-flex align-items-start">
                    <i class="fas fa-grip-vertical pe-2" style="padding-top: 6px; cursor: move"></i>
                    <div>
                      <span class="fs-6">{{ faq.title }}</span>
                      <div v-for="category in categories" :key="category">
                        <div v-if="faq.category_identify == category.identify ? true : false">
                          <div class="text-break" style="font-size: 12px;color: rgb(152, 198, 205)">{{ category.title }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1 px-2 d-flex align-items-center justify-content-center fs-6 m-0"> 
                    <div class="form-check form-switch m-0 fs-5">
                      <input :disabled="disableUpdate" style="cursor:pointer" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.is_visible" @change="updateFaq(faq.id)">
                    </div>
                  </div>
                  <div class="col-1 px-2 d-flex align-items-center justify-content-center fs-6 m-0"> 
                    <div class="form-check m-0 fs-5" style="cursor:pointer">
                      <input style="cursor:pointer" :disabled="disableUpdate" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.feature_faq" @change="updateFaq(faq.id)">
                    </div>
                  </div>
                  <div class="col-1 px-2 d-flex justify-content-center" style="flex-wrap:wrap">
                    <div v-for="item in faq.locale_info" :key="item">
                      <div v-if="item.added === true || item.locale === locale">
                        <div :title="item.language" class="px-2 border my-1 d-flex align-items-center justify-content-center" :class="item.added === true || item.locale === locale? 'bgr-primary text-white' : 'bgr-disable'" style="border-radius: 20px; font-size: 14px; cursor:auto">
                          <div style="height: 8px; width: 8px; border-radius: 50%;" class="bgr-added me-1"></div>
                          <!-- <div v-else style="height: 8px; width: 8px; border-radius: 50%; border: 2px solid rgb(80 77 77);" class="me-1 d-flex align-items-center justify-content-center">
                          </div> -->
                          <div class="text-nowrap">{{ item.locale }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 px-2">
                    <div v-if="hoverFaq === index">
                      <router-link  title="Edit & Add translation" :to="{path:`/edit-faq/${faq.id}`}" @mouseover="hoverEdit = index" @mouseleave="hoverEdit = ''" :class="hoverEdit === index? 'btn border text-white btn-success' : 'btn border text-success border-success' ">
                        <i class="fas fa-pencil-alt"></i>
                      </router-link>
                      <button title="Delete" @mouseover="hoverDel = index" @mouseleave="hoverDel = ''" :class="hoverDel === index? 'btn border text-white btn-danger' : 'border text-danger border-danger btn' " class="ms-2" @click="deleteThisFaq(faq.id, faq.identify, faq.category_identify)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
            <div class="text-center p-2 d-flex bg-light align-items-center px-3" style="color: #aaa">
              <div class="col d-flex align-items-center justify-content-between">
                <div class="col-2"></div>
                <div class="col">
                  <span>Showing {{ faqs.length }}  of {{ faqs.length }} Faq</span>
                </div>
                <div v-if="faqs.length > 1" class="col-2 text-end">
                  <button style="margin-right: 30px" @click="deleteAllFaqs(userId)" @mouseover="hoverDelAll = true" @mouseleave="hoverDelAll = false" :class="hoverDelAll? 'btn btn-danger text-white' : 'btn border border-danger text-danger'">Delete All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="faqs.length === 0 && loadPage === false" class="d-flex flex-column flex-lg-row bg-white border overflow-hidden" style="border-radius: 10px;">
        <div class="col-12 col-lg-5">
          <img class="w-100 h-100" style="object-fit: cover; object-position: center center" src="./../../../public/FAQ.jpg" alt="">
        </div>
        <div class="col-12 col-lg-7 d-block p-4 text-start text-dark">
          <div>
            <h5 class="pb-2 fw-bold">Welcome to Professional FAQs app!</h5>
            <p>First of all, thanks a lot for giving me an opportunity to serve you. I will keep this simple & short! Merchants primarily use app for:</p>
            <ul>
              <li class="mb-2">Create elegant FAQ page with most frequently asked questions by customers in various languages.</li>
              <li class="mb-2">Embed FAQs on other parts of store like product, home, custom pages...</li>
              <li class="mb-2">Custom CSS allows you to turn your imagination into a reality.</li>
              <li>Provide a smart, instant and helpful FAQs popup for customers find popular questions.</li>
            </ul>
            <div class="py-3">
              <span>Let's get started.</span>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="mt-3 d-flex flex-column flex-sm-row align-items-center">
              <router-link to="/add-faq" class="btn border btn-primary-hover bgr-primary d-flex py-2 me-0 me-sm-4 ">
                <svg viewBox="0 0 20 20" fill="#ffffff" style="width: 20px" focusable="false" aria-hidden="true"><path d="M12.384 8.92a1.01 1.01 0 0 1-.363.08 1.01 1.01 0 0 1-.553-.17.914.914 0 0 1-.373-.452.93.93 0 0 1-.08-.572.991.991 0 0 1 .271-.522l1.007-1.004a1.01 1.01 0 0 1 1.54.17 1.001 1.001 0 0 1-.12 1.255L12.706 8.71a1.158 1.158 0 0 1-.322.21zM8.03 3.757a1 1 0 0 0 1.94.486l-1.94-.486zm2.44-1.514a1 1 0 1 0-1.94-.486l1.94.486zm-.5 2 .5-2-1.94-.486-.5 2 1.94.486zm5.755 5.796a1 1 0 1 0 .55 1.922l-.55-1.922zm2.532 1.355a1 1 0 1 0-.55-1.922l.55 1.922zm-1.982.567 1.982-.567-.55-1.922-1.982.567.55 1.922zM4.515 7.518.182 16.877a2.238 2.238 0 0 0 2.942 2.94l9.367-4.338a.921.921 0 0 0 .465-1.102.918.918 0 0 0-.226-.369L5.987 7.27a.92.92 0 0 0-.8-.258.92.92 0 0 0-.672.506zM1.801 3.98c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .22-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm14 0c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm0 14c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96z"></path></svg>
                <span class="ms-2 text-light">Create first FAQ</span>
              </router-link>
            </div>
            <div class="mt-3 d-flex flex-column flex-sm-row align-items-center">
              <router-link to="/add-category" class="btn border btn-primary-hover bgr-primary d-flex py-2 me-0 me-sm-4 ">
                <svg viewBox="0 0 20 20" fill="#ffffff" style="width: 20px" focusable="false" aria-hidden="true"><path d="M12.384 8.92a1.01 1.01 0 0 1-.363.08 1.01 1.01 0 0 1-.553-.17.914.914 0 0 1-.373-.452.93.93 0 0 1-.08-.572.991.991 0 0 1 .271-.522l1.007-1.004a1.01 1.01 0 0 1 1.54.17 1.001 1.001 0 0 1-.12 1.255L12.706 8.71a1.158 1.158 0 0 1-.322.21zM8.03 3.757a1 1 0 0 0 1.94.486l-1.94-.486zm2.44-1.514a1 1 0 1 0-1.94-.486l1.94.486zm-.5 2 .5-2-1.94-.486-.5 2 1.94.486zm5.755 5.796a1 1 0 1 0 .55 1.922l-.55-1.922zm2.532 1.355a1 1 0 1 0-.55-1.922l.55 1.922zm-1.982.567 1.982-.567-.55-1.922-1.982.567.55 1.922zM4.515 7.518.182 16.877a2.238 2.238 0 0 0 2.942 2.94l9.367-4.338a.921.921 0 0 0 .465-1.102.918.918 0 0 0-.226-.369L5.987 7.27a.92.92 0 0 0-.8-.258.92.92 0 0 0-.672.506zM1.801 3.98c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .22-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm14 0c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm0 14c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96z"></path></svg>
                <span class="ms-2 text-light">Create Category</span>
              </router-link>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="loadPage === false" class="border p-4 d-flex flex-sm-row flex-column bg-white mx-4 mt-3" style="border-radius: 10px">
      <div class="col-12">
        <div class="p-2 rounded d-flex align-items-center" style="background-color: #ebf9fc; border: 1px solid #98c6cd;">
          <div class="p-1" style="margin-bottom: auto">
            <svg viewBox="0 0 20 20" style="width: 20px; height: 20px" fill="#FF8200" focusable="false" aria-hidden="true"><path d="M12.384 8.92a1.01 1.01 0 0 1-.363.08 1.01 1.01 0 0 1-.553-.17.914.914 0 0 1-.373-.452.93.93 0 0 1-.08-.572.991.991 0 0 1 .271-.522l1.007-1.004a1.01 1.01 0 0 1 1.54.17 1.001 1.001 0 0 1-.12 1.255L12.706 8.71a1.158 1.158 0 0 1-.322.21zM8.03 3.757a1 1 0 0 0 1.94.486l-1.94-.486zm2.44-1.514a1 1 0 1 0-1.94-.486l1.94.486zm-.5 2 .5-2-1.94-.486-.5 2 1.94.486zm5.755 5.796a1 1 0 1 0 .55 1.922l-.55-1.922zm2.532 1.355a1 1 0 1 0-.55-1.922l.55 1.922zm-1.982.567 1.982-.567-.55-1.922-1.982.567.55 1.922zM4.515 7.518.182 16.877a2.238 2.238 0 0 0 2.942 2.94l9.367-4.338a.921.921 0 0 0 .465-1.102.918.918 0 0 0-.226-.369L5.987 7.27a.92.92 0 0 0-.8-.258.92.92 0 0 0-.672.506zM1.801 3.98c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .22-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm14 0c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96zm0 14c.109.022.197.11.219.219a1 1 0 0 0 1.96 0 .283.283 0 0 1 .219-.219 1 1 0 0 0 0-1.96.283.283 0 0 1-.219-.219 1 1 0 0 0-1.96 0 .283.283 0 0 1-.219.219 1 1 0 0 0 0 1.96z"></path></svg>
          </div>
          <div class="ms-2 my-1 font-notify">
            <span class="fw-bold fs-6">We've launched a new feature that allows you to show FAQs on all pages of the store through a dynamic popup!</span>
            <ul class="d-flex flex-column flex-xl-row mt-2 mb-0">
              <li class="m-0 me-0 me-xl-5 col">Quick to contact and respond by integrating 3rd parties: WhatsApp, messenger, contact form, and phone call</li>
              <li class="m-0 mx-0 mx-xl-5 col">Reach brilliant FAQs easily through a dynamic popup.</li>
              <li class="m-0 ms-0 ms-xl-5 col">Easy to customize the layout to look nice and match your brand.</li>
            </ul>
            <router-link to="/message" class="btn mt-2 fw-bold text-white font-notify btn-primary-hover bgr-primary" style="color: #FF8200">Try now!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import FaqDataService from "../../services/FaqDataService";
import { useRoute } from 'vue-router';
import { inject } from 'vue'
import swal from 'sweetalert';
import store from "../../store";
import { VueDraggableNext } from 'vue-draggable-next'
import CategoryDataService from "../../services/CategoryDataService";
import FaqProductDataService from "../../services/FaqProductDataService";
import FaqMorePageDataService from "../../services/FaqMorePageDataService";
import { debounce } from 'vue-debounce';
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import Icon from './../../assets/category-icon.json'
import Rating from '../rating&suggest-feature/Rating.vue'
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    draggable: VueDraggableNext,
    Rating,
    'editor': Editor,
  },
  methods:{ 
    async deleteThisFaq(faq_id, faq_identify, faq_category_identify){
      await this.removeThisFaq(faq_id, faq_identify, faq_category_identify)
    },
    async deleteAllFaqs(user_id){
      await this.removeAllFaq(user_id)
    }
  },
  setup() {
    const settings = ref(store.state.data.settings)
    const faqTitle = ref()
    const faqAnswer = ref()
    const faqVisible = ref(true)
    const featureFaq = ref()
    const categoryIdentify = ref()
    const categoriesIcon = ref(Icon)
    const allCategory = ref()
    const hoverCategory = ref()
    const toast = inject('$toast');
    const changeColorIconAdd = ref()
    const changeColorIconStar = ref()
    const loadPage = ref(false)
    const locale = ref()
    locale.value = store.state.auth.locale
    const shopDomain = ref()
    shopDomain.value = store.state.auth.shopifyDomain
    const hoverDelAll = ref()
    const hoverEdit = ref()
    const hoverDel = ref()
    const hoverFaq = ref()
    const faqs = ref([])
    const categories = ref([])
    const dontCategoryFaq = ref(store.state.data.settings.dont_category_faq)
    categories.value = store.state.data.categories
    store.dispatch('data/setAllCategoriesData', categories.value);
    console.log(categories.value)
    const localeDefault = ref('default')
    const faqs_bu = ref([])
    faqs_bu.value = store.state.data.faqs
    const allFaqs = ref([])
    allFaqs.value = store.state.data.all_faqs
    const locales = ref([])
    const schema = yup.object({
      title: yup.string().required(''),
    })
    useForm({
      validationSchema: schema,
    });
  
    const downCsvSample = async () => {
      FaqDataService.downLoadSampleFile()
      .then(response => {
        FileDownload(response.data, 'Professional-FAQ-Import.csv');
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    }

    const { value: title, errorMessage: titleError } = useField('title')
    const featureCategory = ref(false)
    const checkExitsCategory = ref()
    const visible = ref(true)
    const { handleSubmit } = useForm(title.value)
    const description = ref()
    const route = useRoute()

    const addCategory = handleSubmit(async function() {
      checkExitsCategory.value = false
      if (title.value === undefined || title.value === '') {
        title.value = ""
        toast.open({
          message: "Category Name can't be empty !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
        return
      }
      disableUpdate.value = true
      for( let i = 0; i < categories.value.length ; i++ ) {
        if (categories.value[i].title === title.value.replace(/\s+/g,' ').trim()) {
          checkExitsCategory.value = true
          disableUpdate.value = false
          toast.open({
            message: "Category Already Exits!",
            type: "error",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      const data = {
        locale : 'default',
        title: title.value.replace(/\s+/g,' ').trim(),
        is_visible : visible.value,
        description : description.value,
        feature_category: featureCategory.value
      };
      await CategoryDataService.create(data)
        .then(async response => {
          const id = ref()
          id.value = response.data.id;
          await retrieveAllCategory()
          toast.open({
            message: "Add Category Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          disableUpdate.value = false
          const newCategory = ref()
          newCategory.value = categories.value.filter(item => {
            return (item.title === title.value.replace(/\s+/g,' ').trim())
          })
        })
        .catch(e => {
          console.log(e);
        });
        disableUpdate.value = false
    });
    if(route.query.accessToken){
      store.dispatch('auth/setToken', { accessToken: route.query.accessToken, refreshToken: route.query.refreshToken})
    }
    const accessToken = ref() 
    const refreshToken = ref()
    const isAuthenticated = ref()
    if(typeof(Storage) !== "undefined") {
      accessToken.value = store.state.auth.accessToken
      refreshToken.value = store.state.auth.refreshToken
      if(!accessToken.value){
        isAuthenticated.value = 'false'
        store.dispatch('auth/setAuth', false)
        return
      }
      else {
        isAuthenticated.value = 'true'
        store.dispatch('auth/setAuth', true)
      }
    }

    const changePositionFaq = debounce(async() => {
      disableUpdate.value = true
      for(let i = 0; i < faqs.value.length; i++){
        faqs.value[i].position = i
      }
      const data = ref([])
        for(let i = 0; i < faqs.value.length; i++){
          data.value.push({
            id: faqs.value[i].id,
            position: faqs.value[i].position
          })
        }
        await FaqDataService.updateRearrangeFaqs(data.value)
        .then(response => {
          const data = ref()
          data.value = response.data
          disableUpdate.value = false
        })
        .catch(e => {
          console.log(e)
        })
      store.dispatch('data/setFaqsData', faqs.value);
    }, 500)

    const changePositionCategory = debounce(async() => {
      disableUpdate.value = true
      for(let i = 0; i < categories.value.length; i++){
        categories.value[i].position = i
      }
      const data = ref([])
      for(let i = 0; i < categories.value.length; i++){
        data.value.push({
          id: categories.value[i].id,
          identify: categories.value[i].identify,
          position: categories.value[i].position
        })
      }
      await CategoryDataService.updateRearrangeCategories(data.value)
      .then(response => {
        const data = ref()
        data.value = response
        disableUpdate.value = false
      })
      .catch(e => {
        console.log(e)
      })
    },500)

    const retrieveAllFaq = async function() {
      if(faqs_bu.value.length > 0){
        await FaqDataService.getAllFaq()
        .then(async response => {
          allFaqs.value = response.data;
          store.dispatch('data/setAllFaqsData', allFaqs.value);
          await setFaqLocale()
        })
        .catch(e => {
          const id = ref()
          id.value = e
        });
      }
      else{
        loadPage.value = false
      }
    };

    const retrieveCategory = async function() {
      await CategoryDataService.getAll(localeDefault.value)
      .then(response => {
        store.state.data.categories = response.data;
        categories.value = response.data
      })
      .catch(e => {
        console.log(e);
      });
    };

    const disableUpdate = ref()
    const updateFaq = async (faq_id) => {
      disableUpdate.value = true
      const data = ref()
      data.value = faqs.value.filter(item => {
        return item.id === faq_id
      })[0]
      store.dispatch('data/setFaqsData', faqs.value);
      await FaqDataService.update(data.value.id ,data.value)
      .then(response => {
        disableUpdate.value = false
        const responses = ref()
        responses.value = response
      })
      .catch(e => {
        console.log(e)
      })
    }
    const updateCategoryVisible = async (category_id) => {
      disableUpdate.value = true
      const data = ref()
      data.value = categories.value.filter(item => {
        return item.id === category_id
      })[0]
      store.dispatch('data/setCategoriesData', categories.value);
      CategoryDataService.update(data.value.id ,data.value)
      .then(response => {
        disableUpdate.value = false
        const responses = ref()
        responses.value = response
      })
      .catch(e => {
        console.log(e)
      })
    }

    const setFaqLocale = async function(){
      const listLocale = ref([])
      const localesInfo = ref([])
      if(faqs_bu.value.length > 0){
        for(let i = 0; i < faqs_bu.value.length; i++){
          listLocale.value = []
          allFaqs.value.forEach(element => {
            if(faqs_bu.value[i].identify === element.identify && faqs_bu.value[i].category_identify === element.category_identify){
              if(!listLocale.value.some(item => { return item === element.locale })){
                listLocale.value.push(element.locale)
              }
            }
          })
          localesInfo.value = []
          locales.value = JSON.parse(store.state.auth.languages)
          locales.value.forEach(element => {
            if(listLocale.value.some(item => { return element.locale === item })){
              localesInfo.value.push({
                locale: element.locale,
                added: true,
                language: element.language
              })
            }
            else{
              localesInfo.value.push({
                locale: element.locale,
                added: false,
                language: element.language
              })
            }
          })
          faqs_bu.value[i].locale_info = localesInfo.value
          if(settings.value.category_sort_name){
            faqs_bu.value.sort(function(a, b){
              if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1;}
              if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1;}
              return 0;
            });
          }
          else{
            faqs_bu.value.sort(function(a, b){return a.position - b.position});
          }
          loadPage.value = false
        }
      }
      store.dispatch('data/setFaqsData', faqs_bu.value);
      faqs.value = faqs_bu.value
      loadPage.value = false
    }
    
    const retrieveFaq = async function() {
      await FaqDataService.getAll(localeDefault.value)
      .then(response => {
        faqs_bu.value = response.data;
        if(categories.value.length > 0){
          for(let i = 0; i < categories.value.length; i++){
            const countFaqs = ref()
            const countFeatureFaq = ref()
            countFaqs.value = faqs_bu.value.filter(item => {
              return item.category_identify === categories.value[i].identify
            }).length
            countFeatureFaq.value = faqs_bu.value.filter(item => {
              return (item.category_identify === categories.value[i].identify && item.feature_faq === true)
            }).length
            categories.value[i].count_faqs = countFaqs.value
            categories.value[i].count_feature_faq = countFeatureFaq.value
          }
        }
      })
      .catch(e => {
        console.log(e)
      });
    };

    // Export Faqs !
    const FileDownload = require('js-file-download');
    const exportFaqs = function(curentLocale = null) {
      FaqDataService.exportFaqs(curentLocale)
      .then(response => {
        FileDownload(response.data, 'Professional-FAQ.csv');
      })
      .catch(e => {
        const id = ref()
        id.value = e
      });
    };

    // Import Faqs
    const files = ref([])
    const disableImport = ref()
    const uploadFileCsv = async function(event) {
      if(document.getElementById("file-up-load").value.indexOf('.csv') == -1){
        toast.open({
          message: "File type is invalid !",
          type: "error",
          duration: 3000,
          dismissible: true
        })
        return
      }
      disableImport.value = true
      files.value = event.target.files
      await FaqDataService.importFaqs(files.value)
      .then(async response => {
        if(response.data.message === 'No faq added !'){
          toast.open({
            message: "No faq added !",
            type: "default",
            duration: 3000,
            dismissible: true
          })
          disableImport.value = false
          return
        }
        if(response.data.message === 'File type is invalid !'){
          toast.open({
            message: "File type is invalid !",
            type: "error",
            duration: 3000,
            dismissible: true
          })
          disableImport.value = false
          return
        }
        if(response.data.message === 'Question, Answer and Category is requied !'){
          toast.open({
            message: "Question, Answer and Category is requied !",
            type: "error",
            duration: 3000,
            dismissible: true
          })
          disableImport.value = false
          return
        }
        await retrieveAllCategory()
        await retrieveFaq()
        setFaqLocale()
        setCategoryLocale()
        toast.open({
          message: `${response.data.message}`,
          type: "success",
          duration: 3000,
          dismissible: true
        })
        disableImport.value = false
        document.getElementById('btn-close-import').click()
      })
      .catch(response => {
        const id = ref()
        id.value = response
        toast.open({
          message: "Upload False !",
          type: "error",
          duration: 3000,
          dismissible: true
        })
        disableImport.value = false
      })
      document.getElementById("file-up-load").value = ''
    }

    //Delete all Faq
    const deleteAllFaq = ref()
    const removeAllFaq = async function(userId) {
      deleteAllFaq.value = false
      await swal({ title: "Waring!",
        text: "Do you really want to delete all FAQs?",
        dangerMode: true,
        buttons: true,    
        type: "success"}).then(async done => {
        if (done) {
          await FaqDataService.deleteAll(userId)
          .then(async response => {
            faqs.value = []
            faqs_bu.value = []
            allFaqs.value = []
            store.dispatch('data/setFaqsData', faqs_bu.value);
            store.dispatch('data/setAllFaqsData', allFaqs.value);
            toast.open({
              message: "Deleted All FAQs Successfully!",
              type: "success",
              duration: 3000,
              dismissible: true
            })
            const id = ref()
            id.value = response
            deleteAllFaq.value = true
          })
          .catch(e => {
            const id = ref()
            id.value = e
          });
        } 
      });
    };
    const deleteThisCategory = async function(category_id, identify) {
      await swal({ title: "Waring!",
        text: "Do you really want to delete this category?",
        dangerMode: true,
        buttons: true,
        type: "success"
      })
      .then(async done => {
        if(done) {
          disableUpdate.value = true
          await CategoryDataService.delete(category_id, identify)
          .then(async response => {
            const id = ref()
            id.value = response
            for(let i = 0; i < categories.value.length; i++){
              if(categories.value[i].id === category_id){
                categories.value.splice(i, 1)
              }
            }
            for(let i = 0; i < faqs.value.length; i++){
              if(faqs.value[i].category_identify === identify){
                faqs.value[i].category_identify = 'Uncategorized1'
              }
            }
            setCategoryLocale()
            toast.open({
              message: "Deleted Category Successfully!",
              type: "success",
              duration: 3000,
              dismissible: true
            })
            disableUpdate.value = false
            await updateFaqCategory(identify)
            await retrieveAllCategory()
            setCategoryLocale()
          })
          .catch(e => {
            console.log(e);
            disableUpdate.value = false
            toast.open({
              message: "Deleted Category Error!",
              type: "error",
              duration: 3000,
              dismissible: true
            })
          });
        } 
      });
    }

    const retrieveAllCategory = async function() {
      await CategoryDataService.getAllCategory()
      .then(async response => {
        store.dispatch('data/setAllCategoriesData', response.data)
      })
      .catch(e => {
        console.log(e);
        disableUpdate.value = false
      });
      await retrieveCategory()
      setCategoryLocale()
    };

    const categories_bu = ref()
    const setCategoryLocale = function(){
      title.value = ''
      document.getElementById('close-add-category').click()
      categories_bu.value = store.state.data.categories
      allCategory.value = store.state.data.all_categories
      const listLocale = ref([])
      const localesInfo = ref([])
      if(categories_bu.value){
        for(let i = 0; i < categories_bu.value.length; i++){
          listLocale.value = []
          allCategory.value.forEach(element => {
            if(categories_bu.value[i].identify === element.identify){
              if(!listLocale.value.some(item => { return item === element.locale })){
                listLocale.value.push(element.locale)
              }
            }
          })
          const countFaqs = ref()
          countFaqs.value = faqs.value.filter(item => {
            return item.category_identify === categories_bu.value[i].identify
          }).length
          
          localesInfo.value = []
          locales.value.forEach(element => {
            if(listLocale.value.some(item => { return element.locale === item })){
              localesInfo.value.push({
                locale: element.locale,
                added: true,
                language: element.language
              })
            }
            else{
              localesInfo.value.push({
                locale: element.locale,
                added: false,
                language: element.language
              })
            }
          })
          categories_bu.value[i].locale_info = localesInfo.value
          categories_bu.value[i].count_faqs = countFaqs.value
        }
        categories.value = categories_bu.value
        store.dispatch('data/setAllCategoriesData', categories.value)
      }
    }

    const updateFaqCategory = async function(identify){
      await FaqDataService.getAllFaq()
      .then(async response => {
        const listFaqsId = ref([])
        const listFaq = ref([])
        faqs_bu.value = response.data
        listFaq.value = response.data.filter(item => {
          return item.category_identify === identify
        })
        listFaq.value.forEach(item => {
          listFaqsId.value.push(item.id)
        })
        if(listFaqsId.value.length > 0){
          await FaqDataService.updateWhenDeleteCategory(listFaqsId.value)
          .then(async response => {
            const id = ref()
            id.value = response
            const listFaqId = ref([])
            listFaqId.value = faqs.value.filter(item => {
              return item.category_identify === identify
            })
            await retrieveFaqs()
            const data = ref([])
            for(let i = 0; i < faqs.value.length; i++){
              for(let j = 0; j < listFaqId.value.length; j++){
                if(faqs.value[i].id === listFaqId.value[j].id){
                  data.value.push(faqs.value[i])
                }
              }
            }
            await FaqProductDataService.updateFaq(data.value)
            .then(response => {
              const id = ref()
              id.value = response.data
            })
            .catch(e => {
              console.log(e)
            })
            await FaqMorePageDataService.updateFaq(data.value)
            .then(response => {
              const id = ref()
              id.value = response.data
            })
            .catch(e => {
              console.log(e)
            })
          })
          .catch(e => {
            console.log(e);
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
    const retrieveFaqs = async function() {
      await FaqDataService.getAll(localeDefault.value)
      .then(response => {
        faqs.value = response.data
        faqs_bu.value = response.data
        setFaqLocale()
      })
      .catch(e => {
        console.log(e);
      });
    };

    const deleteFaq = ref()
    const removeThisFaq = async function(id, identify,category_identify) {
      deleteFaq.value = false
      await swal({ 
        title: "Waring!",
        text: "Do you really want to delete this FAQ?",
        dangerMode: true,
        buttons: true,    
        type: "success"
      })
      .then(async done => {
        if(done) {
          for(let i = 0; i < faqs.value.length; i++){
            if(faqs.value[i].id === id){
              faqs.value.splice(i, 1)
            }
          }
          deleteFaq.value = true
          toast.open({
            message: "Deleted FAQ Successfully!",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          await FaqDataService.delete(id, identify,category_identify)
          .then(async response => {
            const id = ref()
            id.value = response
            await retrieveFaq()
            await retrieveAllFaq()
          })
          .catch(e => {
            const id = ref()
              id.value = e
          });
        } 
      });
    }
    const addIcon = (icon) => {
      title.value = title.value? `${icon}`+ ' ' + title.value : `${icon}` + ' '    
    }
    const openAddFaqModal = (category_identify) => {
      categoryIdentify.value = category_identify
    }
    const checkExitsFaq = ref()
    const addFaq = async () => {
      checkExitsFaq.value = false
      if(faqTitle.value == '' || faqAnswer.value == '' || faqTitle.value == undefined || faqAnswer.value == undefined){
        toast.open({
          message: "Question & Answer can't be empty !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
        return
      }
      if(faqTitle.value.length > 255){
        toast.open({
          message: "Questions cannot exceed 255 characters !",
          type: "default",
          duration: 3000,
          dismissible: true
        })
        return
      }
      disableUpdate.value = true
      for(let i = 0; i < faqs.value.length; i++){
        if (faqs.value[i].title === faqTitle.value.replace(/\s+/g,' ').trim() && faqs.value[i].category_identify === categoryIdentify.value) {
          checkExitsFaq.value = true
          disableUpdate.value = false
          toast.open({
            message: "FAQ Already Exits !",
            type: "error",
            duration: 3000,
            dismissible: true
          })
          return
        }
      }
      const data = {
        locale: localeDefault.value,
        title: faqTitle.value.replace(/\s+/g,' ').trim(),
        content: faqAnswer.value,
        category_identify : categoryIdentify.value,
        is_visible : faqVisible.value,
        feature_faq: featureFaq.value,
      };
      await FaqDataService.create(data)
        .then(async response => {
          const id = ref()
          id.value = response.data;
          await retrieveFaq()
          disableUpdate.value = false
          toast.open({
            message: "Created FAQ Successfully !",
            type: "success",
            duration: 3000,
            dismissible: true
          })
          document.getElementById('close-add-faq').click()
          faqTitle.value = ''
          faqAnswer.value = ''
          setFaqLocale()
        })
        .catch(e => {
          disableUpdate.value = false
          console.log(e);
        });
    }
    const contact = () => {
      if(document.getElementsByClassName('cc-dc5e')[0]){
        document.getElementsByClassName('cc-dc5e')[0].click()
      }
      else{
        let user_nickname = `[FAQ]${shopDomain.value}`
        window.open(`https://go.crisp.chat/chat/embed/?website_id=35cbcb5a-831c-47fb-9064-0bced009fca9&user_nickname=${user_nickname}`);
      }
    }

    return {
      contact,
      uploadFileCsv,
      addFaq,
      categoryIdentify,
      openAddFaqModal,
      changeColorIconStar,
      categoriesIcon,
      addIcon,
      visible,
      featureCategory,
      addCategory,
      description,
      title,
      retrieveFaqs,
      deleteThisCategory,
      updateCategoryVisible,
      changePositionCategory,
      changePositionFaq,
      hoverCategory,
      disableUpdate,
      updateFaq,
      setFaqLocale,
      changeColorIconAdd,
      loadPage,
      deleteAllFaq,
      deleteFaq,
      localeDefault,
      retrieveAllFaq,
      shopDomain,
      locales,
      locale,
      hoverDelAll,
      hoverDel,
      hoverEdit,
      hoverFaq,
      removeAllFaq,
      retrieveFaq,
      removeThisFaq,
      faqs,
      categories,
      exportFaqs,
      dontCategoryFaq,
      titleError,
      retrieveCategory,
      faqTitle,
      faqAnswer,
      faqVisible,
      featureFaq,
      disableImport,
      downCsvSample
    }
  },
  async created() {
    await this.setFaqLocale();
  },
}
</script>

<style scoped>
.hover-bg-color{
  background-color: #fff;
  color: #000;
}
.hover-bg-color:hover{
  background-color: #f6f6f7;
  color:#FF8200
}
.accordion-item{
  border: none
}
.accordion-item:last-of-type {
  border-radius: 0;
}
.accordion-item:first-of-type {
  border-radius: 0;
}
.accordion-button:not(.collapsed) {
  color: #FF8200 !important;
  background-color: #fff !important;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}

</style>