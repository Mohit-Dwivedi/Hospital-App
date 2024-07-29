import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/HEro'

const Appointment = () => {
  return (
    <div>
      <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"}/>
      <AppointmentForm />
    </div>
  )
}

export default Appointment
