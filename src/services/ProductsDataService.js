import http from "../http-common";
class ProductsDataService {
  
  getAll() {
    return http.get(`/product`);
  }
  get(product_id) {
    return http.get(`/product/${product_id}`);
  }
  create(data) {
    return http.post("/product", data);
  }
  update(id, data) {
    return http.put(`/product/${id}`, data);
  }
  delete(product_id) {  
    return http.delete(`/product/${product_id}`);
  }
  deleteAll(data) {
    return http.post("/product/id", data);
  }
  findByTitle(title) {
    return http.get(`/product?title=${title}`);
  }
  searchByTitle(limit, title, cursor) {
    return http.get(`/shop/search-product?limit=${limit}&title=${title}&cursor=${cursor}`)
  }
}
export default new ProductsDataService();