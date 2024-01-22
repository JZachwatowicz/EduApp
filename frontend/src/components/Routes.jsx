import {useAuth} from "../provider/AuthProvider";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import {ProtectedRoute} from "./ProtectedRoute";
import Course from "../pages/Course";
import Exercise from "../pages/Exercise";
import Login from "./Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navigation from "./Navigation";
import {Breadcrumbs} from "react-breadcrumbs-dynamic";
import PageNotFound from "../pages/404Page";
import AddCourse from "../pages/AddCourse";
import AddTask from "../pages/AddTask";
import EditCourse from "../pages/EditCourse";

const Routes = ({children}) => {
    const { token } = useAuth();
    const routesForPublic =[
        {
            path: "/kontakt",
            element: <Contact/>,
        },
        {
            path: "/kursy",
            element: <Courses/>,
        },
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "*",
            element: <PageNotFound/>
        }

    ];
    const routesForNotAuthenticatedOnly = [
        {
            path: "/rejestracja",
            element: <SignUp />,
        },
        // {
        //     path: "/",
        //     element: <Login/>,
        // },
    ];

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/Profil",
                    element: <Profile/>,
                },
                {
                    path: "/Kurs",
                    element: <Course/>,
                },
                {
                    path: "/Zadanie",
                    element: <Exercise/>,
                },
                {
                    path: "/DodajKurs",
                    element: <AddCourse/>
                },
                {
                    path: "/DodajZadanie",
                    element: <AddTask/>
                },
                {
                    path: "/EdytujKurs",
                    element: <EditCourse/>
                }
            ],
        },
    ];
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);
    return (
        <RouterProvider router={router} >
            {children}
        </RouterProvider>

    );
};
export default Routes;