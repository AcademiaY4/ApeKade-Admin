import axios from "axios";
import BaseService from "../Base/BaseService";

class StockService {
  constructor() {
    BaseService.getBaseURL()
    this.CREATE_STOCK_URL = "stock/create-stock"
    this.UPDATE_STOCK_URL = "stock/update-stock"
    this.GET_ALL_STOCKS_URL = "stock/get-all-stocks"
    this.DELETE_STOCK_URL = "stock/delete-stock"
    this.GET_STOCK_BY_ID_URL = "stock/get-stock"
  }
  createStrock(stock) {
    return axios.post(`${this.CREATE_STOCK_URL}`, stock, BaseService.getHeader());
  }
  updateStrock(id, stock) {
    return axios.put(`${this.UPDATE_STOCK_URL}/${id}`, stock, BaseService.getHeader());
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
export default StockService = new StockService();