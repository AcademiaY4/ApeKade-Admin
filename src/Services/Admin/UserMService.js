import axios from "axios";
import BaseService from "../Base/BaseService";

class UserMService {
    constructor() {
        BaseService.getBaseURL()
        this.GET_ALL_USERS_URL = "user/getAllUsers"
        this.DELETE_USER_URL = "admin/delete-user"
        this.GET_USER_BY_ID_URL = "admin/get-user"
        this.UPDATE_USER_URL = "admin/update-user"
        this.ACTIVATE_USER_URL = "admin/activate-user"
        this.DEACTIVATE_USER_URL = "admin/deactivate-user"
        this.CHANGE_PWD_URL = "admin/change-password"
        this.CHANGE_PWD_WOCHK_URL = "admin/change-password-without-check"
        this.CREATE_NEW_USER_URL = "admin/create-user"
    }
    getAllUsers() {
        return axios.get(this.GET_ALL_USERS_URL, BaseService.getHeader())
    }
    deleteUser(userId) {
        return axios.delete(`${this.DELETE_USER_URL}/${userId}`, BaseService.getHeader());
    }
    getUserById(userId) {
        return axios.get(`${this.GET_USER_BY_ID_URL}/${userId}`, BaseService.getHeader());
    }
    updateUser(userId, user) {
        return axios.put(`${this.UPDATE_USER_URL}/${userId}`, user, BaseService.getHeader());
    }
    activateUser(userId) {
        return axios.get(`${this.ACTIVATE_USER_URL}/${userId}`, BaseService.getHeader());
    }
    deactivateUser(userId) {
        return axios.get(`${this.DEACTIVATE_USER_URL}/${userId}`, BaseService.getHeader());
    }
    changePassword(userId, input) {
        let data = {
            OldPassword: input.OldPassword,
            NewPassword: input.NewPassword,
        }
        return axios.put(`${this.CHANGE_PWD_URL}/${userId}`, data, BaseService.getHeader());
    }
    changePasswordWithoutCheck(userId, input) {
        let data = {
            NewPassword: input.NewPassword,
        }
        return axios.put(`${this.CHANGE_PWD_WOCHK_URL}/${userId}`, data, BaseService.getHeader());
    }
    createNewUser(user) {
        return axios.post(`${this.CREATE_NEW_USER_URL}`, user, BaseService.getHeader());
    }

}
export default UserMService = new UserMService();