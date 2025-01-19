import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";

import TaskList from "../layouts/Dashboard/Worker/TaskList";
import MySubmissions from "../layouts/Dashboard/Worker/MySubmissions";
import Withdrawals from "../layouts/Dashboard/Worker/Withdrawals";

import AddNewTasks from "../layouts/Dashboard/buyer/AddNewTasks";
import MyTasks from "../layouts/Dashboard/buyer/MyTasks";
import PurchaseCoin from "../layouts/Dashboard/buyer/PurchaseCoin";
import PaymentHistory from "../layouts/Dashboard/buyer/PaymentHistory";
import AdminHome from "../layouts/Dashboard/admin/AdminHome";
import ManageUsers from "../layouts/Dashboard/admin/ManageUsers";
import ManageTask from "../layouts/Dashboard/admin/ManageTask";
import TaskDetails from "../layouts/Dashboard/Worker/TaskDetails";
import PaymentCards from "../layouts/Dashboard/buyer/PaymentCards";
import TaskToReview from "../layouts/Dashboard/buyer/TaskToReview";
import ApprovedSubmissions from "../layouts/Dashboard/Worker/ApprovedSubmissions";
import WorkerHome from "../layouts/Dashboard/Worker/WorkerHome";
import BuyerHome from "../layouts/Dashboard/buyer/BuyerHome";




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
    },

   ]
},
{
  path:'/dashboard',
  element:<DashboardLayout></DashboardLayout>,
  children:[
    // worker route
    {
      path:'/dashboard/worker',
      element:<WorkerHome></WorkerHome>
    },
    {
      path:'approved-submissions',
      element:<ApprovedSubmissions></ApprovedSubmissions>
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
    {
      path:'task-details/:id',
      element:<TaskDetails></TaskDetails>
    },
    // buyer route
    {
      path:"/dashboard/buyer",
      element:<BuyerHome></BuyerHome>
    },
    {
      path:"task-to-review",
      element:<TaskToReview></TaskToReview>
    },
    {
      path:'add-new-tasks',
      element:<AddNewTasks></AddNewTasks>
    },
    {
      path:'payment-card/:amount',
      element:<PaymentCards></PaymentCards>
    },
    {
      path:'my-tasks',
      element:<MyTasks></MyTasks>
    },
    {
      path:'purchase-coin',
      element:<PurchaseCoin></PurchaseCoin>
    },
    {
      path:'payment-history',
      element:<PaymentHistory></PaymentHistory>
    },
    {
      path:'admin-home',
      element:<AdminHome></AdminHome>
    },
    {
      path:'manage-users',
      element:<ManageUsers></ManageUsers>
    },
    {
      path:'manage-task',
      element:<ManageTask></ManageTask>
    },
  ]
}
])
  

export default router;