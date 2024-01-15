import Navigation from "./components/Navigation";
import './App.scss';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SignUp from "./pages/SignUp";
import AuthProvider from "./provider/AuthProvider";
import Routes from "./components/Routes";
import {Route, BrowserRouter as Router} from "react-router-dom";

import Course from "./pages/Course";
import Exercise from "./pages/Exercise";
import {Breadcrumbs} from "react-breadcrumbs-dynamic";



function App(props) {
  return (

    <div id="App" className="App">
      <header className="App-header">
          <AuthProvider>
              <Navigation/>
              <span className="mx-5">
                    <Breadcrumbs
                        separator={<b> > </b>}
                        finalItem={'b'}
                    />
                  {props.children}
                </span>
              <Routes>
              </Routes>
          </AuthProvider>
      </header>
    </div>
  );
}

export default App;
