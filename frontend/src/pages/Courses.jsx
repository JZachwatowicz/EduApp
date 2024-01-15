import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import CoursesService from "../services/CoursesService";
const Courses = (props) => {
    const [kursy, setKursy] = useState([]);
    const [currentDesc , setDesc] = useState(0)

    useEffect(() => {
    const dataFetch = async () => {

        CoursesService.courses()
            .then((response) => {
                console.log(response)
                setKursy(response.data);
            }).catch((err) => {
            console.log(err.response.data); // you can get the response like this
            console.log(err.response.status);
        })

    };

    dataFetch();
    }, []);


    const handleSubmit = (event) => {
        props.history.push();
    }
    return(
        <div class="container-fluid px-0">
            <BreadcrumbsItem to='/Kursy'>Kursy</BreadcrumbsItem>
        <div class="row m-5">
        <div class="container-fluid px-0 ">

            { kursy.length > 0 ?
                <div className="row m-5 justify-content-center">
            <div class="m-3 bg-primary rounded-4 shadow-sm col-3 p-3 shadow-sm d-flex flex-column">
                <h3 class="resize align-self-center">Dostępne kursy</h3>
                {kursy.map( (kurs,index) => (
                    <button key={index} className="resize m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setDesc(index)}}>{kurs.name}</button>
                ))}
            </div>
            <div class="col-8 container shadow-sm border border-2 border-primary rounded-4 my-3">

                    <form className="m-3 my-4 d-flex flex-column h-100">
                        <h4 className="resize m-2">{kursy[currentDesc].name}</h4>
                        <p className="m-2">{kursy[currentDesc].description}</p>
                        <Link to={'/Kurs?Id='+kursy[currentDesc].id} className={`m-2 my-3 p-3 btn btn-trinary shadow-sm bottom ${ localStorage.getItem("token")  ? '' : 'disabled' }`}>Zapisz się na kurs</Link>
                    </form>


            </div>
                </div>
            :
                <h2 >
                    Nie ma kursów do wyświetlenia
                </h2>
            }
        </div>
        </div>
        </div>
    )
};

export default Courses;