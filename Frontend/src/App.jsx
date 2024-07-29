import React, { useContext, useEffect } from 'react'
import './App.css'
import{BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import AboutUS from './pages/AboutUS'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import { Context } from './main' 
import axios from 'axios'
import Footer from './components/Footer'

const App = () => {
  const {isAuthentication, setisAuthentication, user, setUser} = useContext(Context)

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",
        {withCredentials: true})
        setisAuthentication(true)
        setUser(response.data.user)
      } catch (error) {
        setisAuthentication(false)
        setUser({})
      }
    }
    fecthUser()
  }, [isAuthentication])

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/appointment' element={<Appointment />}/>
        <Route exact path='/about' element={<AboutUS />}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
      <Footer />
      <ToastContainer position='top-center'/>
      </BrowserRouter>
    </div>
  )
}

export default App
