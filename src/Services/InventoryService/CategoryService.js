import axios from "axios";
import BaseService from "../Base/BaseService";

class CategoryService {
  constructor() {
    BaseService.getBaseURL()
    this.CREATE_CATEGORY_URL = "category/create"
    this.UPDATE_CATEGORY_URL = "category/update"
    this.GET_ALL_CATEGORIES_URL = "category/get"
    this.DELETE_CATEGORY_URL = "category/delete"
    this.GET_CATEGORY_BY_ID_URL = "category/get"
  }
  createCategory(category) {
    return axios.post(`${this.CREATE_CATEGORY_URL}`, category, BaseService.getHeader());
  }
  updateCategory(id, category) {
    return axios.put(`${this.UPDATE_CATEGORY_URL}/${id}`, category, BaseService.getHeader());
  }
  getAllCategories() {
    return axios.get(this.GET_ALL_CATEGORIES_URL, BaseService.getHeader());
  }
  deleteCategory(id) {
    return axios.delete(`${this.DELETE_CATEGORY_URL}/${id}`, BaseService.getHeader());
  }
  getCategoryById(id) {
    return axios.get(`${this.GET_CATEGORY_BY_ID_URL}/${id}`, BaseService.getHeader());
  }
}
export default CategoryService = new CategoryService();