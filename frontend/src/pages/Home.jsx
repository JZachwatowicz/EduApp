import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import {Link} from "react-router-dom";
import CoursesService from "../services/CoursesService";
const Home = () => {
    const [news, setNews] = useState(
        [{title:"Neeeeeeeeeeews#1", message: "NEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEWS"},
            {title: "Newsssss#2", message: "neeeeeeeeeWEWEWEEWEWEWEWS"},
            {title: "News#3", message: "This is new neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeews"}]);
    const [kursy, setKursy] = useState([]);

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {

            CoursesService.couresSorted()
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

    return(
        <div className="d-flex d-row py-4 m-5 px-5 justify-content-between">
            <div className="col-9">
                <h2 className="resize">Ogłoszenia</h2>
            <div class=" container shadow-sm border border-2 border-primary rounded-4 my-3">
                {news.map((n,index)=>(
                    <div className="m-2 my-3">
                        <h4>{n.title}</h4>
                        <p>&emsp;{n.message}</p>
                        <hr/>
                    </div>
                    ))}
                {news.map((n,index)=>(
                    <div className="m-2 my-3">
                        <h4>{n.title}</h4>
                        <p>&emsp;{n.message}</p>
                        <hr/>
                    </div>
                ))}
            </div>
            </div>
            <div className="col-3">
                { localStorage.getItem("token") === null &&
                    <Login/>
                }
                <div className="m-5 bg-primary rounded-4 d-flex shadow-sm d-flex p-3 shadow-sm flex-column align-items-center">
                    <h4 className="resize">Popularne kursy</h4>
            {kursy.map( (kurs,index) => (
                <Link to={'/Kurs?Id='+index} key={index} className={`resize m-2 my-3 p-2 btn btn-trinary shadow-sm w-100 ${ localStorage.getItem("token")  ? '' : 'disabled' }`} >{kurs.name}</Link>
            ))}
            </div>
        </div>
        </div>
    )
};

export default Home;