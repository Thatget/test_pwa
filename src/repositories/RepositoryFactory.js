import CategoryDataService from './../services/CategoryDataService'
import FaqDataService from './../services/FaqDataService'
import FaqProductsDataService from './../services/FaqProductDataService'
import GetProductList from './../services/GetProductList'
import UploadFilesService from './../services/ImageDataService'
import ProductsDataService from './../services/ProductsDataService'
import SettingDataService from './../services/SettingDataService'
import UserDataService from './../services/UserDataService'

const repositories = {
    user: UserDataService,
    faqs: FaqDataService,
    categories: CategoryDataService,
    products: ProductsDataService,
    faq_product: FaqProductsDataService,
    settings: SettingDataService,
    upload_banner: UploadFilesService,
    get_products: GetProductList
};
export const RepositoryFactory = {
    get: name => repositories[name]
}