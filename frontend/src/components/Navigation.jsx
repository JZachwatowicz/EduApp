import React, { useEffect } from 'react';
import { useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import contrast from '../images/contrast.png';
import fontBigger from '../images/font-bigger.png';
import fontSmaller from '../images/font-smaller.png';
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import {
    BreadcrumbsProvider,
    Breadcrumbs,
    BreadcrumbsItem
} from 'react-breadcrumbs-dynamic';
import AuthService from "../services/AuthService";
const Navigation = (props) => {



    const [reaload, setReload] = useState(true);
    var NavTitles = [{ name:"Główna", link: "/"}, {name:"Kursy", link: "/Kursy"}, {name: "Kontakt", link: "/Kontakt"}]
    const handleIncrese = () => {
        let body = document.documentElement
        if(localStorage.getItem("fontSize") === null){
            localStorage.setItem("fontSize", "1");
        }
        if(localStorage.getItem("fontSize") < 2.5){
            localStorage.setItem('fontSize', (parseFloat(localStorage.getItem("fontSize"))+0.25).toString())
            body.style.setProperty('--bs-body-font-size-acc', localStorage.getItem("fontSize")+'rem')
        }
    }
    const handleDescrese = () => {
        let body = document.documentElement
        if(localStorage.getItem("fontSize") === null){
            localStorage.setItem("fontSize", "1");
        }
        if(localStorage.getItem("fontSize") >0.75){
            localStorage.setItem('fontSize', (parseFloat(localStorage.getItem("fontSize"))-0.25).toString())
            body.style.setProperty('--bs-body-font-size-acc', localStorage.getItem("fontSize")+'rem')
        }

    }

    useEffect(() => {
        const handleLoad = () => {
            let body = document.body;
            body.style.setProperty('--bs-body-font-size', localStorage.getItem('fontSize'));
        };
        window.addEventListener('load', handleLoad);
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    },[]);

    return(
        <div >
            <div class="mx-5 mt-5 mb-2 bg-primary rounded-4 d-flex d-flex justify-content-between shadow-sm">
                <nav className="navbar navbar-light d-inline-flex">
                    <a className="navbar-brand px-4 p-2 " href="/">LOGO</a>
                        {NavTitles.map((nav, index) => (

                             <a key={index} href={nav.link} className={`resize nav-item nav-link px-5 p-3 text-black border-start border-3 border-white ${window.location.pathname === nav.link ? " bg-white" : "" }`} onClick={()=>{ setReload(!reaload);}}> {nav.name}</a>
                        ))}
                    { localStorage.getItem("token")  &&
                        <a  href={"/Profil"} className={`resize nav-item nav-link px-5 p-3 text-black border-start border-3 border-white ${window.location.pathname === "/Profil" ? " bg-white" : "" }`} onClick={()=>{ setReload(!reaload);}}> Profil </a>
                    }
                     </nav>
                <span class="p-2 px-5">
                    { localStorage.getItem("token")  &&
                        <button className="m-1 mx-1 btn btn-trinary shadow-sm" onClick={()=> AuthService.logout()}>Wyloguj</button>
                    }
                    <button className="btn-transparent" onClick={handleIncrese}><img className="visible" src={contrast} width={30} height={30} class="m-2"/></button>
                    <button className="btn-transparent" onClick={handleIncrese}><img className="visible" src={fontBigger} width={30} height={30} class="m-2"/></button>
                    <button className="btn-transparent" onClick={handleDescrese}><img className="visible" src={fontSmaller} width={30} height={30} class="m-2"/></button>
                </span>
            </div>
            <BreadcrumbsItem to='/'>Strona główna</BreadcrumbsItem>
            {props.children}
        </div>
    )
};

export default Navigation;