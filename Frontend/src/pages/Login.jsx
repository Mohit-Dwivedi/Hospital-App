import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import axios from 'axios'

const Login = () => {
  const {isAuthentication, setisAuthentication} = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()  

  const handleLogin = async (e) => {
    e.preventDefault()  
    try {
       const response = await axios.post("http://localhost:4000/api/v1/user/login",
       {email, password, confirmPassword, role: "Patient"}, 
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )  
        toast.success(response.data.message)
        setisAuthentication(true)
        navigate('/')
        setFirstName("");
        setPassword("")
        setConfirmPassword("")
    } catch (error) {
      toast.error(error)
    }
  }

  if(isAuthentication){
    return navigate("/")
  }

  return (
    <div className='container form-component login-form'>
       <h2>Sign In</h2>
       <p>Please Login To Continue </p>
       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi porro doloribus laborum earum recusandae ad.</p>
       <form onSubmit={handleLogin}>
        <input
         type="text"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder='Email'/>
        <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder='Password'/>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='ConfirmPassword'/>

          <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
            <p style={{marginBottom: 0,}}>Not Registered?</p>
            <Link to={"/register"} style={{textDecoration: "none", alignItems: 'center'}}>Register Now</Link>
          </div>
          <div style={{justifyContent: "center", alignContent: 'center'}}>
            <button type='submit' style={{cursor: "pointer"}}>Login</button>
          </div>
       </form>
    </div>
  )
}

export default Login
Login