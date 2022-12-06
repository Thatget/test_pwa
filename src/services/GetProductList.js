import http from "../http-common";
class GetProductList {
  get(limit, page_info = null) {
    if(page_info){
      return http.get(`/shop/product-list?limit=${limit}&page_info=${page_info}`)
    }
    return http.get(`/shop/product-list/?limit=${limit}`);
  }
}
export default new GetProductList();