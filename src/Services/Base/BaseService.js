import axios from "axios";
import LocalStore from "../../Store/LocalStore";

class BaseService{
    constructor() {
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    }
    getHeader() {
        return { headers: { Authorization: `Bearer ${LocalStore.getAuth().access_token}` } }
    }
    getBaseURL() {
        return this.baseURL;
    }
}
export default BaseService = new BaseService()