import http from "../http-common";
class FaqMorePageDataService {
  
  getAll() {
    return http.get(`/faq-more-page`);
  }
  getByPage(page){
    return http.get(`/faq-more-page/page/${page}`);
  }
  getById(id) {
    return http.get(`/faq-more-page/${id}`);
  }
  create(data) {
    return http.post("/faq-more-page", data);
  }
  update(id, data) {
    return http.put(`/faq-more-page/${id}`, data);
  }
  updateFaq(data) {
    return http.put(`/faq-more-page-update`, data);
  }
  updateFaqCategory(data) {
    return http.put(`/faq-more-page-update/category`, data);
  }
  delete(id) {  
    return http.delete(`/faq-more-page/${id}`);
  }
  deleteAll(data) {
    return http.delete("/faq-more-page/page", data);
  }
  findByTitle(title) {
    return http.get(`/faq-more-page?title=${title}`);
  }
}
export default new FaqMorePageDataService();