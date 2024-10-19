import axios from "axios";
import BaseService from "../Base/BaseService";

class CategoryService {
  constructor() {
    BaseService.getBaseURL()
    this.CREATE_PRODUCT_URL = "product/create"
    this.UPDATE_PRODUCT_URL = "product/update"
    this.GET_ALL_PRODUCTS_URL = "product/get"
    this.DELETE_PRODUCT_URL = "product/delete"
    this.GET_PRODUCT_BY_ID_URL = "product/get"
  }
  createProduct(product) {
    return axios.post(`${this.CREATE_PRODUCT_URL}`, product, BaseService.getHeader());
  }
  updateProduct(id, product) {
    return axios.put(`${this.UPDATE_PRODUCT_URL}/${id}`, product, BaseService.getHeader());
  }
  getAllProducts() {
    return axios.get(this.GET_ALL_PRODUCTS_URL, BaseService.getHeader());
  }
  deleteProduct(id) {
    return axios.delete(`${this.DELETE_PRODUCT_URL}/${id}`, BaseService.getHeader());
  }
  getProductById(id) {
    return axios.get(`${this.GET_PRODUCT_BY_ID_URL}/${id}`, BaseService.getHeader());
  }
}
export default CategoryService = new CategoryService();