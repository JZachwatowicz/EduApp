import React, {useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
const Excercise = (props) => {
    const [zadania, setZadania] = useState(
        [{title:"Zadanie#1", content: "Opis Zadania 1" },
            {title:"Zadanie#2", content: "Opis Zadania 2"},
            {title: "Zadanie#3",content:"Opis Zadania 3"},
            {title:"Zadanie#4",content: "opis Zadania 4"},
            {title:"Zadanie#5", content: "Opis Zadania 5" },
            {title:"Quiz", content: "Opis quizu"}]);
    const [content , setContent] = useState(0)

    const [searchParams] = useSearchParams();
    const handleSubmit = (event) => {
        props.history.push();
    }
    return(
        <div class="container-fluid px-0 ">
            <div class="row m-5 justify-content-center">

                <div className="col-2">
                    <h2>Moduł #{searchParams.get("idKursu")}</h2>
                    Postęp
                    <ProgressBar now={60} variant="success"/>
                    <div className="my-3 bg-primary rounded-4 shadow-sm p-3 shadow-sm d-flex flex-column">

                        <h3 className="align-self-center">Lista Zadań</h3>
                        {zadania.map( (zadanie,index) => (
                            <button key={index} className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setContent(index)}}>{zadanie.title}</button>
                        ))}
                    </div>
                </div>

                <div class="col-9 container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <form class="m-3 my-4 d-flex flex-column h-100">
                        <h4 className="m-2">{zadania[content].title}</h4>
                        <p className="m-2">{zadania[content].content}</p>
                        <p>Pytanie:</p>
                        <div>
                            <input type="radio" value="Odpowiedź#1" name="answer" /> Odpowiedź#1<br/>
                            <input type="radio" value="Odpowiedź#2" name="answer" /> Odpowiedź#2<br/>
                            <input type="radio" value="Odpowiedź#3" name="answer" /> Odpowiedź#3<br/>
                        </div>
                        <button className="m-2 my-3 p-2 btn btn-trinary shadow-sm">Sprawdź</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Excercise;