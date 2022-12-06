import http from "../http-common";
class MessagesSettingDataService {
  create(data) {
    return http.post('/messages-setting', data);
  }
  findOne() {
    return http.get('/messages-setting');
  }
  update(data) {
    return http.put(`/messages-setting/`, data);
  }
}
export default new MessagesSettingDataService();