import http from "../http-common";
class MerchantDataService {
  create(data) {
    return http.post("/rating", data);
  }
  getAll() {
    return http.get("/getAll/rating");
  }
  get() {
    return http.get("/get/rating");
  }
  update(data) {
    return http.put("/update/rating", data);
  }
}
export default new MerchantDataService();