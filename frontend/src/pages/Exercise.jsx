import React, {useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
const Excercise = (props) => {
    const [zadania, setZadania] = useState(
        [{title:"Zadanie#1", content: "Opis Zadania 1" },
            {title:"Zadanie#2", content: "Opis Zadania 2"},
            {title: "Zadanie#3",content:"Opis Zadania 3"},
            {title:"Zadanie#4",content: "opis Zadania 4"},
            {title:"Zadanie#5", content: "Opis Zadania 5" },
            {title:"Quiz", content: "Opis quizu"}]);
    const [chosenAnswer, setAnswer] = useState("")
    const [content , setContent] = useState(0)

    const [searchParams] = useSearchParams();
    const onchangeAnswer = (event) => {
        setAnswer(event.target.value);
        console.log(chosenAnswer);
    }
    const checkAnswer = (event) => {
        console.log(chosenAnswer);
         if(chosenAnswer == zadania[content].answer){

             setContent(content+1)
         }
    }
    return(
        <div class="container-fluid px-0 ">
            <div class="row m-5 justify-content-center">
                <BreadcrumbsItem to='/Kursy'>Kursy</BreadcrumbsItem>
                <BreadcrumbsItem to={"/Kurs?Id="+searchParams.get("idKursu")}>Kurs#{searchParams.get("idKursu")}</BreadcrumbsItem>
                <BreadcrumbsItem to={"/Zadanie?idKursu="+searchParams.get("idZadanie")+"&idZadanie="+searchParams.get("idZadanie")}>Zadania</BreadcrumbsItem>
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
                    <div class="m-3 my-4 d-flex flex-column h-100">
                        <h4 className="m-2">{zadania[content].title}</h4>
                        <p className="m-2">{zadania[content].content}</p>
                        <p>Pytanie:</p>
                        <div >
                            <input onChange={() => {setAnswer("1")}} type="radio" value="Odpowiedź#1" name="answer" /> Poprawna odpowiedź<br/>
                            <input onChange={() => {setAnswer("2")}} type="radio" value="Odpowiedź#2" name="answer" /> Niepoprawna odpowiedź<br/>
                            <input onChange={() => {setAnswer("3")}} type="radio" value="Odpowiedź#3" name="answer" /> Niepoprawna odpowiedź<br/>
                        </div>
                        <button className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={checkAnswer}>Sprawdź</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Excercise;