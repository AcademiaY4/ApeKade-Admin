import axios from "axios";
import BaseService from "../Base/BaseService";

class MyProfileService {
    constructor() {
        BaseService.getBaseURL()
        this.GET_USER_BY_ID_URL = "admin/get-user"
        this.UPDATE_USER_URL = "admin/update-user"
        this.UPDATE_MY_PROFILE_URL = "admin/update-user"
        this.ACTIVATE_USER_URL = "admin/activate-user"
        this.DEACTIVATE_USER_URL = "admin/deactivate-user"
        this.CHANGE_PWD_WOCHK_URL = "admin/change-password-without-check"
    }


    getUserById(userId) {
        return axios.get(`${this.GET_USER_BY_ID_URL}/${userId}`, BaseService.getHeader());
    }
    activateUser(userId) {
        return axios.get(`${this.ACTIVATE_USER_URL}/${userId}`, BaseService.getHeader());
    }
    deactivateUser(userId) {
        return axios.get(`${this.DEACTIVATE_USER_URL}/${userId}`, BaseService.getHeader());
    }
    changePasswordWithoutCheck(userId, input) {
        let data = {
            NewPassword: input.NewPassword,
        }
        return axios.put(`${this.CHANGE_PWD_WOCHK_URL}/${userId}`, data, BaseService.getHeader());
    }
    updateMyProfile(userId, user) {
        return axios.put(`${this.UPDATE_USER_URL}/${userId}`, user, BaseService.getHeader());
    }

}
export default MyProfileService = new MyProfileService();