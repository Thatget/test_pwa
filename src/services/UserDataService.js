import http from "../http-common";
class UserDataService {
  
  get() {
    return http.get(`/user`);
  }
  getAll() {
    return http.get(`/all-user`);
  }
  getAllDataUser(locale) {
    return http.get(`/data-user?locale=${locale}`);
  }
  create(data) {
    return http.post("/user", data);
  }
  update(id, data) {
    return http.put(`/user/${id}`, data);
  }
  delete(id) {
    return http.delete(`/user/${id}`);
  }
  deleteAll() {
    return http.delete(`/user`);
  }
  findByTitle(title) {
    return http.get(`/user?title=${title}`);
  }
}
export default new UserDataService();