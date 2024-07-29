import React from 'react'
import HEro from '../components/HEro'
import Biography from '../components/Biography'
import Department from '../components/Department'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <div>
      <HEro title={"Welcome to ZeeCare Medical Institute | Your Trusted HealthCare Provider"} imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"}/>
      <Department />
      <MessageForm /> 
    </div>
  )
}

export default Home