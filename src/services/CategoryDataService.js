import http from "../http-common";
class CategoryDataService {
  getAllCategory() {
    return http.get(`/faq-category/all`);
  }
  get(id) {
    return http.get(`/faq-category/${id}`);
  }
  getAll(locale) {
    return http.get(`/faq-category-locale/?locale=${locale}`);
  }
  create(data) {
    return http.post("/faq-category", data);
  }
  update(id, data) {
    console.log(id)
    return http.put(`/faq-category/${id}`, data);
  }
  updateRearrangeCategories(data) {
    return http.put(`/faq-category/update/rearrange`, data);
  }
  
  delete(id, identify = null) {
    if(identify) {
      return http.delete(`/faq-category/${id}?identify=${identify}`);
    }
    else {
      return http.delete(`/faq-category/${id}`);
    }
  }
  findByTitle(title) {
    return http.get(`/faq-category?title=${title}`);
  }
}
export default new CategoryDataService();