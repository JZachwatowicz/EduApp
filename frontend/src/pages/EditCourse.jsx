import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import AuthService from "../services/AuthService";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import Courses from "./Courses";
import CoursesService from "../services/CoursesService";
import SubjectService from "../services/SubjectService";
const EditCourse = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("1");
    const [subjectList, setSubjectList] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setMessage] = useState("");
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const course_id = searchParams.get("courseId")

    useEffect(() => {
        const fetchData = async () => {
            CoursesService.course(course_id)
                .then((response) => {
                    console.log("Get Course");
                    console.log(response.data[0]);
                    setName(response.data[0].name);
                    console.log("Name ---------");
                    console.log(name);
                    setDescription(response.data[0].description);
                    setSubject(response.data[0].subjectName);
                })

            SubjectService.subjects()
                .then((response) => {
                    console.log("Get subjects");
                    console.log(response);
                    setSubjectList(response.data);
                }).catch((err) => {
                    console.log(err); // you can get the response like this
                    //console.log(err.response.status);
            })

        };

        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const course = {id: course_id, name: name, description: description}
            console.log("Edycja kursu");
            console.log(course);
            console.log(subject);
            CoursesService.editCourse(course, subject)
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        console.log(response.data)
                        navigate("/Kurs?Id="+response.data)
                    }
                }).catch((err) => {
                    console.log(err.response.data); // you can get the response like this
                    setError(true);
                    setMessage(err.response.data); // status code of the request

            })
    }

    const handleName = (e) => {
        const { name, value } = e.target;
        setName(value);
    }

    const handleDescription = (e) => {
        const { description, value } = e.target;
        setDescription(value);
    }

    const handleSubject = (e) => {
        const value = e.target.value;
        setSubject(value);
    }

    let showAlert;
    if (error) {
        showAlert = <div className="alert alert-danger" role="alert">
            {errorMessage}
        </div>;
    } else {
        showAlert = <div></div>;
    }

    return(
        <div class="d-flex d-row m-5 px-5 justify-content-between">
            <BreadcrumbsItem to='/Kursy'>Dodaj kurs</BreadcrumbsItem>
            <div class="d-flex flex-column align-items-center ">
                <h2>Edytuj kurs</h2>
                <div class="container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <form onSubmit={handleSubmit} class="m-3 my-4 d-flex flex-column">
                        <div class="container row">
                            {showAlert}

                            <label class="col align-self-center" htmlFor="name">Nazwa kursu</label>
                            <input className=" bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="name" type="text" placeholder="Nazwa kursu" onChange={handleName} value={name}/>
                            <div class="w-100 "></div>
                            <label class="col align-self-center" htmlFor="description">Opis kursu</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="description" type="text" placeholder="Opis kursu" onChange={handleDescription} value={description}/>
                            <div className="w-100"></div>
                            <label class="col align-self-center" htmlFor="subject">Przedmiot</label>
                            <select className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="subject" onChange={e => setSubject(e.target.value)} value={subject}>
                                {subjectList.map((sub, index) => (
                                    <option key={index} value={sub.id}> {sub.name} </option>
                                ))}
                            </select>
                        </div>
                        <button className="m-1 p-2 btn btn-trinary shadow-sm justify-self-end" type="submit">Zapisz kurs</button>
                    </form>
                </div>

            </div>
        </div>
    )
};


export default EditCourse;