import axios from "axios";
import BaseService from "../Base/BaseService";

class UserMService {
  constructor() {
    BaseService.getBaseURL()
    this.GET_ALL_STOCKS_URL = "user/getAllStocks"
    this.DELETE_STOCK_URL = "admin/deleteStock"
    this.GET_STOCK_BY_ID_URL = "admin/getStock"
  }
  getAllStocks() {
    return axios.get(this.GET_ALL_STOCKS_URL, BaseService.getHeader())
  }
  deleteStock(id) {
    return axios.delete(`${this.DELETE_STOCK_URL}/${id}`, BaseService.getHeader());
  }
  getStockById(id) {
    return axios.get(`${this.GET_STOCK_BY_ID_URL}/${id}`, BaseService.getHeader());
  }
}
export default UserMService = new UserMService();