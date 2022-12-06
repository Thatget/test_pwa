import http from "../http-common";
class TemplateSettingDataService {
  create(data){
    return http.post(`/template_setting`, data);
  }
  get(setting_id) {
    return http.get(`/template_setting/${setting_id}`);
  }
  getAll(){
    return http.get(`/template_setting-all`);
  }
  update(id, data){
    return http.put(`update/template_setting/${id}`, data)
  }
}
export default new TemplateSettingDataService();