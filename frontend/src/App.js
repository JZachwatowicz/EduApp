import Navigation from "./components/Navigation";
import './App.scss';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SignUp from "./pages/SignUp";

import {Route, Routes, BrowserRouter as Router} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Navigation/>
              <Routes>
                  <Route path={"/"} element={<Home />}/>
                  <Route path={"/Kursy"} element={<Courses />}/>
                  <Route path={"/Kontakt"} element={<Contact />}/>
                  <Route path={"/Profil"} element={<Profile />}/>
                  <Route path={"/Rejestracja"} element={<SignUp />}/>
                  <Route path={"/Kontact"} element={<Contact />}/>
              </Routes>
          </Router>
      </header>
    </div>
  );
}

export default App;
