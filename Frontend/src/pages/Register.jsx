import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => { 
  const {isAuthentication, setisAuthentication} = useContext(Context)
  const navigate = useNavigate() 

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [nic, setNic] = useState("") 
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("") 

  const handleRegister = async (e) => {
    e.preventDefault()
    try { 
        await axios
          .post(
            "http://localhost:4000/api/v1/user/patient/register",
            { firstName, lastName, email, phone, nic, dob, gender, password },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            setisAuthentication(true);
            navigate("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNic("");
            setDob("");
            setGender("");
            setPassword("");
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  if(isAuthentication){
    return navigate("/")
  }

  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, a neque exercitationem beatae perspiciatis debitis.</p>

      <form onSubmit={handleRegister}>
        <div>
           <input type="text" placeholder='First Name' value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
           <input type="text" placeholder='Last Name' value={lastName}  onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
           <input type="text" placeholder='Email' value={email}  onChange={(e) => setEmail(e.target.value)}/>
           <input type="number" placeholder='Phone Number' value={phone}  onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div>
           <input type="number" placeholder='NIC' value={nic}  onChange={(e) => setNic(e.target.value)}/>
           <input type="date" placeholder='Date od Birth' value={dob}  onChange={(e) => setDob(e.target.value)}/>
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
           <input type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)}/> 
        </div> 
        <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
            <p style={{marginBottom: 0,}}>Alredy Registered?</p>
            <Link to={"/login"} style={{textDecoration: "none", alignItems: 'center'}}>Login Now</Link>
          </div>
          <div style={{justifyContent: "center", alignContent: 'center'}}>
            <button type='submit' style={{cursor: "pointer"}}>Register</button>
          </div>
      </form>
    </div>
  )
}

export default Register
Register