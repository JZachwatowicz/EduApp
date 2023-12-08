import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
const Courses = (props) => {
    const [kursy, setKursy] = useState([{name:"Kurs#1", disc: "Opis kursu 1" }, {name:"Kurs#2", disc: "Opis kursu 2"}, {name: "Kurs#3",disc:"Opis kursu 3"}, {name:"Kurs#4",disc: "opis kursu 4"},{name:"Kurs#5", disc: "Opis kursu 5" }, {name:"Kurs#6", disc: "Opis kursu 6"}]);
    const [currentDesc , setDesc] = useState(0)
    const handleSubmit = (event) => {
        props.history.push();
    }
    return(
        <div class="container-fluid px-0">
            <BreadcrumbsItem to='/Kursy'>Kursy</BreadcrumbsItem>
        <div class="row m-5">
        <div class="container-fluid px-0 ">
        <div class="row m-5 justify-content-center">
            <div class="m-3 bg-primary rounded-4 shadow-sm col-3 p-3 shadow-sm d-flex flex-column">
                <h3 class="resize align-self-center">Dostępne kursy</h3>
                {kursy.map( (kurs,index) => (
                    <button key={index} className="resize m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setDesc(index)}}>{kurs.name}</button>
                ))}
            </div>
            <div class="col-8 container shadow-sm border border-2 border-primary rounded-4 my-3">
                <form class="m-3 my-4 d-flex flex-column h-100">
                    <h4 className="resize m-2">{kursy[currentDesc].name}</h4>
                    <p className="m-2">{kursy[currentDesc].disc}</p>
                    <Link to={'/Kurs?Id='+currentDesc} className="m-2 my-3 p-3 btn btn-trinary shadow-sm bottom ">Zapisz się na kurs</Link>
                </form>
            </div>
        </div>
        </div>
    )
};

export default Courses;