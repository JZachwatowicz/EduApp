import React, {useEffect, useState} from 'react';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import CoursesService from "../services/CoursesService";
import AuthService from "../services/AuthService";
import Faq from "react-faq-component";
import {Link} from "react-router-dom";
const Profile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const dataFetch = async () => {

            AuthService.profile()
                .then((response) => {
                    console.log(response)
                    setUser(response.data);
                })
        };

        dataFetch();
    }, []);
    return(
        <>
            <BreadcrumbsItem to='/Profil'>Profil</BreadcrumbsItem>
            <div className="container-fluid px-0">
                <div className="row mx-5 ">
                    <span className="col-11 d-flex justify-content-center"><h2>Profil</h2></span>
                </div>
                <div className="row mx-5">
                    <Link class="m-1 mx-3 text-trinary" to="/DodajKurs">Dodaj kurs</Link>
                    <div className="col-11 ">
                        <div className=" container p-3 shadow-sm border border-2 border-primary rounded-4 my-3 d-flex flex-column align-items-center">
                            { user !== null ?
                                <>
                                    <p>Nazwa użytkownika: {user.login}</p>
                                    <p>Email rodzica: {user.email}</p>
                                    <button className="m-1 mx-1 btn btn-trinary shadow-sm" onClick={()=> AuthService.deleteUser()}>Usuń konto</button>

                                </>

                            : <span> Pobieranie danych użytkownika nie powiodło się</span>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;