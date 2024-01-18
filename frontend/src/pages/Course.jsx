import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import Faq from "react-faq-component";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import CoursesService from "../services/CoursesService";
import TasksService from "../services/TasksService";
const Course = () => {
    const percentage = 66;
    const [tasks, setTasks] = useState([]);
    const data = {
        title: "Lista zadań",
        rows: tasks
    }
    const [kurs, setKurs] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setMessage] = useState("");

    const styles = {

        titleTextColor: "black",
        rowTitleColor: "orange",
        // arrowColor: "red",
    };
    const config = {
        animate: true,
        openOnload: 0,
        expandIcon: "v",
        collapseIcon: "v",
    };

    useEffect(() => {
        const dataFetch = async () => {

            CoursesService.course(searchParams.get("Id"))
                .then((response) => {
                    console.log(response)
                    setKurs(response.data[0]);
                }).catch((err) => {
                 console.log(err.response.data); // you can get the response like this
                 console.log(err.response.status);
                 setError(true);
                 setMessage(err.response.data);
            })

            TasksService.tasksForCourse(searchParams.get("Id"))
                .then((response) => {
                    console.log(response)
                    let temp = [];
                    response.data.forEach(
                        (task) => temp.push({title: task.title, content: task.question})
                    )
                    setTasks(temp)
                    if(temp.length === 0){
                        setError(true);
                        setMessage("Nie ma zadań do wyświetlenia");
                    }
                }).catch((err) => {
                // console.log(err.response.data); // you can get the response like this
                // console.log(err.response.status);
                // setError(true);
                // setMessage(err.response.data);
            })

        };

        dataFetch();
    }, []);
    let showAlert;
    if (error) {
        showAlert = <div className="alert alert-danger" role="alert">
            {errorMessage}
        </div>;
    } else {
        showAlert = <div></div>;
    }


    const [searchParams] = useSearchParams();
    return(
        <div className="container-fluid px-0">
            {kurs !== null && kurs !== undefined ?
                <div className="row m-5 justify-content-center">
                <div className="col-4 me-3">
                    <div className="row">
                        <BreadcrumbsItem to='/Kursy'>Kursy</BreadcrumbsItem>
                        <BreadcrumbsItem to={"/Kurs?Id="+searchParams.get("Id")}>{kurs.name}</BreadcrumbsItem>
                        <div className="col my-3 h-75">
                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                        </div>
                        <div className="my-3 bg-primary rounded-4 col shadow-sm p-3 shadow-sm d-flex flex-column">
                            <Link to={'/Zadanie?idKursu='+searchParams.get("Id")+'&idZadanie=0'} className={`m-2 my-3 p-3 btn btn-trinary shadow-sm ${tasks.length === 0 ? 'disabled': ''}`} >Rozpocznij kurs</Link>
                            <button className="m-2 my-3 p-3 btn btn-trinary shadow-sm disabled" >Zakończ kurs</button>
                            <button className="m-2 my-3 p-3 btn btn-trinary shadow-sm disabled" >Następne ćwiczenie</button>

                        </div>
                    </div>
                    <div className=" container shadow-sm border border-2 border-primary rounded-4 my-3 h-auto">
                        <h4>{kurs.name}</h4>
                        <p>{kurs.description}</p>
                    </div>
                </div>
                <div className="col-7">
                    <div className=" container shadow-sm border border-2 border-primary rounded-4 my-3">
                        { tasks.length > 0 ?
                            <Faq
                            data={data}
                            styles={styles}
                            config={config}
                        />
                        :
                            <>
                                {showAlert}
                            </>

                        }

                    </div>
                </div>

            </div>
            :
            <h2 className="row m-5 justify-content-center">{errorMessage}</h2>
            }
        </div>
    )
};

export default Course;