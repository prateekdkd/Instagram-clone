import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute"
import Editprofile from './pages/Editprofile';


 export const App = () => {
  return (
    <BrowserRouter>
    <Routes>

   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>

   <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />
    <Route path="/profile/:id" element={<PrivateRoute><Profile/></PrivateRoute>} />
     <Route path="/Search" element={<PrivateRoute> <Search/> </PrivateRoute>} />
     <Route path='/Editprofile' element={<PrivateRoute><Editprofile/></PrivateRoute>}/>

    </Routes>
     <ToastContainer position="top-right" autoClose={2000}/>
    </BrowserRouter>
  )
}
