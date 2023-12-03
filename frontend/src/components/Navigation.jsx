import React from 'react';
import { useState } from 'react';
import {  Link } from "react-router-dom";
import contrast from '../images/contrast.png';
import fontBigger from '../images/font-bigger.png';
import fontSmaller from '../images/font-smaller.png';
const Navigation = () => {
    const [reaload, setReload] = useState(true);
    var NavTitles = [{ name:"Główna", link: "/"}, {name:"Kursy", link: "/Kursy"}, {name: "Kontakt", link: "/Kontakt"}, {name:"Profil", link: "/Profil"}]
    return(
        <>
            <div class="m-5 bg-primary rounded-4 d-flex d-flex justify-content-between shadow-sm">
                <nav className="navbar navbar-light d-inline-flex">
                    <a className="navbar-brand px-4 p-2 " href="/">LOGO</a>
                        {NavTitles.map((nav, index) => (
                            <Link key={index} to={nav.link} className={`nav-item nav-link px-5 p-3 text-black border-start border-3 border-white ${window.location.pathname === nav.link ? " bg-white" : "" }`} onClick={()=>{ setReload(!reaload);}}> {nav.name}</Link>
                        ))}
                     </nav>
                <span class="p-2 px-5">
                    <img src={contrast} width={30} height={30} class="m-2"/>
                    <img src={fontBigger} width={30} height={30} class="m-2"/>
                    <img src={fontSmaller} width={30} height={30} class="m-2"/>
                </span>
            </div>

        </>
    )
};

export default Navigation;