import http from "../http-common";
class FaqDataService {
  
  getAllFaq(){
    return http.get('/faq/all');
  }

  getAll(locale) {
    return http.get(`/faq?locale=${locale}`);
  }

  get(id) {
    return http.get(`/faq/${id}`);
  }

  getByIdentify(identify, category_identify, locale = null){
    if(locale){
      return http.get(`/faq_by_identify/?identify=${identify}&category_identify=${category_identify}&locale=${locale}`)
    }
    else{
      return http.get(`/faq_by_identify/?identify=${identify}&category_identify=${category_identify}`)
    }
  }

  create(data) {
    return http.post("/faq", data);
  }

  update(id, data) {
    return http.put(`/faq/${id}`, data);
  }

  updateWhenDeleteCategory(data) {
    return http.put('/faq-update', data);
  }
  
  updateRearrangeFaqs(data) {
    return http.put('/faq/update/rearrange', data);
  }

  delete(id, identify = null, category_identify) {
    if(identify && category_identify) {
      return http.delete(`/faq/${id}?identify=${identify}&category_identify=${category_identify}`);
    }
    else {
      return http.delete(`/faq/${id}`);
    }
  }

  deleteAll() {
    return http.delete('/faq');
  }
  // findByTitle(title) {
  //   return http.get(`/faq?title=${title}`);
  // }
  
  // Import Faqs
  importFaqs(files) {
    const formData = new FormData();
    formData.append('faq-list', files[0]);
    return http.post("/import-faq", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }

  exportFaqs(locale = null) {
    if (locale) {
      return http.get(`/export-faq?locale=${locale}`);
    }else {
      return http.get(`/export-faq`);
    }
  }

  downLoadSampleFile() {
    return http.get(`/down-csv-file`);
  }

}
export default new FaqDataService();