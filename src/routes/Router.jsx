import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import WorkerHome from "../layouts/Dashboard/Worker/WorkerHome";
import TaskList from "../layouts/Dashboard/Worker/TaskList";
import MySubmissions from "../layouts/Dashboard/Worker/MySubmissions";
import Withdrawals from "../layouts/Dashboard/Worker/Withdrawals";



const router = createBrowserRouter ([
{
    path:'/',
    element:<MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
   children:[
    {
      path:  '/',
      element:<Home></Home>
    },
    {
      path:  '/login',
      element:<Login></Login>
    },
    {
      path:  '/signup',
      element:<SignUp></SignUp>
    }
   ]
},
{
  path:'/dashboard',
  element:<DashboardLayout></DashboardLayout>,
  children:[
    // worker route
    {
      path:'worker-home',
      element:<WorkerHome></WorkerHome>
    },
    {
      path:'task-list',
      element:<TaskList></TaskList>
    },
    {
      path:'my-submissions',
      element:<MySubmissions></MySubmissions>
    },
    {
      path:'withdrawals',
      element:<Withdrawals></Withdrawals>
    },
    // buyer route
  ]
}
])
  

export default router;