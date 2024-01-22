import axios from 'axios'

const api = "http://localhost:8080/"

class UserService {
    registerUser(user) {
        return axios.post(api+"register", user)
    }

    loginUser(user) {
        return axios
            .post(api+"login", user)
            .then((response) => {
                if (response.data.username) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    };

    logoutUser = () => {
        localStorage.removeItem("user");
        return axios.post(api+"logout")
            .then((response) => {
                return response.data;
            });
    };

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };

}

export default new UserService()