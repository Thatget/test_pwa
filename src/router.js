import { createWebHistory, createRouter } from "vue-router";
import AddFaq from './components/faqs/AddFaq.vue'
import AddCategory from './components/categories/AddCategory.vue'
import StoreFAQs from './components/faqs/StoreFAQs.vue'
import AppFAQs from './components/AppFAQs.vue'
// import DragAndDrop from './components/DragAndDrop.vue'
import NotFound from './components/NotFound.vue'
import EditFaq from './components/faqs/EditFaq.vue'
import ProductFaq from './components/products/ProductFaq.vue'
import EditCategory from './components/categories/EditCategory.vue'
// import ImproveCategory from './components/categories/ImproveCategory.vue'
import StoreCategory from './components/categories/StoreCategory.vue'
import Admin from './components/admin/Admin.vue'
import AdminLogin from './components/admin/AdminLogin.vue'
import Merchant from './components/admin/Merchant.vue'
import RatingSuggest from './components/admin/Rating&&Suggest.vue'
import Login from './components/auth/Login.vue'
// import Redirect from './components/auth/Redirect.vue'
import Messages from './components/messages/Messages.vue'
import Translation from './components/messages/Translation.vue'
import Setting from './components/settings/Setting.vue'
import SetFaqMorePage from './components/settings/SetFaqMorePage.vue'
import TemplateSetting from './components/template-setting/TemplateSetting.vue'
// import { isShopifyEmbedded } from '@shopify/app-bridge-utils';
import Rating from './components/rating&suggest-feature/Rating.vue'
import SuggestFeature from './components/rating&suggest-feature/SuggestFeature.vue'
import Template01 from './components/template-setting/template/Template01.vue'
import Template02 from './components/template-setting/template/Template02.vue'
import Template03 from './components/template-setting/template/Template03.vue'
import Template04 from './components/template-setting/template/Template04.vue'
import Template05 from './components/template-setting/template/Template05.vue'
import Template06 from './components/template-setting/template/Template06.vue'
import Template07 from './components/template-setting/template/Template07.vue'
import Template08 from './components/template-setting/template/Template08.vue'
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLogin
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "/merchant",
        name: "merchant",
        component: Merchant
      },      
      {
        path: "/rating-suggest",
        name: "rating-suggest",
        component: RatingSuggest
      },      
    ]
  },  
  {
    path: "/app",
    name: "app",
    component: AppFAQs,
    children: [
      {
        path: "/categories",
        name: "categories",
        component: StoreCategory
      },
      {
        path: "/suggest-feature",
        name: "suggest-feature",
        component: SuggestFeature
      },
      {
        path: "/rating",
        name: "rating",
        component: Rating
      },
      {
        path: "/message",
        name: "messages",
        component: Messages
      },
      {
        path: "/translation",
        name: "translation",
        component: Translation
      },
      {
        path: "/storeFaqs",
        name: "store-faqs",
        component: StoreFAQs,
      },
      {
        path: "/design",
        name: "design",
        component: TemplateSetting,
        children:[
          {
            path: "/template-01",
            name: "template-01",
            component: Template01
          },
          {
            path: "/template-02",
            name: "template-02",
            component: Template02
          },
          {
            path: "/template-03",
            name: "template-03",
            component: Template03
          },
          {
            path: "/template-04",
            name: "template-04",
            component: Template04
          },
          {
            path: "/template-05",
            name: "template-05",
            component: Template05
          },
          {
            path: "/template-06",
            name: "template-06",
            component: Template06
          },
          {
            path: "/template-07",
            name: "template-07",
            component: Template07
          },
          {
            path: "/template-08",
            name: "template-08",
            component: Template08
          }
        ]
      },
      {
        path: "/products-faqs",
        name: "products-faqs",
        component: ProductFaq
      },
      {
        path: "/setting",
        name: "setting",
        component: Setting
      },
      {
        path: "/faq-more-page",
        name: "faq-more-page",
        component: SetFaqMorePage
      },
      {
        path: "/add-faq",
        name: "add-faq",
        component: AddFaq
      },
      {
        path: "/add-category",
        name: "add-category",
        component: AddCategory
      },
      {
        path: "/edit-faq/:id",
        name: "edit-faq",
        component: EditFaq
      },
      {
        path: "/edit-category/:id",
        name: "edit-category",
        component: EditCategory
      },
    ]
  },
  {
    path: '/not-found',
    name: "NotFound",
    component: NotFound
  },
  { path: '/:pathMatch(.*)*',
    component: NotFound 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isAdminAuth = false
router.beforeEach((to, from, next) => {
  try {
    if (!isShopifyEmbedded()) {
      isAdminAuth = localStorage.getItem('isAdminAuth');
    }
  }
  catch(err){
    console.log(err)
  }
  if ((to.name === 'admin' || to.name === 'merchant' || to.name === 'rating-suggest') && !isAdminAuth) next({ name: 'admin-login' })
  else next()
})

export default router;