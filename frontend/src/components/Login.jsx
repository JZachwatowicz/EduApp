import React, {useState} from 'react';
import {Link} from "react-router-dom";

//TODO:
// 1. Zmien link rejestracji na "/Rejestracja"
// 2. Zmien handleSubmit żeby działało z backendem
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submition: ${login}, ${password}`);
    }
    const handleLogin = (event) => {
        const { login, value } = event.target;
        setLogin(value);
    }

    const handlePassword = (event) => {
        const { password, value } = event.target;
        setPassword(value);
    }


    return(
        <>
            <div class="m-5 bg-primary rounded-4 d-flex shadow-sm d-flex d-inline-flex p-3 shadow-sm">
                <form onSubmit={handleSubmit} class="d-flex flex-column align-items-center">
                    <h3>Logowanie</h3>
                    <input class="m-1 p-1 px-3" type="text" placeholder="Nazwa użytkownika" onChange={handleLogin}/>
                    <input class="m-1 p-1 px-3" type="password" placeholder="Hasło" onChange={handlePassword}/>
                    <span class="d-flex justify-content-between align-items-center">
                        <button className="m-1 btn btn-trinary shadow-sm" type="submit">Zaloguj</button>
                        <Link class="m-1 text-trinary" to="/Rejestracja">Zarejestruj się</Link>
                    </span>
                </form>
            </div>
        </>
    )
};

export default Login;