import http from "../http-common";
class SettingDataService {
  get(faq_template_number = null) {
    if(faq_template_number){
      return http.get(`/template/${faq_template_number}`)
    }
    return http.get("/setting");
  }
  getAll() {
    return http.get(`/setting-all`)
  }
  create(data) {
    return http.post("/setting", data);
  }
  update(data) {
    return http.put(`/setting`, data);
  }
  updateActiveFeature(user_id, data) {
    return http.put(`/setting/${user_id}`, data);
  }
  findByTitle(title) {
    return http.get(`/setting?title=${title}`);
  }
}
export default new SettingDataService();