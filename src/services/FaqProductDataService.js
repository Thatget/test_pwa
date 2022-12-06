import http from "../http-common";
class ProductsDataService {
  
  getAll() {
    return http.get(`/faq-product/product/`);
  }
  get(id) {
    return http.get(`/faq-product/${id}`);
  }
  create(data) {
    return http.post("/faq-product", data);
  }
  update(id, data) {
    return http.put(`/faq-product/${id}`, data);
  }
  updatePosition(id, data) {
    return http.put(`/faq-product/position/${id}`, data);
  }
  updateFaq(data) {
    return http.put(`/faq-product-update`, data);
  }
  updateFaqCategory(data) {
    return http.put(`/faq-product-update/category`, data);
  }
  delete(id) {  
    return http.delete(`/faq-product/${id}`);
  }
  deleteAll(data) {
    return http.delete("/faq-product/product", data);
  }
  findByTitle(title) {
    return http.get(`/faq-product?title=${title}`);
  }
}
export default new ProductsDataService();