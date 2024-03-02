import http from "../normalapi/http-common";

class WinnerAllDataService {
  adminLogin(data) {
    const res = http.post(process.env.REACT_APP_ADMIN_LOGIN, data);
    return res;
  }
  addCampaignData(data) {
    // const formData = new FormData(data);
    // const formJson = Object.fromEntries(formData.entries());
    //alert(JSON.stringify(data))
    const res = http.post(process.env.REACT_APP_ADD_CAMPAIGN, data);
    return res;
  }

  getAll() {
    return http.get("/campaignapi/CampaignList.php");
  }

  getCampaignapiDetail(id) {
    return http.get(`campaignapi/CampaignDetails.php?deal_id=${id}`);
  }

  deactiveCampaignapi(id) {
    return http.get(`campaignapi/deleteCampaign.php?deal_id=${id}`);
  }

  getAllUser() {
    return http.get("userlist/userlist.php");
  }
  

  // create(data) {
  //   return http.post("/tutorials", data);
  // }

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new WinnerAllDataService();
