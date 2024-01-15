import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import CoursesService from "../services/CoursesService";
import TasksService from "../services/TasksService";
import { useNavigate } from "react-router-dom";
const Excercise = (props) => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [chosenAnswer, setAnswer] = useState("")
    const [content , setContent] = useState(0)
    const [kurs, setKurs] = useState(null);

    useEffect(() => {
        const dataFetch = async () => {

            CoursesService.course(searchParams.get("idKursu"))
                .then((response) => {
                    console.log(response)
                    setKurs(response.data[0]);
                }).catch((err) => {
                console.log(err.response.data); // you can get the response like this
                console.log(err.response.status);
                // setError(true);
                // setMessage(err.response.data);
            })

            TasksService.tasksForCourse(searchParams.get("idKursu"))
                .then((response) => {
                    console.log(response)
                    let tempData = response.data
                    let temp;
                    tempData.forEach((task) => {
                            temp = task.wrong_answers.split(";");
                            //task.wrong_answers = temp;
                            task.answers = temp;
                            task.answers.push(task.right_answer)
                            shuffle(task.answers)
                            console.log("task")
                            console.log(task)
                            if(task.done)
                                setContent(content+1)
                        }
                    )
                    setTasks(tempData)
                    console.log(tasks)

                }).catch((err) => {
                // console.log(err.response.data); // you can get the response like this
                // console.log(err.response.status);
                // setError(true);
                // setMessage(err.response.data);
            })

        };

        dataFetch();
    }, []);

    const [searchParams] = useSearchParams();
    const onchangeAnswer = (event) => {
        setAnswer(event.target.value);
        console.log(chosenAnswer);
    }
    const checkAnswer = (event) => {
        console.log(chosenAnswer);
         if(chosenAnswer === tasks[content].right_answer){
             console.log("content" + content)
             console.log("lenghth" + tasks.length)
             if(tasks.length === content+1){
                 TasksService.setDone(tasks[content].id);
                 navigate(".." + "/Kursy");
             }
             else {
                 TasksService.setDone(tasks[content].id)
                 tasks[content].done = true;
                 // while(tasks.length > content + 1 && tasks[content].done)
                 setContent(content+1)
             }
         }
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    return(
        <div class="container-fluid px-0 ">
            {kurs !== null && kurs !== undefined  && tasks.length > 0 ?
            <div class="row m-5 justify-content-center">
                <BreadcrumbsItem to='/Kursy'>Kursy</BreadcrumbsItem>
                <BreadcrumbsItem to={"/Kurs?Id="+searchParams.get("idKursu")}>{kurs.name}</BreadcrumbsItem>
                <BreadcrumbsItem to={"/Zadanie?idKursu="+searchParams.get("idZadanie")+"&idZadanie="+searchParams.get("idZadanie")}>Zadania</BreadcrumbsItem>
                <div className="col-2">
                    <h2>{kurs.name}</h2>
                    Postęp
                    <ProgressBar now={60} variant="success"/>
                    <div className="my-3 bg-primary rounded-4 shadow-sm p-3 shadow-sm d-flex flex-column">

                        <h3 className="align-self-center">Lista Zadań</h3>
                        {tasks.length > 0 && tasks.map( (zadanie,index) => (
                             zadanie.done === false ?
                                    <button key={index} className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setContent(index)}}>{zadanie.title}</button>
                            :
                                    <button key={index} disabled={true} className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={() => {setContent(index)}}>{zadanie.title}</button>


                        ))}
                    </div>
                </div>

                <div class="col-9 container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <div class="m-3 my-4 d-flex flex-column h-100">
                        <h4 className="m-2">{tasks[content].title}</h4>
                        <p className="m-2">{tasks[content].content}</p>
                        <p>Pytanie:<br/>{tasks[content].question}</p>
                            { tasks.length > 0 && tasks[content].answers.length > 0 ? tasks[content].answers.map( (answer, index) => (

                                <div><input onChange={() => {setAnswer(answer)}} type="radio" value={answer} name="Answers" /> {answer}<br/></div>

                                )):
                                <div>Cos poszlo nir tak</div>
                            }
                        <button className="m-2 my-3 p-2 btn btn-trinary shadow-sm" onClick={checkAnswer}>Sprawdź</button>
                    </div>
                </div>
            </div>
                :
                <span>Coś poszło nie tak</span>
            }
        </div>
    )
};

export default Excercise;