import axios from 'axios'
import React, { useEffect, useState } from 'react' 
import { toast } from 'react-toastify'

const AppointmentForm = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dob, setDob] = useState("")
    const [nic, setNic] = useState("")
    const [gender, setGender] = useState("")
    const [Department, setDepartment] = useState("")
    const [appointmentDate, setAppointmentDate] = useState('')
    const [doctorFirstName, setDoctorFirstName] = useState('')
    const [doctorLastName, setDoctorLastName] = useState('')
    const [hasVisited, setHasVisited] = useState('') 
    const [address, setAddress] = useState("")
    const [doctors, setDoctors] = useState([])

    const departmentsArray = ["Pediatrics", "Orthopedics", "Cardiology", "Nuerology", "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT"]

    useEffect(() => {
        const fetchDoctors = async() => {
        const {data} = await axios.get("http://localhost:4000/api/v1/user/doctors", 
            {withCredentials: true,}
        ) 
        setDoctors(data.doctor)
    }
    fetchDoctors()
    }, [])

    const handleAppointment = async (e) => {  
      e.preventDefault()
      try {
        const hasVisitedBoolean = Boolean(hasVisited)
         const {data} = await axios.post("http://localhost:4000/api/v1/appointment/post",
         {firstName, lastName, email, phone, nic, dob, gender, Department, appointment_date: appointmentDate, doctor_firstName: doctorFirstName, doctor_lastName: doctorLastName, hasVisited: hasVisitedBoolean,address, doctors, role: "Patient"}, 
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        ) 
          toast.success(data.message) 
          navigate('/')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

  return (
    <div className='container form-component appointment-form'>
    <h2>Appointment</h2>
    <form onSubmit={handleAppointment}>
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
        <input type="date" placeholder='Appointment Date' value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)}/>
      </div>
      <div>
        <select value={Department} onChange={(e) => {setDepartment(e.target.value), setDoctorFirstName(""), setDoctorLastName("")}}>
          {departmentsArray.map((depart, index) => {
           return (
            <option value={depart} key={index}>
            {depart}
          </option>
           )
          })}
        </select>
        <select value={`${doctorFirstName} ${doctorLastName}`} onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(' ');
            setDoctorFirstName(firstName);
            setDoctorLastName(lastName);
          }} disabled={!Department}>
            <option value="">Select Doctor</option>
            {doctors
              ?.filter((doctor) => doctor.doctorDepartment === Department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
      </div>
      <textarea rows="10" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address'></textarea> 

      <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
          <p style={{marginBottom: 0,}}>Have You Visited Before</p> 
          <input type="checkbox" value={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} style={{flex: 'none', width: "25px"}} />
        </div>
        <div style={{justifyContent: "center", alignContent: 'center'}}>
          <button type='submit' style={{cursor: "pointer"}}>Get Appointment</button>
        </div>
    </form>
  </div>
  )
}

export default AppointmentForm
