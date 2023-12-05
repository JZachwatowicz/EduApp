import React, {useState} from 'react';
import Login from "../components/Login";
const Home = () => {
    const [news, setNews] = useState(
        [{title:"Neeeeeeeeeeews#1", message: "NEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEWS"},
            {title: "Newsssss#2", message: "neeeeeeeeeWEWEWEEWEWEWEWS"},
            {title: "News#3", message: "This is new neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeews"}]);
    return(
        <div className="d-flex d-row py-4 m-5 px-5 justify-content-between">
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
            <div className="">
                <Login/>

            </div>
        </div>
    )
};

export default Home;