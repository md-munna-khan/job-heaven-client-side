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
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "../layouts/Dashboard/buyer/BuyerRoute";
import AdminRoute from "../layouts/Dashboard/admin/AdminRoute";




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
  element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  children:[
    // worker route
    {
      path:'/dashboard/worker',
      element:<PrivateRoute><WorkerHome></WorkerHome></PrivateRoute>
    },
    {
      path:'approved-submissions',
      element:<PrivateRoute><ApprovedSubmissions></ApprovedSubmissions></PrivateRoute>
    },
    {
      path:'task-list',
      element:<PrivateRoute><TaskList></TaskList></PrivateRoute>
    },
    {
      path:'my-submissions',
      element:<PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
    },
    {
      path:'withdrawals',
      element:<PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>
    },
    {
      path:'task-details/:id',
      element:<PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>
    },
    // buyer route
    {
      path:"/dashboard/buyer",
      element:<BuyerRoute><BuyerHome></BuyerHome></BuyerRoute>
    },
    {
      path:"task-to-review",
      element:<BuyerRoute><TaskToReview></TaskToReview></BuyerRoute>
    },
    {
      path:'add-new-tasks',
      element:<BuyerRoute><AddNewTasks></AddNewTasks></BuyerRoute>
    },
    {
      path:'payment-card/:amount',
      element:<BuyerRoute><PaymentCards></PaymentCards></BuyerRoute>
    },
    {
      path:'my-tasks',
      element:<BuyerRoute><MyTasks></MyTasks></BuyerRoute>
    },
    {
      path:'purchase-coin',
      element:<BuyerRoute><PurchaseCoin></PurchaseCoin></BuyerRoute>
    },
    {
      path:'payment-history',
      element:<BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute>
    },
    // admin route
    {
      path:'admin-home',
      element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
    },
    {
      path:'manage-users',
      element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
    },
    {
      path:'manage-task',
      element:<AdminRoute><ManageTask></ManageTask></AdminRoute>
    },
  ]
}
])
  

export default router;