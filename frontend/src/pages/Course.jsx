import React, {useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import Faq from "react-faq-component";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Course = () => {
    const percentage = 66;
    const data = {
        title: "Lista zadań",
        rows: [{title:"Zadanie#1", content: "Opis Zadania 1" },
            {title:"Zadanie#2", content: "Opis Zadania 2"},
            {title: "Zadanie#3",content:"Opis Zadania 3"},
            {title:"Zadanie#4",content: "opis Zadania 4"},
            {title:"Zadanie#5", content: "Opis Zadania 5" },
            {title:"Quiz", content: "Opis quizu"}]
    }
    const [zadania, setZadania] = useState(
        [{title:"Zadanie#1", content: "Opis Zadania 1" },
            {title:"Zadanie#2", content: "Opis Zadania 2"},
            {title: "Zadanie#3",content:"Opis Zadania 3"},
            {title:"Zadanie#4",content: "opis Zadania 4"},
            {title:"Zadanie#5", content: "Opis Zadania 5" },
            {title:"Quiz", content: "Opis quizu"}]);

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

    const [searchParams] = useSearchParams();
    return(
        <div className="container-fluid px-0">
            <div className="row m-5 justify-content-center">
                <div className="col-4 me-3">
                    <div className="row">
                        <div className="col my-3 h-75">
                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                        </div>
                        <div className="my-3 bg-primary rounded-4 col shadow-sm p-3 shadow-sm d-flex flex-column">
                            <Link to={'/Zadanie?idKursu='+searchParams.get("Id")+'&idZadanie=0'} className="m-2 my-3 p-3 btn btn-trinary shadow-sm" >Rozpocznij kurs</Link>
                            <button className="m-2 my-3 p-3 btn btn-trinary shadow-sm disabled" >Zakończ kurs</button>
                            <button className="m-2 my-3 p-3 btn btn-trinary shadow-sm disabled" >Następne ćwiczenie</button>

                        </div>
                    </div>
                    <div className=" container shadow-sm border border-2 border-primary rounded-4 my-3 h-auto">
                        <h4>Kurs #{searchParams.get("Id")}</h4>
                        <p>Opis<br/>Opis</p>
                    </div>
                </div>
                <div className="col-7">
                    <div className=" container shadow-sm border border-2 border-primary rounded-4 my-3">
                        <Faq
                            data={data}
                            styles={styles}
                            config={config}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Course;