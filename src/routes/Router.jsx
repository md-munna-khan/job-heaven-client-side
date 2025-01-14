import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";


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
}
])
  

export default router;