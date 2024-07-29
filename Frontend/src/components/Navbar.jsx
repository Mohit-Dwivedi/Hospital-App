import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import {GiHamburgerMenu} from "react-icons/gi" 
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const [show, setShow] = useState(false)
    const {isAuthentication, setisAuthentication} = useContext(Context)
    const naviagte = useNavigate()

    const handleLogout = async () => {
      await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setisAuthentication(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
    const gotoLogin = async () => {
        naviagte('/login')
    }

  return (
    <nav className='container'> 
      <div className="logo">
        <img src="/logo.png" alt="logo" className='logo-img'/>
      </div>
         <div className={show ? "navLinks showmenu" : "navLinks"}>
           <div className="links">
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appoinment</Link>
              <Link to={"/about"}>About Us</Link>
             </div>
             {isAuthentication ? (<button className='logoutBtn btn' onClick={handleLogout} style={{cursor: "pointer"}}>LOGOUT</button>) : (<button className='logoutBtn btn' onClick={gotoLogin} style={{cursor: "pointer"}}>LOGIN</button>)}
       </div>
       <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
       </div>
    </nav>
  )
}

export default Navbar 
 