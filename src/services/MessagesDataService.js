import http from "../http-common";
class MessagesDataService {
  create(data) {
    return http.post('/messages', data);
  }
  findAll() {
    return http.get('/messages');
  }
  delete(id) {
    return http.delete(`/messages/${id}`);
  }
  deleteAll() {
    return http.delete('/all-messages');
  }
}
export default new MessagesDataService();