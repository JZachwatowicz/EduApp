import axios from 'axios'

const api = "http://localhost:8080/register"

class SignUpService {
    registerUser(user) {
        return axios.post(api, user)
    }
}

export default new SignUpService()