import http from "../http-common";
class FaqMorePageSettingDataService {
  
  getAll() {
    return http.get(`/faq-more-page-setting`);
  }
  get() {
    return http.get(`/all/faq-more-page-setting`);
  }
  getById(id) {
    return http.get(`/faq-more-page-setting/${id}`);
  }
  create(data) {
    return http.post("/faq-more-page-setting", data);
  }
  update(id, data) {
    return http.put(`/faq-more-page-setting/${id}`, data);
  }
  delete(id) {  
    return http.delete(`/faq-more-page-setting/${id}`);
  }
  deleteAll(data) {
    return http.delete("/faq-more-page-setting/page", data);
  }
  findByTitle(title) {
    return http.get(`/faq-more-page-setting?title=${title}`);
  }
}
export default new FaqMorePageSettingDataService();