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

    editCourse(course, subject_id) {
        return axios.put(api + "courses?subject_id=" + subject_id, course)
    }

    deleteCourse(id) {
        axios.delete(api + "courses?id=" + id)
        window.location.replace("http://localhost:3000/Kursy")
    }
}

export default new CourseService()