import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import AuthService from "../services/AuthService";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import TasksService from "../services/TasksService";
const EditTask = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [question, setQuestion] = useState('');
    const [right_answer, setRightAnswer] = useState("");
    const [wrong_answers, setWrongAnswers] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setMessage] = useState("");
    const navigate = useNavigate();


    const [searchParams] = useSearchParams();
    const task_id = searchParams.get("taskId")
    const course_id = searchParams.get("courseId")

    useEffect(() => {
        const fetchData = async () => {
            TasksService.getTask(task_id)
                .then((response) => {
                    console.log("Get task");
                    console.log(response);
                    var t = response.data;
                    setTitle(t.title);
                    setContent(t.content);
                    setQuestion(t.question);
                    setRightAnswer(t.right_answer);
                    setWrongAnswers(t.wrong_answers);
                }).catch(error => {
                console.log("Błąd -----------------------")
                    console.log(error)
            })
        }

        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {id: task_id, title: title, content: content, question: question, right_answer: right_answer, wrong_answers: wrong_answers, done: false, course_id: course_id}
        console.log("Edycja zadania");
        console.log(task);
        TasksService.editTask(task, course_id)
            .then((response) => {
                console.log(response.data)
                if(response.status === 200){
                    navigate("/Kurs?Id=" + course_id);
                }
            }).catch((err) => {
            console.log(err.response.data); // you can get the response like this
            setError(true);
            setMessage(err.response.data); // status code of the request

        })
    }

    const handleTitle = (e) => {
        const { title, value } = e.target;
        setTitle(value);
    }

    const handleContent = (e) => {
        const { content, value } = e.target;
        setContent(value);
    }

    const handleQuestion = (e) => {
        const { question, value } = e.target;
        setQuestion(value);
    }

    const handleRightAnswer = (e) => {
        const { right_answer, value } = e.target;
        setRightAnswer(value);
    }

    const handleWrongAnswers = (e) => {
        const { wrong_answers, value } = e.target;
        setWrongAnswers(value);
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
            <BreadcrumbsItem to='/Kursy'>Dodaj zadanie</BreadcrumbsItem>
            <div class="d-flex flex-column align-items-center ">
                <h2>Dodaj zadanie</h2>
                <div class="container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <form onSubmit={handleSubmit} class="m-3 my-4 d-flex flex-column">
                        <div class="container row">
                            {showAlert}

                            <label class="col align-self-center" htmlFor="title">Tytuł zadania</label>
                            <input className=" bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="title" type="text" placeholder="Tytuł zadania" onChange={handleTitle} value={title}/>
                            <div class="w-100 "></div>
                            <label class="col align-self-center" htmlFor="description">Zawartość</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="content" type="text" placeholder="Zawartość" onChange={handleContent} value={content}/>
                            <div className="w-100"></div>
                            <label className="col align-self-center" htmlFor="question">Pytanie</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="question" type="text" placeholder="Pytanie" onChange={handleQuestion} value={question}/>
                            <div className="w-100"></div>
                            <label className="col align-self-center" htmlFor="right_answer">Prawidłowa odpowiedź</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="right_answer" type="text" placeholder="Prawidłowa odpowiedź" onChange={handleRightAnswer} value={right_answer}/>
                            <div className="w-100"></div>
                            <label className="col align-self-center" htmlFor="wrong_answers">Nieprawidłowe odpowiedzi</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="wrong_answers" type="text" placeholder="Nieprawidłowe odpowiedzi" onChange={handleWrongAnswers} value={wrong_answers}/>
                            <div className="w-100"></div>
                            <label class="col align-self-center" htmlFor="subject">Przedmiot</label>
                        </div>
                        <button className="m-1 p-2 btn btn-trinary shadow-sm justify-self-end" type="submit">Zapisz kurs</button>
                    </form>
                </div>

            </div>
        </div>
    )
};


export default EditTask;