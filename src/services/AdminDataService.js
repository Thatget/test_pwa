import http from "../http-common";
class AdminDataService {
  getAll() {
    return http.get(`/data/admin/`);
  }
}
export default new AdminDataService();