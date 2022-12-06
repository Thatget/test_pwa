import http from "../http-common";
class UploadFilesService {
    upload(files, template_number) {
        const formData = new FormData();
        formData.append('profile_pic', files[0]);
        formData.append('template_number', template_number);
        return http.post("/upload-profile-pic", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    }
}
export default new UploadFilesService();