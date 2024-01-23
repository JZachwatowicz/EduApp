import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import {Link} from "react-router-dom";
import CoursesService from "../services/CoursesService";
const Home = () => {
    const [news, setNews] = useState(
        [{title:"Lorem ipsum",
            message: "Ut bibendum, metus in semper sagittis, nulla dolor efficitur dui, ut congue dui lacus a ligula. Donec aliquet bibendum iaculis. Duis elementum, ex eu mollis feugiat, sem quam porttitor augue, sit amet vestibulum dolor eros condimentum enim. Sed consequat nec leo ut finibus. Suspendisse tincidunt placerat ligula. Curabitur placerat augue non sapien pretium lacinia. Phasellus ultricies, turpis sed semper sagittis, augue mi blandit massa, eu rhoncus metus tortor suscipit sapien. Pellentesque euismod, mauris non molestie semper, est lorem placerat lacus, ornare aliquam elit eros in mi. Proin tellus sapien, iaculis sed consequat et, tristique sit amet enim. Sed tempor tristique volutpat. Suspendisse potenti. Cras vehicula, mi eu fermentum cursus, metus purus ornare nulla, sed ullamcorper orci enim id odio. Integer commodo felis augue, id faucibus odio feugiat non. Quisque interdum pellentesque dui, vitae vulputate metus tincidunt non. Proin placerat facilisis porttitor. "},
            {title: "Donec consequat",
                message: "Proin interdum erat quis cursus mattis. Suspendisse rutrum mattis turpis vitae bibendum. Cras convallis metus id libero aliquam interdum. Vivamus interdum eleifend mi, in rutrum odio. Praesent condimentum, ante ac dignissim auctor, ipsum quam efficitur turpis, at pellentesque dui lorem et leo. Vestibulum in massa sit amet mi imperdiet ornare eget et sem. Donec consequat augue sem, vel bibendum augue m"},
            {title: "Purus metus in semper",
                message: "Nam fermentum imperdiet purus, id vehicula nibh. In elementum id turpis sit amet pellentesque. Donec aliquet, eros et iaculis mollis, sapien mi placerat enim, gravida molestie lacus erat non ligula. Pellentesque ut augue eros. Fusce eget enim urna. Donec suscipit faucibus dolor, eget bibendum dui. Praesent id eleifend erat, sed dignissim risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent efficitur eros ac est convallis, in pellentesque tellus finibus. Fusce et sodales tellus. Etiam dapibus consectetur lobortis. "}]);
    const [kursy, setKursy] = useState([]);

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {

            CoursesService.couresSorted()
                .then((response) => {
                    console.log(response.data)
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
                <Link to={'/Kurs?Id='+kurs.id} key={index} className={`resize m-2 my-3 p-2 btn btn-trinary shadow-sm w-100 ${ localStorage.getItem("token")  ? '' : 'disabled' }`} >{kurs.name}</Link>
            ))}
            </div>
        </div>
        </div>
    )
};

export default Home;