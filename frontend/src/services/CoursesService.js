import axios from 'axios'

const api = "http://localhost:8080/"

class CourseService {
    courses() {
        return axios.get(api + "courses")
    }

    addCourse(course, subject_id) {
        return axios.post(api + "courses?subject_id=" + subject_id, course)
    }

    couresSorted(){
        return axios.get(api + "coursesSorted")
    }

    course(id){
         return axios.get(api + "courseById?id="+id)
    }
}

export default new CourseService()