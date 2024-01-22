import React, {useState} from 'react';
import Login from "../components/Login";
import SignUpService from "../services/AuthService"
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";
const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {login: login, password: password, email: email}

        if(user.password == repeatPassword && consent == true){
            console.log("Rejestracja");
            console.log(user);
            AuthService.registerUser(user)
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        navigate("/");
                    }
                }).catch((err) => {
                    console.log(err.response.data); // you can get the response like this
                    setError(true);
                    setMessage(err.response.data); // status code of the request

            })
        }
        else if(user.password != repeatPassword){
            setError(true);
            setMessage("Hasło i powtórzone hasło nie zgadzają się.")
        }
        else if(consent != true){
            setError(true);
            setMessage("Musisz wyrazić zgodę na przetwarzanie danych osobowych.")
        }
    }

    const handleLogin = (event) => {
        const { login, value } = event.target;
        setLogin(value);
    }

    const handlePassword = (event) => {
        const { password, value } = event.target;
        setPassword(value);
    }

    const handleEmail = (event) => {
        const { email, value } = event.target;
        setEmail(value);
    }

    const handleRepeatPassword = (event) => {
        const { repeatPassword, value } = event.target;
        setRepeatPassword(value);
    }

    const handleConsent = (e) => {
        const  value  = e.target.checked;
        console.log(value)
        setConsent(value);
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
            <BreadcrumbsItem to='/Rejestracja'>Rejestracja</BreadcrumbsItem>
            <div class="d-flex flex-column align-items-center ">
                <h2>Rejestracja</h2>
                <div class="container shadow-sm border border-2 border-primary rounded-4 my-3">
                    <form onSubmit={handleSubmit} class="m-3 my-4 d-flex flex-column">
                        <div class="container row">
                            {showAlert}

                            <label class="col align-self-center" htmlFor="login">Nazwa użytkownika</label>
                            <input className=" bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="login" type="text" placeholder="Nazwa użytkownika" onChange={handleLogin}/>
                            <div class="w-100 "></div>
                            <label class="col align-self-center" htmlFor="password">Hasło</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="password" type="password" placeholder="Hasło" onChange={handlePassword}/>
                            <div className="w-100"></div>
                            <label className="col align-self-center" htmlFor="repeatPassword">Powtórz hasło</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="repeatPassword" type="password" placeholder="Powtórz hasło" onChange={handleRepeatPassword}/>
                            <div className="w-100"></div>
                            <label class="col align-self-center" htmlFor="email">Email rodzica</label>
                            <input className="bg-orange border-0 m-1 my-3 p-1 px-3 col-10 align-self-center" id="email" type="email" placeholder="Email" onChange={handleEmail}/>
                        </div>
                        <div>
                            <label className="m-1 my-3" htmlFor="consent">Zgoda na przetwarzanie danych osobowych</label><br/>
                            <p>
                                <input
                                    type="checkbox"
                                    onChange={e => handleConsent(e)}
                                    className="mx-2"
                                />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id quam tellus.
                                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Vestibulum pretium odio a pulvinar tempor. Nullam ipsum mi, sodales vel leo ut, suscipit congue odio.
                                Vivamus eu justo in velit bibendum lacinia ac sit amet elit.
                                In odio nisi, imperdiet non dignissim quis, aliquam ut dolor. Etiam non congue nibh, nec varius ligula.
                            </p>
                        </div>
                        <button className="m-1 p-2 btn btn-trinary shadow-sm justify-self-end" type="submit">Zarejestruj</button>
                    </form>
                </div>

            </div>
            <div>
                <Login/>
            </div>
        </div>
    )
};

export default SignUp;