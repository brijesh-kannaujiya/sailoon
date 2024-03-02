import http from "../normalapi/http-common";

class CategoryDataService {
  getAllCategories() {
    return http.get("/category/category.php");
  }

  getCategoryDetail(uuid) {
    return http.get(`category/category.php?uuid=${uuid}`);
  }

  deleteCategoryapi(uuid) {
    return http.delete(`category/category.php?uuid=${uuid}`);
  }
}

export default new CategoryDataService();
