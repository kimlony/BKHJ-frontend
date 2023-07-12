import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register( username, email, password, usersId, nickname, zoneCode, address,
    detailaddress, legalDong, phonenumber, residentnumber, age, gender
      ) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      usersId,
      nickname,
      zoneCode,
      address,
      detailaddress,
      legalDong,
      phonenumber,
      residentnumber,
      age,
      gender   
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  deleteMember() {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    };

    return axios.delete(API_URL + `delete/${user.id}`, config);
  }

  updateProfile(username, email, password, usersId, nickname, zoneCode,
    address, detailaddress, legalDong, phonenumber) {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    };

    return axios.put(API_URL + `update/${user.id}`, {
      username,
      email,
      password,
      usersId,
      nickname,
      zoneCode,
      address,
      detailaddress,
      legalDong,
      phonenumber
    }, config);
  }
  

}

export default new AuthService();
