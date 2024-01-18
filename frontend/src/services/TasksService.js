import axios from 'axios'

const api = "http://localhost:8080/"

class TaskService {
    tasksForCourse(id) {
        let token = localStorage.getItem("token")
        return axios.get(api + "tasksByCourse?id="+id,  { headers: {"Authorization" : `Bearer ${token}`} })
    }

    setDone(id){
        //let token = localStorage.getItem("token")
        //return axios.get(api+"setDone?id="+id,  { headers: {"Authorization" : `Bearer ${token}`}})
    }

}

export default new TaskService()