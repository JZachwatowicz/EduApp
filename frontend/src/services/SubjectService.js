import axios from 'axios'

const api = "http://localhost:8080/"

class SubjectService {
    subjects() {
        return axios.get(api + "subjects")
    }
}

export default new SubjectService()