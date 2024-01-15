import axios from 'axios'

const api = "http://localhost:8080/"

class AuthService {
    registerUser(user) {
        return axios.post(api + "register", user)
    }

    loginUser(user){
        return axios.post(api + "login", user)
    }

    profile(){
        let token = localStorage.getItem("token")
        return axios.get(api+"user", { headers: {"Authorization" : `Bearer ${token}`} })
    }
}

export default new AuthService()