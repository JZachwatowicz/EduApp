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

    logout() {
        let token = localStorage.getItem("token")
        localStorage.removeItem("token")
        window.location.reload()
    }

    deleteUser(){
        let token = localStorage.getItem("token")
        localStorage.removeItem("token")
        axios.delete(api+"user", { headers: {"Authorization" : `Bearer ${token}`} })
        window.location.reload()
    }

}

export default new AuthService()