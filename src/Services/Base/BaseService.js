import axios from "axios";
import LocalStore from "../../Store/LocalStore";

class BaseService{
    constructor() {
        axios.defaults.baseURL = "http://localhost:5259/api/"
    }
    getHeader() {
        return { headers: { Authorization: `Bearer ${LocalStore.getAuth().access_token}` } }
    }
    getBaseURL() {
        return this.baseURL;
    }
}
export default BaseService = new BaseService()