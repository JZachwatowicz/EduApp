import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import {useAuth} from "../provider/AuthProvider";
// import {useAuth} from "../provider/AuthProvider";

//TODO:
// 1. Zmien link rejestracji na "/Rejestracja"
// 2. Zmien handleSubmit żeby działało z backendem
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setMessage] = useState("");
     const { setToken } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {login: login, password: password}
        console.log("Login");
        AuthService.loginUser(user)
            .then((response) => {
                console.log(response)
                setToken(response.data);
                window.location.reload(true);
            }).catch((err) => {
            console.log(err.response.data); // you can get the response like this
                 setError(true);
                 setMessage(err.response.data); // status code of the request

        })
    }
    const handleLogin = (event) => {
        const { login, value } = event.target;
        setLogin(value);
    }

    const handlePassword = (event) => {
        const { password, value } = event.target;
        setPassword(value);
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
        <>
            <div>{showAlert}
            <div class="m-5 bg-primary rounded-4 d-flex shadow-sm p-3 justify-content-center">
                <form onSubmit={handleSubmit} class="d-flex flex-column align-items-center w-100">
                    <h3>Logowanie</h3>
                    <input class="m-1 p-1 px-3 w-100" type="text" placeholder="Nazwa użytkownika" onChange={handleLogin}/>
                    <input class="m-1 p-1 px-3 w-100" type="password" placeholder="Hasło" onChange={handlePassword}/>
                    <span class="d-flex justify-content-evenly align-items-center w-100">
                        <button className="m-1 mx-3 btn btn-trinary shadow-sm" type="submit">Zaloguj</button>

                        <Link class="m-1 mx-3 text-trinary" to="/Rejestracja">Zarejestruj się</Link>
                    </span>
                </form>
            </div>
            </div>
        </>
    )
};

export default Login;